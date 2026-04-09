import type { CSSProperties } from 'react';
import styled from 'styled-components';

type Button1Props = {
  text?: string;
  onClick?: () => void;
};

type CSSVariableStyle = CSSProperties & Record<`--${string}`, string | number>;

const toCharacters = (value: string) => Array.from(value);

const Button1 = ({ text = 'Get Started', onClick }: Button1Props) => {
  const characters = toCharacters(text);

  return (
    <StyledWrapper>
      <div>
        <svg
          style={{ visibility: 'hidden', position: 'absolute' }}
          width={0}
          height={0}
          xmlns="http://www.w3.org/2000/svg"
          version="1.1"
        >
          <defs>
            <filter id="goo">
              <feGaussianBlur in="SourceGraphic" stdDeviation={8} result="blur" />
              <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 19 -9" result="goo" />
              <feComposite in="SourceGraphic" in2="goo" operator="atop" />
            </filter>
          </defs>
        </svg>
        <div className="button-wrapper">
          <button type="button" className="button" onClick={onClick}>
            <div className="liquid-bg" />
            <span className="text">
              <span className="words">
                {characters.map((character, index) => {
                  const style: CSSVariableStyle = { '--i': index + 1 };
                  const label = character === ' ' ? '\u00A0' : character;

                  return (
                    <span key={`${character}-${index}`} className="char" style={style}>
                      <span data-label={label}>{label}</span>
                    </span>
                  );
                })}
              </span>
              <svg className="premium-icon" xmlns="http://www.w3.org/2000/svg" width={22} height={22} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                <line x1={7} y1={17} x2={17} y2={7} />
                <polyline points="7 7 17 7 17 17" />
              </svg>
            </span>
          </button>
        </div>
      </div>
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div`
  @keyframes hover-float {
    50% {
      transform: translateY(-4px);
      box-shadow:
        0 15px 25px rgba(0, 0, 0, 0.2),
        0 4px 12px rgba(0, 0, 0, 0.1);
    }
  }
  @keyframes spin {
    0% {
      transform: translate(-50%, -50%) rotate(0deg);
    }
    100% {
      transform: translate(-50%, -50%) rotate(360deg);
    }
  }

  .button {
    position: relative;
    padding: 3px;
    border: none;
    border-radius: 999px;
    cursor: pointer;
    outline: none;
    transition: all 150ms ease-in-out;
    animation: hover-float 2.5s infinite ease-in-out;
    z-index: 1;

    background: #181924;
    overflow: hidden;
    box-shadow:
      0 10px 20px rgba(0, 0, 0, 0.25),
      0 2px 8px rgba(0, 0, 0, 0.45);
  }

  .button::before {
    content: "";
    position: absolute;
    top: 50%;
    left: 50%;
    width: 250%;
    aspect-ratio: 1;

    background: linear-gradient(
      to right,
      transparent 30%,
      rgba(255, 255, 255, 0.8) 45%,
      #2c6bdf 50%,
      rgba(255, 255, 255, 0.8) 55%,
      transparent 70%
    );
    transform: translate(-50%, -50%);
    animation: spin 3s linear infinite;
    animation-play-state: paused;
    z-index: 0;
  }

  .button .text {
    display: flex;
    align-items: center;
    justify-content: center;
    min-width: 290px;
    min-height: 76px;
    padding: 16px 32px;
    border-radius: 999px;
    position: relative;
    overflow: hidden;
    gap: 16px;
    z-index: 1;

    background: radial-gradient(
        150% 100% at 50% 100%,
        #000000 40%,
        transparent 80%
      ),
      linear-gradient(
        90deg,
        #f28c28 0%,
        #2c6bdf 50%,
        #f28c28 100%
      );

    box-shadow:
      1px -1px 2px hsl(0 0% 100% / 0.5) inset,
      0px -1px 2px hsl(0 0% 100% / 0.5) inset,
      -1px -1px 2px hsl(0 0% 100% / 0.5) inset,
      1px 1px 2px hsl(0 0% 30% / 0.5) inset,
      -8px 4px 10px -6px hsl(0 0% 30% / 0.25) inset,
      -1px 1px 6px hsl(0 0% 30% / 0.25) inset,
      -1px -1px 8px hsl(0 0% 60% / 0.15),
      1px 1px 2px hsl(0 0% 30% / 0.15),
      2px 2px 6px hsl(0 0% 30% / 0.15),
      -2px -1px 2px hsl(0 0% 100% / 0.25) inset,
      3px 6px 16px -6px hsl(0 0% 30% / 0.5);

    transition: all 0.2s ease;

    color: #ffffff;
    font-family: "Trebuchet MS", "Segoe UI", sans-serif;
    font-size: 24px;
    font-weight: 600;
    letter-spacing: 0.08em;
    text-shadow:
      0 1px 3px rgba(0, 0, 0, 0.8),
      0 0 8px rgba(255, 255, 255, 0.3);
  }

  .button .text::before,
  .button .text::after {
    content: "";
    position: absolute;
    inset: 0;
    border-radius: inherit;
    pointer-events: none;
    z-index: 2;
  }

  .button .text::before {
    background: linear-gradient(
      155deg,
      rgba(255, 255, 255, 0.4) 0%,
      rgba(255, 255, 255, 0.05) 42%,
      transparent 42.5%
    );
  }

  .button .text::after {
    background: linear-gradient(
      -155deg,
      rgba(255, 255, 255, 0.4) 0%,
      rgba(255, 255, 255, 0.05) 42%,
      transparent 42.5%
    );
  }

  .button .words {
    display: flex;
    align-items: center;
    justify-content: center;
    flex: 1 1 auto;
    min-width: 0;
    gap: 0.02em;
    transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    position: relative;
    z-index: 3;
  }

  .button .char {
    display: inline-flex;
    position: relative;
    overflow: hidden;
    line-height: 1.1;
  }

  .button .char span {
    display: block;
    transition: transform 0.4s cubic-bezier(0.5, 0, 0.2, 1);
    transition-delay: calc(var(--i) * 0.03s);
  }

  .button .char span::after {
    content: attr(data-label);
    position: absolute;
    left: 0;
    top: 100%;
    color: #f28c28;
    text-shadow: 0 0 10px rgba(0, 0, 0, 0.6);
  }

  .button .text svg {
    position: absolute;
    right: -40px;
    opacity: 0;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    z-index: 3;
  }

  .ripple {
    position: absolute;
    border-radius: 50%;
    transform: scale(0);
    animation: ripple-anim 600ms linear;
    background-color: rgba(255, 255, 255, 0.4);
    pointer-events: none;
    z-index: 1;
  }

  @keyframes ripple-anim {
    to {
      transform: scale(4);
      opacity: 0;
    }
  }

  .premium-icon {
    transition:
      transform 0.4s cubic-bezier(0.25, 1, 0.5, 1),
      opacity 0.4s ease;
    opacity: 0.8;
  }

  .button:hover .premium-icon {
    transform: translateX(4px);
    opacity: 1;
  }

  .button:active .premium-icon {
    transform: translateX(2px);
    transition: 0.1s;
  }

  .button:hover {
    animation: none;
    transform: translateY(-2px);
  }

  .button:hover::before {
    animation-play-state: running;
  }

  .button:hover .words {
    transform: translateX(-10px);
  }

  .button:hover .char span {
    transform: translateY(-100%);
  }

  .button:hover .text svg {
    right: 30px;
    opacity: 1;
  }

  .button:active {
    transform: translateY(2px) scale(0.96);
    box-shadow:
      0 2px 4px rgba(0, 0, 0, 0.15),
      0 0 0 rgba(0, 0, 0, 0.1);
  }

  .button:active .text {
    /* Compresses the glass shadow on click */
    box-shadow:
      1px -1px 2px hsl(0 0% 100% / 0.3) inset,
      0px -1px 2px hsl(0 0% 100% / 0.3) inset,
      -1px -1px 2px hsl(0 0% 100% / 0.3) inset,
      1px 1px 2px hsl(0 0% 30% / 0.8) inset,
      -8px 4px 10px -6px hsl(0 0% 30% / 0.5) inset,
      inset 0 8px 15px rgba(0, 0, 0, 0.6);
    filter: brightness(0.85);
  }

  @media (max-width: 760px) {
    .button .text {
      min-width: 220px;
      min-height: 58px;
      padding: 12px 22px;
      font-size: 18px;
      gap: 10px;
    }

    .button:hover .text svg {
      right: 18px;
    }
  }

  @media (max-width: 420px) {
    .button .text {
      min-width: 200px;
      min-height: 52px;
      padding: 10px 18px;
      font-size: 16px;
    }
  }`;

export default Button1;
