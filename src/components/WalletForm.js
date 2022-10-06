import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchCurrency, fetchDados } from '../redux/actions';

class WalletForm extends Component {
  state = {
    value: '',
    description: '',
    method: 'Dinheiro',
    tag: 'Alimentação',
    currency: 'USD',
    id: 0,
  };

  componentDidMount() {
    const { currenciesDispatch } = this.props;
    currenciesDispatch();
  }

  handleClick = () => {
    const { dataDispatch } = this.props;
    const { id, value, description, currency, method, tag } = this.state;
    dataDispatch({ id, value, currency, method, tag, description });
    this.setState({
      value: '',
      description: '',
      method: 'cash',
      tag: 'food',
      currency: 'USD',
      id: id + 1,
    });
  };

  handleChange = ({ target: { name, value } }) => {
    this.setState({ [name]: value });
  };

  render() {
    const { value, description, method, tag, currency } = this.state;
    const { currencies } = this.props;

    return (
      <form>
        <label htmlFor="value-input">
          Valor:
          {' '}
          <input
            type="number"
            data-testid="value-input"
            id="value-input"
            name="value"
            value={ value }
            onChange={ this.handleChange }
          />
        </label>

        <label htmlFor="description-input">
          Descrição:
          {' '}
          <input
            type="text"
            data-testid="description-input"
            id="description-input"
            name="description"
            value={ description }
            onChange={ this.handleChange }
          />
        </label>

        <label htmlFor="currency-input">
          Moeda:
          {' '}
          <select
            name="currency"
            value={ currency }
            data-testid="currency-input"
            id="currency-input"
            onChange={ this.handleChange }
          >
            { currencies.map((elemento) => (
              <option
                key={ elemento }
                value={ elemento }
              >
                {elemento}
              </option>
            ))}
          </select>
        </label>

        <label htmlFor="method-input">
          Método de pagamento:
          {' '}
          <select
            name="method"
            data-testid="method-input"
            id="method-input"
            value={ method }
            onChange={ this.handleChange }
          >
            <option value="Dinheiro">Dinheiro</option>
            <option value="Cartão de crédito">Cartão de crédito</option>
            <option value="Cartão de débito">Cartão de débito</option>
          </select>
        </label>

        <label htmlFor="tag-input">
          Tipo de gasto:
          {' '}
          <select
            name="tag"
            data-testid="tag-input"
            id="tag-input"
            value={ tag }
            onChange={ this.handleChange }
          >
            <option value="Alimentação">Alimentação</option>
            <option value="Lazer">Lazer</option>
            <option value="Trabalho">Trabalho</option>
            <option value="Transporte">Transporte</option>
            <option value="Saúde">Saúde</option>
          </select>
        </label>

        <button
          type="button"
          onClick={ this.handleClick }
        >
          Adicionar despesa
        </button>
      </form>
    );
  }
}

WalletForm.propTypes = {
  currencies: PropTypes.shape({
    map: PropTypes.func,
  }),
}.isRequired;

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
});

const mapDispatchToProps = (dispatch) => ({
  currenciesDispatch: () => dispatch(fetchCurrency()),
  dataDispatch: (state) => dispatch(fetchDados(state)),
});

export default connect(mapStateToProps, mapDispatchToProps)(WalletForm);
