import '../Sections/Sections.css';
import './ItemCard.css';
import { useNavigate } from 'react-router-dom';
import Button3 from './Button3.tsx';
import Button4 from './Button4.tsx';

type ItemCardProps = {
  name: string;
  category: string;
  description: string;
  locationFound: string;
  dateFound: string | null;
  imageUrl: string;
  status: string;
  accent: 'orange' | 'blue';
};

function formatDate(dateFound: string | null) {
  if (!dateFound) {
    return 'Date unavailable';
  }

  const parsedDate = new Date(dateFound);
  if (Number.isNaN(parsedDate.getTime())) {
    return dateFound;
  }

  return parsedDate.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
}

function ItemCard({
  name,
  category,
  description,
  locationFound,
  dateFound,
  imageUrl,
  status,
  accent,
}: ItemCardProps) {
  const isClaimed = status.trim().toLowerCase() === 'claimed';
  const navigate = useNavigate();

  const itemQuery = new URLSearchParams({ item: name }).toString();

  return (
    <div className={`item-card ${accent}`}>
      <div className="image-container">
        {imageUrl ? (
          <img src={imageUrl} alt={name} className="item-image" />
        ) : (
          <div className="item-image item-image-fallback">No image available</div>
        )}

        <div className="item-action-buttons">
          <Button3
            text={isClaimed ? 'Claimed' : 'Claim'}
            disabled={isClaimed}
            onClick={() => navigate(`/claim?${itemQuery}`)}
          />
          <Button4 text="Inquire" onClick={() => navigate(`/inquire?${itemQuery}`)} />
        </div>

        <span className="badge category">{category}</span>
        <span className="badge status">{status}</span>
      </div>

      <div className="item-content">
        <h3 className="item-title">{name}</h3>

        <p className="item-description">{description}</p>

        <div className="item-meta">
          <span>{locationFound}</span>
          <span>{formatDate(dateFound)}</span>
        </div>
      </div>
    </div>
  );
}

export default ItemCard;
