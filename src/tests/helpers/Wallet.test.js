import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithRouterAndRedux } from './renderWith';
import Wallet from '../../pages/Wallet';
import mockFetch from './mockFetch';

const valorID = 'value-input';
const descricaoID = 'description-input';

describe('Testes de Wallet', () => {
  beforeEach(() => {
    global.fetch = jest.fn(mockFetch);
  });

  afterEach(() => {
    global.fetch.mockClear();
  });

  test('Teste 1 - Testa se os campos do formulário são renderizados', () => {
    renderWithRouterAndRedux(<Wallet />);
    const valor = screen.getByTestId(valorID);
    const descricao = screen.getByTestId(descricaoID);
    const currency = screen.getByTestId('currency-input');
    const botao = screen.getByRole('button', { name: /adicionar despesa/i });
    expect(valor).toBeInTheDocument();
    expect(descricao).toBeInTheDocument();
    expect(currency).toBeInTheDocument();
    expect(botao).toBeInTheDocument();
  });

  test('Teste 2 - Verifica chamada de fetch', () => {
    renderWithRouterAndRedux(<Wallet />);
    expect(global.fetch).toHaveBeenCalledTimes(1);
    const valor = screen.getByTestId(valorID);
    const descricao = screen.getByTestId(descricaoID);
    const botao = screen.getByRole('button', { name: /adicionar despesa/i });
    userEvent.type(valor, '35');
    userEvent.type(descricao, 'Teste');
    userEvent.click(botao);
    expect(global.fetch).toHaveBeenCalledTimes(2);
  });

  test('Teste 3 - Verifica se a tabela é atualizada', async () => {
    renderWithRouterAndRedux(<Wallet />);
    const valor = screen.getByTestId('value-input');
    const descricao = screen.getByTestId('description-input');
    const botao = screen.getByRole('button', { name: /adicionar despesa/i });
    userEvent.type(valor, '35');
    userEvent.type(descricao, 'Teste');
    userEvent.click(botao);
    const celula1 = await screen.findByText(/teste/i);
    const celula2 = await screen.findByRole('cell', { name: /alimentação/i });
    const celula3 = await screen.findByRole('cell', { name: /dinheiro/i });
    const celula4 = await screen.findByRole('cell', { name: /35\.00/i });
    const celula5 = await screen.findByRole('cell', { name: /dólar americano\/real brasileiro/i });
    const botao1 = await screen.findByRole('button', { name: /editar despesa/i });
    const botao2 = await screen.findByRole('button', { name: /excluir/i });
    expect(celula1).toBeInTheDocument();
    expect(celula2).toBeInTheDocument();
    expect(celula3).toBeInTheDocument();
    expect(celula4).toBeInTheDocument();
    expect(celula5).toBeInTheDocument();
    expect(botao1).toBeInTheDocument();
    expect(botao2).toBeInTheDocument();
  });
});
