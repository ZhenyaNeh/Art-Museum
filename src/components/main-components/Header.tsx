import '../../scss/header-styles.scss';

import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import images from '../../utils/ImageStorage/ImageStorage';

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header>
      <div className="header-contaner">
        <div className="header-left">
          <img src={images.logo} alt="logo-app" />
          <span className="logo-name">
            Museum of <span className="highlight">Art</span>
          </span>
        </div>
        <div className="header-right">
          <div className="nav-menu">
            <Link className="link-style" onClick={toggleMenu} to="/">
              <img src={images.home} alt="logo-app" />
              <span className="favorites-text">Home</span>
            </Link>
            <Link className="link-style" onClick={toggleMenu} to="/favorites">
              <img src={images.bookmarkHeader} alt="logo-app" />
              <span className="favorites-text">Your favorites</span>
            </Link>
          </div>
          <div className="burger-menu">
            <div className={`burger-logo`} onClick={toggleMenu}>
              <div className={`burger-line ${isMenuOpen ? 'open' : ''}`}></div>
              <div className={`burger-line ${isMenuOpen ? 'open' : ''}`}></div>
              <div className={`burger-line ${isMenuOpen ? 'open' : ''}`}></div>
            </div>
            <div className={`burger-list ${isMenuOpen ? 'open' : ''}`}>
              <ul>
                <li>
                  <Link className="link-style" onClick={toggleMenu} to="/">
                    <img src={images.home} alt="logo-app" />
                    <span className="favorites-text">Home</span>
                  </Link>
                </li>
                <li>
                  <Link
                    className="link-style"
                    onClick={toggleMenu}
                    to="/favorites"
                  >
                    <img src={images.bookmarkHeader} alt="logo-app" />
                    <span className="favorites-text">Your favorites</span>
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
