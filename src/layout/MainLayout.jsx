import React from 'react'
import Footer from '../components/ui/Footer'
import NavBar from '../components/ui/NavBar'
import { Outlet } from 'react-router-dom'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const MainLayout = ({numCartItems, wishListCount}) => {
  return (
    <>
    
    <NavBar numCartItems={numCartItems} wishListCount={wishListCount} />
    <ToastContainer />
    <Outlet />
    <Footer />
    
    </>
  )
}

export default MainLayout