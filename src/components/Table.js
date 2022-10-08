import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { atualizaDespesas, changeEditing } from '../redux/actions';

class Table extends Component {
  botaoExcluir = (event) => {
    const { expenses, atualizaDispatch } = this.props;
    // console.log(expenses);
    const botao = event.target;
    const celula = botao.parentElement;
    const linha = celula.parentElement;
    const obs = linha.attributes.name.value;
    const novaLista = expenses.filter((despesa) => despesa.description !== obs);
    atualizaDispatch(novaLista);
  };

  botaoEditar = (event) => {
    const { editing, trocaEditando } = this.props;
    const obsAtual = event.target.parentElement.parentElement.attributes.name.value;
    const situacao = editing.isEditing;
    const obsSituacao = editing.obsEditing;
    if (situacao === false || obsSituacao !== obsAtual) {
      trocaEditando({ isEditing: true, obsEditing: obsAtual });
    } else if (situacao === true && obsSituacao === obsAtual) {
      console.log(this.state);
      trocaEditando({ isEditing: false, obsEditing: '' });
    }
  };

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
                      <tr key={ despesa.description } name={ despesa.description }>
                        <td>{despesa.description}</td>
                        <td>{despesa.tag}</td>
                        <td>{despesa.method}</td>
                        <td>{Number(despesa.value).toFixed(2)}</td>
                        <td>{moeda}</td>
                        <td>{cambio.toFixed(2)}</td>
                        <td>{valorConvertido.toFixed(2)}</td>
                        <td>Real</td>
                        <td>
                          <button
                            type="button"
                            data-testid="edit-btn"
                            onClick={ this.botaoEditar }
                          >
                            Editar despesa
                          </button>
                          <button
                            type="button"
                            data-testid="delete-btn"
                            onClick={ this.botaoExcluir }
                          >
                            Excluir
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
  editing: state.wallet.editing,
});

const mapDispatchToProps = (dispatch) => ({
  atualizaDispatch: (state) => dispatch(atualizaDespesas(state)),
  trocaEditando: (state) => dispatch(changeEditing(state)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Table);
