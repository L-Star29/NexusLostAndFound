import { useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import Banner from './Components/Banner.tsx';
import Footer from './Components/Footer.tsx';
import supabase from './supabase';
import './Forms.css';

function ClaimForm() {
  const [searchParams] = useSearchParams();
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const itemName = useMemo(
    () => searchParams.get('item')?.trim() || 'Lost Item',
    [searchParams]
  );

  return (
    <div>
      <Banner />
      <section id="hero" className="form-hero">
        <div className="form-hero-backdrop" aria-hidden="true" />
        <div className="form-hero-content">
          <p className="form-kicker">Secure ownership verification</p>
          <h1>Claim Lost Item</h1>
          <p className="form-item-name">{itemName}</p>
        </div>
      </section>

      <main className="form-page-shell">
        <section className="form-card">
          <div className="form-card-glow form-card-glow-orange" aria-hidden="true" />
          <div className="form-card-glow form-card-glow-blue" aria-hidden="true" />

          <form
            className="themed-form"
            onSubmit={async (event) => {
              event.preventDefault();
              const form = event.currentTarget;
              setErrorMessage('');
              setSubmitted(false);
              setIsSubmitting(true);

              const formData = new FormData(form);
              const payload = {
                item_reference: itemName,
                claimant_name: String(formData.get('name') ?? ''),
                claim_email: String(formData.get('email') ?? ''),
                identifying_info: String(formData.get('details') ?? ''),
                last_location: String(formData.get('lastLocation') ?? ''),
                status: 'Pending Review',
              };

              const { error } = await supabase.from('item_claims').insert(payload);

              if (error) {
                setErrorMessage(error.message);
              } else {
                setSubmitted(true);
                form.reset();
              }

              setIsSubmitting(false);
            }}
          >
            <div className="form-group">
              <label htmlFor="claim-name">Your Name</label>
              <input id="claim-name" name="name" type="text" placeholder="Enter your full name" required />
            </div>

            <div className="form-group">
              <label htmlFor="claim-email">Your Email</label>
              <input id="claim-email" name="email" type="email" placeholder="Enter your email" required />
            </div>

            <div className="form-group">
              <label htmlFor="claim-details">Identifying Information</label>
              <textarea
                id="claim-details"
                name="details"
                rows={6}
                placeholder="Share details only the true owner would know (marks, scratches, contents, missing accessories, etc.)."
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="claim-location">Where You Last Had It</label>
              <input
                id="claim-location"
                name="lastLocation"
                type="text"
                placeholder="Enter the last known location"
                required
              />
            </div>

            <button type="submit" className="form-submit-button form-submit-button-orange" disabled={isSubmitting}>
              {isSubmitting ? 'Submitting...' : 'Submit Claim'}
            </button>

            {errorMessage && <p className="form-error-message">{errorMessage}</p>}

            {submitted && (
              <p className="form-success-message">
                Claim submitted for {itemName}. The admin can now review it in the dashboard.
              </p>
            )}
          </form>
        </section>
      </main>

      <Footer />
    </div>
  );
}

export default ClaimForm;
