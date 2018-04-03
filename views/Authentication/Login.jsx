const React = require('react');
const PropTypes = require('prop-types');
const SimpleLayout = require('./../components/SimpleLayout');

class Login extends React.Component {
  render() {
    const { templateData } = this.props;
    console.log(`template dataaaaaa: ${templateData.nextUrl}`);
    return (
      <SimpleLayout pageStyles="/assets/dist/styles/login.css" currentUser={templateData.currentUser}>
        <div className="login-wrapper">
          <h3>Inicia sesión</h3>
          <form className="form-group" action="/login" method="POST">
            <div className="group">
              <input type="text" required name="username" id="username" />
              <span className="highlight" />
              <span className="bar" />
              <label htmlFor="username">Usuario</label>
            </div>

            <div className="group">
              <input type="password" required name="password" id="password" />
              <span className="highlight" />
              <span className="bar" />
              <label htmlFor="username">Contraseña</label>
            </div>

            {templateData.nextUrl && <input type="hidden" name="next_url" value={templateData.nextUrl} />}

            <div className="field">
              <input type="submit" className="odr-btn" value="Ingresar" />
            </div>
          </form>
          <div>
            <a href="/forgot">Te olvidaste tu contraseña?</a>
          </div>
          <div>
            <a href={`/register${templateData.nextUrl ? `?next_url=${escape(templateData.nextUrl)}` : ''}`}>
              No tenés cuenta? Registrate Acá
            </a>
          </div>
        </div>
      </SimpleLayout>
    );
  }
}

Login.defaultProps = {
  title: 'Default title',
};

Login.propType = {
  title: PropTypes.string,
  searchResults: PropTypes.object,
};

module.exports = Login;
