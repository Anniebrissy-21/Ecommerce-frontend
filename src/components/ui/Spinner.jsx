import React from 'react';
import { RingLoader } from 'react-spinners';

const override = {
    display: 'block',
    margin: '0 auto',
    borderColor: 'red',
};

const Spinner = ({ loading }) => {
    if (!loading) return null
  return (
    <div style={{
      position: 'fixed',
      top: 0, left: 0,
      width: '100vw',
      height: '100vh',
      background: 'rgba(255, 255, 255, 0.24)',
      backdropFilter: 'blur(3px)',
      WebkitBackdropFilter: 'blur(3px)',
      zIndex: 9999,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }}>
      <RingLoader
        color="#ffb01cff"  
        loading={true}
        size={36}
        speedMultiplier={1.2}
        aria-label="Loading"
        data-testid="loader"
      />
    </div>
  )
};

export default Spinner;
