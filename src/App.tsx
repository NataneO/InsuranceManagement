import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import { PolicyList } from './assets/components/PolicyList';
import { PolicyDetails } from './assets/components/PolicyDetails';
import { PolicyForm } from './assets/components/PolicyForm';


 const App: React.FC = () => {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Policies</Link>
            </li>
            <li>
              <Link to="/create">Create Policy</Link>
            </li>
          </ul>
        </nav>
        <Routes>
          <Route path="/" element={<PolicyList/>} />
          <Route path="/create" element={<PolicyForm/>} />
          <Route path="/apolices/:id" element={<PolicyDetails/>} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;