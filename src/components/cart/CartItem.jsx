// import React, { useState } from 'react'
// import api, { BASE_URL } from '../../api'
// import { toast } from 'react-toastify'

// const CartItem = ({ item, setCartTotal, cartItems, setNumCartItems, setCartItems }) => {
//   const [quantity, setQuantity] = useState(item.quantity)
//   const [loading, setLoading] = useState(false)

//   const itemData = { quantity, item_id: item.id }

//   function updateCartItem() {
//     setLoading(true)
//     api.patch("update_quantity/", itemData)
//       .then(res => {
//         toast.success("Cart Item Updated Successfully")

//         const updatedCartItems = cartItems.map(cartItem =>
//           cartItem.id === item.id ? res.data.data : cartItem
//         )

//         setCartItems(updatedCartItems)
//         setCartTotal(updatedCartItems.reduce((acc, curr) => acc + curr.total, 0))
//         setNumCartItems(updatedCartItems.reduce((acc, curr) => acc + curr.quantity, 0))
//       })
//       .catch(err => {
//         console.log(err.message)
//       })
//       .finally(() => setLoading(false))
//   }

//   function deleteCartItem() {
//     const confirmDelete = window.confirm("Are you sure you want to delete this cart item?")
//     if (confirmDelete) {
//       api.delete("delete_cartitem/", { data: { item_id: item.id } })
//         .then(res => {
//           toast.success("Item removed from cart")
//           const filteredItems = cartItems.filter(cartitem => cartitem.id !== item.id)
//           setCartItems(filteredItems)
//           setCartTotal(filteredItems.reduce((acc, curr) => acc + curr.total, 0))
//           setNumCartItems(filteredItems.reduce((acc, curr) => acc + curr.quantity, 0))
//         })
//         .catch(err => {
//           console.log(err.message)
//         })
//     }
//   }

//   return (
//     <div className='col-md-12'>
//       <div className='cart-item d-flex align-items-center mb-3 p-3' style={{ backgroundColor: '#f8f9fa', borderRadius: '8px' }}>
//         <img src={`${item.product.image}`} alt="Product image"
//           className='img-fluid'
//           style={{ width: '80px', height: '80px', objectFit: 'cover', borderRadius: '5px' }} />

//         <div className='ms-3 flex-grow-1'>
//           <h5 className='mb-1'>{item.product.name}</h5>
//           <p className='mb-0 text-muted'>${item.product.price}</p>
//         </div>

//         <div className='d-flex align-items-center'>
//           <input type="number" className='form-control me-3' value={quantity}
//             onChange={(e) => setQuantity(Number(e.target.value))}
//             style={{ width: '70px' }} />
//           <button className='btn btn-sm mx-2' style={{ backgroundColor: "#4b3bcb", color: "white" }}
//             onClick={updateCartItem} disabled={loading}>
//             {loading ? "Updating..." : "Update"}
//           </button>
//           <button className='btn btn-danger btn-sm' onClick={deleteCartItem} disabled={loading}>
//             Remove
//           </button>
//         </div>
//       </div>
//     </div>
//   )
// }

// export default CartItem

import React, { useState } from 'react'
import api from '../../api'
import { toast } from 'react-toastify'
import { FaTrashAlt, FaEdit } from 'react-icons/fa'

const ACCENT = '#b29561'
const ACCENT_HOVER = '#a18335'
const TEXT = '#7b5e24'

const CartItem = ({
  item, setCartTotal, cartItems, setNumCartItems, setCartItems
}) => {
  const [quantity, setQuantity] = useState(item.quantity)
  const [loading, setLoading] = useState(false)
  const itemData = { quantity, item_id: item.id }

  function updateCartItem() {
    setLoading(true)
    api.patch('update_quantity/', itemData)
      .then(res => {
        toast.success('Item updated')
        const updated = cartItems.map(cartItem =>
          cartItem.id === item.id ? res.data.data : cartItem)
        setCartItems(updated)
        setCartTotal(updated.reduce((acc, curr) => acc + curr.total, 0))
        setNumCartItems(updated.reduce((acc, curr) => acc + curr.quantity, 0))
      })
      .catch(() => toast.error("Update failed."))
      .finally(() => setLoading(false))
  }

  function deleteCartItem() {
    if (!window.confirm('Remove this item from your cart?')) return
    setLoading(true)
    api.delete('delete_cartitem/', { data: { item_id: item.id } })
      .then(() => {
        toast.success('Item removed')
        const filtered = cartItems.filter(cartitem => cartitem.id !== item.id)
        setCartItems(filtered)
        setCartTotal(filtered.reduce((acc, curr) => acc + curr.total, 0))
        setNumCartItems(filtered.reduce((acc, curr) => acc + curr.quantity, 0))
      })
      .catch(() => toast.error("Remove failed."))
      .finally(() => setLoading(false))
  }

  return (
    <div
      className="d-flex align-items-center shadow-sm rounded-3 px-3 py-2 gap-3"
      style={{
        background: "#fff",
        border: "none",
        minHeight: 106
      }}
    >
      <img
        src={item.product.image}
        alt={item.product.name}
        style={{
          width: 72, height: 72, objectFit: 'cover', borderRadius: 12, border: '1px solid #efe4c4'
        }}
      />
      <div className="flex-grow-1">
        <div className="mb-1 fw-bold" style={{ color: TEXT, fontSize: '1.08rem' }}>
          {item.product.name}
        </div>
        <div className="text-muted small">${item.product.price}</div>
      </div>
      <div className='d-flex align-items-center gap-2'>
        <input
          type="number"
          min={1}
          value={quantity}
          disabled={loading}
          className="form-control form-control-sm border-0"
          style={{
            background: '#f8efd9', color: TEXT, width: 56, fontWeight: 500, textAlign: 'center',
            borderRadius: 8
          }}
          onChange={e => setQuantity(Math.max(Number(e.target.value), 1))}
        />
        <button
          disabled={loading}
          onClick={updateCartItem}
          className="btn btn-sm d-flex align-items-center"
          style={{
            background: ACCENT,
            color: "white",
            fontWeight: 500,
            border: 'none',
            borderRadius: 8,
            gap: 6,
            transition: 'background 0.2s'
          }}
          onMouseOver={e => e.currentTarget.style.background = ACCENT_HOVER}
          onMouseOut={e => e.currentTarget.style.background = ACCENT}
        >
          <FaEdit />
          Update
        </button>
        <button
          disabled={loading}
          onClick={deleteCartItem}
          className="btn btn-danger btn-sm d-flex align-items-center"
          style={{
            borderRadius: 8,
            gap: 6
          }}
        >
          <FaTrashAlt />
          Remove
        </button>
      </div>
    </div>
  )
}
export default CartItem
