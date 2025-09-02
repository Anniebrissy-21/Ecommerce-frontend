import React from 'react'
import { Link } from 'react-router-dom'
import { FaMoneyCheckAlt } from "react-icons/fa"

const BG = '#fff'
const ACCENT = '#b29561'
const HEAD = '#7b5e24'
const ELEVATE = '0 2px 12px 0 rgba(178,149,97,0.08)'

const CartSummary = ({ cartTotal, tax }) => {
  const subTotal = Number(cartTotal || 0)
  const cartTax = Number(tax || 0)
  const total = subTotal + cartTax
  const formatPrice = n => n.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })
  return (
    <div style={{
      background: BG,
      borderRadius: 16,
      boxShadow: ELEVATE,
      padding: 28,
      marginLeft: 0,
      minWidth: 260
    }}>
      <h5 style={{ color: HEAD, fontWeight: 700, marginBottom: 18 }}>Cart Summary</h5>
      <div className="mb-2 d-flex justify-content-between">
        <span>Subtotal:</span>
        <span>${formatPrice(subTotal)}</span>
      </div>
      <div className="mb-2 d-flex justify-content-between">
        <span>Tax:</span>
        <span>${formatPrice(cartTax)}</span>
      </div>
      <hr className="mb-2" />
      <div className="mb-3 d-flex justify-content-between fw-bold" style={{ color: ACCENT }}>
        <span>Total:</span>
        <span>${formatPrice(total)}</span>
      </div>
      <Link to="/checkout" className='d-block' style={{ textDecoration: 'none' }}>
        <button
          className="btn w-100 d-flex align-items-center justify-content-center"
          style={{
            backgroundColor: ACCENT,
            color: "#fff",
            fontWeight: 600,
            fontSize: 17,
            padding: "10px 0",
            border: "none",
            borderRadius: 8,
            gap: 6,
            boxShadow: 'none',
            outline: 'none',
            textDecoration: 'none'
          }}
        >
          <FaMoneyCheckAlt />
          Proceed To Checkout
        </button>
      </Link>

    </div>
  )
}
export default CartSummary
