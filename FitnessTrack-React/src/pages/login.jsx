import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

function Login() {
  const navigate = useNavigate()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = (e) => {
    e.preventDefault()

    const users = JSON.parse(localStorage.getItem('users')) || []

    const user = users.find(
      item => item.email === email && item.password === password
    )

    if (user) {
      localStorage.setItem('userName', user.name)
      localStorage.setItem('currentUser', user.email)

      navigate('/dashboard')
    } else {
      alert('Invalid email or password!')
    }
  }

  return (
    <div className="auth-page">
      <form className="auth-card" onSubmit={handleLogin}>
        <h1>Welcome Back!</h1>
        <p>Login to continue your fitness journey.</p>

        <input
          type="email"
          placeholder="Email Address"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
        />

        <button type="submit" className="primary-btn full-btn">
          Login
        </button>

        <p className="auth-bottom">
          Don't have an account? <Link to="/signup">Signup</Link>
        </p>
      </form>
    </div>
  )
}

export default Login