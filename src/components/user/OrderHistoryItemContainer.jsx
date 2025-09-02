import React from 'react';
import OrderHistoryItem from './OrderHistoryItem';

const OrderHistoryItemContainer = ({ orderItems }) => {
  return (
    <div className="row">
      <div className="col-md-12">
        <div className="card border-0 shadow-sm">
          <div
            className="card-header"
            style={{
              backgroundColor: '#dfc19d', // header: soft gold
              color: '#7d6145',
              borderRadius: '8px 8px 0 0',
              fontWeight: 600,
              fontSize: '1.15rem'
            }}
          >
            Order History
          </div>
          <div style={{ maxHeight: 360, overflowY: 'auto', background: "#f9f6ef" }}>
            {orderItems.length === 0 ? (
              <div className="p-4 text-center text-muted">No orders yet.</div>
            ) : (
              orderItems.map(item => <OrderHistoryItem key={item.id} item={item} />)
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderHistoryItemContainer;

