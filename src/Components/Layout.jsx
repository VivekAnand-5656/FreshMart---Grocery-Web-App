import React from 'react'
import Navbar from './Navbar'
import { Outlet } from 'react-router-dom'
import Footer from './Footer'

const Layout = () => {
  return ( 
    <>
        <header><Navbar/></header>
        <main><Outlet/></main>
        <footer><Footer/></footer>
    </>
  )
}

export default Layout