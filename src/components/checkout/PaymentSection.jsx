import React, { useState } from 'react'
import styles from './PaymentSection.module.css'
import api from '../../api'
import Spinner from '../ui/Spinner'

const PaymentSection = () => {
  const cart_code = localStorage.getItem("cart_code")
  const [loading, setLoading] = useState(false)

  function makePayment() {
    setLoading(true)
    api.post("/initiate_payment/", { cart_code })
      .then(res => {
        setLoading(false)
        window.location.href = res.data.data.link
      })
      .catch(() => setLoading(false))
  }

  function makePayPalPayment() {
    setLoading(true)
    api.post("/initiate_paypal_payment/", { cart_code })
      .then(res => {
        setLoading(false)
        if (res.data.approval_url) {
          window.location.href = res.data.approval_url
        }
      })
      .catch(() => setLoading(false))
  }

  if (loading) return <Spinner loading={loading} />

  return (
    <div className='col-md-4'>
      <div className={`card ${styles.card}`}>
        <div className="card-header"
          style={{ backgroundColor: '#dfc19d', color: '#7d6145', fontWeight: 700 }}>
          <h5 className='mb-0'>Payment Options</h5>
        </div>
        <div className="card-body p-4">
          <button
            className={`btn w-100 mb-3 ${styles.paypalButton}`}
            id="paypal-button"
            onClick={makePayPalPayment}
            style={{
              background: "#e0d7c6",
              color: "#2d2a1f",
              border: "none",
              borderRadius: "9px",
              fontWeight: 600,
              fontSize: "1.1rem"
            }}
          >
            <i className='bi bi-paypal me-2'></i>Pay with PayPal
          </button>
          <button
            className={`btn w-100 mb-2 ${styles.flutterwaveButton}`}
            id="flutterwave-button"
            onClick={makePayment}
            style={{
              background: "#b89c67",
              color: "#fff",
              border: "none",
              borderRadius: "9px",
              fontWeight: 600,
              fontSize: "1.1rem"
            }}
          >
            <i className='bi bi-credit-card me-2'></i>Pay with Flutterwave
          </button>
        </div>
      </div>
    </div>
  )
}

export default PaymentSection
