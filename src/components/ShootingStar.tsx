import { useEffect, useState, useCallback } from 'react';
import styled from '@emotion/styled';
import { motion } from 'framer-motion';

const Star = styled(motion.div)`
  position: fixed;
  width: 3px;
  height: 3px;
  background: white;
  border-radius: 50%;
  pointer-events: none;
  z-index: 1000;
  mix-blend-mode: screen;
  filter: blur(1px);
  box-shadow: 
    0 0 10px rgba(255, 255, 255, 0.9),
    0 0 20px rgba(255, 255, 255, 0.7),
    0 0 30px rgba(255, 255, 255, 0.5),
    0 0 40px rgba(255, 255, 255, 0.3);
`;

const Trail = styled(motion.div)`
  position: fixed;
  width: 2px;
  height: 2px;
  background: linear-gradient(
    to right,
    rgba(255, 255, 255, 0.9),
    rgba(255, 255, 255, 0.6),
    rgba(255, 255, 255, 0)
  );
  pointer-events: none;
  z-index: 999;
  mix-blend-mode: screen;
  filter: blur(1px);
  box-shadow: 
    0 0 8px rgba(255, 255, 255, 0.8),
    0 0 16px rgba(255, 255, 255, 0.4);
`;

const ShootingStar = () => {
  const [stars, setStars] = useState<Array<{ 
    id: number; 
    x: number; 
    y: number;
    trail: Array<{ x: number; y: number }>;
  }>>([]);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [prevMousePosition, setPrevMousePosition] = useState({ x: 0, y: 0 });

  const createStar = useCallback((e: MouseEvent) => {
    const distance = Math.sqrt(
      Math.pow(e.clientX - prevMousePosition.x, 2) + 
      Math.pow(e.clientY - prevMousePosition.y, 2)
    );

    // Only create stars if mouse has moved enough
    if (distance < 8) return;

    setPrevMousePosition(mousePosition);
    setMousePosition({ x: e.clientX, y: e.clientY });
    
    // Create new star with minimal trail
    const newStar = {
      id: Date.now(),
      x: e.clientX,
      y: e.clientY,
      trail: [
        { x: prevMousePosition.x, y: prevMousePosition.y }
      ]
    };
    
    setStars(prev => [...prev, newStar]);
    
    // Remove star after animation
    setTimeout(() => {
      setStars(prev => prev.filter(star => star.id !== newStar.id));
    }, 600);
  }, [mousePosition, prevMousePosition]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      createStar(e);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [createStar]);

  return (
    <>
      {stars.map(star => (
        <>
          <Star
            key={`star-${star.id}`}
            initial={{ 
              x: star.trail[0].x,
              y: star.trail[0].y,
              opacity: 1,
              scale: 1
            }}
            animate={{ 
              x: star.x,
              y: star.y,
              opacity: 0,
              scale: 0
            }}
            transition={{
              duration: 0.6,
              ease: [0.4, 0, 0.2, 1],
              times: [0, 1]
            }}
          />
          {star.trail.map((point, index) => (
            <Trail
              key={`trail-${star.id}-${index}`}
              initial={{ 
                x: point.x,
                y: point.y,
                opacity: 1,
                scale: 1
              }}
              animate={{ 
                x: point.x,
                y: point.y,
                opacity: 0,
                scale: 0
              }}
              transition={{
                duration: 0.6,
                ease: [0.4, 0, 0.2, 1],
                times: [0, 1]
              }}
            />
          ))}
        </>
      ))}
    </>
  );
};

export default ShootingStar; 