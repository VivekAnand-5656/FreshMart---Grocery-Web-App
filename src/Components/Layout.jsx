import React from 'react'
import Navbar from './Navbar'
import { Outlet } from 'react-router-dom'

const Layout = () => {
  return ( 
    <>
        <header><Navbar/></header>
        <main><Outlet/></main>
    </>
  )
}

export default Layout