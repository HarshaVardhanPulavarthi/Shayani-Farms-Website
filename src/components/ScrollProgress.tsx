import styled from '@emotion/styled';
import { motion, useScroll, useSpring, useTransform } from 'framer-motion';

const ScrollContainer = styled(motion.div)`
  position: fixed;
  bottom: 40px;
  right: 40px;
  width: 100px;
  height: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border-radius: 50%;
  cursor: pointer;
  z-index: 1000;
  border: 3px solid rgba(255, 255, 255, 0.2);
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.3);

  @media (max-width: 768px) {
    width: 80px;
    height: 80px;
    bottom: 20px;
    right: 20px;
  }
`;

const MangoIcon = styled(motion.img)`
  width: 70px;
  height: 70px;
  filter: drop-shadow(0 0 10px rgba(255, 255, 255, 0.5));

  @media (max-width: 768px) {
    width: 50px;
    height: 50px;
  }
`;

const PercentageText = styled.div`
  position: absolute;
  color: white;
  font-size: 16px;
  font-weight: bold;
  text-shadow: 0 0 10px rgba(0, 0, 0, 0.5);

  @media (max-width: 768px) {
    font-size: 14px;
  }
`;

const ScrollProgress = () => {
  const { scrollYProgress } = useScroll();
  const rotation = useTransform(scrollYProgress, [0, 1], [0, 360]);
  const springRotation = useSpring(rotation, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <ScrollContainer
      onClick={scrollToTop}
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
    >
      <MangoIcon
        src="/mango-icon.svg"
        alt="Scroll Progress"
        style={{ rotate: springRotation }}
      />
      <PercentageText>
        {Math.round(scrollYProgress.get() * 100)}%
      </PercentageText>
    </ScrollContainer>
  );
};

export default ScrollProgress; 