import React from 'react'
import logo from '../../assets/img/logo.svg'
import bookmarkLogo from '../../assets/img/bookmark1.svg'
import homeLogo from '../../assets/img/home.svg'
import '../../scss/header-styles.scss'
import { Link } from 'react-router-dom'

function Header() {
  return (
    <header>
      <div className='header-contaner'>
        <div className="header-left">
          <img src={logo} alt="logo-app" />
          <span className="logo-name">Museum of <span className="highlight">Art</span></span>
        </div>
        <div className="header-right">
          <div>
            <img src={homeLogo} alt="logo-app" />
            <span className="favorites-text"><Link className='link-style' to="/">Home</Link></span>
          </div>
          <div>
            <img src={bookmarkLogo} alt="logo-app" />
            <span className="favorites-text"><Link className='link-style' to="/favorites">Your favorites</Link></span>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header
