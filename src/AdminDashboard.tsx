import { useEffect, useMemo, useState } from 'react';
import Banner from './Components/Banner.tsx';
import Footer from './Components/Footer.tsx';
import supabase from './supabase';
import './AdminDashboard.css';

type LostItemRecord = {
  id?: string | number;
  name: string | null;
  category: string | null;
  description: string | null;
  status: string | null;
  location_found: string | null;
  date_found: string | null;
};

type ClaimRecord = {
  id?: string | number;
  item_reference: string | null;
  claimant_name: string | null;
  claim_email: string | null;
  identifying_info: string | null;
  last_location: string | null;
  status: string | null;
};

type InquiryRecord = {
  id?: string | number;
  created_at?: string | null;
  item_reference: string | null;
  inquiry_email: string | null;
  question: string | null;
  status: string | null;
  admin_response?: string | null;
};

type AdminTab = 'postings' | 'claims' | 'inquiries';

type DetailModalState =
  | { tab: 'postings'; record: LostItemRecord }
  | { tab: 'claims'; record: ClaimRecord }
  | { tab: 'inquiries'; record: InquiryRecord }
  | null;

type StatusFilterValue = 'all' | 'pending review' | 'available' | 'claimed' | 'archived' | 'rejected' | 'approved' | 'pending' | 'answered';

const ADMIN_PASSWORD = 'admin123';

function normalizeStatus(status: string | null) {
  return status?.trim().toLowerCase() ?? '';
}

function AdminDashboard() {
  const [password, setPassword] = useState('');
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [authError, setAuthError] = useState('');

  const [postings, setPostings] = useState<LostItemRecord[]>([]);
  const [claims, setClaims] = useState<ClaimRecord[]>([]);
  const [inquiries, setInquiries] = useState<InquiryRecord[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [dashboardError, setDashboardError] = useState('');
  const [actionMessage, setActionMessage] = useState('');
  const [replyDrafts, setReplyDrafts] = useState<Record<string, string>>({});
  const [busyKey, setBusyKey] = useState('');
  const [activeTab, setActiveTab] = useState<AdminTab>('postings');
  const [tabSearch, setTabSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<StatusFilterValue>('all');
  const [detailModal, setDetailModal] = useState<DetailModalState>(null);

  const stats = useMemo(
    () => ({
      pendingPostings: postings.filter((posting) => normalizeStatus(posting.status) === 'pending review').length,
      pendingClaims: claims.filter((claim) => normalizeStatus(claim.status) === 'pending review').length,
      pendingInquiries: inquiries.filter((inquiry) => normalizeStatus(inquiry.status) !== 'answered').length,
    }),
    [postings, claims, inquiries]
  );

  const normalizedSearch = tabSearch.trim().toLowerCase();

  const currentStatusOptions = useMemo(() => {
    if (activeTab === 'postings') {
      return [
        { value: 'all', label: 'All statuses' },
        { value: 'pending review', label: 'Pending Review' },
        { value: 'available', label: 'Available' },
        { value: 'claimed', label: 'Claimed' },
        { value: 'archived', label: 'Archived' },
        { value: 'rejected', label: 'Rejected' },
      ];
    }

    if (activeTab === 'claims') {
      return [
        { value: 'all', label: 'All statuses' },
        { value: 'pending review', label: 'Pending Review' },
        { value: 'approved', label: 'Approved' },
        { value: 'rejected', label: 'Rejected' },
      ];
    }

    return [
      { value: 'all', label: 'All statuses' },
      { value: 'pending', label: 'Pending' },
      { value: 'answered', label: 'Answered' },
    ];
  }, [activeTab]);

  const filteredPostings = useMemo(
    () =>
      postings.filter((posting) =>
        (!normalizedSearch ||
        [
          posting.name,
          posting.category,
          posting.description,
          posting.location_found,
          posting.status,
        ].some((value) => value?.toLowerCase().includes(normalizedSearch))) &&
        (statusFilter === 'all' || normalizeStatus(posting.status) === statusFilter)
      ),
    [postings, normalizedSearch, statusFilter]
  );

  const filteredClaims = useMemo(
    () =>
      claims.filter((claim) =>
        (!normalizedSearch ||
        [
          claim.item_reference,
          claim.claimant_name,
          claim.claim_email,
          claim.identifying_info,
          claim.last_location,
          claim.status,
        ].some((value) => value?.toLowerCase().includes(normalizedSearch))) &&
        (statusFilter === 'all' || normalizeStatus(claim.status) === statusFilter)
      ),
    [claims, normalizedSearch, statusFilter]
  );

  const filteredInquiries = useMemo(
    () =>
      inquiries.filter((inquiry) =>
        (!normalizedSearch ||
        [
          inquiry.item_reference,
          inquiry.inquiry_email,
          inquiry.question,
          inquiry.status,
          inquiry.admin_response,
        ].some((value) => value?.toLowerCase().includes(normalizedSearch))) &&
        (statusFilter === 'all' || normalizeStatus(inquiry.status) === statusFilter)
      ),
    [inquiries, normalizedSearch, statusFilter]
  );

  const getPostingActions = (posting: LostItemRecord) => {
    const status = normalizeStatus(posting.status);

    if (status === 'claimed') {
      return [
        { label: 'Review', variant: 'review' as const, onClick: () => setDetailModal({ tab: 'postings', record: posting }) },
        { label: 'Mark Available', variant: 'approve' as const, onClick: () => updatePostingStatus(posting.id, 'Available') },
      ];
    }

    if (status === 'available' || status === 'approved') {
      return [
        { label: 'Review', variant: 'review' as const, onClick: () => setDetailModal({ tab: 'postings', record: posting }) },
        { label: 'Mark Claimed', variant: 'approve' as const, onClick: () => updatePostingStatus(posting.id, 'Claimed') },
        { label: 'Archive', variant: 'danger' as const, onClick: () => updatePostingStatus(posting.id, 'Archived') },
      ];
    }

    if (status === 'archived') {
      return [
        { label: 'Review', variant: 'review' as const, onClick: () => setDetailModal({ tab: 'postings', record: posting }) },
        { label: 'Mark Available', variant: 'approve' as const, onClick: () => updatePostingStatus(posting.id, 'Available') },
      ];
    }

    if (status === 'rejected') {
      return [
        { label: 'Approve', variant: 'approve' as const, onClick: () => updatePostingStatus(posting.id, 'Available') },
        { label: 'Review', variant: 'review' as const, onClick: () => setDetailModal({ tab: 'postings', record: posting }) },
      ];
    }

    return [
      { label: 'Approve', variant: 'approve' as const, onClick: () => updatePostingStatus(posting.id, 'Available') },
      { label: 'Review', variant: 'review' as const, onClick: () => setDetailModal({ tab: 'postings', record: posting }) },
      { label: 'Reject', variant: 'danger' as const, onClick: () => updatePostingStatus(posting.id, 'Rejected') },
    ];
  };

  const loadDashboard = async () => {
    setIsLoading(true);
    setDashboardError('');

    const [postingsResult, claimsResult, inquiriesResult] = await Promise.all([
      supabase
        .from('Lost Items')
        .select('id, name, category, description, status, location_found, date_found')
        .order('date_found', { ascending: false }),
      supabase
        .from('item_claims')
        .select('id, item_reference, claimant_name, claim_email, identifying_info, last_location, status')
        .order('id', { ascending: false }),
      supabase
        .from('item_inquiries')
        .select('id, created_at, question, item_reference, status, admin_response, inquiry_email')
        .order('created_at', { ascending: false }),
    ]);

    const error = postingsResult.error || claimsResult.error || inquiriesResult.error;

    if (error) {
      setDashboardError(error.message);
    } else {
      setPostings(postingsResult.data ?? []);
      setClaims(claimsResult.data ?? []);
      setInquiries(inquiriesResult.data ?? []);
    }

    setIsLoading(false);
  };

  useEffect(() => {
    window.sessionStorage.removeItem('nexus-admin-auth');
  }, []);

  useEffect(() => {
    if (!isAuthorized) {
      return;
    }

    loadDashboard();
  }, [isAuthorized]);

  const handleLogin = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (password === ADMIN_PASSWORD) {
      setIsAuthorized(true);
      setAuthError('');
      setPassword('');
      return;
    }

    setAuthError('Incorrect admin password.');
  };

  const updatePostingStatus = async (id: string | number | undefined, nextStatus: string) => {
    if (id === undefined) {
      return;
    }

    setBusyKey(`posting-${id}`);
    setActionMessage('');

    const { error } = await supabase.from('Lost Items').update({ status: nextStatus }).eq('id', id);

    if (error) {
      setDashboardError(error.message);
    } else {
      setActionMessage(`Posting updated to ${nextStatus}.`);
      await loadDashboard();
    }

    setBusyKey('');
  };

  const updateClaimStatus = async (id: string | number | undefined, nextStatus: string) => {
    if (id === undefined) {
      return;
    }

    setBusyKey(`claim-${id}`);
    setActionMessage('');

    const { error } = await supabase.from('item_claims').update({ status: nextStatus }).eq('id', id);

    if (error) {
      setDashboardError(error.message);
    } else {
      setActionMessage(`Claim updated to ${nextStatus}.`);
      await loadDashboard();
    }

    setBusyKey('');
  };

  const sendInquiryReply = async (inquiry: InquiryRecord) => {
    if (inquiry.id === undefined) {
      return;
    }

    const draftKey = String(inquiry.id);
    const reply = replyDrafts[draftKey]?.trim();

    if (!reply) {
      setDashboardError('Write a reply before sending.');
      return;
    }

    setBusyKey(`inquiry-${inquiry.id}`);
    setDashboardError('');
    setActionMessage('');

    const { error: invokeError } = await supabase.functions.invoke('send-inquiry-reply', {
      body: {
        toEmail: inquiry.inquiry_email,
        itemName: inquiry.item_reference,
        question: inquiry.question,
        reply,
      },
    });

    if (invokeError) {
      setDashboardError(invokeError.message);
    } else {
      const { error: saveError } = await supabase
        .from('item_inquiries')
        .update({ admin_response: reply, status: 'Answered' })
        .eq('id', inquiry.id);

      if (saveError) {
        setDashboardError(saveError.message);
      } else {
        setActionMessage(`Inquiry reply sent to ${inquiry.inquiry_email}.`);
        await loadDashboard();
      }
    }

    setBusyKey('');
  };

  if (!isAuthorized) {
    return (
      <div>
        <Banner />
        <section id="hero" className="admin-hero">
          <div className="admin-hero-overlay" aria-hidden="true" />
          <div className="admin-hero-content">
            <p className="admin-kicker">School staff access</p>
            <h1>Admin Dashboard</h1>
            <p>Enter the admin password to review postings, claims, and inquiries.</p>
          </div>
        </section>

        <main className="admin-page-shell">
          <section className="admin-login-card">
            <form className="admin-login-form" onSubmit={handleLogin}>
              <label htmlFor="admin-password">Password</label>
              <input
                id="admin-password"
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                placeholder="Enter admin password"
              />
              <button type="submit">Enter Dashboard</button>
              {authError && <p className="admin-error">{authError}</p>}
            </form>
          </section>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div>
      <Banner />
      <section id="hero" className="admin-hero">
        <div className="admin-hero-overlay" aria-hidden="true" />
        <div className="admin-hero-content">
          <p className="admin-kicker">School staff access</p>
          <h1>Admin Dashboard</h1>
          <p>Review item reports, ownership claims, and inquiry responses from one place.</p>
        </div>
      </section>

      <main className="admin-page-shell">
        <section className="admin-stats-grid">
          <article className="admin-stat-card admin-stat-card-orange">
            <span>{stats.pendingPostings}</span>
            <p>Pending postings</p>
          </article>
          <article className="admin-stat-card admin-stat-card-blue">
            <span>{stats.pendingClaims}</span>
            <p>Pending claims</p>
          </article>
          <article className="admin-stat-card admin-stat-card-slate">
            <span>{stats.pendingInquiries}</span>
            <p>Open inquiries</p>
          </article>
        </section>

        <div className="admin-toolbar">
          <div className="admin-tabs" role="tablist" aria-label="Admin sections">
            <button
              type="button"
              className={`admin-tab-button ${activeTab === 'postings' ? 'is-active' : ''}`}
              onClick={() => {
                setActiveTab('postings');
                setTabSearch('');
                setStatusFilter('all');
              }}
            >
              Postings
            </button>
            <button
              type="button"
              className={`admin-tab-button ${activeTab === 'claims' ? 'is-active' : ''}`}
              onClick={() => {
                setActiveTab('claims');
                setTabSearch('');
                setStatusFilter('all');
              }}
            >
              Claims
            </button>
            <button
              type="button"
              className={`admin-tab-button ${activeTab === 'inquiries' ? 'is-active' : ''}`}
              onClick={() => {
                setActiveTab('inquiries');
                setTabSearch('');
                setStatusFilter('all');
              }}
            >
              Inquiries
            </button>
          </div>

          <div className="admin-toolbar-actions">
            <button type="button" onClick={loadDashboard}>
              Refresh
            </button>
            <button
              type="button"
              className="admin-logout-button"
              onClick={() => {
                setIsAuthorized(false);
              }}
            >
              Log Out
            </button>
          </div>
        </div>

        <section className="admin-search-panel">
          <div className="admin-search-grid">
            <div>
              <label htmlFor="admin-tab-search" className="admin-search-label">
                Search {activeTab}
              </label>
              <input
                id="admin-tab-search"
                type="search"
                className="admin-search-input"
                value={tabSearch}
                onChange={(event) => setTabSearch(event.target.value)}
                placeholder={`Search the current ${activeTab} tab`}
              />
            </div>
            <div>
              <label htmlFor="admin-status-filter" className="admin-search-label">
                Status
              </label>
              <select
                id="admin-status-filter"
                className="admin-status-select"
                value={statusFilter}
                onChange={(event) => setStatusFilter(event.target.value as StatusFilterValue)}
              >
                {currentStatusOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </section>

        {isLoading && <p className="admin-message">Loading dashboard data...</p>}
        {dashboardError && <p className="admin-error">{dashboardError}</p>}
        {actionMessage && <p className="admin-success">{actionMessage}</p>}

        {activeTab === 'postings' && (
        <section className="admin-panel">
          <div className="admin-panel-header">
            <div>
              <p className="admin-panel-kicker">Moderation Queue</p>
              <h2>Postings</h2>
            </div>
          </div>
          {filteredPostings.length === 0 ? (
            <p className="admin-empty-state">No postings match this search.</p>
          ) : (
          <div className="admin-card-grid">
            {filteredPostings.map((posting) => (
              <article key={String(posting.id ?? posting.name)} className="admin-record-card admin-record-card-vertical">
                <div className="admin-record-copy">
                  <h3>
                    {posting.name ?? 'Unnamed item'} <span className="admin-inline-status">{posting.status ?? 'Unknown'}</span>
                  </h3>
                  <p><strong>Category:</strong> {posting.category ?? 'Uncategorized'}</p>
                  <p><strong>Location:</strong> {posting.location_found ?? 'Unknown'}</p>
                  <p>{posting.description ?? 'No description provided.'}</p>
                </div>
                <div className="admin-actions">
                  {getPostingActions(posting).map((action) => (
                    <button
                      key={action.label}
                      className={action.variant}
                      disabled={busyKey === `posting-${posting.id}`}
                      onClick={action.onClick}
                    >
                      {action.label}
                    </button>
                  ))}
                </div>
              </article>
            ))}
          </div>
          )}
        </section>
        )}

        {activeTab === 'claims' && (
        <section className="admin-panel">
          <div className="admin-panel-header">
            <div>
              <p className="admin-panel-kicker">Ownership Verification</p>
              <h2>Claims</h2>
            </div>
          </div>
          {filteredClaims.length === 0 ? (
            <p className="admin-empty-state">No claims match this search.</p>
          ) : (
          <div className="admin-card-grid">
            {filteredClaims.map((claim) => (
              <article key={String(claim.id ?? claim.claim_email)} className="admin-record-card admin-record-card-vertical">
                <div className="admin-record-copy">
                  <h3>{claim.item_reference ?? 'Lost item claim'}</h3>
                  <p><strong>Claimant:</strong> {claim.claimant_name ?? 'Unknown'}</p>
                  <p><strong>Email:</strong> {claim.claim_email ?? 'Unknown'}</p>
                  <p><strong>Status:</strong> {claim.status ?? 'Unknown'}</p>
                  <p><strong>Last location:</strong> {claim.last_location ?? 'Not provided'}</p>
                  <p>{claim.identifying_info ?? 'No identifying information provided.'}</p>
                </div>
                <div className="admin-actions">
                  <button className="approve" disabled={busyKey === `claim-${claim.id}`} onClick={() => updateClaimStatus(claim.id, 'Approved')}>
                    Approve
                  </button>
                  <button className="review" onClick={() => setDetailModal({ tab: 'claims', record: claim })}>
                    Review
                  </button>
                  <button className="danger" disabled={busyKey === `claim-${claim.id}`} onClick={() => updateClaimStatus(claim.id, 'Rejected')}>
                    Reject
                  </button>
                </div>
              </article>
            ))}
          </div>
          )}
        </section>
        )}

        {activeTab === 'inquiries' && (
        <section className="admin-panel">
          <div className="admin-panel-header">
            <div>
              <p className="admin-panel-kicker">Communication Desk</p>
              <h2>Inquiries</h2>
            </div>
          </div>
          {filteredInquiries.length === 0 ? (
            <p className="admin-empty-state">No inquiries match this search.</p>
          ) : (
          <div className="admin-card-grid">
            {filteredInquiries.map((inquiry) => (
              <article key={String(inquiry.id ?? inquiry.inquiry_email)} className="admin-record-card admin-record-card-vertical">
                <div className="admin-record-copy">
                  <h3>{inquiry.item_reference ?? 'Item inquiry'}</h3>
                  <p><strong>Email:</strong> {inquiry.inquiry_email ?? 'Unknown'}</p>
                  <p><strong>Status:</strong> {inquiry.status ?? 'Unknown'}</p>
                  <p>{inquiry.question ?? 'No question provided.'}</p>
                </div>
                <div className="admin-reply-block">
                  <textarea
                    rows={5}
                    value={replyDrafts[String(inquiry.id ?? '')] ?? inquiry.admin_response ?? ''}
                    onChange={(event) =>
                      setReplyDrafts((current) => ({
                        ...current,
                        [String(inquiry.id ?? '')]: event.target.value,
                      }))
                    }
                    placeholder="Write the response that should be emailed to the inquirer."
                  />
                  <button
                    disabled={busyKey === `inquiry-${inquiry.id}`}
                    onClick={() => sendInquiryReply(inquiry)}
                  >
                    Send Reply
                  </button>
                </div>
              </article>
            ))}
          </div>
          )}
        </section>
        )}
      </main>
      {detailModal && (
        <div className="admin-modal-backdrop" onClick={() => setDetailModal(null)}>
          <div className="admin-modal" onClick={(event) => event.stopPropagation()}>
            <div className="admin-modal-header">
              <div>
                <p className="admin-panel-kicker">Review Details</p>
                <h3>
                  {detailModal.tab === 'postings' && (detailModal.record.name ?? 'Unnamed item')}
                  {detailModal.tab === 'claims' && (detailModal.record.item_reference ?? 'Lost item claim')}
                  {detailModal.tab === 'inquiries' && (detailModal.record.item_reference ?? 'Item inquiry')}
                </h3>
              </div>
              <button type="button" className="admin-modal-close" onClick={() => setDetailModal(null)}>
                Close
              </button>
            </div>

            <div className="admin-modal-body">
              {detailModal.tab === 'postings' && (
                <>
                  <p><strong>Category:</strong> {detailModal.record.category ?? 'Uncategorized'}</p>
                  <p><strong>Status:</strong> {detailModal.record.status ?? 'Unknown'}</p>
                  <p><strong>Location:</strong> {detailModal.record.location_found ?? 'Unknown'}</p>
                  <p><strong>Date Found:</strong> {detailModal.record.date_found ?? 'Unknown'}</p>
                  <p><strong>Description:</strong> {detailModal.record.description ?? 'No description provided.'}</p>
                  <div className="admin-modal-actions">
                    <button
                      type="button"
                      className="approve"
                      onClick={async () => {
                        await updatePostingStatus(detailModal.record.id, 'Available');
                        setDetailModal(null);
                      }}
                    >
                      Approve
                    </button>
                    <button
                      type="button"
                      className="danger"
                      onClick={async () => {
                        await updatePostingStatus(detailModal.record.id, 'Rejected');
                        setDetailModal(null);
                      }}
                    >
                      Reject
                    </button>
                  </div>
                </>
              )}
              {detailModal.tab === 'claims' && (
                <>
                  <p><strong>Claimant:</strong> {detailModal.record.claimant_name ?? 'Unknown'}</p>
                  <p><strong>Email:</strong> {detailModal.record.claim_email ?? 'Unknown'}</p>
                  <p><strong>Status:</strong> {detailModal.record.status ?? 'Unknown'}</p>
                  <p><strong>Last Location:</strong> {detailModal.record.last_location ?? 'Not provided'}</p>
                  <p><strong>Identifying Information:</strong> {detailModal.record.identifying_info ?? 'No identifying information provided.'}</p>
                </>
              )}
              {detailModal.tab === 'inquiries' && (
                <>
                  <p><strong>Email:</strong> {detailModal.record.inquiry_email ?? 'Unknown'}</p>
                  <p><strong>Status:</strong> {detailModal.record.status ?? 'Unknown'}</p>
                  <p><strong>Created:</strong> {detailModal.record.created_at ?? 'Unknown'}</p>
                  <p><strong>Question:</strong> {detailModal.record.question ?? 'No question provided.'}</p>
                  <p><strong>Admin Response:</strong> {detailModal.record.admin_response ?? 'No response sent yet.'}</p>
                </>
              )}
            </div>
          </div>
        </div>
      )}
      <Footer />
    </div>
  );
}

export default AdminDashboard;
