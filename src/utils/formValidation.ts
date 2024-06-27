// src/utils/validation.ts
import * as Yup from 'yup';
import { fetchPolicies } from '../services/policyService';

export const getValidationSchema = (mode: string) => {
  return Yup.object().shape({
    numero: Yup.number()
      .required('Número é obrigatório')
      .test('unique-numero', 'Número da apólice já cadastrado', async function (value) {
        if (mode === 'add') {
          const data = await fetchPolicies();
          const isUnique = data.content.every((policy: { numero: number }) => policy.numero !== value);
          return isUnique;
        } else {
          return true;
        }
      }),
    valor_premio: Yup.number().required('Valor do prêmio é obrigatório'),
    segurado: Yup.object().shape({
      nome: Yup.string().required('Nome do segurado é obrigatório'),
      email: Yup.string().email('Email inválido').required('Email é obrigatório'),
      cpf_cnpj: Yup.string().required('CPF/CNPJ é obrigatório'),
    }),
    coberturas: Yup.array().of(
      Yup.object().shape({
        nome: Yup.string().required('Nome da cobertura é obrigatório'),
        valor: Yup.number().required('Valor da cobertura é obrigatório'),
      })
    ),
  });
};
