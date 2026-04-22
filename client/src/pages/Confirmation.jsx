import { useLocation, Link, Navigate } from 'react-router-dom';
import { CheckCircle, Mail, Download, Home } from 'lucide-react';
import './Confirmation.css';

const Confirmation = () => {
  const location = useLocation();
  const { registration, event } = location.state || {};

  if (!registration || !event) {
    return <Navigate to="/" />;
  }

  return (
    <div className="confirmation-page">
      <div className="success-container clay-panel">
        <div className="success-header">
          <CheckCircle size={64} className="success-icon" />
          <h1 className="success-title text-gradient">Booking Confirmed!</h1>
          <p className="success-subtitle">You're all set for the show, {registration.name.split(' ')[0]}.</p>
        </div>

        <div className="ticket-card">
          <div className="ticket-header">
            <h3>{event.title}</h3>
            <span className="ticket-badge">VIP E-Ticket</span>
          </div>
          <div className="ticket-body">
            <div className="ticket-info">
              <span className="info-label">Date & Time</span>
              <span className="info-value">{new Date(event.date).toLocaleString()}</span>
            </div>
            <div className="ticket-info">
              <span className="info-label">Location</span>
              <span className="info-value">{event.location}</span>
            </div>
            <div className="ticket-info">
              <span className="info-label">Admit</span>
              <span className="info-value">{registration.ticketsCount} Person(s)</span>
            </div>
            <div className="ticket-info">
              <span className="info-label">Booking ID</span>
              <span className="info-value text-mono">{registration._id}</span>
            </div>
          </div>
          <div className="ticket-barcode">
            {/* Fake barcode for aesthetic */}
            <div className="barcode-lines"></div>
          </div>
        </div>

        <div className="email-notice">
          <Mail className="email-icon" size={24} />
          <p>
            We've sent your official e-ticket to <strong>{registration.email}</strong>.<br/>
            Please present it at the entrance.
          </p>
        </div>

        <div className="confirmation-actions">
          <button className="btn-outline">
            <Download size={18} style={{verticalAlign:'middle', marginRight:'5px'}}/> Save as PDF
          </button>
          <Link to="/" className="btn-primary">
            <Home size={18} style={{verticalAlign:'middle', marginRight:'5px'}}/> Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Confirmation;
