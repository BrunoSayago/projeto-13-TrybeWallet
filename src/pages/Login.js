import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { newUser } from '../redux/actions';

class Login extends React.Component {
  state = {
    email: '',
    password: '',
    buttonDisabled: true,
    redirected: false,
  };

  validacaoBtn = () => {
    const { email, password } = this.state;
    const regexp = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+(\.[a-z]+)?$/i;
    const lengthPassword = 6;
    const emailValido = email.match(regexp);
    const senhaValida = password.length >= lengthPassword;
    if (emailValido && senhaValida) {
      this.setState({ buttonDisabled: false });
    } else {
      this.setState({ buttonDisabled: true });
    }
  };

  handleClick = () => {
    const { email } = this.state;
    const { emailDispatch } = this.props;
    emailDispatch(email);
    this.setState({ redirected: true });
  };

  handleChange = ({ target: { name, value } }) => {
    this.setState({ [name]: value }, () => this.validacaoBtn());
  };

  render() {
    const { email, password, buttonDisabled, redirected } = this.state;
    if (redirected) {
      return (
        <Redirect to="/carteira" />
      );
    }
    return (
      <form>
        <label htmlFor="email-input">
          E-mail:
          {' '}
          <input
            type="email"
            data-testid="email-input"
            id="email-input"
            name="email"
            value={ email }
            onChange={ this.handleChange }
          />
        </label>
        <label htmlFor="password-input">
          Senha:
          {' '}
          <input
            type="password"
            data-testid="password-input"
            id="password-input"
            name="password"
            value={ password }
            onChange={ this.handleChange }
          />
        </label>
        <button
          type="button"
          disabled={ buttonDisabled }
          onClick={ this.handleClick }
        >
          Entrar
        </button>
      </form>
    );
  }
}

Login.propTypes = {
  emailDispatch: PropTypes.func,
}.isRequired;

const mapDispatchToProps = (dispatch) => ({
  emailDispatch: (state) => dispatch(newUser(state)),
});

export default connect(null, mapDispatchToProps)(Login);
