import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

function Dashboard() {
  const navigate = useNavigate()

  const [section, setSection] = useState('Overview')

  const [water, setWater] = useState(
    () => Number(localStorage.getItem('water')) || 0
  )

  const [steps, setSteps] = useState(
    () => Number(localStorage.getItem('steps')) || 0
  )

  const [workouts, setWorkouts] = useState(
    () => Number(localStorage.getItem('workouts')) || 0
  )

  const [calories, setCalories] = useState(
    () => Number(localStorage.getItem('calories')) || 0
  )

  const [goal, setGoal] = useState(
    () => Number(localStorage.getItem('stepGoal')) || 5000
  )

  const [history, setHistory] = useState(
    () => JSON.parse(localStorage.getItem('activityHistory')) || []
  )

  const [reminder, setReminder] = useState(
    () => localStorage.getItem('reminder') || ''
  )

  const userName = localStorage.getItem('userName') || 'User'
  const userEmail = localStorage.getItem('currentUser') || 'Not available'

  useEffect(() => {
    localStorage.setItem('water', water)
    localStorage.setItem('steps', steps)
    localStorage.setItem('workouts', workouts)
    localStorage.setItem('calories', calories)
    localStorage.setItem('stepGoal', goal)
    localStorage.setItem('activityHistory', JSON.stringify(history))
    localStorage.setItem('reminder', reminder)
  }, [water, steps, workouts, calories, goal, history, reminder])

  const addHistory = (activity) => {
    const entry = {
      activity,
      date: new Date().toLocaleString()
    }

    setHistory(previous => [entry, ...previous])
  }

  const addWater = () => {
    setWater(previous => previous + 1)
    addHistory('Added one glass of water')
  }

  const addSteps = () => {
    setSteps(previous => previous + 1000)
    addHistory('Added 1000 steps')
  }

  const completeWorkout = () => {
    setWorkouts(previous => previous + 1)
    addHistory('Completed a workout')
  }

  const addCalories = () => {
    const amount = Number(prompt('Enter calories consumed:'))

    if (Number.isFinite(amount) && amount > 0) {
      setCalories(previous => previous + amount)
      addHistory('Recorded ' + amount + ' calories')
    }
  }

  const logout = () => {
    localStorage.removeItem('currentUser')
    localStorage.removeItem('userName')
    navigate('/login')
  }

  const progress = Math.min(Math.round((steps / goal) * 100), 100)

  const menu = [
    'Overview',
    'Water Tracker',
    'Food Plan',
    'Workout Plan',
    'Progress',
    'Goals',
    'Reminders',
    'History',
    'Profile'
  ]

  return (
    <div className="dashboard-layout">

      <aside className="sidebar">
        <h2>FitnessTrack 🏋️</h2>

        <p className="side-label">MAIN MENU</p>

        {menu.map(item => (
          <button
            key={item}
            className={section === item ? 'side-btn active' : 'side-btn'}
            onClick={() => setSection(item)}
          >
            {item === 'Overview' && '🏠'}
            {item === 'Water Tracker' && '💧'}
            {item === 'Food Plan' && '🥗'}
            {item === 'Workout Plan' && '🏋️'}
            {item === 'Progress' && '📊'}
            {item === 'Goals' && '🎯'}
            {item === 'Reminders' && '🔔'}
            {item === 'History' && '📅'}
            {item === 'Profile' && '👤'}
            {' '}{item}
          </button>
        ))}

        <button className="logout-btn" onClick={logout}>
          ↪ Logout
        </button>
      </aside>

      <main className="dashboard-main">

        <header className="dashboard-header">
          <div>
            <h1>Hello, {userName}! 👋</h1>
            <p>Let's take care of your health today.</p>
          </div>

          <button
            type="button"
            className="profile-circle"
            onClick={() => setSection('Profile')}
            title="My Profile"
            style={{
              border: 'none',
              cursor: 'pointer',
              background: 'transparent'
            }}
          >
            👤
          </button>
        </header>

        {section === 'Overview' && (
          <>
            <div className="welcome-banner">
              <div>
                <h2>Your Fitness Journey Starts Today!</h2>
                <p>Keep building healthy habits, one day at a time.</p>
              </div>
              <span>🌿</span>
            </div>

            <h2 className="content-title">Today's Activity</h2>

            <div className="stats-grid">
              <div className="stat-card water-stat">
                <span>💧</span>
                <p>Water Intake</p>
                <h2>{water} Glasses</h2>
                <button onClick={addWater}>+ Add Water</button>
              </div>

              <div className="stat-card steps-stat">
                <span>👟</span>
                <p>Daily Steps</p>
                <h2>{steps}</h2>
                <button onClick={addSteps}>+ Add 1000 Steps</button>
              </div>

              <div className="stat-card workout-stat">
                <span>🏋️</span>
                <p>Workouts</p>
                <h2>{workouts}</h2>
                <button onClick={completeWorkout}>Complete Workout</button>
              </div>

              <div className="stat-card calorie-stat">
                <span>🔥</span>
                <p>Calories Recorded</p>
                <h2>{calories}</h2>
                <button onClick={addCalories}>+ Add Calories</button>
              </div>
            </div>

            <div className="content-card">
              <h2>Daily Steps Progress</h2>
              <div className="progress-track">
                <div
                  className="progress-fill"
                  style={{ width: progress + '%' }}
                ></div>
              </div>
              <p>{progress}% of your daily step goal completed</p>
            </div>

            <div className="content-card">
              <h2>Quick Tips 🌱</h2>
              <p>• Take regular breaks from sitting.</p>
              <p>• Include fruits and vegetables in your meals.</p>
              <p>• Stay hydrated throughout the day.</p>
              <p>• Choose physical activities you enjoy.</p>
            </div>
          </>
        )}

        {section === 'Water Tracker' && (
          <div className="content-card">
            <h2>💧 Water Intake Tracker</h2>
            <h1>{water} Glasses</h1>
            <p>Keep track of your daily hydration.</p>
            <button className="action-btn" onClick={addWater}>
              + Add One Glass
            </button>
            <button className="action-btn" onClick={() => setWater(0)}>
              Reset Today
            </button>
          </div>
        )}

        {section === 'Food Plan' && (
          <>
            <h2 className="content-title">🥗 Healthy Food Plan</h2>

            <div className="meal-grid">
              <div className="meal-card">
                <span>🌅</span>
                <h2>Breakfast</h2>
                <p>Idli with sambar</p>
                <p>Oats with fruits</p>
                <p>Milk or curd</p>
              </div>

              <div className="meal-card">
                <span>☀️</span>
                <h2>Lunch</h2>
                <p>Rice or roti</p>
                <p>Dal and vegetables</p>
                <p>Curd and salad</p>
              </div>

              <div className="meal-card">
                <span>🌙</span>
                <h2>Dinner</h2>
                <p>Chapati with vegetables</p>
                <p>Dal or paneer</p>
                <p>Seasonal fruits</p>
              </div>

              <div className="meal-card">
                <span>🍎</span>
                <h2>Healthy Snacks</h2>
                <p>Fresh fruits</p>
                <p>Roasted chana</p>
                <p>Nuts and seeds</p>
              </div>
            </div>

            <div className="content-card">
              <h3>Healthy Eating Tips</h3>
              <p>• Eat a variety of foods.</p>
              <p>• Include protein, vegetables and fruits.</p>
              <p>• Avoid skipping regular meals.</p>
              <p>• Drink water regularly.</p>
            </div>
          </>
        )}

        {section === 'Workout Plan' && (
          <>
            <h2 className="content-title">🏋️ Workout Plans</h2>

            <div className="meal-grid">
              <div className="meal-card">
                <span>🚶</span>
                <h2>Walking</h2>
                <p>Comfortable daily walking.</p>
                <p>Choose a pace suitable for you.</p>
                <button className="action-btn" onClick={completeWorkout}>
                  Complete
                </button>
              </div>

              <div className="meal-card">
                <span>🧘</span>
                <h2>Yoga</h2>
                <p>Gentle stretching and yoga.</p>
                <p>Focus on comfortable movements.</p>
                <button className="action-btn" onClick={completeWorkout}>
                  Complete
                </button>
              </div>

              <div className="meal-card">
                <span>💃</span>
                <h2>Dancing</h2>
                <p>Enjoy music and movement.</p>
                <p>Choose your favourite songs.</p>
                <button className="action-btn" onClick={completeWorkout}>
                  Complete
                </button>
              </div>

              <div className="meal-card">
                <span>🚴</span>
                <h2>Cycling</h2>
                <p>Enjoy a safe cycling session.</p>
                <p>Choose a comfortable duration.</p>
                <button className="action-btn" onClick={completeWorkout}>
                  Complete
                </button>
              </div>
            </div>
          </>
        )}

        {section === 'Progress' && (
          <>
            <h2 className="content-title">📊 Your Progress</h2>

            <div className="stats-grid">
              <div className="stat-card">
                <span>💧</span>
                <p>Water</p>
                <h2>{water} Glasses</h2>
              </div>

              <div className="stat-card">
                <span>👟</span>
                <p>Steps</p>
                <h2>{steps}</h2>
              </div>

              <div className="stat-card">
                <span>🏋️</span>
                <p>Workouts</p>
                <h2>{workouts}</h2>
              </div>

              <div className="stat-card">
                <span>🔥</span>
                <p>Calories Recorded</p>
                <h2>{calories}</h2>
              </div>
            </div>

            <div className="content-card">
              <h2>Daily Goal Progress</h2>
              <h1>{progress}%</h1>
              <div className="progress-track">
                <div
                  className="progress-fill"
                  style={{ width: progress + '%' }}
                ></div>
              </div>
              <p>{steps} / {goal} steps</p>
            </div>
          </>
        )}

        {section === 'Goals' && (
          <div className="content-card">
            <h2>🎯 Your Daily Goals</h2>

            <p>Current step goal: {goal}</p>

            <input
              type="number"
              min="1"
              value={goal}
              onChange={e => setGoal(Number(e.target.value))}
              className="goal-input"
            />

            <div className="progress-track">
              <div
                className="progress-fill"
                style={{ width: progress + '%' }}
              ></div>
            </div>

            <p>{progress}% completed</p>
          </div>
        )}

        {section === 'Reminders' && (
          <div className="content-card">
            <h2>🔔 Reminders</h2>
            <p>Set a reminder time for your daily activities.</p>

            <label>Reminder Time</label>

            <input
              type="time"
              value={reminder}
              onChange={e => setReminder(e.target.value)}
              className="goal-input"
            />

            <p>Saved reminder: {reminder || 'Not set'}</p>
            <p>
              Note: This demo saves your reminder time but does not send
              automatic notifications.
            </p>
          </div>
        )}

        {section === 'History' && (
          <div className="content-card">
            <h2>📅 Previous Activity History</h2>

            {history.length === 0 ? (
              <p>No activity recorded yet. Start tracking your activities!</p>
            ) : (
              history.map((item, index) => (
                <div className="history-item" key={index}>
                  <p>{item.activity}</p>
                  <small>{item.date}</small>
                </div>
              ))
            )}
          </div>
        )}

        {/* PROFILE SECTION */}

        {section === 'Profile' && (
          <div className="content-card profile-page">

            <div className="profile-avatar">👤</div>

            <h2>My Profile</h2>

            <h3>{userName}</h3>

            <p><strong>Email:</strong> {userEmail}</p>

            <p><strong>Account Type:</strong> FitnessTrack User</p>

            <button className="action-btn" onClick={logout}>
              ↪ Logout
            </button>

          </div>
        )}

      </main>
    </div>
  )
}

export default Dashboard