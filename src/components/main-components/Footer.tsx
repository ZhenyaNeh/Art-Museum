import '@scss/footer-styles.scss';

import images from '@utils/ImageStorage/ImageStorage';
import React from 'react';

function Footer() {
  return (
    <footer>
      <div className="footer-contaner">
        <div className="footer-left">
          <img src={images.logo} alt="logo-app" />
          <span className="logo-name">
            Museum of <span className="highlight">Art</span>
          </span>
        </div>
        <div className="footer-right">
          <img src={images.logoModsen} alt="logo-app" />
        </div>
      </div>
    </footer>
  );
}

export default Footer;
