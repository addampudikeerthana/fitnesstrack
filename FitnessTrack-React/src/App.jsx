import { Routes, Route, Link, useLocation } from 'react-router-dom'
import Login from './pages/login'
import Signup from './pages/signup'
import Dashboard from './pages/dashboard'
import Admin from './pages/admin'
import './App.css'

function Navbar() {
  return (
    <nav className="navbar">
      <Link to="/" className="logo">FitnessTrack 🏋️</Link>

      <div className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/login">Login</Link>
        <Link to="/signup">Signup</Link>
      </div>
    </nav>
  )
}

function Home() {
  return (
    <div className="home-page">

      <section className="hero">
        <div className="hero-content">
          <span className="tagline">YOUR PERSONAL FITNESS COMPANION</span>

          <h1>
            Build a Healthier
            <span> You Every Day.</span>
          </h1>

          <p>
            Track your activities, plan your meals, monitor your workouts
            and achieve your fitness goals with FitnessTrack.
          </p>

          <div className="home-buttons">
            <Link to="/signup">
              <button className="primary-btn">Get Started →</button>
            </Link>

            <Link to="/login">
              <button className="secondary-btn">Login</button>
            </Link>
          </div>

          <div className="hero-info">
            <div><h3>01</h3><p>Track Activities</p></div>
            <div><h3>02</h3><p>Healthy Diet</p></div>
            <div><h3>03</h3><p>Monitor Progress</p></div>
          </div>
        </div>

        <div className="hero-image">
          <div className="hero-emoji">🏃‍♀️</div>
          <h2>Stay Active!</h2>
          <p>Small steps create big results.</p>
          <div className="hero-mini">
            <span>💧 Water</span>
            <span>👟 Steps</span>
            <span>🏋️ Workout</span>
          </div>
        </div>
      </section>

      <section className="features-section">
        <div className="section-heading">
          <span>OUR FEATURES</span>
          <h2>Everything You Need to Stay Fit</h2>
          <p>Manage your daily health activities in one place.</p>
        </div>

        <div className="feature-grid">
          <div className="feature-card">
            <h2>💧</h2>
            <h3>Water Tracking</h3>
            <p>Monitor your daily water intake.</p>
          </div>

          <div className="feature-card">
            <h2>🏋️</h2>
            <h3>Workout Plans</h3>
            <p>Explore daily workout activities.</p>
          </div>

          <div className="feature-card">
            <h2>🥗</h2>
            <h3>Healthy Diet</h3>
            <p>Discover healthy meal suggestions.</p>
          </div>

          <div className="feature-card">
            <h2>📊</h2>
            <h3>Progress Tracking</h3>
            <p>Monitor your daily and weekly progress.</p>
          </div>

          <div className="feature-card">
            <h2>🎯</h2>
            <h3>Daily Goals</h3>
            <p>Set goals and track your achievements.</p>
          </div>

          <div className="feature-card">
            <h2>🔥</h2>
            <h3>Calories Tracking</h3>
            <p>Record your daily activity and calories.</p>
          </div>
        </div>
      </section>

      <section className="bottom-banner">
        <h2>Start Your Fitness Journey Today!</h2>
        <p>Make healthy habits part of your everyday life.</p>
        <Link to="/signup">
          <button className="primary-btn">Join FitnessTrack →</button>
        </Link>
      </section>

      <footer className="footer">
        <h2>FitnessTrack 🏋️</h2>
        <p>Your Personal Fitness Tracking Platform</p>
        <p>© 2026 FitnessTrack. All Rights Reserved.</p>
      </footer>

    </div>
  )
}

function App() {
  const location = useLocation()

  const hideNavbar =
    location.pathname === '/login' ||
    location.pathname === '/signup' ||
    location.pathname === '/dashboard' ||
    location.pathname === '/admin'

  return (
    <>
      {!hideNavbar && <Navbar />}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/admin" element={<Admin />} />
      </Routes>
    </>
  )
}

export default App