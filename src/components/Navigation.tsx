import styled from '@emotion/styled';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const Nav = styled.nav`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  padding: 1.5rem 2rem;
  display: grid;
  grid-template-columns: 200px 1fr 200px;
  align-items: center;
  z-index: 1000;
  background: rgba(0, 0, 0, 0.2);
  backdrop-filter: blur(10px);
`;

const Logo = styled.button`
  font-size: 1.8rem;
  font-weight: bold;
  color: #fff;
  text-decoration: none;
  font-family: 'Playfair Display', serif;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
`;

const NavLinks = styled.div`
  display: flex;
  gap: 4rem;
  align-items: center;
  justify-content: center;
`;

const NavItem = styled.button`
  color: #fff;
  text-decoration: none;
  font-weight: 500;
  font-size: 1.3rem;
  position: relative;
  padding: 0.5rem 0;
  opacity: 0.9;
  transition: opacity 0.3s ease;
  background: none;
  border: none;
  cursor: pointer;

  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 0;
    height: 2px;
    background: #fff;
    transition: width 0.3s ease;
  }

  &:hover {
    opacity: 1;
    &::after {
      width: 100%;
    }
  }
`;

const ContactButton = styled(Link)`
  color: #fff;
  text-decoration: none;
  font-weight: 600;
  font-size: 1.2rem;
  padding: 0.8rem 1.5rem;
  border: 2px solid white;
  border-radius: 30px;
  transition: all 0.3s ease;
  justify-self: end;

  &:hover {
    background: white;
    color: black;
  }
`;

const Navigation = () => {
  const handleNavClick = (id: string) => {
    if (id === 'home') {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    } else {
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const navItems = [
    { title: 'Home', id: 'home' },
    { title: 'Our Story', id: 'our-story' },
    { title: 'Our Products', id: 'products' },
    { title: 'Order Now', id: 'order' }
  ];

  return (
    <Nav>
      <Logo onClick={() => handleNavClick('home')}>
        <motion.span
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          Shayani Farms
        </motion.span>
      </Logo>
      <NavLinks>
        {navItems.map((item, index) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <NavItem onClick={() => handleNavClick(item.id)}>
              {item.title}
            </NavItem>
          </motion.div>
        ))}
      </NavLinks>
      <NavItem onClick={() => handleNavClick('contact')}>
        Contact
      </NavItem>
    </Nav>
  );
};

export default Navigation; 