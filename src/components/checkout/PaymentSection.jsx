import React from 'react'
import styles from './PaymentSection.module.css'

const PaymentSection = () => {
    return (
        <div className='col-md-4'>
            <div className={`card ${styles.card}`}>
                <div className="card-header" style={{ backgroundColor: '#6050DC', color: 'white' }}>
                    <h5>Payment Options</h5>
                </div>

                <div className="card-body">
                    <button className={`btn btn-primary w-100 mb-3 ${styles.paypalButton}`} id="paypal-button">
                        <i className='bi bi-paypal'></i>Pay with PayPal

                    </button>

                    <button className={`btn btn-primary w-100 mb-3 ${styles.flutterwaveButton}`} id="flutterwave-button">
                        <i className='bi bi-credit-card'></i>Pay with Flutterwave

                    </button>
                </div>
            </div>
        </div>
    )
}

export default PaymentSection