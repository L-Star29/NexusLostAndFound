import styled from 'styled-components';
import topographic from '../assets/topographic.jpg';
import Banner from './Banner.tsx';

function Hero() {
  return (
    <HeroSection id="hero">
      <BackgroundPattern aria-hidden="true">
        <div className="image" />
      </BackgroundPattern>

      <Content>
        <p className="eyebrow">Lost and found, without the chaos</p>
        <h1>
          Find <span style={{color: '#f28c28'}}>what</span> you lost.
          <br />
          Return what you <span style={{color: '#2c6bdff7'}}>found.</span>
        </h1>
        <p className="subtext">
          A community-powered platform that helps people reconnect with misplaced belongings and makes it easy
          for good samaritans to report, match, and return found items.
        </p>
      </Content>
    </HeroSection>

    
  );
}

const HeroSection = styled.section`
  margin-top: -150px;
  position: relative;
  min-height: 100vh;
  overflow: hidden;
  display: flex;
  align-items: center;
  padding: 8.5rem clamp(1.5rem, 4vw, 4rem) 4rem;
  background:
    radial-gradient(circle at top right, rgba(141, 110, 74, 0.16), transparent 30%),
    linear-gradient(90deg, #050505 0%, #050505 38%, #0a0a0a 52%, #1d2428 100%);
  color: #f8f4eb;

  @media (max-width: 700px) {
    padding-top: 9.5rem;
  }
`;

const BannerSlot = styled.div`
  position: absolute;
  top: 1.25rem;
  left: clamp(1rem, 2vw, 1.5rem);
  right: clamp(1rem, 2vw, 1.5rem);
  z-index: 2;
`;

const BackgroundPattern = styled.div`
  position: absolute;
  inset: 0;
  z-index: 0;
  pointer-events: none;
  contrast: 0.8;

  .image {
    position: absolute;
    inset: 0;
    background-image:
      linear-gradient(
        90deg,
        rgba(5, 5, 5, 1) 0%,
        rgba(5, 5, 5, 0.97) 16%,
        rgba(5, 5, 5, 0.84) 34%,
        rgba(5, 5, 5, 0.44) 56%,
        rgba(5, 5, 5, 0.1) 74%,
        rgba(5, 5, 5, 0) 100%
      ),
      url(${topographic});
    background-position: center right;
    background-repeat: no-repeat;
    background-size: cover;
    opacity: 0.72;
  }

  @media (max-width: 700px) {
    .image {
      opacity: 0.48;
    }
  }
`;

const Content = styled.div`
  position: relative;
  z-index: 1;
  width: min(100%, 40rem);
  display: grid;
  gap: 1.25rem;
  padding: clamp(1.75rem, 4vw, 3rem) clamp(1.25rem, 3vw, 2.75rem);
  margin-left: 3rem;

  &::before {
    content: '';
    position: absolute;
    inset: -1.35rem -2rem;
    z-index: -1;
    border-radius: 999px;
    background:
      radial-gradient(circle at 35% 45%, rgba(24, 24, 24, 0.99) 0%, rgba(12, 12, 12, 0.97) 52%, rgba(5, 5, 5, 0.9) 72%, rgba(5, 5, 5, 0) 100%);
    transform: scale(1.28, 1.22);
    filter: blur(6px);
  }

  .eyebrow {
    margin: 0;
    text-transform: uppercase;
    letter-spacing: 0.14em;
    font-size: 0.78rem;
    color: rgba(248, 244, 235, 0.68);
  }

  h1 {
    margin: 0;
    font-size: clamp(2rem, 5vw, 4rem);
    line-height: 1;
    letter-spacing: -0.04em;
    max-width: 20ch;
  }

  .subtext {
    margin: 0;
    max-width: 34rem;
    font-size: clamp(1rem, 2vw, 1.2rem);
    line-height: 1.7;
    color: rgba(248, 244, 235, 0.78);
  }

  @media (max-width: 700px) {
    width: 100%;
    padding: 1.4rem 0.9rem;

    h1 {
      max-width: none;
      font-size: clamp(1.9rem, 8vw, 3rem);
    }

    &::before {
      inset: -1rem -0.6rem;
      transform: scale(1.04, 1.16);
    }
  }
`;

export default Hero;
