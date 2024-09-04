import React from 'react'
import logo from '../../assets/img/logo.svg'
import modsenLogo from '../../assets/img/logo modsen-02 2.png'
import '../../scss/footer-styles.scss'

function Footer() {
  return (
    <footer>
      <div className='footer-contaner'>
        <div className="footer-left">
          <img src={logo} alt="logo-app" />
          <span className="logo-name">Museum of <span className="highlight">Art</span></span>
        </div>
        <div className="footer-right">
          <img src={modsenLogo} alt="logo-app" />
        </div>
      </div>
    </footer>
  )
}

export default Footer
