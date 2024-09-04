import React from 'react'
import Header from '../components/main-components/Header'
import Footer from '../components/main-components/Footer'
import { Outlet } from 'react-router-dom'

function Layout() {
  return (
    <div className='div-body-style'>
      <Header/>

      <Outlet/>

      <Footer/>
    </div>
  )
}

export default Layout
