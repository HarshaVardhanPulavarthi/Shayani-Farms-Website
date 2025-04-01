import { motion, useScroll, useSpring, useTransform } from 'framer-motion';
import styled from '@emotion/styled';

const ScrollContainer = styled(motion.div)`
  position: fixed;
  bottom: 40px;
  right: 40px;
  width: 120px;
  height: 120px;
  border-radius: 50%;
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 0 30px rgba(0, 0, 0, 0.4);
  z-index: 1000;
  backdrop-filter: blur(5px);
  border: 3px solid rgba(255, 255, 255, 0.1);
  transition: transform 0.3s ease;
  cursor: pointer;
  overflow: hidden;
  
  &:hover {
    transform: scale(1.1);
  }
  
  &::before {
    content: '';
    position: absolute;
    inset: -3px;
    border-radius: 50%;
    padding: 3px;
    background: linear-gradient(45deg, #2d5a3f, #1a472a);
    mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
    -webkit-mask-composite: xor;
    mask-composite: exclude;
  }
`;

const MangoIcon = styled(motion.img)`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 50%;
  filter: drop-shadow(0 0 15px rgba(255, 255, 255, 0.4));
`;

const ProgressText = styled.span`
  position: absolute;
  color: white;
  font-size: 18px;
  font-weight: 600;
  text-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
  z-index: 1;
`;

const ScrollProgress = () => {
  const { scrollYProgress } = useScroll();
  const rotate = useTransform(scrollYProgress, [0, 1], [0, 360]);
  const springRotate = useSpring(rotate, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <ScrollContainer
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
    >
      <MangoIcon 
        src="/mango-icon.jpg" 
        style={{ 
          rotate: springRotate,
        }}
      />
      <ProgressText>
        {Math.round(scrollYProgress.get() * 100)}%
      </ProgressText>
    </ScrollContainer>
  );
};

export default ScrollProgress; 