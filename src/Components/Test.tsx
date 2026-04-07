import React from 'react';
import styled from 'styled-components';

const Pattern = () => {
  return (
    <StyledWrapper>
      <div>
        <div className="island" />
        <div className="islandt" />
        <div className="hatch" />
        <svg height={0} width={0}>
          <filter id="octave1">
            <feTurbulence type="fractalNoise" baseFrequency="0.0004" numOctaves={8} seed={4} result="o1" />
            <feTurbulence type="fractalNoise" baseFrequency="0.0008" numOctaves={8} seed={4} result="o2" />
            <feTurbulence type="fractalNoise" baseFrequency="0.0001" numOctaves={8} seed={4} result="o3" />
            <feTurbulence type="fractalNoise" baseFrequency="0.0018" numOctaves={8} seed={4} result="o4" />
            <feMerge result="finalIsland">
              <feMergeNode in="o1" />
              <feMergeNode in="o3" />
              <feMergeNode in="o1" />
              <feMergeNode in="o3" />
            </feMerge>
            <feGaussianBlur in="finalIsland" stdDeviation={5} result="noiseo" />
            <feTurbulence type="fractalNoise" baseFrequency="0.0008" numOctaves={8} seed={4} result="o1" />
            <feTurbulence type="fractalNoise" baseFrequency="0.0016" numOctaves={8} seed={4} result="o2" />
            <feMerge result="noiseo">
              <feMergeNode in="o2" />
              <feMergeNode in="o4" />
              <feMergeNode in="noiseo" />
            </feMerge>
            <feGaussianBlur in="noiseo" stdDeviation={5} result="noiseo" />
            <feTurbulence type="fractalNoise" baseFrequency="0.0016" numOctaves={8} seed={4} result="o1" />
            <feTurbulence type="fractalNoise" baseFrequency="0.002" numOctaves={8} seed={4} result="o2" />
            <feMerge result="noiseo">
              <feMergeNode in="o1" />
              <feMergeNode in="o1" />
              <feMergeNode in="noiseo" />
            </feMerge>
            <feGaussianBlur in="noiseo" stdDeviation={5} result="noiseo" />
            <feDiffuseLighting in="noiseo" surfaceScale={12} diffuseConstant={1} lightingColor="#d7bb98" result="lit">
              <feDistantLight azimuth={90} elevation />
            </feDiffuseLighting>
            <feBlend in="lit" in2="SourceGraphic" mode="normal" />
          </filter>
          <filter id="octave2">
            <feTurbulence type="fractalNoise" baseFrequency="0.0004" numOctaves={8} seed={4} result="o1" />
            <feTurbulence type="fractalNoise" baseFrequency="0.0008" numOctaves={8} seed={4} result="o2" />
            <feTurbulence type="fractalNoise" baseFrequency="0.0001" numOctaves={8} seed={4} result="o3" />
            <feTurbulence type="fractalNoise" baseFrequency="0.0018" numOctaves={8} seed={4} result="o4" />
            <feMerge result="finalIsland">
              <feMergeNode in="o1" />
              <feMergeNode in="o3" />
              <feMergeNode in="o1" />
              <feMergeNode in="o3" />
            </feMerge>
            <feGaussianBlur in="finalIsland" stdDeviation={5} result="noiseo" />
            <feTurbulence type="fractalNoise" baseFrequency="0.0008" numOctaves={8} seed={4} result="o1" />
            <feTurbulence type="fractalNoise" baseFrequency="0.0016" numOctaves={8} seed={4} result="o2" />
            <feMerge result="noiseo">
              <feMergeNode in="o2" />
              <feMergeNode in="o4" />
              <feMergeNode in="noiseo" />
            </feMerge>
            <feGaussianBlur in="noiseo" stdDeviation={5} result="noiseo" />
            <feTurbulence type="fractalNoise" baseFrequency="0.0016" numOctaves={8} seed={4} result="o1" />
            <feTurbulence type="fractalNoise" baseFrequency="0.002" numOctaves={8} seed={4} result="o2" />
            <feMerge result="noiseo">
              <feMergeNode in="o1" />
              <feMergeNode in="o1" />
              <feMergeNode in="noiseo" />
            </feMerge>
            <feGaussianBlur in="noiseo" stdDeviation={5} result="noiseo" />
            <feDiffuseLighting in="noiseo" surfaceScale={12} diffuseConstant={1} lightingColor="#d1bf96" result="lit">
              <feDistantLight azimuth={-90} elevation />
            </feDiffuseLighting>
            <feBlend in="lit" in2="SourceGraphic" mode="normal" />
          </filter>
        </svg>
      </div>
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div`
  .island {
    position: absolute;
    opacity: 0.65;
    width: 100%;
    height: 100%;
    transform: scale(1);
    background: rgb(52, 65, 73);
    filter: url(#octave1) brightness(20) contrast(1);
  }

  .islandt {
    position: absolute;
    opacity: 0.5;
    width: 100%;
    height: 100%;
    transform: scale(1);
    /* Add your background pattern here */
    background: rgb(52, 65, 73);
    filter: url(#octave2) brightness(20) contrast(1);
  }`;

export default Pattern;
