import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../../App';
import { renderWithRouterAndRedux } from './renderWith';

const emailID = 'email-input';
const senhaID = 'password-input';

describe('Testes de Login', () => {
  test('Teste 1 - Testando rota', () => {
    const { history } = renderWithRouterAndRedux(<App />);
    expect(history.location.pathname).toEqual('/');
  });

  test('Teste 2 - Testa se os elementos de email senha e o botão estão renderizando', () => {
    renderWithRouterAndRedux(<App />);
    const email = screen.getByTestId(emailID);
    const senha = screen.getByTestId(senhaID);
    const botao = screen.getByRole('button', {
      name: /entrar/i,
    });
    expect(email).toBeInTheDocument();
    expect(senha).toBeInTheDocument();
    expect(botao).toBeInTheDocument();
  });

  test('Teste 3 - Testando se quando os email estão errados, o botão está desabilitado', () => {
    renderWithRouterAndRedux(<App />);
    const emailsErrados = ['teste', '@teste', 'teste@', '.teste@', 'teste@teste', 'teste.teste'];
    const senhaCerta = '123456';
    const botao = screen.getByRole('button', {
      name: /entrar/i,
    });
    const email = screen.getByTestId(emailID);
    const senha = screen.getByTestId(senhaID);
    for (let index = 0; index < emailsErrados.length; index += 1) {
      userEvent.type(email, emailsErrados[index]);
      userEvent.type(senha, senhaCerta);
      expect(botao).toBeDisabled();
    }
  });

  test('Teste 4 - Testando se quando as senhas estão erradas, o botão está desabilitado', () => {
    renderWithRouterAndRedux(<App />);
    const emailCerto = 'teste1@teste.com';
    const senhasErradas = ['1', '12', '123', '1234', '12345', 'abc'];
    const email = screen.getByTestId(emailID);
    const senha = screen.getByTestId(senhaID);
    const botao = screen.getByRole('button', {
      name: /entrar/i,
    });
    for (let index = 0; index < senhasErradas.length; index += 1) {
      userEvent.type(email, emailCerto);
      userEvent.type(senha, senhasErradas[index]);
      expect(botao).toBeDisabled();
    }
  });

  test('Teste 5 - Testando se o botão habilita com inputs corretos', () => {
    renderWithRouterAndRedux(<App />);
    const emailCerto = 'teste@teste.com';
    const senhaCerta = 'senha123456';
    const email = screen.getByTestId(emailID);
    const senha = screen.getByTestId(senhaID);
    const botao = screen.getByRole('button', {
      name: /entrar/i,
    });
    userEvent.type(email, emailCerto);
    userEvent.type(senha, senhaCerta);
    expect(botao).not.toBeDisabled();
  });

  test('Teste 6 - Testa se o botão redireciona para página certa', () => {
    const { history } = renderWithRouterAndRedux(<App />);
    const emailCerto = 'teste@teste.com';
    const senhaCerta = 'senha123456';
    const email = screen.getByTestId(emailID);
    const senha = screen.getByTestId(senhaID);
    const botao = screen.getByRole('button', {
      name: /entrar/i,
    });
    userEvent.type(email, emailCerto);
    userEvent.type(senha, senhaCerta);
    userEvent.click(botao);
    expect(history.location.pathname).toBe('/carteira');
  });
});
