const React = require('react');
const PropTypes = require('prop-types');
const SimpleLayout = require('./../components/SimpleLayout');

class Register extends React.Component {
  render() {
    const { templateData } = this.props;
    console.log(templateData);
    return (
      <SimpleLayout breadCrumbs="" query="">
        <div class="row">
          <div class="span8">
            <h1>Register</h1>
            <form action="/register" method="POST">
              <div class="">
                <label htmlFor="username">Username</label>
                <input type="text" name="username" id="username" />
              </div>

              <div class="">
                <label htmlFor="email">Email</label>
                <input type="text" name="email" id="email" />
              </div>

              <div class="">
                <label htmlFor="password">Password</label>
                <input type="password" name="password" id="password" />
              </div>

              <div class="">
                <label htmlFor="confirm">Password again</label>
                <input type="password" name="confirm" id="confirm" />
              </div>

              <div class="field">
                <input type="submit" class="btn btn-primary" value="Register" />
              </div>
            </form>
          </div>
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
