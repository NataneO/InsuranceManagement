import React, { useEffect } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: () => void;
  title: string;
  id?: number;
}

export const PolicyForm: React.FC<ModalProps> = ({ isOpen, onClose, onSave, title, id }) => {
  const navigate = useNavigate();
  const style = {

  }
  const validationSchema = Yup.object().shape({
    numero: Yup.number().required('Número é obrigatório'),
    valor_premio: Yup.number().required('Valor do prêmio é obrigatório'),
    segurado: Yup.object().shape({
      nome: Yup.string().required('Nome do segurado é obrigatório'),
      email: Yup.string().email('Email inválido').required('Email é obrigatório'),
      cpf_cnpj: Yup.string().required('CPF/CNPJ é obrigatório'),
    }),
  });

  const handleSubmit = async (values: any) => {
    try {
      const response = id 
        ? await fetch(`/api/apolices/${id}`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(values),
          })
          
        : await fetch('/api/apolices', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(values),
          });

      if (response.ok) {
        onSave();
      } else {
        console.error('Failed to submit form:', response);
      }
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  if (!isOpen) return null;

  return (
    <Formik
      initialValues={{
        numero: '',
        valor_premio: '',
        segurado: { nome: '', email: '', cpf_cnpj: '' },
        coberturas: [{ nome: '', valor: '' }],
      }}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
      enableReinitialize={true} 
   
    >
      {({ setValues }) => {
        useEffect(() => {
          if (id) {
        
            fetch(`/api/apolices/${id}`)
              .then(response => response.json())
              .then(data => {
                setValues(data.policy);
              })
              .catch(error => {
                console.error('Erro ao carregar os detalhes da apólice', error);
              });
          }
        }, [id, setValues]);

        return (
          <Form>
            <h2>{title}</h2>
            <div>
              <label>
                Número:
                <Field type="number" name="numero" />
                <ErrorMessage name="numero" component="div" className="error" />
              </label>
            </div>
            <div>
              <label>
                Valor Prêmio:
                <Field type="number" name="valor_premio" />
                <ErrorMessage name="valor_premio" component="div" className="error" />
              </label>
            </div>
            <div>
              <label>
                Nome:
                <Field type="text" name="segurado.nome" />
                <ErrorMessage name="segurado.nome" component="div" className="error" />
              </label>
            </div>
            <div>
              <label>
                Email:
                <Field type="email" name="segurado.email" />
                <ErrorMessage name="segurado.email" component="div" className="error" />
              </label>
            </div>
            <div>
              <label>
                CPF/CNPJ:
                <Field type="text" name="segurado.cpf_cnpj" />
                <ErrorMessage name="segurado.cpf_cnpj" component="div" className="error" />
              </label>
            </div>
            <div className="modal-actions">
              <button type="submit">Salvar</button>
              <button type="button" onClick={onClose}>Cancelar</button>
            </div>
          </Form>
        );
      }}
    </Formik>
  );
};
