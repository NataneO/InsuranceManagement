import React, { useState, useEffect } from "react";
import { Policy } from "../types";
import axios from "axios";
import { makeServer } from "../mocks/server";
import PolicyModalContent from "./PolicyModalContent";
import { Link } from "react-router-dom";
import { FaEdit, FaInfoCircle, FaTrashAlt } from "react-icons/fa";
import "../assets/styles/style.scss";
import SearchBar from "./SearchBar";
if (process.env.NODE_ENV === "development") {
  makeServer();
}

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
  const [filteredItems, setFilteredItems] = useState([...policies]);
  const [searchTerm, setSearchTerm] = useState<number | string>();

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

  const handleSearch = (searchTerm: string | number) => {
    setSearchTerm(searchTerm);
    const filtered = policies.filter(
      (policy) =>
        policy.numero.toString().includes(String(searchTerm)) ||
        policy.segurado.nome.includes(String(searchTerm)) ||
        policy.segurado.email.includes(String(searchTerm))
    );
    setFilteredItems(filtered);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container-wrapper">
      <div className="policy-itemHeader">
        <h1 className="h1">Listagem de apólices</h1>
        <button
          className="btn-add-policy"
          onClick={() => handleOpenModal("add")}
        >
          Adicionar Apólice
        </button>
      </div>
      <SearchBar onSearch={handleSearch} />
      <table>
        <thead>
          <tr>
            <th>Id</th>
            <th>Número</th>
            <th>Segurado</th>
            <th>Valor premio</th>
            <th>Coberturas</th>
            <th></th>
          </tr>
        </thead>

        {searchTerm && (
          <tbody>
            {filteredItems.length > 0 ? (
              filteredItems.map((filtered) => (
                <tr key={filtered.id} className="policy-item">
                  <td className="table-content">{filtered.id}</td>
                  <td className="table-content">{filtered.numero}</td>
                  <td className="table-content">{filtered.segurado.nome}</td>
                  <td className="table-content">{filtered.valor_premio}</td>
                  <td className="coverage-cell table-content hide-on-mobile">
                    {filtered.coberturas.map((cobertura, index) => (
                      <span key={index} className="coverage-item">
                        {cobertura.nome}
                      </span>
                    ))}
                  </td>
                  <td className="action-buttons">
                    <button
                      className="btn btn-edit"
                      onClick={() => handleOpenModal("edit", filtered)}
                    >
                      <FaEdit />
                    </button>
                    <button
                      className="btn btn-delete"
                      onClick={() => handleOpenModal("del", filtered)}
                    >
                      <FaTrashAlt />
                    </button>
                    <Link
                      to={`/apolices/${filtered.id}`}
                      className="btn btn-details"
                    >
                      <FaInfoCircle />
                    </Link>
                  </td>
                </tr>
              ))
            ) : (
              <li>No items found.</li>
            )}
          </tbody>
        )}
        {!searchTerm && (
          <tbody>
            {policies.map((policy) => (
              <tr key={policy.id} className="policy-item">
                <td className="table-content">{policy.id}</td>
                <td className="table-content">{policy.numero}</td>
                <td className="table-content">{policy.segurado.nome}</td>
                <td className="table-content">{policy.valor_premio}</td>
                <td className="coverage-cell table-content hide-on-mobile">
                  {policy.coberturas.map((cobertura, index) => (
                    <span key={index} className="coverage-item">
                      {cobertura.nome}
                    </span>
                  ))}
                </td>
                <td className="action-buttons">
                  <button
                    className="btn btn-edit"
                    onClick={() => handleOpenModal("edit", policy)}
                  >
                    <FaEdit />
                  </button>
                  <button
                    className="btn btn-delete"
                    onClick={() => handleOpenModal("del", policy)}
                  >
                    <FaTrashAlt />
                  </button>
                  <Link
                    to={`/apolices/${policy.id}`}
                    className="btn btn-details"
                  >
                    <FaInfoCircle />
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        )}
      </table>

      <div className="pagination-wrapper">
        <button
          className="btn-pagination"
          onClick={handlePrevPage}
          disabled={currentPage === 1}
        >
          Página Anterior
        </button>
        <button
          className="btn-pagination"
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
