// src/components/PolicyForm.tsx
import { useEffect } from "react";
import { Formik, Form, Field, FieldArray, ErrorMessage } from "formik";
import { fetchPolicyById, savePolicy } from "../services/policyService";
import { ModalProps } from "../types";
import { getValidationSchema } from "../utils/formValidation";
import { FaRegTimesCircle } from "react-icons/fa";
import "../assets/styles/style.scss";
const PolicyForm = ({
  isOpen,
  onClose,
  onSave,
  title,
  id,
  mode,
}: ModalProps) => {
  const validationSchema = getValidationSchema(mode);
  const handleSubmit = async (values: any) => {
    try {
      await savePolicy(values, id);
      onSave();
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  if (!isOpen) return null;

  return (
    <Formik
      initialValues={{
        numero: "",
        valor_premio: "",
        segurado: { nome: "", email: "", cpf_cnpj: "" },
        coberturas: [{ nome: "", valor: "" }],
      }}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
      enableReinitialize={true}
    >
      {({ values, setValues }) => {
        useEffect(() => {
          if (id) {
            fetchPolicyById(id)
              .then((data) => setValues(data.policy))
              .catch((error) =>
                console.error("Erro ao carregar os detalhes da apólice", error)
              );
          }
        }, [id, setValues]);

        return (
          <Form>
            <h2>{title}</h2>
            <h4>Dados da apólice</h4>
            <div className="policy-container">
              <div className="group">
                <label>Número:</label>
                <Field type="number" name="numero" />
                <ErrorMessage name="numero" component="div" className="error" />
              </div>
              <div className="group">
                <label>Valor Prêmio:</label>
                <Field type="number" name="valor_premio" />
                <ErrorMessage
                  name="valor_premio"
                  component="div"
                  className="error"
                />
              </div>
              <div className="group">
                <label>Nome:</label> <Field type="text" name="segurado.nome" />
                <ErrorMessage
                  name="segurado.nome"
                  component="div"
                  className="error"
                />
              </div>
              <div className="group">
                <label>Email:</label>
                <Field type="email" name="segurado.email" />
                <ErrorMessage
                  name="segurado.email"
                  component="div"
                  className="error"
                />
              </div>
              <div className="group">
                <label>CPF/CNPJ:</label>
                <Field type="text" name="segurado.cpf_cnpj" />
                <ErrorMessage
                  name="segurado.cpf_cnpj"
                  component="div"
                  className="error"
                />
              </div>
            </div>
            <h4> Coberturas</h4>

            <FieldArray name="coberturas">
              {({ push, remove }) => (
                <div className="policy-container">
                  {values.coberturas.map((_cobertura, index) => (
                    <div key={index} className="form-coverage">
                      <div className="group">
                        <label>Nome da Cobertura:</label>
                        <Field
                          className="width-85"
                          type="text"
                          name={`coberturas[${index}].nome`}
                        />
                        <ErrorMessage
                          name={`coberturas[${index}].nome`}
                          component="div"
                          className="error"
                        />
                      </div>
                      <div className="group">
                        <label>Valor da Cobertura:</label>
                        <Field
                          className="width-85"
                          type="number"
                          name={`coberturas[${index}].valor`}
                        />
                        <ErrorMessage
                          name={`coberturas[${index}].valor`}
                          component="div"
                          className="error"
                        />
                      </div>
                      <div>
                        <button
                          style={{ marginTop: "28px", fontSize: "16px" }}
                          type="button"
                          onClick={() => remove(index)}
                          className="btn btn-delete"
                        >
                          <FaRegTimesCircle />
                        </button>
                      </div>
                    </div>
                  ))}
                  <button
                    className="coverage-add"
                    type="button"
                    onClick={() => push({ nome: "", valor: "" })}
                  >
                    Adicionar Cobertura
                  </button>
                </div>
              )}
            </FieldArray>

            <div className="modal-actions">
              <button type="submit">Salvar</button>
              <button type="button" onClick={onClose}>
                Cancelar
              </button>
            </div>
          </Form>
        );
      }}
    </Formik>
  );
};

export default PolicyForm;
