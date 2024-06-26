import React, { useState, useEffect } from 'react';

import { makeServer } from '../../mocks/server';
import { Policy } from '../../types';
import axios from 'axios';
import { Link } from 'react-router-dom';

if (process.env.NODE_ENV === "development") {
    makeServer();
  }

export const PolicyList: React.FC = () => {
    const [policies, setPolicies] = useState<Policy[]>([]);
  const [loading, setLoading] = useState(true);


useEffect(() => {
  fetchPolicies();
}, []);

const fetchPolicies = async () => {
  try {
    const response = await axios.get('/api/apolices');

    setPolicies(response.data.content);
    setLoading(false);
  } catch (error) {
    console.error('Error fetching policies:', error);
    setLoading(false);
  }
};

const handleDelete = async (id: number) => {
  try {
    await axios.delete(`/api/apolices/${id}`);
    fetchPolicies();
  } catch (error) {
    console.error('Error deleting policy:', error);
  }
};

if (loading) {
  return <div>Loading...</div>;
}

  return (
    <div>
      <h1>Policy List</h1>
      <ul>
        {policies.map((policy) => (
          <li key={policy.id}>
           {policy.numero}
           <Link to={`/apolices/${policy.id}`}>
          <button>Ver Detalhes</button>
          </Link>
          <button onClick={() => handleDelete(policy.id)}>Excluir</button>
      
          </li>
        
        ))}
      </ul>
    </div>
  );
};
