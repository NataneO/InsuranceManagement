import React from 'react';
import { render, waitFor, screen } from '@testing-library/react';
import { MemoryRouter, Route } from 'react-router-dom';
import PolicyDetails from './PolicyDetails';
import '@testing-library/jest-dom';

const mockPolicy = {
  id: 1,
  numero: '123456',
  valor_premio: 1500,
  segurado: {
    nome: 'João da Silva',
    email: 'joao@example.com',
  },
  coberturas: [
    { nome: 'Cobertura A', valor: 500 },
    { nome: 'Cobertura B', valor: 1000 },
  ],
};

beforeAll(() => {
  jest.spyOn(global, 'fetch').mockResolvedValue({
    json: jest.fn().mockResolvedValue({ policy: mockPolicy }),
    ok: true,
  } as unknown as Response);
});

afterAll(() => {
  jest.restoreAllMocks();
});

test('renders policy details correctly', async () => {
  render(
    <MemoryRouter initialEntries={['/policy/1']}>
      <Route path="/policy/:id">
        <PolicyDetails />
      </Route>
    </MemoryRouter>
  );

  expect(screen.getByText(/loading/i)).toBeInTheDocument();

  await waitFor(() => expect(global.fetch).toHaveBeenCalled());

  expect(screen.getByText(`Apólice ${mockPolicy.numero}`)).toBeInTheDocument();
  expect(screen.getByText(`ID: ${mockPolicy.id}`)).toBeInTheDocument();
  expect(screen.getByText(`Valor Prêmio: ${mockPolicy.valor_premio}`)).toBeInTheDocument();
  expect(screen.getByText(`Nome: ${mockPolicy.segurado.nome}`)).toBeInTheDocument();
  expect(screen.getByText(`Email: ${mockPolicy.segurado.email}`)).toBeInTheDocument();

  mockPolicy.coberturas.forEach((cobertura) => {
    expect(screen.getByText(`Nome: ${cobertura.nome}`)).toBeInTheDocument();
    expect(screen.getByText(`Valor: ${cobertura.valor}`)).toBeInTheDocument();
  });
});
