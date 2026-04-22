import { Link } from 'react-router-dom';
import { Music } from 'lucide-react';

const Navbar = () => {
  return (
    <nav className="navbar">
      <Link to="/" className="nav-brand text-gradient">
        <Music size={28} />
        SyncEvents
      </Link>
      <div className="nav-links">
        <Link to="/" className="nav-link">Home</Link>
        <Link to="/events" className="nav-link">Concerts</Link>
      </div>
    </nav>
  );
};

export default Navbar;
