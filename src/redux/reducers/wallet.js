// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
const INITIAL_STATE = {
  currencies: [],
  expenses: [],
};

const FETCH_API = 'FETCH_API';
const DADOS = 'DADOS';

function wallet(state = INITIAL_STATE, action) {
  switch (action.type) {
  case FETCH_API:
    return { ...state, currencies: action.payload };

  case DADOS:
    return { ...state, expenses: [...state.expenses, action.payload] };

  default:
    return state;
  }
}

export default wallet;
