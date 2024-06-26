import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Policy } from '../../types';

interface PolicyDetailsParams {
  id: number; 
}

export const PolicyDetails: React.FC = () => {
  const { id } = useParams<PolicyDetailsParams>();
  const [policy, setPolicy] = useState<Policy | undefined>(undefined);

  useEffect(() => {
    fetch(`/api/apolices/${id}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to fetch policy');
        }
        return response.json();
      })
      .then((data) => {
        setPolicy(data.policy); 
      })
      .catch((error) => console.error('Error fetching policy details:', error));
  }, [id]);

  if (!policy) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h1>Policy Details</h1>
      <p>Número: {policy.numero}</p>
      <p>Valor Prêmio: {policy.valor_premio}</p>
    </div>
  );
};
