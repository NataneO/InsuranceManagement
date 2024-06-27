import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { Policy, PolicyDetailsParams } from "../types";
import { FaArrowLeft } from "react-icons/fa";

const PolicyDetails = () => {
  const { id } = useParams<PolicyDetailsParams>();
  const [policy, setPolicy] = useState<Policy | undefined>(undefined);

  useEffect(() => {
    fetch(`/api/apolices/${id}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch policy");
        }
        return response.json();
      })
      .then((data) => {
        setPolicy(data.policy);
      })
      .catch((error) => console.error("Error fetching policy details:", error));
  }, [id]);

  if (!policy) {
    return <p>Loading...</p>;
  }

  return (
    <div className="container-wrapper details-wrapper">
      <Link to={`/`}>
        {" "}
        <FaArrowLeft />{" "}
      </Link>
      <h1>Detalhes da apólice</h1>
      <div>
        <div>
          <div class="policy-number">Apólice {policy.numero}</div>

          <p>
            <span className="bold">ID: </span>
            {policy.id}
          </p>

          <p>
            <span className="bold">Valor Prêmio: </span>
            {policy.valor_premio}
          </p>
          <h4>Dados do segurado</h4>
          <p>
            <span className="bold">Nome: </span>
            {policy.segurado.nome}
          </p>
          <p>
            <span className="bold">Email: </span> {policy.segurado.email}
          </p>
          <h4>Dados de coberturas</h4>
          {policy.coberturas.map((cobertura) => (
            <>
              <p>
                <span
                  className="bold
  "
                >
                  Nome:{" "}
                </span>
                {cobertura.nome}
              </p>
              <p>
                <span
                  className="bold
  "
                >
                  Valor:{" "}
                </span>
                {cobertura.valor}
              </p>
              <hr></hr>
            </>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PolicyDetails;
