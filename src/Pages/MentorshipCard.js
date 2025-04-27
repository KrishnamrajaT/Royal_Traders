import React from 'react';
import './MentorShipCard.css';

function MentorshipCard() {
  return (
    <div className="mentorship-card">
      <div className="card-glow"></div>
      
      <div className="card-header">
        <div className="badge">LIMITED SEATS</div>
        <h1 className="headline">
          <span className="highlight">3-Month</span> Trading Mentorship 
          <span className="break"><br/>& Learning Program</span>
        </h1>
      </div>

      <div className="card-content">
        <p className="subheading">
          Practical stock market learning through real-time examples, trade plans, 
          and strategy sessions. Learn how I approach the market daily and gain 
          confidence in trading with discipline.
        </p>

        <div className="features">
          <div className="feature-item">
            <div className="feature-icon">📈</div>
            <span>Daily Live Market Analysis</span>
          </div>
          <div className="feature-item">
            <div className="feature-icon">🧠</div>
            <span>Proprietary Trading Strategies</span>
          </div>
          <div className="feature-item">
            <div className="feature-icon">🛡️</div>
            <span>Risk Management Framework</span>
          </div>
        </div>

        <div className="cta-section">
          <div className="price-tag">
            <span className="price">$5,999</span>
            <span className="duration">for 3 Months</span>
          </div>
          <button className="enroll-button">
            Join Program Now
            <span className="arrow">→</span>
          </button>
        </div>
      </div>

      <div className="card-footer">
        <div className="disclaimer">
          <span>⚠️</span> Not a get-rich-quick scheme. Requires consistent effort.
        </div>
      </div>
    </div>
  );
}

export default MentorshipCard;