const React = require('react');
const PropTypes = require('prop-types');
const SimpleLayout = require('./../components/SimpleLayout');

class Register extends React.Component {
  render() {
    const { templateData } = this.props;
    return (
      <SimpleLayout pageStyles="/assets/dist/styles/login.css">
        <div className="login-wrapper">
          <h1>Register</h1>
          <form action="/register" method="POST">
            <div className="">
              <label htmlFor="username">Username</label>
              <input type="text" name="username" id="username" />
            </div>

            <div className="">
              <label htmlFor="email">Email</label>
              <input type="text" name="email" id="email" />
            </div>

            <div className="">
              <label htmlFor="password">Password</label>
              <input type="password" name="password" id="password" />
            </div>

            <div className="">
              <label htmlFor="confirm">Password again</label>
              <input type="password" name="confirm" id="confirm" />
            </div>

            {templateData.nextUrl && <input type="hidden" name="next_url" value={templateData.nextUrl} />}

            <div className="field">
              <input type="submit" className="odr-btn" value="Register" />
            </div>
          </form>
        </div>
      </SimpleLayout>
    );
  }
}

Register.defaultProps = {
  title: 'Default title',
};

Register.propType = {
  title: PropTypes.string,
  searchResults: PropTypes.object,
};

module.exports = Register;
