import React, { useState } from 'react'
import api, { BASE_URL } from '../../api'
import { toast } from 'react-toastify'

const CartItem = ({ item, setCartTotal, cartItems, setNumCartItems, setCartItems }) => {
  const [quantity, setQuantity] = useState(item.quantity)
  const [loading, setLoading] = useState(false)

  const itemData = { quantity, item_id: item.id }

  function updateCartItem() {
    setLoading(true)
    api.patch("update_quantity/", itemData)
      .then(res => {
        toast.success("Cart Item Updated Successfully")

        const updatedCartItems = cartItems.map(cartItem =>
          cartItem.id === item.id ? res.data.data : cartItem
        )

        setCartItems(updatedCartItems)
        setCartTotal(updatedCartItems.reduce((acc, curr) => acc + curr.total, 0))
        setNumCartItems(updatedCartItems.reduce((acc, curr) => acc + curr.quantity, 0))
      })
      .catch(err => {
        console.log(err.message)
      })
      .finally(() => setLoading(false))
  }

  function deleteCartItem() {
    const confirmDelete = window.confirm("Are you sure you want to delete this cart item?")
    if (confirmDelete) {
      api.delete("delete_cartitem/", { data: { item_id: item.id } })
        .then(res => {
          toast.success("Item removed from cart")
          const filteredItems = cartItems.filter(cartitem => cartitem.id !== item.id)
          setCartItems(filteredItems)
          setCartTotal(filteredItems.reduce((acc, curr) => acc + curr.total, 0))
          setNumCartItems(filteredItems.reduce((acc, curr) => acc + curr.quantity, 0))
        })
        .catch(err => {
          console.log(err.message)
        })
    }
  }

  return (
    <div className='col-md-12'>
      <div className='cart-item d-flex align-items-center mb-3 p-3' style={{ backgroundColor: '#f8f9fa', borderRadius: '8px' }}>
        <img src={`${item.product.image}`} alt="Product image"
          className='img-fluid'
          style={{ width: '80px', height: '80px', objectFit: 'cover', borderRadius: '5px' }} />

        <div className='ms-3 flex-grow-1'>
          <h5 className='mb-1'>{item.product.name}</h5>
          <p className='mb-0 text-muted'>${item.product.price}</p>
        </div>

        <div className='d-flex align-items-center'>
          <input type="number" className='form-control me-3' value={quantity}
            onChange={(e) => setQuantity(Number(e.target.value))}
            style={{ width: '70px' }} />
          <button className='btn btn-sm mx-2' style={{ backgroundColor: "#4b3bcb", color: "white" }}
            onClick={updateCartItem} disabled={loading}>
            {loading ? "Updating..." : "Update"}
          </button>
          <button className='btn btn-danger btn-sm' onClick={deleteCartItem} disabled={loading}>
            Remove
          </button>
        </div>
      </div>
    </div>
  )
}

export default CartItem
