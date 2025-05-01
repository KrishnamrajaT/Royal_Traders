import React from "react";
import "./Cards.css";

function Cards() {
  return (
    <div className="container">
      <div className="cards-container">
        {/* Services Card */}
        <div className="card service-card">
          <div className="card-glow" style={{ '--glow-color': 'rgba(58, 134, 255, 0.3)' }}></div>
          <div className="card-header">
            <h2>Services</h2>
          </div>
          <div className="card-body">
            <ul className="feature-list">
              <li className="cards-feature-item">
                <span className="icon">📊</span>
                <span>
                  Daily market analysis & trade plans in a private Telegram
                  group
                </span>
              </li>
              <li className="cards-feature-item">
                <span className="icon">🎓</span>
                <span>Weekly educational Zoom sessions (Live or recorded)</span>
              </li>
              <li className="cards-feature-item">
                <span className="icon">🛡️</span>
                <span>
                  Learn risk management, entry-exit logic, capital protection
                </span>
              </li>
              <li className="cards-feature-item">
                <span className="icon">📈</span>
                <span>
                  Strategy-based learning (exact strategies I personally use)
                </span>
              </li>
            </ul>
            <div className="important-note">
              <p>
                <strong>Important:</strong> This is not account handling or a
                tips service. You are learning by observing structured market
                examples with proper education.
              </p>
            </div>
          </div>
        </div>

        {/* Disclaimer Card */}
        <div className="card disclaimer-card">
          <div className="card-glow" style={{ '--glow-color': 'rgba(239, 71, 111, 0.2)' }}></div>
          <div className="card-header">
            <h2>Disclaimer</h2>
          </div>
          <div className="card-body">
            <ul className="disclaimer-list">
              <li>This program is only for educational purposes</li>
              <li>
                I do not give investment advice, guaranteed profits, or handle
                anyone's account
              </li>
              <li>
                Trading involves financial risk. Profits and losses are part
                of the journey
              </li>
              <li>Past performance is not a guarantee of future results</li>
              <li>
                You are responsible for your trades. This program does not
                promise results or returns
              </li>
            </ul>
            <div className="important-note">
              <p>
                <strong>Note:</strong> Trading requires discipline and risk management.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cards;