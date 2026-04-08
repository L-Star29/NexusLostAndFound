import Button1 from './Button1';
import Button2 from './Button2';
import './CTA.css';
import { Fragment } from 'react/jsx-runtime';

function Footer() {
  return (
    <div className='footer'>
        <div className='footer-content'>
            <div className='footer-logo'>
                <img src="src/assets/tuckerlogo.svg" alt="Nexus Logo" id="footer-logo"></img>
                <div id="logo-text">
                    <p id="main-text">Tucker</p>
                    <p id="sub-text">Lost & Found</p>
                </div>
            </div>
            <div className='footer-links'>
                <p>Pages</p>
                <a href="index.html">Home</a>
                <a href="postings.html">Postings</a>
                <a href="how-to.html">How-To</a>
                <a href="about-us.html">About Us</a>
            </div>
            <div className='footer-contact'>
                <p>Contact Us</p>
                <a href="mailto:lokiraja29@gmail.com">Lokesh R.</a>
                <a href="mailto:aguntapudi@gmail.com">Akshar G.</a>
                <br />
                <br />
            </div>
            <div className='footer-arrow'>
                <button className="top-arrow" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} aria-label="Back to top">
                    <svg viewBox="0 0 384 512" className="svgIcon">
                        <path d="M214.6 41.4c-12.5-12.5-32.8-12.5-45.3 0l-160 160c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L160 141.2V448c0 17.7 14.3 32 32 32s32-14.3 32-32V141.2L329.4 246.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3l-160-160z" />
                    </svg>
                </button>
            </div>
        </div>
        <div className='footer-bottom'>
            <h1>Nexus</h1>
        </div>
    </div>
  );
}

export default Footer;
