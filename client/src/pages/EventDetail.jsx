import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Calendar, MapPin, Clock, Info, Ticket } from 'lucide-react';
import './EventDetail.css';

const EventDetail = () => {
  const { id } = useParams();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const res = await fetch(`http://localhost:5001/api/events/${id}`);
        const data = await res.json();
        setEvent(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching event details:', error);
        setLoading(false);
      }
    };
    fetchEvent();
  }, [id]);

  if (loading) return <div className="loading">Loading event details...</div>;
  if (!event) return <div className="error">Event not found.</div>;

  const eventDate = new Date(event.date);

  return (
    <div className="event-detail-page">
      <div className="detail-hero clay-panel">
        <img src={event.imageUrl} alt={event.title} className="detail-hero-image" />
        <div className="detail-hero-overlay">
          <h1 className="detail-title">{event.title}</h1>
          <div className="detail-price">${event.ticketPrice}</div>
        </div>
      </div>

      <div className="detail-content grid-layout">
        <div className="detail-main clay-panel">
          <h2><Info size={24} className="inline-icon" /> About the Event</h2>
          <p className="detail-description">{event.description}</p>
          <div className="log-section">
            <h3>Event Log / Schedule</h3>
            <ul className="schedule-list">
              <li><strong>18:00</strong> - Doors Open & Pre-show mix</li>
              <li><strong>19:30</strong> - Opening Act Starts</li>
              <li><strong>21:00</strong> - Main Event: {event.title}</li>
              <li><strong>23:30</strong> - Afterparty DJ Set</li>
            </ul>
          </div>
        </div>

        <div className="detail-sidebar">
          <div className="info-card clay-panel">
            <h3>Event Info</h3>
            <div className="info-row">
              <Calendar className="info-icon" />
              <div>
                <strong>Date</strong>
                <p>{eventDate.toLocaleDateString()}</p>
              </div>
            </div>
            <div className="info-row">
              <Clock className="info-icon" />
              <div>
                <strong>Time</strong>
                <p>{eventDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
              </div>
            </div>
            <div className="info-row">
              <MapPin className="info-icon" />
              <div>
                <strong>Location</strong>
                <p>{event.location}</p>
              </div>
            </div>
            
            <div className="booking-action">
              <Link to={`/register/${event._id}`} className="btn-primary w-full" style={{ justifyContent: 'center' }}>
                <Ticket size={20} /> Book Now
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventDetail;
