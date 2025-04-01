import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import styled from '@emotion/styled';
import Navigation from './components/Navigation';
import CustomCursor from './components/CustomCursor';
import Home from './components/Home';

const AppContainer = styled.div`
  * {
    cursor: none;
  }
`;

function App() {
  return (
    <Router>
      <AppContainer>
        <CustomCursor />
        <Navigation />
        <Routes>
          <Route path="/" element={<Home />} />
          {/* Add other routes as we create them */}
        </Routes>
      </AppContainer>
    </Router>
  );
}

export default App;
