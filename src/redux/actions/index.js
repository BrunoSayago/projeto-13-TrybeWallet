const NEW_EMAIL = 'NEW_EMAIL';
const FETCH_API = 'FETCH_API';
const ADICIONA_DESPESA = 'ADICIONA_DESPESA';
const DADOS = 'DADOS';
const ATUALIZA_DESPESAS = 'ATUALIZA_DESPESAS';
const TROCA_EDITANDO = 'TROCA_EDITANDO';

const newUser = (payload) => ({ type: NEW_EMAIL, payload });

const changeEditing = (payload) => ({ type: TROCA_EDITANDO, payload });

const fetchAPI = (payload) => ({ type: FETCH_API, payload });

const fetchCurrency = () => async (dispatch) => {
  try {
    const response = await fetch('https://economia.awesomeapi.com.br/json/all');
    const data = await response.json();
    delete data.USDT;
    dispatch(fetchAPI(Object.keys(data)));
  } catch (e) {
    throw new Error(e);
  }
};

const adicionaDespesa = (payload) => ({ type: ADICIONA_DESPESA, payload });

const atualizaDados = (payload) => ({ type: DADOS, payload });

const atualizaDespesas = (payload) => ({ type: ATUALIZA_DESPESAS, payload });

const fetchDados = (expense) => async (dispatch) => {
  try {
    const resposta = await fetch('https://economia.awesomeapi.com.br/json/all');
    const data = await resposta.json();
    expense.exchangeRates = data;
    dispatch(atualizaDados(expense));
  } catch (error) {
    throw new Error(error);
  }
};

export {
  newUser,
  fetchCurrency,
  adicionaDespesa,
  fetchDados,
  atualizaDespesas,
  changeEditing,
};
