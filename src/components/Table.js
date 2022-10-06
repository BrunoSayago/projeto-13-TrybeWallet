import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Table extends Component {
  render() {
    const { expenses } = this.props;
    return (
      <div>
        <h2>Tabela de Gastos</h2>
        <table>
          <thead>
            <tr>
              <th>Descrição</th>
              <th>Tag</th>
              <th>Método de pagamento</th>
              <th>Valor</th>
              <th>Moeda</th>
              <th>Câmbio utilizado</th>
              <th>Valor convertido</th>
              <th>Moeda de conversão</th>
              <th>Editar/Excluir</th>
            </tr>
          </thead>
          {
            expenses && (
              <tbody>
                {
                  expenses.map((despesa) => {
                    const { currency } = despesa;
                    const cambio = Number(despesa.exchangeRates[currency].ask);
                    const moeda = despesa.exchangeRates[currency].name;
                    const valorConvertido = Number(despesa.value) * cambio;
                    return (
                      <tr key={ despesa.description }>
                        <td>{despesa.description}</td>
                        <td>{despesa.tag}</td>
                        <td>{despesa.method}</td>
                        <td>{Number(despesa.value).toFixed(2)}</td>
                        <td>{moeda}</td>
                        <td>{cambio.toFixed(2)}</td>
                        <td>{valorConvertido.toFixed(2)}</td>
                        <td>Real</td>
                        <td>
                          <button type="button">
                            1
                          </button>
                          <button type="button">
                            2
                          </button>
                        </td>
                      </tr>
                    );
                  })
                }
              </tbody>
            )
          }
        </table>
      </div>
    );
  }
}

Table.propTypes = {
  expenses: PropTypes.shape({
    map: PropTypes.func,
  }),
}.isRequired;

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
});

export default connect(mapStateToProps)(Table);
