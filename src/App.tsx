import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import  PolicyList  from './components/PolicyList';
import  PolicyDetails  from './components/PolicyDetails';

 const App: React.FC = () => {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<PolicyList/>} />
          <Route path="/apolices/:id" element={<PolicyDetails/>} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;