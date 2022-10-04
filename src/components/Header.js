import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Header extends Component {
  render() {
    const { email, expenses } = this.props;
    return (
      <div>
        <p data-testid="email-field">{ email }</p>
        <p data-testid="header-currency-field">BRL</p>
        <p data-testid="total-field">
          { expenses.reduce((antes, atual) => {
            const rate = Number(atual.exchangeRates[atual.currency].ask);
            console.log(rate);
            return antes + Number(atual.value) * rate;
          }, 0).toFixed(2)}
        </p>
      </div>
    );
  }
}

Header.propTypes = {
  email: PropTypes.string,
  expenses: PropTypes.array,
}.isRequired;

const mapStateToProps = (state) => ({
  email: state.user.email,
  expenses: state.wallet.expenses,
});

export default connect(mapStateToProps)(Header);
