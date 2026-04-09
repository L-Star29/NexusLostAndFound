import { useEffect, useState } from 'react';
import SmallHero from './Sections/SmallHero.tsx';
import './Postings.css';
import Banner from './Components/Banner.tsx';
import Footer from './Components/Footer.tsx';
import ItemCard from './Components/ItemCard.tsx';
import supabase from './supabase';

type LostItem = {
  name: string | null;
  description: string | null;
  category: string | null;
  location_found: string | null;
  date_found: string | null;
  image_url: string | null;
  status: string | null;
};

type DateFilter = 'all' | 'newest' | 'oldest';

function normalizeStatus(status: string | null) {
  return status?.trim().toLowerCase() ?? '';
}

function matchesAvailability(status: string | null, selectedAvailability: string) {
  if (selectedAvailability === 'all') {
    return true;
  }

  return normalizeStatus(status) === selectedAvailability;
}

function parseItemDate(value: string | null) {
  if (!value) {
    return 0;
  }

  const timestamp = new Date(value).getTime();
  return Number.isNaN(timestamp) ? 0 : timestamp;
}

function getImageUrl(imagePath: string | null) {
  if (!imagePath) {
    return '';
  }

  if (/^https?:\/\//i.test(imagePath)) {
    return imagePath;
  }

  const normalizedPath = imagePath.replace(/^\/+/, '').replace(/^item-images\//, '');
  const { data } = supabase.storage.from('item-images').getPublicUrl(normalizedPath);
  return data.publicUrl;
}

function Postings() {
  const [items, setItems] = useState<LostItem[]>([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [availabilityFilter, setAvailabilityFilter] = useState('all');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [dateFilter, setDateFilter] = useState<DateFilter>('all');

  useEffect(() => {
    const fetchItems = async () => {
      setIsLoading(true);
      setErrorMessage('');

      const { data, error } = await supabase
        .from('Lost Items')
        .select('name, description, category, location_found, date_found, image_url, status');

      if (error) {
        console.error('Error fetching lost items:', error);
        setErrorMessage(error.message);
      } else {
        const visibleItems = (data ?? []).filter(
          (item) =>
            normalizeStatus(item.status) !== 'pending review' &&
            normalizeStatus(item.status) !== 'archived' &&
            normalizeStatus(item.status) !== 'rejected'
        );
        setItems(visibleItems);
      }

      setIsLoading(false);
    };

    fetchItems();
  }, []);

  const normalizedSearch = searchTerm.trim().toLowerCase();
  const categories = Array.from(
    new Set(items.map((item) => item.category?.trim()).filter(Boolean))
  ).sort((left, right) => left!.localeCompare(right!));

  const filteredItems = items
    .filter((item) => {
      const matchesSearch = !normalizedSearch || [
        item.name,
        item.category,
        item.description,
        item.location_found,
        item.status,
      ].some((field) => field?.toLowerCase().includes(normalizedSearch));

      const matchesCategory =
        categoryFilter === 'all' || (item.category?.trim() ?? '') === categoryFilter;

      const matchesStatus = matchesAvailability(item.status, availabilityFilter);

      return matchesSearch && matchesCategory && matchesStatus;
    })
    .sort((left, right) => {
      if (dateFilter === 'newest') {
        return parseItemDate(right.date_found) - parseItemDate(left.date_found);
      }

      if (dateFilter === 'oldest') {
        return parseItemDate(left.date_found) - parseItemDate(right.date_found);
      }

      return 0;
    });

  return (
    <div>
      <Banner />
      <SmallHero />
      <div className="postings-search-shell">
        <div className="postings-search-card">
          <div className="postings-search">
            <label htmlFor="postings-search" className="postings-search-label">
              Search items
            </label>
            <input
              id="postings-search"
              type="search"
              className="postings-search-input"
              placeholder="Search by name, category, description, location, or status"
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
            />
          </div>

          <div className="postings-filters">
            <div className="postings-filter-group">
              <label htmlFor="availability-filter" className="postings-filter-label">
                Availability
              </label>
              <select
                id="availability-filter"
                className="postings-filter-select"
                value={availabilityFilter}
                onChange={(event) => setAvailabilityFilter(event.target.value)}
              >
                <option value="all">All items</option>
                <option value="available">Available</option>
                <option value="claimed">Claimed</option>
              </select>
            </div>

            <div className="postings-filter-group">
              <label htmlFor="category-filter" className="postings-filter-label">
                Category
              </label>
              <select
                id="category-filter"
                className="postings-filter-select"
                value={categoryFilter}
                onChange={(event) => setCategoryFilter(event.target.value)}
              >
                <option value="all">All categories</option>
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>

            <div className="postings-filter-group">
              <label htmlFor="date-filter" className="postings-filter-label">
                Date
              </label>
              <select
                id="date-filter"
                className="postings-filter-select"
                value={dateFilter}
                onChange={(event) => setDateFilter(event.target.value as DateFilter)}
              >
                <option value="all">Default order</option>
                <option value="newest">Newest first</option>
                <option value="oldest">Oldest first</option>
              </select>
            </div>
          </div>
        </div>
      </div>
      <div className='item-listing'>
        {isLoading && <p className="postings-message">Loading lost items...</p>}
        {!isLoading && errorMessage && (
          <p className="postings-message">Unable to load lost items: {errorMessage}</p>
        )}
        {!isLoading && !errorMessage && items.length === 0 && (
          <p className="postings-message">No lost items have been posted yet.</p>
        )}
        {!isLoading && !errorMessage && items.length > 0 && filteredItems.length === 0 && (
          <p className="postings-message">No items match "{searchTerm}".</p>
        )}
        {!isLoading && !errorMessage && filteredItems.map((item, index) => (
          <ItemCard
            key={`${item.name ?? item.category ?? 'item'}-${item.date_found ?? 'unknown'}-${item.image_url ?? item.description ?? 'card'}`}
            name={item.name ?? 'Unnamed item'}
            category={item.category ?? 'Uncategorized'}
            description={item.description ?? 'No description available.'}
            locationFound={item.location_found ?? 'Location unavailable'}
            dateFound={item.date_found}
            imageUrl={getImageUrl(item.image_url)}
            status={item.status ?? 'Unknown'}
            accent={index % 2 === 0 ? 'orange' : 'blue'}
          />
        ))}
      </div>
      <Footer />
    </div>
  );
}

export default Postings;
