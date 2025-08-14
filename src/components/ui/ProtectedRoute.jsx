import { jwtDecode } from 'jwt-decode'
import React, { useEffect, useState } from 'react'
import api from '../../api'
import Spinner from './Spinner'
import { Navigate, useLocation } from 'react-router-dom'

const ProtectedRoute = ({children}) => {

    const [isAuthorised, setIsAuthorised] = useState(null)
    const location = useLocation()

    useEffect(function() {
        auth().catch(() => setIsAuthorised(false))
    }, [])

    async function refreshToken() {
        const refreshToken = localStorage.getItem("refresh")

        try {
            const res = await api.post("/api/token/refresh/", {
                refresh: refreshToken
            });
            if (res.status === 200) {
                localStorage.setItem("access", res.data.access)
                setIsAuthorised(true)
            } else {
                setIsAuthorised(false)
            }
        }
        catch (error) {
            console.log(error)
            setIsAuthorised(false)
        }
    }

    if (isAuthorised  === null) {
        return <Spinner />
    }

    async function auth() {
        const token = localStorage.getItem("access")
        if (!token) {
            setIsAuthorised(false)
            return;
        }
        const decoded = jwtDecode(token)
        const expiry_date = decoded.exp
        const current_time = new Date() / 1000

        if (current_time > expiry_date) {
            await refreshToken()
        }
        else {
            setIsAuthorised(true)
        }
    }

    return (
        isAuthorised ? children : <Navigate to="/login" state={{from: location}} replace /> 
    )
}

export default ProtectedRoute