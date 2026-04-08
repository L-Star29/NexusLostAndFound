import "./Sections.css";
import "./ItemCard.css";

function ItemCard() {
  return (
    <div className="item-card">
      <div className="image-container">
        <img src="images/waterbottle.png" alt="Owala Water Bottle" />

        <span className="badge category">Water Bottle</span>
        <span className="badge status available">Available</span>
        <div className="item-action-buttons">
          <a
            className="item-action-button item-action-claim"
            href="claim.html?item=Owala%20Water%20Bottle&amp;itemName=Owala%20Water%20Bottle"
          >
            Claim
          </a>
          <a
            className="item-action-button item-action-inquire"
            href="inquire.html?item=Owala%20Water%20Bottle&amp;itemName=Owala%20Water%20Bottle"
          >
            Inquire
          </a>
        </div>
      </div>

      <div className="item-content">
        <h3 className="item-title">Owala Water Bottle</h3>

        <p className="item-description">
          Blue bottle with white lid and small sticker on side.
        </p>

        <div className="item-meta">
          <span>Room 2202</span>
          <span>Jan 18, 2026</span>
        </div>
      </div>
    </div>
  );
}

export default ItemCard;
