import { useEffect, useState } from 'react';
import styled from '@emotion/styled';

const CursorWrapper = styled.div`
  position: fixed;
  width: 32px;
  height: 32px;
  pointer-events: none;
  z-index: 99999;
  background-image: url('/mango-cursor.png');
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
  transform: translate(-50%, -50%);
  filter: invert(1);
  mix-blend-mode: difference;
`;

const CustomCursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const updatePosition = (e: MouseEvent) => {
      requestAnimationFrame(() => {
        setPosition({ x: e.clientX, y: e.clientY });
      });
    };

    document.body.style.cursor = 'none';
    window.addEventListener('mousemove', updatePosition);
    
    return () => {
      document.body.style.cursor = 'auto';
      window.removeEventListener('mousemove', updatePosition);
    };
  }, []);

  return (
    <CursorWrapper 
      style={{ 
        left: `${position.x}px`, 
        top: `${position.y}px`
      }} 
    />
  );
};

export default CustomCursor; 