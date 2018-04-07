const React = require('react');
const PropTypes = require('prop-types');
const SimpleLayout = require('../components/SimpleLayout');

class RegisterCongrats extends React.Component {
  render() {
    const { currentUser } = this.props;

    return (
      <SimpleLayout
        className="claim-congrats"
        currentUser={currentUser}
        pageStyles="/assets/dist/styles/claim-form.css"
      >
        <div className="congrats-wrapper pattern-bg">
          <h2 className="congrats-wrapper__title">Gracias por registrarte en ODR</h2>
          <p>Para ver el estado de tu cuenta, puedes entrar a tu administrador cuando lo desees</p>
          <a className="odr-btn" href={`/admin/${currentUser.username}`}>
            Ir al Administrador
          </a>
        </div>
      </SimpleLayout>
    );
  }
}

RegisterCongrats.defaultProps = {
  title: 'Default title',
};

RegisterCongrats.propType = {
  title: PropTypes.string,
  searchResults: PropTypes.object,
};

module.exports = RegisterCongrats;
