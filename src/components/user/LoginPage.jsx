// import React, { useContext, useState } from 'react'
// import "./LoginPage.css"
// import api from '../../api'
// import Error from '../ui/Error'
// import { useLocation, useNavigate } from 'react-router-dom'
// import { AuthContext } from '../../context/AuthContext'

// const LoginPage = () => {

//   const { setIsAuthenticated, get_username } = useContext(AuthContext)

//   const [username, setUsername] = useState("")
//   const [password, setPassword] = useState("")
//   const [loading, setLoading] = useState(false)
//   const [error, setError] = useState("")

//   const location = useLocation()
//   const navigate = useNavigate()

//   const userInfo = { username, password }

//   function handleSubmit(e) {
//     e.preventDefault()

//     api.post("/api/token/", userInfo)
//       .then(res => {
//         console.log(res.data)
//         localStorage.setItem("access", res.data.access)
//         localStorage.setItem("refresh", res.data.refresh)
//         setUsername('')
//         setPassword('')
//         setLoading(false)
//         setIsAuthenticated(true)
//         get_username()
//         setError("")

//         const from = location?.state?.from.pathname || '/'
//         navigate(from, { replace: true })
//       })
//       .catch(err => {
//         console.log(err)
//         setError(err.message)
//         setLoading(false)
//       })
//   }

//   return (
//     <div className='login-container my-5'>
//       <div className="login-card shadow">
//         {error && <Error error={error} />}
//         <h2 className='login-title'>Welcome Back</h2>
//         <p className='login-subtitle'>Please login to your account</p>
//         <form onSubmit={handleSubmit}>
//           <div className="mb-3">
//             <label htmlFor="username" className='form-label'>Username</label>
//             <input type="username" value={username} onChange={(e) => setUsername(e.target.value)}
//               className='form-control' id='email' placeholder='Enter your Username' required />
//           </div>

//           <div className="mb-3">
//             <label htmlFor="password" className='form-label'>Password</label>
//             <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className='form-control'
//               id='password' placeholder='Enter your Password' required />
//           </div>

//           <button type='submit' className='btn btn-primary w-100'>Login</button>

//         </form>

//         <div className="login-footer">
//           <p><a href="#">Forget Password</a></p>
//           <p>Don't have an accont? <a href="#">Sign up</a></p>
//         </div>

//       </div>

//     </div>
//   )
// }

// export default LoginPage


import React, { useContext, useState } from 'react'
import "./LoginPage.css"
import api from '../../api'
import Error from '../ui/Error'
import { useLocation, useNavigate, Link } from 'react-router-dom'
import { AuthContext } from '../../context/AuthContext'

const LoginPage = () => {
  const { setIsAuthenticated, get_username } = useContext(AuthContext)
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const location = useLocation()
  const navigate = useNavigate()
  const userInfo = { username, password }

  function handleSubmit(e) {
    e.preventDefault()
    setLoading(true)
    api.post("/api/token/", userInfo)
      .then(res => {
        localStorage.setItem("access", res.data.access)
        localStorage.setItem("refresh", res.data.refresh)
        setUsername('')
        setPassword('')
        setIsAuthenticated(true)
        get_username()
        setError("")
        const from = location?.state?.from?.pathname || '/'
        navigate(from, { replace: true })
      })
      .catch(err => {
        setError("Invalid credentials")
        setLoading(false)
      })
  }

  return (
    <div className='login-container'>
      <div className="login-card shadow">
        {error && <Error error={error} />}
        <div className="login-header-icon">
          <span role="img" aria-label="user">🔒</span>
        </div>
        <h2 className='login-title'>Welcome Back</h2>
        <p className='login-subtitle'>Sign in to your account</p>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="username" className='form-label'>Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className='form-control custom-input'
              id='username'
              placeholder='Enter your Username'
              required />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className='form-label'>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className='form-control custom-input'
              id='password'
              placeholder='Enter your Password'
              required />
          </div>
          <button type='submit' className='btn accent-btn w-100' disabled={loading}>
            {loading ? "Logging in…" : "Login"}
          </button>
        </form>
        <div className="login-footer">
          <p><Link to="/forgot-password">Forgot Password?</Link></p>
          <p>Don't have an account? <Link to="/register">Sign up</Link></p>
        </div>
      </div>
    </div>
  )
}

export default LoginPage
