const React = require('react');
const PropTypes = require('prop-types');
const SimpleLayout = require('./components/SimpleLayout');

class ResetPass extends React.Component {
  render() {
    const { templateData } = this.props;
    console.log('ResetPass JSX:', templateData);
    return (
      <SimpleLayout currentUser={templateData.currentUser} breadCrumbs="" query="">
        <div>
          <form method="POST">
            <legend>Reset Password</legend>
            <div class="form-group">
              <label for="password">New Password</label>
              <input
                type="password"
                name="password"
                value=""
                placeholder="New password"
                autofocus="autofocus"
                class="form-control"
              />
            </div>
            <div class="form-group">
              <label for="confirm">Confirm Password</label>
              <input type="password" name="confirm" value="" placeholder="Confirm password" class="form-control" />
            </div>
            <div class="form-group">
              <button type="submit" class="btn btn-primary">
                Update Password
              </button>
            </div>
          </form>
        </div>
      </SimpleLayout>
    );
  }
}

ResetPass.defaultProps = {
  title: 'Default title',
};

ResetPass.propType = {
  title: PropTypes.string,
  searchResults: PropTypes.object,
};

module.exports = ResetPass;
