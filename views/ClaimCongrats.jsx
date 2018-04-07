const React = require('react');
const PropTypes = require('prop-types');
const SimpleLayout = require('./components/SimpleLayout');

class ClaimCongrats extends React.Component {
  render() {
    const { currentUser } = this.props;

    return (
      <SimpleLayout className="claim-congrats" currentUser={currentUser} pageStyles="/assets/dist/styles/claim-form.css">
        <div className="congrats-wrapper pattern-bg">
          <h2 className="congrats-wrapper__title">Tu reclamo ha sido registrado</h2>
          <p>Para ver en que estado se encuentra, puedes entrar a tu administrador cuando lo desees</p>
          <a className="odr-btn" href={`/admin/${currentUser.username}`}>
            Ir al Administrador
          </a>
        </div>
      </SimpleLayout>
    );
  }
}

ClaimCongrats.defaultProps = {
  title: 'Default title',
};

ClaimCongrats.propType = {
  title: PropTypes.string,
  searchResults: PropTypes.object,
};

module.exports = ClaimCongrats;
