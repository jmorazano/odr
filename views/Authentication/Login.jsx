const React = require('react');
const PropTypes = require('prop-types');
const SimpleLayout = require('./../components/SimpleLayout');

class Login extends React.Component {
  render() {
    const { templateData } = this.props;
    return (
      <SimpleLayout currentUser={templateData.currentUser} breadCrumbs="" query="">
        <div>
          <div className="span8">
            <form className="form-group" method="POST">
              <div className="">
                <label htmlFor="username">Username</label>
                <input type="text" name="username" id="username" />
              </div>

              <div className="">
                <label htmlFor="password">Password</label>
                <input type="password" name="password" id="password" />
              </div>

              <div className="field">
                <input type="submit" className="btn btn-primary" value="Log in" />
              </div>
            </form>
            <div>
              <a href="/forgot">Te olvidaste tu contraseña?</a>
            </div>
            <div>
              <a href="/register">No tenés cuenta? Registrate Acá</a>
            </div>
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
