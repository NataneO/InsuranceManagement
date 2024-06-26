import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';

export const PolicyForm: React.FC = () => {
  const navigate = useNavigate();

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
      const response = await fetch('/api/apolices', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      });

      if (response.ok) {
        navigate('/');
      } else {
        console.error('Failed to submit form:', response);
      }
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

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
    >
      {({  }) => (
        <Form>
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
          <button type="submit">Salvar</button>
        </Form>
      )}
    </Formik>
  );
};

