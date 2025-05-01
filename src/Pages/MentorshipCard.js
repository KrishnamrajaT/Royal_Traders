import React,{useState} from "react";
import DisclaimerForm from "./DisclaimerModal";
import "./MentorShipCard.css";

function MentorshipCard() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  return (
    <div className="mentorship-card">
      <div className="card-glow"></div>

      <div className="card-header">
        <div className="badge">LIMITED SEATS</div>
        <h1 className="headline">
          <span className="highlight">3-Month</span> Trading Mentorship
          <span className="break">
            <br />& Learning Program
          </span>
        </h1>
      </div>

      <div className="card-content">
        <p className="subheading">
          Practical stock market learning through real-time examples, trade
          plans, and strategy sessions. Learn how I approach the market daily
          and gain confidence in trading with discipline.
        </p>

        <div className="features">
          <div className="feature-item">
            <div className="feature-icon">📈</div>
            <span>
              Daily Live Market Analysis trade plans in a private Telegram group
            </span>
          </div>
          <div className="feature-item">
            <div className="feature-icon">🎓</div>
            <span>Weekly educational Zoom sessions</span>
          </div>
          <div className="feature-item">
            <div className="feature-icon">⚖️</div>
            <span>Learn risk management, entry-exit logic, capital protection</span>
          </div>
          <div className="feature-item">
            <div className="feature-icon">🧩</div>
            <span>Strategy-based learning (strategies will be shared those iam into)</span>
          </div>
          <div className="feature-item">
            <div className="feature-icon">🛡️</div>
            <span>Trade management support (how to trail, when to exit, etc.)</span>
          </div>
        </div>

        <div className="cta-section">
          <div className="price-tag">
            <span className="price">5,999/-</span>
            <span className="duration">for 3 Months</span>
          </div>
          <button onClick={()=>setIsModalOpen(true)} className="enroll-button">
            Join Program Now
            <span className="arrow">→</span>
          </button>
        </div>
      </div>

      <div className="card-footer">
        <div className="disclaimer">
          <span>⚠️</span> Not a get-rich-quick scheme. Requires consistent
          effort.
        </div>
        <DisclaimerForm 
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onPaymentInitiated={() => {
          console.log("Payment initiated!");
          setIsModalOpen(false);
        }}
      />
      </div>
    </div>
  );
}

export default MentorshipCard;
