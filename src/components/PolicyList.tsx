import React, { useState, useEffect } from 'react';
import { Policy } from '../types';
import axios from 'axios';
import { makeServer } from '../mocks/server';
import { PolicyForm } from './PolicyForm';

if (process.env.NODE_ENV === "development") {
  makeServer();
}

export const PolicyList: React.FC = () => {
  const [policies, setPolicies] = useState<Policy[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalTitle, setModalTitle] = useState('');
  const [modalMode, setModalMode] = useState<'add' | 'edit' | ''>('');
  const [itemId, setItemId] = useState<number | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    fetchPolicies();
  }, [currentPage, pageSize]);

  const fetchPolicies = async () => {
    try {
      const response = await axios.get('/api/apolices', {
        params: {
          page: currentPage,
          pageSize: pageSize,
        },
      });
      const { content, totalPages: total } = response.data;
      setPolicies(content);
      setTotalPages(total);
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
  
  const handleSavePolicy = async () => {
    setIsModalOpen(false);
    await fetchPolicies(); 
  };

  const handleOpenModal = (mode: 'add' | 'edit', policy?: Policy) => {
    setModalMode(mode);
    if (mode === 'add') {
      setModalTitle('Adicionar Apólice');
      setItemId(null);
    } else if (mode === 'edit' && policy) {
      setModalTitle('Editar Apólice');
      setItemId(policy.id);
    }
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleNextPage = () => {
    setCurrentPage((currentPage) => currentPage + 1);
  };
  
  const handlePrevPage = () => {
    setCurrentPage((currentPage) => Math.max(currentPage - 1, 1));
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Policy List</h1>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Número</th>
            <th>Valor Prêmio</th>
            <th>Segurado</th>
            <th>Coberturas</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {policies.map((policy) => (
            <tr key={policy.id}>
              <td>{policy.id}</td>
              <td>{policy.numero}</td>
              <td>{policy.valor_premio}</td>
              <td>{policy.segurado.nome}</td>
              <td>
                {policy.coberturas.map((cobertura, index) => (
                  <span key={index}>{cobertura.nome}</span>
                ))}
              </td>
              <td>
                <button onClick={() => handleOpenModal('edit', policy)}>Editar</button>
                <button onClick={() => handleDelete(policy.id)}>Excluir</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div>
        <button onClick={handlePrevPage} disabled={currentPage === 1}>
          Página Anterior
        </button>
        <button onClick={handleNextPage} disabled={currentPage === totalPages}>
          Próxima Página
        </button>
      </div>
      <button onClick={() => handleOpenModal('add')}>Adicionar Apólice</button>

      <PolicyForm isOpen={isModalOpen} onClose={handleCloseModal} onSave={handleSavePolicy} title={modalTitle} id={itemId}>
      </PolicyForm>
    </div>
  );
};
