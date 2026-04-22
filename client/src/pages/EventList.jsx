import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, MapPin, Ticket } from 'lucide-react';
import './EventList.css';

const EventList = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await fetch('http://localhost:5001/api/events');
        const data = await res.json();
        setEvents(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching events:', error);
        setLoading(false);
      }
    };
    fetchEvents();
  }, []);

  if (loading) return <div className="loading">Loading the beats...</div>;

  return (
    <div className="event-list-page">
      <h1 className="page-title text-gradient">Upcoming Concerts</h1>
      <p className="page-subtitle">Grab your tickets before they sell out!</p>
      
      <div className="events-grid">
        {events.map((event) => (
          <div key={event._id} className="event-card clay-panel">
            <div className="event-image-wrapper">
              <img src={event.imageUrl} alt={event.title} className="event-image" />
              <div className="event-price-tag">${event.ticketPrice}</div>
            </div>
            <div className="event-content">
              <h3 className="event-title">{event.title}</h3>
              <p className="event-description">{event.description.substring(0, 60)}...</p>
              
              <div className="event-meta">
                <span className="meta-item"><Calendar size={16} /> {new Date(event.date).toLocaleDateString()}</span>
                <span className="meta-item"><MapPin size={16} /> {event.location}</span>
              </div>
              
              <Link to={`/events/${event._id}`} className="btn-primary w-full" style={{ justifyContent: 'center', marginTop: '1rem' }}>
                <Ticket size={18} /> View Details
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EventList;
