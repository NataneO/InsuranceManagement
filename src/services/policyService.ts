// src/services/policyService.ts
export const fetchPolicies = async () => {
    const response = await fetch('/api/apolices');
    if (!response.ok) {
      throw new Error('Failed to fetch policies');
    }
    return response.json();
  };
  
  export const fetchPolicyById = async (id: number) => {
    const response = await fetch(`/api/apolices/${id}`);
    if (!response.ok) {
      throw new Error('Failed to fetch policy details');
    }
    return response.json();
  };
  
  export const savePolicy = async (policy: any, id?: number) => {
    const response = id
      ? await fetch(`/api/apolices/${id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(policy),
        })
      : await fetch('/api/apolices', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(policy),
        });
  
    if (!response.ok) {
      throw new Error('Failed to submit form');
    }
    return response.json();
  };
  
  export const deletePolicy = async (id: number) => {
    const response = await fetch(`/api/apolices/${id}`, {
      method: 'DELETE',
    });
  
    if (!response.ok) {
      throw new Error('Error deleting policy');
    }
  };