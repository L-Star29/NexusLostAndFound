import { useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import Banner from './Components/Banner.tsx';
import Footer from './Components/Footer.tsx';
import supabase from './supabase';
import './Forms.css';

function InquireForm() {
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
          <p className="form-kicker">Reach out about a specific posting</p>
          <h1>Inquire About Lost Item</h1>
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
                inquiry_email: String(formData.get('email') ?? ''),
                question: String(formData.get('question') ?? ''),
                status: 'Pending',
              };

              const { error } = await supabase.from('item_inquiries').insert(payload);

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
              <label htmlFor="inquire-email">Your Email</label>
              <input id="inquire-email" name="email" type="email" placeholder="Enter your email" required />
            </div>

            <div className="form-group">
              <label htmlFor="inquire-question">Ask Any Question</label>
              <textarea
                id="inquire-question"
                name="question"
                rows={6}
                placeholder="Ask any question about this item here."
                required
              />
            </div>

            <button type="submit" className="form-submit-button form-submit-button-blue" disabled={isSubmitting}>
              {isSubmitting ? 'Sending...' : 'Send Inquiry'}
            </button>

            {errorMessage && <p className="form-error-message">{errorMessage}</p>}

            {submitted && (
              <p className="form-success-message">
                Inquiry sent for {itemName}. The admin can review and reply from the dashboard.
              </p>
            )}
          </form>
        </section>
      </main>

      <Footer />
    </div>
  );
}

export default InquireForm;
