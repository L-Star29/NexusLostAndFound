import Button1 from './Button1';
import Button2 from './Button2';
import './CTA.css';
import { useNavigate } from 'react-router-dom';

function CTA() {
  const navigate = useNavigate();

  return (
    <div id="cta" className='cta'>
        <div className="custom-shape-divider-top" aria-hidden="true">
            <svg
              data-name="Layer 1"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 1200 120"
              preserveAspectRatio="none"
            >
              <defs>
                <linearGradient id="cta-wave-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#f28c28" />
                  <stop offset="100%" stopColor="#2c6bdf" />
                </linearGradient>
                <pattern id="cta-wave-lines" width="50" height="120" patternUnits="userSpaceOnUse">
                  <rect width="50" height="120" fill="transparent" />
                  <path d="M1 0V120" stroke="rgba(116,116,116,0.55)" strokeWidth="1" />
                </pattern>
              </defs>
              <path
                d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"
                fill="#f5f5f5"
              />
            </svg>
        </div>
        <h1>Lost something? Found something?</h1>
        <p>
            Report found items or search through listings in seconds.
            <br />
            A simple, secure way to reconnect people with their belongings.
        </p>
        <div className='cta-buttons'>
            <Button1 text="Report Item" onClick={() => navigate('/report')} />
            <Button2 text="Search Items" onClick={() => navigate('/postings')} />
        </div>
    </div>
  );
}

export default CTA;
