// import React from 'react'
// import { BASE_URL } from '../../api'

// const OrderItem = ({ cartitem }) => {
//     return (
//         <div>
//             <div className="d-flex justify-content-between align-items-center mb-3" style={{ padding: '10px' }}>
//                 <div className="d-flex align-item-center">
//                     <img src={`${cartitem.product.image}`} alt="Product" className='img-fluid'
//                         style={{ width: '60px', height: '60px', objectFit: 'cover', borderRadius: '5px' }} />
//                     <div className="ms-3">
//                         <h6 className='mb-0'>{ cartitem.product.name }</h6>
//                         <small>Quantity: { cartitem.product.quantity }</small>
//                     </div>
//                 </div>
//                 <h6>${ cartitem.product.price }</h6>

//             </div>
//         </div>
//     )
// }

// export default OrderItem


import React from 'react'

const OrderItem = ({ cartitem }) => {
  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-3" style={{ padding: '10px 3px' }}>
        <div className="d-flex align-items-center">
          <img src={`${cartitem.product.image}`} alt="Product" className='img-fluid'
            style={{
              width: '50px', height: '50px',
              objectFit: 'cover',
              borderRadius: '7px',
              border: '1.5px solid #f4e5c9'
            }} />
          <div className="ms-3">
            <h6 className='mb-1' style={{ color: "#7d6145", fontWeight: 600 }}>{cartitem.product.name}</h6>
            <small style={{ color: "#b2a283" }}>Quantity: {cartitem.quantity}</small>
          </div>
        </div>
        <h6 style={{ color: "#b89c67" }}>${cartitem.product.price}</h6>
      </div>
    </div>
  )
}

export default OrderItem
