import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import styles from './RegistrationPage.module.css'
import Error from '../ui/Error'
import api from '../../api'

const RegistrationPage = () => {
    const [formData, setFormData] = useState({
        username: '',
        first_name: '',
        last_name: '',
        email: '',
        password: '',
        password2: '',
    })
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')
    const navigate = useNavigate()

    function handleChange(e) {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    function handleSubmit(e) {
        e.preventDefault()
        setLoading(true)
        setError('')
        if (formData.password !== formData.password2) {
            setError("Passwords don't match")
            setLoading(false)
            return
        }
        api.post('register/', formData)
            .then(res => {
                setError("")
                console.log(formData)
                navigate('/login')
                setLoading(false)
            })
            .catch(err => {
                setError(err.message)
                setLoading(false)
            })
    }

    return (
        <div className={styles['auth-bg']}>
            <div className={styles['register-card']}>
                <div className={styles['register-header-icon']}><span role="img" aria-label="register">📝</span></div>
                <h2 className={styles['register-title']}>Create Account</h2>
                <p className={styles['register-subtitle']}>Sign up to get started</p>
                {error && <Error error={error} />}
                <form onSubmit={handleSubmit} className={styles['register-form']}>
                    <div className={styles['input-row']}>
                        <div className={styles['input-col']}>
                            <label htmlFor="first_name">First Name</label>
                            <input
                                id="first_name"
                                name="first_name"
                                type="text"
                                placeholder="First Name"
                                value={formData.first_name}
                                onChange={handleChange}
                                required
                                autoComplete="given-name"
                            />
                        </div>
                        <div className={styles['input-col']}>
                            <label htmlFor="last_name">Last Name</label>
                            <input
                                id="last_name"
                                name="last_name"
                                type="text"
                                placeholder="Last Name"
                                value={formData.last_name}
                                onChange={handleChange}
                                required
                                autoComplete="family-name"
                            />
                        </div>
                    </div>
                    <label htmlFor="username">Username</label>
                    <input
                        id="username"
                        name="username"
                        type="text"
                        placeholder="Username"
                        value={formData.username}
                        onChange={handleChange}
                        required
                        autoComplete="username"
                    />

                    <label htmlFor="email">Email</label>
                    <input
                        id="email"
                        name="email"
                        type="email"
                        placeholder="Email Address"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        autoComplete="email"
                    />

                    <label htmlFor="password">Password</label>
                    <input
                        id="password"
                        name="password"
                        type="password"
                        placeholder="Password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                        autoComplete="new-password"
                    />

                    <label htmlFor="password2">Confirm Password</label>
                    <input
                        id="password2"
                        name="password2"
                        type="password"
                        placeholder="Confirm Password"
                        value={formData.password2}
                        onChange={handleChange}
                        required
                        autoComplete="new-password"
                    />

                    <button type="submit" className={styles['primary-btn']} disabled={loading}>
                        {loading ? "Registering…" : "Register"}
                    </button>
                </form>
                <div className={styles['register-footer']}>
                    <p>Already have an account? <Link to="/login">Login</Link></p>
                </div>
            </div>
        </div>
    )
}

export default RegistrationPage
