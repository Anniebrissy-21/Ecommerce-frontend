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
