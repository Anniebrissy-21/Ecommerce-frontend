// import React from 'react'
// import styles from './OrderHistoryItem.module.css'
// import { BASE_URL } from '../../api'
// import { FormatDate } from '../../FormatDate'

// const OrderHistoryItem = ({item}) => {
//     return (
//         <div className='card-body'>
//             <div className={`order-item mb-3 ${styles.orderItem}`}>
//                 <div className="row">
//                     <div className="col-md-2">
//                         <img src={`${item.product.image}`} alt="Order Item" className='img-fluid'
//                             style={{ borderRadius: '5px' }} />
//                     </div>
//                     <div className="col-md-6">
//                         <h6>{item.product.name}</h6>
//                         <p>Order Date: {FormatDate(item.order_date)}</p>
//                         <p>Order ID: {item.order_id}</p>
//                     </div>
//                     <div className="col-md-2 text-center">
//                         <h6 className='text-muted'>Quantity: {item.quantity}</h6>
//                     </div>
//                     <div className="col-md-2 text-center">
//                         <h6 className='text-muted'>${item.product.price}</h6>
//                     </div>
//                 </div>

//             </div>

//         </div>
//     )
// }

// export default OrderHistoryItem

import React from 'react';
import styles from './OrderHistoryItem.module.css';
import { FormatDate } from '../../FormatDate';

const OrderHistoryItem = ({ item }) => {
  return (
    <div className={`mb-3 px-2`}>
      <div className={`p-3 d-flex align-items-center gap-4 bg-white rounded-3 shadow-sm ${styles.orderItem}`}>
        <img
          src={item.product.image}
          alt="Order Item"
          className="img-fluid"
          style={{ borderRadius: '10px', width: 78, height: 78, objectFit: "cover" }}
        />
        <div className="flex-grow-1">
          <h6 style={{ fontSize: "1rem", fontWeight: 600, marginBottom: 4 }}>{item.product.name}</h6>
          <div className="text-muted" style={{ fontSize: "0.93rem" }}>
            Order Date: {FormatDate(item.order_date)}
            <br />
            Order ID: {item.order_id}
          </div>
        </div>
        <div className="text-center">
          <div className="text-muted small" style={{ fontWeight: 500 }}>Qty</div>
          <div style={{ fontWeight: 700, fontSize: "1.12rem" }}>{item.quantity}</div>
        </div>
        <div className="text-center">
          <div className="text-muted small" style={{ fontWeight: 500 }}>Total</div>
          <div style={{ color: "#b89c67", fontWeight: 700, fontSize: "1.12rem" }}>${item.product.price}</div>
        </div>
      </div>
    </div>
  );
};

export default OrderHistoryItem;
