import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import EventList from './pages/EventList';
import EventDetail from './pages/EventDetail';
import Registration from './pages/Registration';
import Confirmation from './pages/Confirmation';
import './App.css';

function App() {
  return (
    <Router>
      <div className="app-container">
        <Navbar />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/events" element={<EventList />} />
            <Route path="/events/:id" element={<EventDetail />} />
            <Route path="/register/:id" element={<Registration />} />
            <Route path="/confirmation" element={<Confirmation />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
