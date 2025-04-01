import { useEffect, useState, useRef } from 'react';
import styled from '@emotion/styled';
import { motion, useScroll, useTransform } from 'framer-motion';
import ShootingStar from './ShootingStar';
import ScrollProgress from './ScrollProgress';

const HomeContainer = styled.div`
  min-height: 300vh;
  width: 100vw;
  position: relative;
  overflow-x: hidden;
`;

const CursorGlow = styled(motion.div)`
  pointer-events: none;
  position: fixed;
  width: 20px;
  height: 20px;
  background: radial-gradient(circle, rgba(0, 100, 0, 0.8), rgba(0, 80, 0, 0.6));
  border-radius: 50%;
  transform: translate(-50%, -50%);
  z-index: 1000;
  mix-blend-mode: screen;
  filter: blur(2px);
`;

const HeroSection = styled.div`
  height: 100vh;
  width: 100vw;
  position: relative;
  background-image: url('/mango-farm.jpg');
  background-size: cover;
  background-position: center 65%;
  background-attachment: fixed;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(
      to bottom,
      rgba(0, 0, 0, 0.4),
      rgba(0, 0, 0, 0.2)
    );
    z-index: 1;
  }

  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: radial-gradient(
      circle at center,
      transparent 0%,
      rgba(0, 0, 0, 0.3) 100%
    );
    z-index: 1;
  }
`;

const BlurredBackground = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-image: url('/mango-farm.jpg');
  background-size: cover;
  background-position: center;
  filter: blur(10px);
  opacity: 0;
  z-index: 1;
`;

const ContentWrapper = styled(motion.div)`
  position: relative;
  z-index: 2;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  padding: 0 20px;
  color: white;
`;

const Title = styled(motion.h1)`
  font-size: 7.5rem;
  font-weight: 900;
  margin-bottom: 1.5rem;
  letter-spacing: 6px;
  font-family: 'Playfair Display', serif;
  color: white;
  text-shadow: 
    2px 2px 0 rgba(0, 0, 0, 0.5),
    -2px -2px 0 rgba(0, 0, 0, 0.5),
    2px -2px 0 rgba(0, 0, 0, 0.5),
    -2px 2px 0 rgba(0, 0, 0, 0.5),
    0 0 20px rgba(0, 0, 0, 0.5);
  position: relative;
  z-index: 2;
  
  &::after {
    content: '';
    position: absolute;
    bottom: -10px;
    left: 50%;
    transform: translateX(-50%);
    width: 150px;
    height: 4px;
    background: white;
    border-radius: 2px;
    box-shadow: 0 0 20px rgba(255, 255, 255, 0.5);
  }
`;

const Subtitle = styled(motion.p)`
  font-size: 2rem;
  opacity: 0.95;
  max-width: 700px;
  line-height: 1.6;
  margin-top: 1.5rem;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
  position: relative;
  z-index: 2;
  font-weight: 300;
  letter-spacing: 1px;
`;

const ScrollIndicator = styled(motion.div)`
  position: absolute;
  bottom: 40px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  color: white;
  cursor: pointer;
  z-index: 2;
  font-size: 1.2rem;
  letter-spacing: 2px;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.5);
  font-weight: 300;
  opacity: 0.8;
  transition: all 0.3s ease;

  &:hover {
    opacity: 1;
    transform: translateX(-50%) translateY(-5px);
  }

  .arrow {
    width: 24px;
    height: 24px;
    border-right: 3px solid white;
    border-bottom: 3px solid white;
    transform: rotate(45deg);
    margin-top: 15px;
    animation: bounce 2s infinite;
    box-shadow: 0 0 10px rgba(255, 255, 255, 0.3);
  }

  @keyframes bounce {
    0%, 20%, 50%, 80%, 100% {
      transform: translateY(0) rotate(45deg);
    }
    40% {
      transform: translateY(-15px) rotate(45deg);
    }
    60% {
      transform: translateY(-7px) rotate(45deg);
    }
  }
`;

const VideoSectionWrapper = styled(motion.div)`
  min-height: 100vh;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  z-index: 2;
  padding: 6rem 2rem;
  background: linear-gradient(
    to bottom,
    rgba(0, 0, 0, 0.95),
    rgba(0, 0, 0, 0.85)
  );

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 2px;
    background: linear-gradient(
      to right,
      transparent,
      rgba(255, 255, 255, 0.3),
      transparent
    );
  }
`;

const VideoContainer = styled(motion.div)`
  width: 95%;
  max-width: 1800px;
  aspect-ratio: 16/9;
  position: relative;
  box-shadow: 
    0 20px 40px rgba(0, 0, 0, 0.5),
    0 0 30px rgba(0, 100, 0, 0.2);
  border-radius: 20px;
  overflow: hidden;
  border: 2px solid rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);

  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(
      45deg,
      rgba(255,255,255,0.1) 0%,
      rgba(255,255,255,0) 100%
    );
    border-radius: 20px;
    z-index: 1;
  }

  iframe {
    border-radius: 20px;
    transform: scale(1.02);
    transition: transform 0.3s ease;

    &:hover {
      transform: scale(1.03);
    }
  }
`;

const StorySection = styled.div`
  min-height: 100vh;
  width: 100%;
  position: relative;
  background: linear-gradient(135deg, #1a472a, #2d5a3f);
  padding: 6rem 2rem;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 30c4-8 2-16-4-16s-8 8-4 16 10 8 16 8-8-4-8-8z' fill='%23ffffff10' fill-opacity='0.1' fill-rule='evenodd'/%3E%3C/svg%3E");
    opacity: 0.1;
  }
`;

const StoryTitle = styled.h2`
  font-size: 4.5rem;
  font-weight: 800;
  color: white;
  text-align: center;
  margin-bottom: 4rem;
  font-family: 'Playfair Display', serif;
  letter-spacing: 2px;
  text-shadow: 
    2px 2px 0 rgba(0, 0, 0, 0.5),
    -2px -2px 0 rgba(0, 0, 0, 0.5),
    2px -2px 0 rgba(0, 0, 0, 0.5),
    -2px 2px 0 rgba(0, 0, 0, 0.5),
    0 0 20px rgba(0, 0, 0, 0.5);
  position: relative;
  z-index: 3;
  
  &::after {
    content: '';
    position: absolute;
    bottom: -10px;
    left: 50%;
    transform: translateX(-50%);
    width: 100px;
    height: 4px;
    background: white;
    border-radius: 2px;
    box-shadow: 0 0 10px rgba(255, 255, 255, 0.5);
  }
`;

const TimelineContainer = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  position: relative;
  z-index: 2;
  padding: 0 2rem;

  &::before {
    content: '';
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    width: 6px;
    height: calc(100% - 100px);
    background: rgba(255, 255, 255, 0.4);
    top: 50px;
    border-radius: 3px;
  }
`;

const TimelineBox = styled(motion.div)`
  width: 500px;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border-radius: 20px;
  padding: 3rem;
  margin: 6rem 0;
  position: relative;
  color: white;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
  
  &:nth-of-type(odd) {
    margin-right: auto;
    margin-left: 8rem;
    
    &::before {
      content: '';
      position: absolute;
      right: -100px;
      top: 50%;
      width: 100px;
      height: 4px;
      background: rgba(255, 255, 255, 0.4);
      transform: translateY(-50%);
    }

    &::after {
      content: '';
      position: absolute;
      right: -103px;
      top: 50%;
      width: 16px;
      height: 16px;
      background: white;
      border: 4px solid #2d5a3f;
      border-radius: 50%;
      transform: translateY(-50%);
      box-shadow: 0 0 10px rgba(255, 255, 255, 0.5);
    }
  }
  
  &:nth-of-type(even) {
    margin-left: auto;
    margin-right: 8rem;
    
    &::before {
      content: '';
      position: absolute;
      left: -100px;
      top: 50%;
      width: 100px;
      height: 4px;
      background: rgba(255, 255, 255, 0.4);
      transform: translateY(-50%);
    }

    &::after {
      content: '';
      position: absolute;
      left: -103px;
      top: 50%;
      width: 16px;
      height: 16px;
      background: white;
      border: 4px solid #2d5a3f;
      border-radius: 50%;
      transform: translateY(-50%);
      box-shadow: 0 0 10px rgba(255, 255, 255, 0.5);
    }
  }

  &::before {
    &::after {
      content: '';
      position: absolute;
      left: 50%;
      top: 50%;
      width: 20px;
      height: 20px;
      background: white;
      border: 4px solid #2d5a3f;
      border-radius: 50%;
      transform: translate(-50%, -50%);
      box-shadow: 0 0 10px rgba(255, 255, 255, 0.5);
    }
  }
`;

const TimelineImage = styled.div`
  width: 100%;
  height: 300px;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 12px;
  margin-bottom: 2rem;
  overflow: hidden;
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const TimelineTitle = styled.h3`
  font-size: 2.2rem;
  margin-bottom: 1.5rem;
  font-family: 'Playfair Display', serif;
  color: #fff;
`;

const TimelineContent = styled.p`
  font-size: 1.3rem;
  line-height: 1.6;
  color: rgba(255, 255, 255, 0.8);
`;

const ContactSection = styled.div`
  min-height: 60vh;
  width: 100vw;
  background: rgba(0, 0, 0, 0.6);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 4rem 2rem;
  position: relative;
  overflow: hidden;
  margin-left: calc(-50vw + 50%);
  margin-right: calc(-50vw + 50%);

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 2px;
    background: linear-gradient(to right, transparent, rgba(255, 255, 255, 0.9), transparent);
  }
`;

const ContactTitle = styled.h2`
  font-size: 4rem;
  font-weight: 900;
  color: #ffffff;
  text-align: center;
  margin-bottom: 4rem;
  font-family: 'Playfair Display', serif;
  letter-spacing: 3px;
  text-shadow: 
    2px 2px 0 rgba(0, 0, 0, 0.9),
    -2px -2px 0 rgba(0, 0, 0, 0.9),
    2px -2px 0 rgba(0, 0, 0, 0.9),
    -2px 2px 0 rgba(0, 0, 0, 0.9),
    0 0 30px rgba(0, 0, 0, 0.9);
  position: relative;
  z-index: 3;
  
  &::after {
    content: '';
    position: absolute;
    bottom: -15px;
    left: 50%;
    transform: translateX(-50%);
    width: 150px;
    height: 4px;
    background: #ffffff;
    border-radius: 2px;
    box-shadow: 0 0 20px rgba(255, 255, 255, 0.9);
  }
`;

const ContactDetails = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2.5rem;
  align-items: center;
  background: rgba(0, 0, 0, 0.4);
  padding: 4rem 5rem;
  border-radius: 30px;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.5);
  border: 2px solid rgba(255, 255, 255, 0.4);
  max-width: 800px;
  width: 90%;
  position: relative;
  z-index: 2;
  backdrop-filter: blur(10px);

  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(45deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0) 100%);
    border-radius: 30px;
    z-index: -1;
  }
`;

const ContactLink = styled.a`
  color: #ffffff;
  text-decoration: none;
  font-size: 1.6rem;
  display: flex;
  align-items: center;
  gap: 1.5rem;
  padding: 1.5rem 3rem;
  border-radius: 15px;
  transition: all 0.3s ease;
  background: rgba(255, 255, 255, 0.1);
  border: 2px solid rgba(255, 255, 255, 0.3);
  width: 100%;
  justify-content: center;
  font-weight: 500;
  
  &:hover {
    background: rgba(255, 255, 255, 0.2);
    transform: translateY(-3px);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.5);
    border-color: rgba(255, 255, 255, 0.6);
  }

  svg {
    font-size: 2rem;
    filter: drop-shadow(0 0 10px rgba(255, 255, 255, 0.9));
  }
`;

const OrderSection = styled.div`
  min-height: 100vh;
  width: 100vw;
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 4rem 2rem;
  position: relative;
  overflow: hidden;
  margin-left: calc(-50vw + 50%);
  margin-right: calc(-50vw + 50%);
`;

const OrderTitle = styled.h2`
  font-size: 4rem;
  font-weight: 900;
  color: #ffffff;
  text-align: center;
  margin-bottom: 4rem;
  font-family: 'Playfair Display', serif;
  letter-spacing: 3px;
  text-shadow: 
    2px 2px 0 rgba(0, 0, 0, 0.9),
    -2px -2px 0 rgba(0, 0, 0, 0.9),
    2px -2px 0 rgba(0, 0, 0, 0.9),
    -2px 2px 0 rgba(0, 0, 0, 0.9),
    0 0 30px rgba(0, 0, 0, 0.9);
  position: relative;
  z-index: 3;
  
  &::after {
    content: '';
    position: absolute;
    bottom: -15px;
    left: 50%;
    transform: translateX(-50%);
    width: 150px;
    height: 4px;
    background: #ffffff;
    border-radius: 2px;
    box-shadow: 0 0 20px rgba(255, 255, 255, 0.9);
  }
`;

const OrderFormContainer = styled.div`
  width: 100%;
  max-width: 1600px;
  height: 1300px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 20px;
  overflow: hidden;
  position: relative;
  z-index: 2;
  backdrop-filter: blur(10px);
  border: 2px solid rgba(255, 255, 255, 0.2);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.5);
  margin: 0 auto;
  padding: 1rem;

  iframe {
    transform: scale(1.5);
    transform-origin: top left;
    width: 66.67%;
    height: 66.67%;
  }
`;

const OrderButton = styled.a`
  display: inline-block;
  margin-top: 2rem;
  padding: 1.2rem 3rem;
  background: linear-gradient(135deg, #1a472a, #2d5a3f);
  color: white;
  text-decoration: none;
  border-radius: 30px;
  font-size: 1.4rem;
  font-weight: 700;
  border: 2px solid rgba(255, 255, 255, 0.3);
  transition: all 0.3s ease;
  backdrop-filter: blur(10px);
  box-shadow: 
    0 10px 20px rgba(0, 0, 0, 0.5),
    0 0 20px rgba(45, 90, 63, 0.3);
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.8);
  position: relative;
  z-index: 1000;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      90deg,
      transparent,
      rgba(255, 255, 255, 0.2),
      transparent
    );
    transition: 0.5s;
  }
  
  &:hover {
    background: linear-gradient(135deg, #2d5a3f, #1a472a);
    transform: translateY(-3px);
    box-shadow: 
      0 15px 30px rgba(0, 0, 0, 0.7),
      0 0 30px rgba(45, 90, 63, 0.5);
    border-color: rgba(255, 255, 255, 0.6);
    
    &::before {
      left: 100%;
    }
  }
`;

const ProductsSection = styled.section`
  min-height: 100vh;
  width: 100%;
  background: linear-gradient(to bottom, #000000, #0a1f12);
  padding: 6rem 2rem;
  position: relative;
  z-index: 2;
`;

const ProductsTitle = styled.h2`
  font-size: 4rem;
  font-weight: 900;
  color: white;
  text-align: center;
  margin-bottom: 4rem;
  font-family: 'Playfair Display', serif;
  text-shadow: 
    2px 2px 0 rgba(0, 0, 0, 0.5),
    -2px -2px 0 rgba(0, 0, 0, 0.5),
    2px -2px 0 rgba(0, 0, 0, 0.5),
    -2px 2px 0 rgba(0, 0, 0, 0.5);
`;

const ProductsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;
  max-width: 1600px;
  margin: 0 auto;
  padding: 0 2rem;
`;

const ProductCard = styled.div`
  position: relative;
  height: 400px;
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.3);
  cursor: pointer;
`;

const ProductImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s ease;
`;

const ProductName = styled.h3`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 1rem;
  background: rgba(0, 0, 0, 0.7);
  color: white;
  margin: 0;
  text-align: center;
  font-size: 1.5rem;
  font-weight: 600;
  z-index: 2;
`;

const ProductInfo = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.9);
  padding: 2rem;
  color: white;
  transform: translateY(100%);
  transition: transform 0.5s ease;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  z-index: 1;

  h4 {
    font-size: 1.8rem;
    margin-bottom: 1rem;
    color: #90EE90;
  }

  p {
    font-size: 1.1rem;
    line-height: 1.6;
    margin: 0;
  }
`;

const ProductPrice = styled.div`
  margin-top: 1rem;
  font-size: 1.4rem;
  font-weight: 600;
  color: #90EE90;
`;

const Home = () => {
  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0, 0.15], [1, 0]);
  const blurOpacity = useTransform(scrollYProgress, [0.05, 0.15], [0, 0.95]);
  const videoOpacity = useTransform(scrollYProgress, [0.05, 0.15], [0, 1]);
  const videoScale = useTransform(scrollYProgress, [0.05, 0.15], [0.9, 1]);
  
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [prevMousePosition, setPrevMousePosition] = useState({ x: 0, y: 0 });

  const storyRef = useRef<HTMLDivElement>(null);
  const contactRef = useRef<HTMLDivElement>(null);
  const orderRef = useRef<HTMLDivElement>(null);
  const productsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setPrevMousePosition(mousePosition);
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mousePosition]);

  const handleScroll = () => {
    window.scrollTo({
      top: window.innerHeight * 0.7,
      behavior: 'smooth'
    });
  };

  const timelineItems = [
    { 
      title: "Our Beginnings", 
      content: "The story of Shayani Farms began with a dream and a small plot of land.",
      image: "/Our_Beginnings.jpg"
    },
    { 
      title: "First Harvest", 
      content: "Our first successful mango harvest marked the beginning of something special.",
      image: "/First_Harvest.jpg"
    },
    { 
      title: "Growing Together", 
      content: "As our orchards grew, so did our family of dedicated farmers.",
      image: "/Growing_Together.jpg"
    },
    { 
      title: "Sustainable Practices", 
      content: "We implemented eco-friendly farming methods to protect our environment.",
      image: "/Sustainable_Practices.jpg"
    },
    { 
      title: "Community Impact", 
      content: "Creating jobs and supporting local communities became our mission.",
      image: "/Community_Impact.jpg"
    },
    { 
      title: "Looking Forward", 
      content: "Continuing our journey of growth while maintaining our commitment to quality.",
      image: "/Looking_forward.jpg"
    }
  ];

  const products = [
    {
      id: 1,
      name: "Methamba",
      image: "/methamba.jpg",
      description: "Authentic Maharastrian relish made with Raw Mangoes and Spices. Raw Mangoes and Fenugreek seeds have a large variety of health benefits while making the pickle, mouth watering.",
      price: "220 per 250g"
    },
    {
      id: 2,
      name: "Avakaya Classic",
      image: "/methamba.jpg",
      description: "Traditional Godavari style mango pickle with authentic spices and perfect blend of flavors.",
      price: "200 per 250g"
    },
    {
      id: 3,
      name: "Bellam Avakaya",
      image: "/methamba.jpg",
      description: "Sweet and spicy variation of Avakaya made with jaggery, perfect for those who prefer a balanced taste.",
      price: "200 per 250g"
    },
    {
      id: 4,
      name: "Tamil Nati Style Sambar Powder",
      image: "/methamba.jpg",
      description: "Authentic sambar powder made by our farm help, with traditional recipe and finest ingredients.",
      price: "99 per 100g"
    },
    {
      id: 5,
      name: "Mango Chutney",
      image: "/methamba.jpg",
      description: "Sweet and tangy chutney made from ripe mangoes, perfect as a condiment.",
      price: "180 per 250g"
    },
    {
      id: 6,
      name: "Mango Jam",
      image: "/methamba.jpg",
      description: "Pure mango jam without any artificial preservatives, made from our farm-fresh mangoes.",
      price: "200 per 250g"
    },
    {
      id: 7,
      name: "Mango Pickle",
      image: "/methamba.jpg",
      description: "Traditional mango pickle with perfect blend of spices and oil.",
      price: "180 per 250g"
    },
    {
      id: 8,
      name: "Mango Salsa",
      image: "/methamba.jpg",
      description: "Fresh and zesty mango salsa perfect for chips and tacos.",
      price: "160 per 250g"
    },
    {
      id: 9,
      name: "Mango Ice Cream",
      image: "/methamba.jpg",
      description: "Creamy mango ice cream made with real mango pulp and fresh cream.",
      price: "250 per 500g"
    }
  ];

  return (
    <HomeContainer>
      <ShootingStar />
      <ScrollProgress />
      <CursorGlow
        animate={{
          x: mousePosition.x,
          y: mousePosition.y,
          rotate: Math.atan2(
            mousePosition.y - prevMousePosition.y,
            mousePosition.x - prevMousePosition.x
          ) * (180 / Math.PI),
        }}
        transition={{
          type: "spring",
          damping: 15,
          stiffness: 150
        }}
      />
      <BlurredBackground style={{ opacity: blurOpacity }} />
      <HeroSection>
        <ContentWrapper style={{ opacity }}>
          <Title
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            Shayani Farms
          </Title>
          <Subtitle
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
          >
            Where Nature's Finest Mangoes Flourish
          </Subtitle>
        </ContentWrapper>
        <ScrollIndicator
          onClick={handleScroll}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
        >
          Scroll to explore
          <div className="arrow" />
        </ScrollIndicator>
      </HeroSection>
      <VideoSectionWrapper>
        <VideoContainer
          style={{ 
            opacity: videoOpacity,
            scale: videoScale,
          }}
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, margin: "-20%" }}
        >
          <iframe
            width="100%"
            height="100%"
            src="https://www.youtube.com/embed/FkLoJ94zLLU?autoplay=0"
            title="Shayani Farms Video"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </VideoContainer>
      </VideoSectionWrapper>
      <StorySection ref={storyRef} id="our-story">
        <StoryTitle>Our Journey</StoryTitle>
        <TimelineContainer>
          {timelineItems.map((item, index) => (
            <TimelineBox
              key={index}
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
            >
              <TimelineImage>
                <img src={item.image} alt={item.title} />
              </TimelineImage>
              <TimelineTitle>{item.title}</TimelineTitle>
              <TimelineContent>{item.content}</TimelineContent>
            </TimelineBox>
          ))}
        </TimelineContainer>
      </StorySection>
      <ProductsSection ref={productsRef} id="products">
        <ProductsTitle>Our Products</ProductsTitle>
        <ProductsGrid>
          {products.map((product) => (
            <ProductCard
              key={product.id}
              onMouseEnter={(e) => {
                const info = e.currentTarget.querySelector('div:last-child') as HTMLElement;
                const image = e.currentTarget.querySelector('img') as HTMLElement;
                if (info && image) {
                  info.style.transform = 'translateY(0)';
                  image.style.transform = 'translateY(100%)';
                }
              }}
              onMouseLeave={(e) => {
                const info = e.currentTarget.querySelector('div:last-child') as HTMLElement;
                const image = e.currentTarget.querySelector('img') as HTMLElement;
                if (info && image) {
                  info.style.transform = 'translateY(100%)';
                  image.style.transform = 'translateY(0)';
                }
              }}
            >
              <ProductImage src={product.image} alt={product.name} />
              <ProductName>{product.name}</ProductName>
              <ProductInfo>
                <h4>{product.name}</h4>
                <p>{product.description}</p>
                <ProductPrice>{product.price}</ProductPrice>
              </ProductInfo>
            </ProductCard>
          ))}
        </ProductsGrid>
      </ProductsSection>
      <OrderSection ref={orderRef} id="order">
        <OrderTitle>Place Your Order</OrderTitle>
        <OrderFormContainer>
          <iframe
            src="https://forms.gle/Le3dQJVo9mb8eWS67"
            width="100%"
            height="100%"
            frameBorder="0"
            marginHeight={0}
            marginWidth={0}
            title="Order Form"
            style={{ borderRadius: '16px' }}
          >
            Loading…
          </iframe>
        </OrderFormContainer>
        <OrderButton 
          href="https://forms.gle/Le3dQJVo9mb8eWS67" 
          target="_blank" 
          rel="noopener noreferrer"
        >
          Open Order Form in New Tab
        </OrderButton>
      </OrderSection>
      <ContactSection ref={contactRef} id="contact">
        <ContactTitle>Get in Touch</ContactTitle>
        <ContactDetails>
          <ContactLink 
            href="https://wa.me/919902246847" 
            target="_blank" 
            rel="noopener noreferrer"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="24" height="24">
              <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91C2.13 13.66 2.59 15.36 3.45 16.86L2.05 22L7.3 20.62C8.75 21.41 10.38 21.83 12.04 21.83C17.5 21.83 21.95 17.38 21.95 11.92C21.95 9.27 20.92 6.78 19.05 4.91C17.18 3.04 14.69 2 12.04 2ZM12.05 3.67C14.25 3.67 16.31 4.53 17.87 6.09C19.42 7.65 20.28 9.72 20.28 11.92C20.28 16.46 16.58 20.16 12.04 20.16C10.56 20.16 9.11 19.76 7.85 19L7.55 18.83L4.43 19.65L5.26 16.61L5.06 16.29C4.24 15 3.8 13.47 3.8 11.91C3.8 7.37 7.5 3.67 12.05 3.67ZM8.53 7.33C8.37 7.33 8.1 7.39 7.87 7.64C7.65 7.89 7 8.5 7 9.71C7 10.93 7.89 12.1 8 12.27C8.14 12.44 9.76 14.94 12.25 16C12.84 16.27 13.3 16.42 13.66 16.53C14.25 16.72 14.79 16.69 15.22 16.63C15.7 16.56 16.68 16.03 16.89 15.45C17.1 14.87 17.1 14.38 17.04 14.27C16.97 14.17 16.81 14.11 16.56 14C16.31 13.86 15.09 13.26 14.87 13.18C14.64 13.1 14.5 13.06 14.31 13.3C14.15 13.55 13.67 14.11 13.53 14.27C13.38 14.44 13.24 14.46 13 14.34C12.74 14.21 11.94 13.95 11 13.11C10.26 12.45 9.77 11.64 9.62 11.39C9.5 11.15 9.61 11 9.73 10.89C9.84 10.78 10 10.6 10.1 10.45C10.23 10.31 10.27 10.2 10.35 10.04C10.43 9.87 10.39 9.73 10.33 9.61C10.27 9.5 9.77 8.26 9.56 7.77C9.36 7.29 9.16 7.35 9 7.34C8.86 7.34 8.7 7.33 8.53 7.33Z"/>
            </svg>
            +91 9902246847
          </ContactLink>
          <ContactLink 
            href="mailto:shayani.farms@gmail.com"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="24" height="24">
              <path d="M20 4H4C2.9 4 2.01 4.9 2.01 6L2 18C2 19.1 2.9 20 4 20H20C21.1 20 22 19.1 22 18V6C22 4.9 21.1 4 20 4ZM20 8L12 13L4 8V6L12 11L20 6V8Z"/>
            </svg>
            shayani.farms@gmail.com
          </ContactLink>
          <ContactLink 
            href="https://www.instagram.com/shayanifarmdiary/" 
            target="_blank" 
            rel="noopener noreferrer"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="24" height="24">
              <path d="M12 2C14.717 2 15.056 2.01 16.122 2.06C17.187 2.11 17.912 2.277 18.55 2.525C19.21 2.779 19.766 3.123 20.322 3.678C20.8305 4.1779 21.224 4.78259 21.475 5.45C21.722 6.087 21.89 6.813 21.94 7.878C21.987 8.944 22 9.283 22 12C22 14.717 21.99 15.056 21.94 16.122C21.89 17.187 21.722 17.912 21.475 18.55C21.2247 19.2178 20.8311 19.8226 20.322 20.322C19.822 20.8303 19.2173 21.2238 18.55 21.475C17.913 21.722 17.187 21.89 16.122 21.94C15.056 21.987 14.717 22 12 22C9.283 22 8.944 21.99 7.878 21.94C6.813 21.89 6.088 21.722 5.45 21.475C4.78233 21.2245 4.17753 20.8309 3.678 20.322C3.16941 19.8222 2.77593 19.2175 2.525 18.55C2.277 17.913 2.11 17.187 2.06 16.122C2.013 15.056 2 14.717 2 12C2 9.283 2.01 8.944 2.06 7.878C2.11 6.812 2.277 6.088 2.525 5.45C2.77524 4.78218 3.1688 4.17732 3.678 3.678C4.17767 3.16923 4.78243 2.77573 5.45 2.525C6.088 2.277 6.812 2.11 7.878 2.06C8.944 2.013 9.283 2 12 2ZM12 7C10.6739 7 9.40215 7.52678 8.46447 8.46447C7.52678 9.40215 7 10.6739 7 12C7 13.3261 7.52678 14.5979 8.46447 15.5355C9.40215 16.4732 10.6739 17 12 17C13.3261 17 14.5979 16.4732 15.5355 15.5355C16.4732 14.5979 17 13.3261 17 12C17 10.6739 16.4732 9.40215 15.5355 8.46447C14.5979 7.52678 13.3261 7 12 7ZM18.5 6.75C18.5 6.41848 18.3683 6.10054 18.1339 5.86612C17.8995 5.6317 17.5815 5.5 17.25 5.5C16.9185 5.5 16.6005 5.6317 16.3661 5.86612C16.1317 6.10054 16 6.41848 16 6.75C16 7.08152 16.1317 7.39946 16.3661 7.63388C16.6005 7.8683 16.9185 8 17.25 8C17.5815 8 17.8995 7.8683 18.1339 7.63388C18.3683 7.39946 18.5 7.08152 18.5 6.75ZM12 9C12.7956 9 13.5587 9.31607 14.1213 9.87868C14.6839 10.4413 15 11.2044 15 12C15 12.7956 14.6839 13.5587 14.1213 14.1213C13.5587 14.6839 12.7956 15 12 15C11.2044 15 10.4413 14.6839 9.87868 14.1213C9.31607 13.5587 9 12.7956 9 12C9 11.2044 9.31607 10.4413 9.87868 9.87868C10.4413 9.31607 11.2044 9 12 9Z"/>
            </svg>
            @Shayanifarmdiary
          </ContactLink>
        </ContactDetails>
      </ContactSection>
    </HomeContainer>
  );
};

export default Home; 