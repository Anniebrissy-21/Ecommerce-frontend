import React, { useState } from 'react'
import styles from './PaymentSection.module.css'
import api from '../../api'
import Spinner from '../ui/Spinner'

const PaymentSection = () => {


    const cart_code = localStorage.getItem("cart_code")
    const [loading, setLoading] = useState(false)

    function makePayment() {
        setLoading(true)
        api.post("initiate_payment/", { cart_code })
            .then(res => {
                console.log(res.data)
                setLoading(false)
                window.location.href = res.data.data.link
            })
            .catch(err => {
                console.log(err.message)
                setLoading(false)
            })
    }

    function makePayPalPayment() {
        setLoading(true)
        api.post("initiate_paypal_payment/", { cart_code })
            .then(res => {
                console.log(res.data)
                setLoading(false)
                if (res.data.approval_url) {
                    window.location.href = res.data.approval_url
                }
            })
            .catch(err => {
                console.log(err.message)
                setLoading(false)
            })
    }

    if (loading) {
        <Spinner loading={loading} />
    }


    return (
        <div className='col-md-4'>
            <div className={`card ${styles.card}`}>
                <div className="card-header" style={{ backgroundColor: '#6050DC', color: 'white' }}>
                    <h5>Payment Options</h5>
                </div>

                <div className="card-body">
                    <button className={`btn btn-primary w-100 mb-3 ${styles.paypalButton}`} id="paypal-button" onClick={makePayPalPayment}>
                        <i className='bi bi-paypal'></i>Pay with PayPal

                    </button>

                    <button className={`btn btn-primary w-100 mb-3 ${styles.flutterwaveButton}`} id="flutterwave-button" onClick={makePayment}>
                        <i className='bi bi-credit-card'></i>Pay with Flutterwave

                    </button>
                </div>
            </div>
        </div>
    )
}

export default PaymentSection