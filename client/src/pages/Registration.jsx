import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { User, Mail, Phone, Hash, CreditCard } from 'lucide-react';
import './Registration.css';

const Registration = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    ticketsCount: 1
  });

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const res = await fetch(`http://localhost:5001/api/events/${id}`);
        const data = await res.json();
        setEvent(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching event:', error);
        setLoading(false);
      }
    };
    fetchEvent();
  }, [id]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const res = await fetch('http://localhost:5001/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...formData, eventId: id }),
      });
      
      const data = await res.json();
      if (res.ok) {
        navigate('/confirmation', { state: { registration: data.registration, event } });
      } else {
        alert(data.message || 'Error registering');
        setSubmitting(false);
      }
    } catch (error) {
      console.error('Submit error:', error);
      alert('Network error while registering');
      setSubmitting(false);
    }
  };

  if (loading) return <div className="loading">Loading booking info...</div>;
  if (!event) return <div className="error">Event not found.</div>;

  const totalAmount = event.ticketPrice * formData.ticketsCount;

  return (
    <div className="registration-page">
      <div className="registration-container">
        
        <div className="registration-form-card clay-panel">
          <h2 className="form-title">Complete Your Booking</h2>
          <p className="form-subtitle">Secure your spot for <strong className="text-gradient">{event.title}</strong></p>
          
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label className="form-label"><User size={16} style={{verticalAlign:'middle', marginRight:'5px'}}/> Full Name</label>
              <input type="text" name="name" className="form-input" required placeholder="John Doe" onChange={handleChange} />
            </div>
            
            <div className="form-group">
              <label className="form-label"><Mail size={16} style={{verticalAlign:'middle', marginRight:'5px'}}/> Email Address</label>
              <input type="email" name="email" className="form-input" required placeholder="john@example.com" onChange={handleChange} />
            </div>
            
            <div className="form-group">
              <label className="form-label"><Phone size={16} style={{verticalAlign:'middle', marginRight:'5px'}}/> Phone Number</label>
              <input type="tel" name="phone" className="form-input" required placeholder="+1 234 567 8900" onChange={handleChange} />
            </div>
            
            <div className="form-group">
              <label className="form-label"><Hash size={16} style={{verticalAlign:'middle', marginRight:'5px'}}/> Number of Tickets</label>
              <input type="number" name="ticketsCount" className="form-input" min="1" max="10" value={formData.ticketsCount} onChange={handleChange} required />
            </div>

            <div className="payment-placeholder">
              <h4><CreditCard size={18} style={{verticalAlign:'middle', marginRight:'5px'}}/> Payment Details (Demo)</h4>
              <p>This is a mock checkout. No real payment required.</p>
            </div>
            
            <button type="submit" className="btn-primary w-full" style={{justifyContent: 'center', marginTop: '1rem'}} disabled={submitting}>
              {submitting ? 'Processing...' : `Pay $${totalAmount} & Book`}
            </button>
          </form>
        </div>
        
        <div className="order-summary clay-panel">
          <h3>Order Summary</h3>
          <img src={event.imageUrl} alt="Event" className="summary-img" />
          <div className="summary-details">
            <h4>{event.title}</h4>
            <p>{new Date(event.date).toLocaleDateString()}</p>
            <p>{event.location}</p>
          </div>
          <hr className="summary-divider" />
          <div className="summary-row">
            <span>Ticket Price</span>
            <span>${event.ticketPrice}</span>
          </div>
          <div className="summary-row">
            <span>Quantity</span>
            <span>x{formData.ticketsCount}</span>
          </div>
          <hr className="summary-divider" />
          <div className="summary-row total-row">
            <span>Total</span>
            <span className="text-gradient">${totalAmount}</span>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Registration;
