import { Link } from "react-router-dom";
import { useEffect, useState, type CSSProperties } from 'react';
import './Banner.css';
import Button5 from "./Button5.tsx";

function Banner() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    let frameId = 0;

    const updateScrollProgress = () => {
      const heroSection = document.getElementById('hero');

      if (!heroSection) {
        setScrollProgress(0);
        return;
      }

      const heroBottom = heroSection.offsetTop + heroSection.offsetHeight;
      const rawProgress = heroBottom <= 0 ? 1 : window.scrollY / heroBottom;
      const nextProgress = Math.min(Math.max(rawProgress, 0), 1);

      setScrollProgress((currentProgress) =>
        Math.abs(currentProgress - nextProgress) > 0.001 ? nextProgress : currentProgress
      );
    };

    const handleScroll = () => {
      if (frameId) {
        return;
      }

      frameId = window.requestAnimationFrame(() => {
        updateScrollProgress();
        frameId = 0;
      });
    };

    updateScrollProgress();
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll);

    return () => {
      if (frameId) {
        window.cancelAnimationFrame(frameId);
      }
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, []);

  useEffect(() => {
    if (!menuOpen) {
      document.body.style.overflow = '';
      return;
    }

    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = '';
    };
  }, [menuOpen]);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 820) {
        setMenuOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const navStyle = {
    '--nav-progress': scrollProgress,
    '--nav-height': `${100 - scrollProgress * 16}px`,
    '--nav-margin-x': `${30 + scrollProgress * 34}px`,
    '--nav-padding-x': `${36 - scrollProgress * 4}px`,
    '--nav-bg-alpha': `${0.65 + scrollProgress * 0.25}`,
    '--nav-blur': `${10 + scrollProgress * 6}px`,
    '--nav-shadow-y': `${8 + scrollProgress * 4}px`,
    '--nav-shadow-blur': `${32 + scrollProgress * 4}px`,
    '--nav-shadow-alpha': `${0.4 + scrollProgress * 0.05}`,
    '--nav-border-alpha': `${0.06 + scrollProgress * 0.02}`,
    '--nav-logo-height': `${50 - scrollProgress * 8}px`,
    '--nav-font-size': `${1 - scrollProgress * 0.06}rem`,
    '--nav-clip-px': `${scrollProgress * 46}px`,
    '--nav-clip-depth': `${75 + scrollProgress * 9}%`,
  } as CSSProperties;

  const navLinks = [
    { to: '/', label: 'Home' },
    { to: '/postings', label: 'Postings' },
    { to: '/how-to', label: 'How-To' },
    { to: '/about-us', label: 'About Us' },
  ];

  return (
    <>
      <div className="link-group" style={navStyle}>
        <div className='glow-bottom'></div>

        <div className='link-subgroup link-subgroup-left'>
          <Link to="/">
            <p>Home</p>
          </Link>
          <Link to="/postings">
            <p>Postings</p>
          </Link>
        </div>

        <Link id="main-logo" to="/">
          <img src="src/assets/tuckerlogo.svg" alt="Nexus Logo" id="logo"></img>
          <div id="logo-text">
            <p id="main-text">Tucker</p>
            <p id="sub-text">Lost & Found</p>
          </div>
        </Link>

        <div className='link-subgroup link-subgroup-right'>
          <Link to="/about-us">
            <p>About Us</p>
          </Link>
          <Link to="/report">
            <Button5 />
          </Link>
        </div>

        <button
          type="button"
          className={`menu-toggle ${menuOpen ? 'is-open' : ''}`}
          aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
          aria-expanded={menuOpen}
          aria-controls="mobile-navigation"
          onClick={() => setMenuOpen((open) => !open)}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>

      <div
        id="mobile-navigation"
        className={`mobile-menu ${menuOpen ? 'is-open' : ''}`}
        aria-hidden={!menuOpen}
      >
        <div className="mobile-menu-header">
          <span>Navigate</span>
          <button
            type="button"
            className="mobile-menu-close"
            aria-label="Close navigation menu"
            onClick={() => setMenuOpen(false)}
          >
            Close
          </button>
        </div>

        <nav className="mobile-menu-links" aria-label="Mobile navigation">
          {navLinks.map((link) => (
            <Link key={link.label} to={link.to} onClick={() => setMenuOpen(false)}>
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </>
  );
}

export default Banner;
