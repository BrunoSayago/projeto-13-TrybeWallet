const NEW_EMAIL = 'NEW_EMAIL';
const FETCH_API = 'FETCH_API';

const newUser = (payload) => ({ type: NEW_EMAIL, payload });

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

export { newUser, fetchCurrency };
