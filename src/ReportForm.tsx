import { useState } from 'react';
import Banner from './Components/Banner.tsx';
import Footer from './Components/Footer.tsx';
import supabase from './supabase';
import './Forms.css';

const categories = [
  'Accessories',
  'Backpack',
  'Book',
  'Clothing',
  'Electronics',
  'School Supplies',
  'Shoes',
  'Water Bottle',
  'Other',
];

function ReportForm() {
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const uploadImage = async (file: File) => {
    const extension = file.name.includes('.') ? file.name.slice(file.name.lastIndexOf('.')) : '';
    const safeBaseName = file.name
      .replace(/\.[^/.]+$/, '')
      .trim()
      .replace(/[^a-zA-Z0-9_-]+/g, '-')
      .replace(/^-+|-+$/g, '')
      .toLowerCase() || 'item-image';
    const filePath = `${safeBaseName}-${Date.now()}${extension}`;

    const { error } = await supabase.storage
      .from('item-images')
      .upload(filePath, file, { upsert: false });

    if (error) {
      throw error;
    }

    return filePath;
  };

  return (
    <div>
      <Banner />
      <section id="hero" className="form-hero">
        <div className="form-hero-backdrop" aria-hidden="true" />
        <div className="form-hero-content">
          <p className="form-kicker">Help return found items to their owners</p>
          <h1>Report Lost Item</h1>
          <p className="form-item-name">Found something on campus? Add it here.</p>
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

              try {
                const formData = new FormData(form);
                const imageFile = formData.get('image');
                let imagePath: string | null = null;

                if (imageFile instanceof File && imageFile.size > 0) {
                  imagePath = await uploadImage(imageFile);
                }

                const payload = {
                  name: String(formData.get('itemName') ?? ''),
                  category: String(formData.get('category') ?? ''),
                  description: String(formData.get('description') ?? ''),
                  location_found: String(formData.get('locationFound') ?? ''),
                  date_found: String(formData.get('dateFound') ?? ''),
                  image_url: imagePath,
                  status: 'Pending Review',
                };

                const { error } = await supabase.from('Lost Items').insert(payload);

                if (error) {
                  setErrorMessage(error.message);
                } else {
                  setSubmitted(true);
                  form.reset();
                }
              } catch (error) {
                setErrorMessage(error instanceof Error ? error.message : 'Unable to submit report.');
              }

              setIsSubmitting(false);
            }}
          >
            <div className="form-group">
              <label htmlFor="report-name">Item Name</label>
              <input id="report-name" name="itemName" type="text" placeholder="Enter the item name" required />
            </div>

            <div className="form-group">
              <label htmlFor="report-category">Category</label>
              <select id="report-category" name="category" className="form-select" defaultValue="" required>
                <option value="" disabled>
                  Select a category
                </option>
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="report-description">Description</label>
              <textarea
                id="report-description"
                name="description"
                rows={6}
                placeholder="Provide a description of the item"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="report-location">Location Found</label>
              <input
                id="report-location"
                name="locationFound"
                type="text"
                placeholder="Enter the location where the item was found"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="report-date">Date Found</label>
              <input id="report-date" name="dateFound" type="date" required />
            </div>

            <div className="form-group">
              <label htmlFor="report-image">Upload Image</label>
              <input id="report-image" name="image" type="file" className="form-file-input" accept="image/*" />
            </div>

            <button type="submit" className="form-submit-button form-submit-button-orange" disabled={isSubmitting}>
              {isSubmitting ? 'Submitting...' : 'Submit Report'}
            </button>

            {errorMessage && <p className="form-error-message">{errorMessage}</p>}

            {submitted && (
              <p className="form-success-message">
                Report submitted. It will stay pending until an admin reviews it.
              </p>
            )}
          </form>
        </section>
      </main>

      <Footer />
    </div>
  );
}

export default ReportForm;
