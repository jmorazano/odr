const React = require('react');
const PropTypes = require('prop-types');
const SimpleLayout = require('./components/SimpleLayout');

class Login extends React.Component {
  render() {
    const { templateData } = this.props;
    console.log(templateData);
    return (
      <SimpleLayout breadCrumbs="" query="">
        <div class="row">
          <div class="span8">
            <form method="POST">
              <div class="">
                <label for="username">Username</label>
                <input type="text" name="username" id="username" />
              </div>

              <div class="">
                <label for="password">Password</label>
                <input type="password" name="password" id="password" />
              </div>

              <div class="field">
                <input type="submit" class="btn btn-primary" value="Log in" />
              </div>
            </form>
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
