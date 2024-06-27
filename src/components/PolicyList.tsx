import React, { useState, useEffect } from 'react';
import { Policy } from '../types';
import axios from 'axios';
import { makeServer } from '../mocks/server';
import PolicyForm  from './PolicyForm';
import PolicyModalContent from './PolicyModalContent';
import { Link } from 'react-router-dom';

if (process.env.NODE_ENV === "development") {
  makeServer();
}

const PolicyList: React.FC = () => {
  const [policies, setPolicies] = useState<Policy[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalTitle, setModalTitle] = useState('');
  const [modalMode, setModalMode] = useState<'add' | 'edit' | 'del' |''>('');
  const [itemId, setItemId] = useState<number | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, _setPageSize] = useState(10);
  const [totalPages, setTotalPages] = useState(0);

  // Estilos para a tabela
  const tableStyles = {
    margin: 'auto',
    borderCollapse: 'collapse',
    width: '80%',
    marginTop: '20px',
  };

  // Estilos para as células do cabeçalho
  const thStyles = {
    padding: '10px',
    border: '1px solid black',
    backgroundColor: '#f2f2f2',
  };

  // Estilos para as células de dados
  const tdStyles = {
    padding: '10px',
    border: '1px solid black',
  };

  // Estilos para os botões
  const buttonStyles = {
    margin: '5px',
    padding: '10px 20px',
    backgroundColor: '#008CBA',
    color: 'white',
    border: 'none',
    cursor: 'pointer',
  };

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

 
  
  const handleSavePolicy = async () => {
    setIsModalOpen(false);
    await fetchPolicies(); 
  };

  const handleOpenModal = (mode: 'add' | 'edit' | 'del', policy?: Policy) => {
    setModalMode(mode);
    if (mode === 'add') {
      setModalTitle('Adicionar Apólice');
      setItemId(null);
    } else if (mode === 'edit' && policy) {
      setModalTitle('Editar Apólice');
      setItemId(policy.id);
    } else if (mode === 'del' && policy){
      setModalTitle('Deletar apólice');
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
    <div style={{ textAlign: 'center' }}>
      <h1>Policy List</h1>
      <table style={tableStyles}>
        <thead>
          <tr>
            <th style={thStyles}>ID</th>
            <th style={thStyles}>Número</th>
            <th style={thStyles}>Valor Prêmio</th>
            <th style={thStyles}>Segurado</th>
            <th style={thStyles}>Coberturas</th>
            <th style={thStyles}>Ações</th>
          </tr>
        </thead>
        <tbody>
          {policies.map((policy) => (
            <tr key={policy.id}>
              <td style={tdStyles}>{policy.id}</td>
              <td style={tdStyles}>{policy.numero}</td>
              <td style={tdStyles}>{policy.valor_premio}</td>
              <td style={tdStyles}>{policy.segurado.nome}</td>
              <td style={tdStyles}>
                {policy.coberturas.map((cobertura, index) => (
                  <span key={index}>{cobertura.nome}</span>
                ))}
              </td>
              <td style={tdStyles}>
                <button style={{ ...buttonStyles, backgroundColor: '#4CAF50' }} onClick={() => handleOpenModal('edit', policy)}>Editar</button>
                <button style={{ ...buttonStyles, backgroundColor: '#f44336' }} onClick={() => handleOpenModal('del', policy)}>Excluir</button>
                <Link to={`/apolices/${policy.id}`}>{policy.numero}</Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div style={{ marginTop: '20px' }}>
        <button style={buttonStyles} onClick={handlePrevPage} disabled={currentPage === 1}>
          Página Anterior
        </button>
        <button style={buttonStyles} onClick={handleNextPage} disabled={currentPage === totalPages}>
          Próxima Página
        </button>
      </div>
      <button style={{ ...buttonStyles, margin: '20px', backgroundColor: '#4CAF50' }} onClick={() => handleOpenModal('add')}>Adicionar Apólice</button>

    //TODO: Colocar component modal aqui
      <PolicyModalContent isOpen={isModalOpen} onClose={handleCloseModal} onSave={handleSavePolicy} title={modalTitle} id={itemId} mode={modalMode}>
      </PolicyModalContent>
    </div>
  );
};

export default PolicyList;
