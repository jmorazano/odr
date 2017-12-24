const React = require('react');
const SimpleLayout = require('./components/SimpleLayout');

class Error extends React.Component {
  render() {
    const { error, currentUser } = this.props;
    return (
      <SimpleLayout currentUser={currentUser}>
        <div className="error">
          <h1 className="error__title">Ups! Hubo un error en el error.middleware.js</h1>
          <h1 className="error__subtitle">Detalle del error:</h1>
          <div className="error__detail">{error}"</div>
        </div>
      </SimpleLayout>
    );
  }
}

module.exports = Error;
