// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
const INITIAL_STATE = {
  currencies: [],
  expenses: [],
  editing: { isEditing: false, obsEditing: '' },
};

const FETCH_API = 'FETCH_API';
const DADOS = 'DADOS';
const ATUALIZA_DESPESAS = 'ATUALIZA_DESPESAS';
const TROCA_EDITANDO = 'TROCA_EDITANDO';

function wallet(state = INITIAL_STATE, action) {
  switch (action.type) {
  case FETCH_API:
    return { ...state, currencies: action.payload };

  case DADOS:
    return { ...state, expenses: [...state.expenses, action.payload] };

  case ATUALIZA_DESPESAS:
    return { ...state, expenses: action.payload };

  case TROCA_EDITANDO:
    return { ...state, editing: action.payload };

  default:
    return state;
  }
}

export default wallet;
