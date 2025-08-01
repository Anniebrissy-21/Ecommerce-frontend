import React from 'react'

const CartSummary = ({ cartTotal, tax }) => {
    const subTotal = Number(cartTotal || 0);
    const cartTax = Number(tax || 0);
    const total = subTotal + cartTax;
  
    const formatPrice = (amount) =>
      amount.toLocaleString(undefined, {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      });
  
    return (
      <div className="col-md-4 align-self-start">
        <div className="card">
          <div className="card-body">
            <h5 className="cart-title">Cart Summary</h5>
            <hr />
            <div className="d-flex justify-content-between">
              <span>Subtotal:</span>
              <span>{`$${formatPrice(subTotal)}`}</span>
            </div>
            <div className="d-flex justify-content-between">
              <span>Tax:</span>
              <span>{`$${formatPrice(cartTax)}`}</span>
            </div>
            <div className="d-flex justify-content-between">
              <span>Total:</span>
              <span>{`$${formatPrice(total)}`}</span>
            </div>
            <button
              className="btn btn-primary w-100"
              style={{ backgroundColor: '#6050DC', borderColor: '#6050DC' }}
            >
              Proceed To Checkout
            </button>
          </div>
        </div>
      </div>
    );
  };
  

export default CartSummary