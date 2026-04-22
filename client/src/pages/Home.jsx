import { Link } from 'react-router-dom';
import { Play } from 'lucide-react';
import './Home.css'; // Let's inline or use App.css for simplicity, but we can make Home.css

const Home = () => {
  return (
    <div className="home-page">
      <section className="hero-section clay-panel">
        <div className="hero-content">
          <h1 className="hero-title">
            Feel the Rhythm. <br />
            <span className="text-gradient">Live the Music.</span>
          </h1>
          <p className="hero-subtitle">
            Discover the most exclusive underground concerts, epic raves, and serene acoustic sunsets. 
            Your next unforgettable experience is just a click away.
          </p>
          <div className="hero-actions">
            <Link to="/events" className="btn-primary">
              <Play size={20} /> Explore Events
            </Link>
          </div>
        </div>
      </section>
      
      <section className="features-section">
        <h2 className="section-title">Why Choose SyncEvents?</h2>
        <div className="features-grid">
          <div className="feature-card clay-panel">
            <div className="feature-icon">🎧</div>
            <h3>Curated Lineups</h3>
            <p>Only the best artists and exclusive performances.</p>
          </div>
          <div className="feature-card clay-panel">
            <div className="feature-icon">🎟️</div>
            <h3>Instant E-Tickets</h3>
            <p>Get your tickets sent straight to your email immediately.</p>
          </div>
          <div className="feature-card clay-panel">
            <div className="feature-icon">🔥</div>
            <h3>Unreal Venues</h3>
            <p>From underground warehouses to beautiful beaches.</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
