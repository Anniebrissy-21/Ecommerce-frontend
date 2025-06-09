import React from 'react'
import Footer from '../components/ui/Footer'
import NavBar from '../components/ui/NavBar'
import { Outlet } from 'react-router-dom'

const MainLayout = () => {
  return (
    <>
    
    <NavBar/>
    <Outlet />
    <Footer />
    
    </>
  )
}

export default MainLayout