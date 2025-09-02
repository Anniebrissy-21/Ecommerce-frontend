import React from 'react';
import styles from './UserInfo.module.css';
import pic from '../../assets/profile.jpeg';

const UserInfo = ({ userInfo }) => {
  return (
    <div className="row mb-4 g-3">
      <div className={`col-md-3 card p-4 border-0 shadow-sm ${styles.textCenter}`}>
        <img
          src={pic}
          alt="User Pic"
          className={`img-fluid rounded-circle mb-3 mx-auto ${styles.profileImage}`}
        />
        <h4 style={{ fontWeight: 700, color: "#7d6145" }}>
          {userInfo.first_name} {userInfo.last_name}
        </h4>
        <p className="text-muted mb-2" style={{ fontSize: 15 }}>
          {userInfo.email}
        </p>
        <button
          className="btn w-100 mt-2"
          style={{
            backgroundColor: '#dfc19d', // soft gold
            color: '#7d6145',
            borderRadius: 9,
            fontWeight: 600
          }}>
          Edit Profile
        </button>
      </div>
      <div className="col-md-9">
        <div className="card border-0 shadow-sm">
          <div className="card-header px-4 py-3"
            style={{
              backgroundColor: '#dfc19d', // header: soft gold
              color: '#7d6145',
              borderRadius: "8px 8px 0 0"
            }}>
            <h5 className='mb-0'>Account Overview</h5>
          </div>
          <div className="card-body">
            <div className="row gy-2 gx-3">
              <div className="col-md-6">
                <p><strong>Full Name:</strong> {userInfo.first_name} {userInfo.last_name}</p>
                <p><strong>Email:</strong> {userInfo.email}</p>
                <p><strong>Phone:</strong> {userInfo.phone || <span className="text-muted">Not Set</span>}</p>
              </div>
              <div className="col-md-6">
                <p><strong>Username:</strong> {userInfo.username}</p>
                <p><strong>City:</strong> {userInfo.city || <span className="text-muted">Not Set</span>}</p>
                <p><strong>Country:</strong> {userInfo.state || <span className="text-muted">Not Set</span>}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserInfo;
