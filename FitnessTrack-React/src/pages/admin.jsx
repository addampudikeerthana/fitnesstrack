import { Link } from 'react-router-dom'

function Admin() {
  const users = JSON.parse(localStorage.getItem('users')) || []

  return (
    <div className="admin-page">
      <h1>Admin Dashboard 🛡️</h1>
      <p>FitnessTrack Administration</p>

      <div className="stats-grid">
        <div className="stat-card">
          <span>👥</span>
          <h2>{users.length}</h2>
          <p>Registered Users</p>
        </div>

        <div className="stat-card">
          <span>🏋️</span>
          <h2>Workout</h2>
          <p>Workout Management</p>
        </div>

        <div className="stat-card">
          <span>🥗</span>
          <h2>Diet</h2>
          <p>Food Plan Management</p>
        </div>
      </div>

      <div className="content-card">
        <h2>Registered Users</h2>

        {users.length === 0 ? (
          <p>No users registered yet.</p>
        ) : (
          users.map((user, index) => (
            <div className="history-item" key={index}>
              <p>{user.name}</p>
              <small>{user.email}</small>
            </div>
          ))
        )}
      </div>

      <Link to="/dashboard">
        <button className="action-btn">Go to User Dashboard</button>
      </Link>
    </div>
  )
}

export default Admin