import React from 'react'
import CartItem from './CartItem'
import CartSummary from './CartSummary'
import Spinner from '../ui/Spinner'
import useCartData from '../../hooks/useCartData'

// Color palette
const BG = '#f8efd9'
const HEAD = '#7b5e24'
const MAX_WIDTH = 960

const CartPage = ({ setNumCartItems }) => {
  const { cartItems, setCartItems, cartTotal, setCartTotal, tax, loading } = useCartData()

  if (loading) return <Spinner loading={loading} />

  if (!cartItems.length) {
    return (
      <div className="container my-5">
        <div className="alert alert-primary text-center shadow" role="alert" style={{
          fontSize: 18, background: BG, color: HEAD, border: 'none', borderRadius: 12
        }}>
          <b>Your shopping cart is empty.</b>
        </div>
      </div>
    )
  }

  return (
    <section style={{ background: BG, minHeight: "100vh", padding: "32px 0"}}>
      <div className="container" style={{ maxWidth: MAX_WIDTH }}>
        <h3 className="fw-bold mb-4" style={{
          color: HEAD,
          borderBottom: `3px solid ${HEAD}`,
          paddingBottom: 4,
          marginBottom: 36
        }}>
          Shopping Cart
        </h3>
        <div className="row gy-4">
          <div className="col-lg-8">
            <div className='d-flex flex-column gap-4'>
              {cartItems.map(item => (
                <CartItem
                  key={item.id}
                  item={item}
                  cartItems={cartItems}
                  setCartTotal={setCartTotal}
                  setCartItems={setCartItems}
                  setNumCartItems={setNumCartItems}
                />
              ))}
            </div>
          </div>
          <div className="col-lg-4">
            <CartSummary cartTotal={cartTotal} tax={tax} />
          </div>
        </div>
      </div>
    </section>
  )
}
export default CartPage
