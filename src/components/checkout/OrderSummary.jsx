// import React from 'react'
// import OrderItem from './OrderItem'
// import styles from "./OrderSummary.module.css"

// const OrderSummary = ({cartItems, cartTotal, tax}) => {

//     const total = (cartTotal + tax).toFixed(2)

//     return (
//         <div className='col-md-8'>
//             <div className={`card mb-4 ${styles.card}`}>
//                 <div className="card-header" style={{ backgroundColor: '#6050DC', color: 'white' }}>
//                     <h5>Cart Summary</h5>
//                 </div>

//                 <div className="cart-body">

//                     <div className="px-3" style={{ height: '300px', overflow: 'auto' }}>

//                         {cartItems.map(cartitem => <OrderItem key={cartitem.id} cartitem={cartitem} />)}

//                     </div>

//                     <hr />
//                     <div className="d-flex justify-content-between p-2">
//                         <h6>Total</h6>
//                         <h6>${ total }</h6>

//                     </div>
//                 </div>

//             </div>

//         </div>
//     )
// }

// export default OrderSummary

import React from 'react'
import OrderItem from './OrderItem'
import styles from "./OrderSummary.module.css"

const OrderSummary = ({ cartItems, cartTotal, tax }) => {
  const total = (cartTotal + tax).toFixed(2)

  return (
    <div className='col-md-8'>
      <div className={`card mb-4 ${styles.card}`}>
        <div
          className="card-header"
          style={{
            backgroundColor: '#dfc19d',
            color: '#7d6145',
            fontWeight: 700,
          }}>
          <h5 className='mb-0'>Cart Summary</h5>
        </div>
        <div className="cart-body px-3 py-3">
          <div style={{ minHeight: '120px', maxHeight: '300px', overflow: 'auto' }}>
            {cartItems.length === 0 ? (
              <div className="text-center text-muted py-4">Your cart is empty.</div>
            ) : (
              cartItems.map(cartitem => <OrderItem key={cartitem.id} cartitem={cartitem} />)
            )}
          </div>
          <hr />
          <div className="d-flex justify-content-between px-2 pb-1">
            <span style={{ fontWeight: 500 }}>Subtotal:</span>
            <span>${cartTotal.toFixed(2)}</span>
          </div>
          <div className="d-flex justify-content-between px-2 pb-1">
            <span style={{ fontWeight: 500 }}>Tax:</span>
            <span>${tax.toFixed(2)}</span>
          </div>
          <div className="d-flex justify-content-between align-items-center px-2 pt-2" style={{ fontSize: '1.14rem', fontWeight: 700 }}>
            <span>Total:</span>
            <span style={{ color: "#b89c67" }}>${total}</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default OrderSummary
