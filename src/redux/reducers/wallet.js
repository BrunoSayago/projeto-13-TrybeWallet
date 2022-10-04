// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
const INITIAL_STATE = {
  currencies: [],
};

const FETCH_API = 'FETCH_API';

function wallet(state = INITIAL_STATE, action) {
  switch (action.type) {
  case FETCH_API:
    return { ...state, currencies: action.payload };
  default:
    return state;
  }
}

export default wallet;
