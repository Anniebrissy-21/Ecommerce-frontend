import React, { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import api from '../../api'

// Define your app's primary color palette here
const primaryColor = '#FFD700' // Replace with your main app color if different
const secondaryColor = '#857750' // Optional secondary color
const highlightColor = '#ffe98e' // Accent/yellow for buttons
const errorColor = '#FF4C4C' // Red for error icon or message, if desired
const backgroundColor = '#F7F2E2' // Background
const cardBackgroundColor = '#fffcee' // Card-like container

const PaymentsStatusPage = ({ setNumCartItems }) => {
    const [statusMessage, setStatusMessage] = useState('Verifying your payment.')
    const [statusSubMessage, setStatusSubMessage] = useState('Wait a moment, your payment is being verified!')
    const location = useLocation()

    useEffect(function () {
        const queryParams = new URLSearchParams(location.search)
        const paymentID = queryParams.get('paymentId')
        const payerId = queryParams.get('PayerID') 
        const ref = queryParams.get('ref')

        if (paymentID && payerId && ref) {
            api.post(`/paypal_payment_callback/?paymentId=${paymentID}&payerId=${payerId}&ref=${ref}`)
                .then(res => {
                    setStatusMessage(res.data.message)
                    setStatusSubMessage(res.data.subMessage)
                    localStorage.removeItem("cart_code")
                    setNumCartItems(0)
                })
                .catch(err => {
                    setStatusMessage("Payment failed.")
                    setStatusSubMessage("Please try again or contact support.")
                    console.log(err.message)
                })
        }
    }, [])

    useEffect(function () {
        const queryParams = new URLSearchParams(location.search)
        const status = queryParams.get('status')
        const txRef = queryParams.get('tx_ref')
        const transactionId = queryParams.get('transaction_id')

        if (status && txRef && transactionId) {
            api.post(`/payment_callback/?status=${status}&tx_ref=${txRef}&transaction_id=${transactionId}`)
                .then(res => {
                    setStatusMessage(res.data.message)
                    setStatusSubMessage(res.data.subMessage)
                    localStorage.removeItem("cart_code")
                    setNumCartItems(0)
                })
                .catch(err => {
                    console.log(err.message)
                })
        }
    }, [])

    return (
        <div
            style={{
                minHeight: '100vh',
                background: backgroundColor,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                fontFamily: "'Helvetica Neue', sans-serif",
            }}
        >
            {/* Header (optional, can include your app nav/logo) */}
            {/* Full-page container with prominent message */}
            <div
                style={{
                    background: cardBackgroundColor,
                    borderRadius: '20px',
                    boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
                    padding: '50px 40px',
                    maxWidth: '500px',
                    width: '90%',
                    textAlign: 'center',
                }}
            >
                {/* Icon - Large, noticeable (customize as needed) */}
                <div style={{ marginBottom: '20px' }}>
                    <svg width="80" height="80" viewBox="0 0 64 64" fill="none">
                        <circle cx="32" cy="32" r="32" fill="#FFE4B2" />
                        <path
                            d="M22 22L42 42M42 22L22 42"
                            stroke="#FF4C4C"
                            strokeWidth="4"
                            strokeLinecap="round"
                        />
                    </svg>
                </div>

                {/* Status Message */}
                <h2
                    style={{
                        color: '#77683d',
                        fontSize: '2rem',
                        fontWeight: 700,
                        marginBottom: '10px',
                    }}
                >
                    {statusMessage}
                </h2>

                {/* Sub-message / subText */}
                <p
                    style={{
                        fontSize: '1.1rem',
                        color: '#857750',
                        marginBottom: '25px',
                        lineHeight: 1.4,
                    }}
                >
                    {statusSubMessage}
                </p>

                {/* Action buttons */}
                <div
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '15px',
                        marginBottom: '30px',
                    }}
                >
                    <Link
                        to="/profile"
                        style={{
                            padding: '14px 24px',
                            backgroundColor: highlightColor,
                            color: '#7c690a',
                            borderRadius: '8px',
                            fontSize: '1rem',
                            fontWeight: 600,
                            boxShadow: '0 4px 8px rgba(255, 215, 0, 0.2)',
                            textDecoration: 'none',
                            transition: 'filter 0.2s',
                        }}
                        onMouseEnter={(e) => (e.currentTarget.style.filter = 'brightness(0.96)')}
                        onMouseLeave={(e) => (e.currentTarget.style.filter = 'none')}
                    >
                        View Order Details
                    </Link>
                    <Link
                        to="/"
                        style={{
                            padding: '14px 24px',
                            backgroundColor: '#fff',
                            color: '#7c690a',
                            border: '2px solid #ffe897',
                            borderRadius: '8px',
                            fontSize: '1rem',
                            fontWeight: 600,
                            boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
                            textDecoration: 'none',
                            transition: 'background-color 0.2s',
                        }}
                        onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#F7F2E2')}
                        onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#fff')}
                    >
                        Continue Shopping
                    </Link>
                </div>

                {/* Optional support/contact icons */}
                <div style={{ display: 'flex', justifyContent: 'center', gap: '20px' }}>
                    {/* Example icons - replace with your preferred icons or images */}
                    <a href="tel:1234567890" title="Call Support">
                        <svg width="30" height="30" fill="#857750" viewBox="0 0 24 24">
                            <path d="M6.62 10.79a15.5 15.5 0 006.59 6.59l2.2-2.2a1 1 0 011.11-.21 11.37 11.37 0 003.55.57 1 1 0 011 1v3.5a1 1 0 01-1 1A16 16 0 013 5a1 1 0 011-1h3.5a1 1 0 011 1 11.37 11.37 0 00.57 3.55 1 1 0 01-.21 1.11l-2.2 2.2z" />
                        </svg>
                    </a>
                    <a href="mailto:support@example.com" title="Email Support">
                        <svg width="30" height="30" fill="#857750" viewBox="0 0 24 24">
                            <path d="M12 13.5l-8-5V18a2 2 0 002 2h12a2 2 0 002-2V8.5l-8 5z" />
                        </svg>
                    </a>
                    <a href="/chat" title="Live Chat">
                        <svg width="30" height="30" fill="#857750" viewBox="0 0 24 24">
                            <path d="M20 2H4a2 2 0 00-2 2v16a2 2 0 002 2h4v-4h8v4h4a2 2 0 002-2V4a2 2 0 00-2-2z" />
                        </svg>
                    </a>
                </div>
            </div>
        </div>
    )
}

export default PaymentsStatusPage
