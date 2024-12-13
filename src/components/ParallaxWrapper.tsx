import React, { ReactNode } from 'react';
import { Parallax } from 'react-scroll-parallax';

interface ParallaxWrapperProps {
  children: ReactNode;
  speed?: number;
  className?: string;
}

const ParallaxWrapper: React.FC<ParallaxWrapperProps> = ({
  children,
  speed = 10,
  className = '',
}) => {
  return (
    <Parallax speed={speed} className={className}>
      {children}
    </Parallax>
  );
};

export default ParallaxWrapper;