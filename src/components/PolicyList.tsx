import React, { useState, useEffect } from "react";
import { Policy } from "../types";
import axios from "axios";
import { makeServer } from "../mocks/server";
import PolicyModalContent from "./PolicyModalContent";
import { Link } from "react-router-dom";
import { FaEdit, FaInfoCircle, FaTrashAlt } from "react-icons/fa";


if (process.env.NODE_ENV === "development") {
  makeServer();
}
const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    gap: "8px",
    padding: "20px",
   
  },
 
  policyItemHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "15px",
  },
  headerTitle: {
    fontSize: "18px",
    fontWeight: "bold",
    margin: 0,
  },
  
  button: {
    padding: 0,
    backgroundColor: "transparent",
    border: "none",
    cursor: "pointer",
    textAlign: "center",
    fontSize: "16px",
  },
  editButton: {
    color: "#111",
  },
  deleteButton: {
    color: "#f44336",
  },
  detailsButton: {
    color: "#007bff",
    textDecoration: "none",
    textAlign: "center",
    fontSize: "16px",
  },
  policyDetails: {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
    fontSize: "14px",
    color: "#333",
  },
  detailItem: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  detailLabel: {
    fontWeight: "bold",
  },
  policyStatus: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: "15px",
  },
  statusBadge: {
    padding: "5px 10px",
    borderRadius: "4px",
    backgroundColor: "#28a745",
    color: "#fff",
    fontSize: "14px",
  },
  nextPayment: {
    fontSize: "14px",
    color: "#666",
  },
  pagination: {
    display: "flex",
    justifyContent: "center",
    marginTop: "20px",
  },
  paginationButton: {
    margin: "5px",
    padding: "10px 20px",
    border: "none",
    borderRadius: "4px",
    backgroundColor: "#008CBA",
    color: "#fff",
    cursor: "pointer",
  },
  disabledButton: {
    backgroundColor: "#ccc",
    cursor: "not-allowed",
  },
  addPolicyButton: {
    margin: "20px",
    padding: "10px 20px",
    border: "none",
    borderRadius: "4px",
    backgroundColor: "#4CAF50",
    color: "#fff",
    cursor: "pointer",
  },
  coberturasCell: {
  
    whiteSpace: 'nowrap', 
  },
  coberturaItem: {
    display: 'block',
    marginBottom: '5px', 
  },
  tableContent:{
    textAlign: 'left',
    padding: '10px 0',
  },
  actionButtons:{
    textAlign: 'center',
    width: '70px'
  },
  mr5:{
    marginRight: '5px',
  },
  policyItem:{
    borderBottom: "1px solid #e0e0e0",
   
  },
  table:{
    borderCollapse: 'collapse',
  },
  thead:{
    textAlign: 'left',
  },
};

const PolicyList: React.FC = () => {
  const [policies, setPolicies] = useState<Policy[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [modalMode, setModalMode] = useState<"add" | "edit" | "del" | "">("");
  const [itemId, setItemId] = useState<number | undefined>(undefined);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, _setPageSize] = useState(10);
  const [totalPages, setTotalPages] = useState(0);

 

  useEffect(() => {
    fetchPolicies();
  }, [currentPage, pageSize]);

  const fetchPolicies = async () => {
    try {
      const response = await axios.get("/api/apolices", {
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
      console.error("Error fetching policies:", error);
      setLoading(false);
    }
  };

  const handleSavePolicy = async () => {
    setIsModalOpen(false);
    await fetchPolicies();
  };

  const handleOpenModal = (mode: "add" | "edit" | "del", policy?: Policy) => {
    setModalMode(mode);
    if (mode === "add") {
      setModalTitle("Adicionar Apólice");
      setItemId(null);
    } else if (mode === "edit" && policy) {
      setModalTitle("Editar Apólice");
      setItemId(policy.id);
    } else if (mode === "del" && policy) {
      setModalTitle("Deletar apólice");
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
    <div style={styles.container}>
      <div style={styles.policyItemHeader}>
      <h1>Policy List</h1>
      <button
        style={styles.addPolicyButton}
        onClick={() => handleOpenModal("add")}
      >
        Adicionar Apólice
      </button>
      </div>
          <table style={styles.table}>
            <thead style={styles.thead}>
            <tr>
              <th>Id</th>
              <th>Número</th>
              <th>Segurado</th>
              <th>Valor premio</th>
              <th>Coberturas</th>
              <th></th>
            </tr>
            </thead>
            <tbody>
            {policies.map((policy) => (
            <tr key={policy.id} style={styles.policyItem}>
              <td style={styles.tableContent}>{policy.id}</td>
              <td style={styles.tableContent}>{policy.numero}</td>
              <td style={styles.tableContent}>{policy.segurado.nome}</td>
              <td style={styles.tableContent}>{policy.valor_premio}</td>
              <td style={{...styles.coberturasCell, ...styles.tableContent}}>
                {policy.coberturas.map((cobertura, index) => (
                  <span key={index} style={styles.coberturaItem}>
                    {cobertura.nome}
                  </span>
                ))}
                </td>
                <td style={styles.actionButtons}>
                <button
                style={{...styles.mr5, ...styles.button, ...styles.editButton }}
                onClick={() => handleOpenModal("edit", policy)}
              >
                <FaEdit />
              </button>
              <button
                style={{ ...styles.mr5, ...styles.button, ...styles.deleteButton }}
                onClick={() => handleOpenModal("del", policy)}
              >
                <FaTrashAlt />
              </button>
              <Link to={`/apolices/${policy.id}`} style={{...styles.mr5, ...styles.detailsButton}}>
                <FaInfoCircle />
              </Link>
                </td>
            </tr>
                ))}
            </tbody>
          </table>
      
  
      <div style={styles.pagination}>
        <button
          style={styles.paginationButton}
          onClick={handlePrevPage}
          disabled={currentPage === 1}
        >
          Página Anterior
        </button>
        <button
          style={styles.paginationButton}
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
        >
          Próxima Página
        </button>
      </div>
  
      <PolicyModalContent
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSave={handleSavePolicy}
        title={modalTitle}
        id={itemId}
        mode={modalMode}
      />
    </div>
  );
};

export default PolicyList;
