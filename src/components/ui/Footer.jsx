import React from 'react';
import { FaFacebook, FaInstagram, FaTwitter } from 'react-icons/fa6';

const Footer = () => {
    return (
        <footer className='py-3' style={{ backgroundColor: '#f5efe7', color: '#71513a', borderTop: '1px solid #eadfc7' }}>
            <div className='container text-center'>

                <div className='mb-2'>
                    <a href="#" className='text-decoration-none mx-2' style={{ color: '#a68455' }}>Home</a>
                    <a href="#" className='text-decoration-none mx-2' style={{ color: '#a68455' }}>About</a>
                    <a href="#" className='text-decoration-none mx-2' style={{ color: '#a68455' }}>Shop</a>
                    <a href="#" className='text-decoration-none mx-2' style={{ color: '#a68455' }}>Contact</a>
                </div>

                <div className='mb-2'>
                    <a href="#" className='mx-2' style={{ color: '#b89c67' }}><FaFacebook /></a>
                    <a href="#" className='mx-2' style={{ color: '#b89c67' }}><FaTwitter /></a>
                    <a href="#" className='mx-2' style={{ color: '#b89c67' }}><FaInstagram /></a>
                    <a href="#" className='mx-2' style={{ color: '#a68455' }}>Contact</a>
                </div>

                <p className='small mb-0' style={{ color: '#a18a5e' }}>&copy; 2024 Shoppit</p>
            </div>
        </footer>
    );
};

export default Footer;
