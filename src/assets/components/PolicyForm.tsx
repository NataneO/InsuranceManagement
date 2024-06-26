import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const PolicyForm: React.FC = () => {
  const [policy, setPolicy] = useState({ 
    numero: '', 
    valor_premio: '', 
    segurado: { nome: '', email: '', cpf_cnpj: '' }, 
    coberturas: [{ nome: '', valor: '' }] 
  });
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    

    if (name === 'numero' || name === 'valor_premio') {
      setPolicy({ ...policy, [name]: value });
    } else if (name.startsWith('segurado.')) {
      const fieldName = name.split('.')[1]; 
      setPolicy({
        ...policy,
        segurado: {
          ...policy.segurado,
          [fieldName]: value,
        },
      });
    } else {
      setPolicy({ ...policy, [name]: value });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    fetch('/api/apolices', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(policy),
    }).then(() => {
     navigate('/')
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>
          Número:
          <input type="number" name="numero" value={policy.numero} onChange={handleChange} />
        </label>
      </div>
      <div>
        <label>
          Valor Prêmio:
          <input type="text" name="valor_premio" value={policy.valor_premio} onChange={handleChange} />
        </label>
      </div>
      <div>
        <label>
          Nome:
          <input type="text" name="segurado.nome" value={policy.segurado.nome} onChange={handleChange} />
        </label>
      </div>
      <div>
        <label>
          Email:
          <input type="text" name="segurado.email" value={policy.segurado.email} onChange={handleChange} />
        </label>
      </div>
      <div>
        <label>
          CPF/CNPJ:
          <input type="text" name="segurado.cpf_cnpj" value={policy.segurado.cpf_cnpj} onChange={handleChange} />
        </label>
      </div>
      <button type="submit">Salvar</button>
    </form>
  );
};
