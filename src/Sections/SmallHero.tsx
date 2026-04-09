import styled from 'styled-components';
import topographic from '../assets/topographic.jpg';

function SmallHero() {
  return (
    <HeroSection id="hero" aria-label="Postings hero">
      <Backdrop aria-hidden="true" />
      <Centerpiece>
        <h1>Postings</h1>
      </Centerpiece>
    </HeroSection>
  );
}

const HeroSection = styled.section`
  margin-top: -150px;
  position: relative;
  min-height: clamp(18rem, 46vw, 28rem);
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  padding: clamp(9rem, 14vw, 10.5rem) 1.5rem clamp(3.5rem, 6vw, 5rem);
  background: #0b0b0b;

  @media (max-width: 700px) {
    padding-top: 8.75rem;
  }
`;

const Backdrop = styled.div`
  position: absolute;
  inset: 0;
  background-image:
    linear-gradient(rgba(5, 5, 5, 0.14), rgba(5, 5, 5, 0.2)),
    url(${topographic});
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  transform: scale(1.02);
  filter: brightness(0.5);
`;

const Centerpiece = styled.div`
  position: relative;
  z-index: 1;
  display: grid;
  place-items: center;
  width: 100%;

  h1 {
    margin: 0;
    padding: clamp(1.25rem, 3vw, 1.8rem) clamp(2.4rem, 8vw, 5.5rem);
    border-radius: 999px;
    background: rgba(8, 8, 8, 0.9);
    color: #f8f4eb;
    font-size: clamp(3rem, 9vw, 6.25rem);
    line-height: 1;
    letter-spacing: -0.05em;
    text-align: center;
    box-shadow: 0 20px 50px rgba(0, 0, 0, 0.28);
  }
`;

export default SmallHero;
