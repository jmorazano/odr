const React = require('react');
const PropTypes = require('prop-types');
const SimpleLayout = require('./../components/SimpleLayout');

class ResetPass extends React.Component {
  render() {
    const { templateData } = this.props;
    console.log('ResetPass JSX:', templateData);
    return (
      <SimpleLayout currentUser={templateData.currentUser} breadCrumbs="" query="">
        <div>
          <form method="POST">
            <legend>Reset Password</legend>
            <div className="form-group">
              <label htmlFor="password">New Password</label>
              <input
                type="password"
                name="password"
                value=""
                placeholder="New password"
                autofocus="autofocus"
                className="form-control"
              />
            </div>
            <div className="form-group">
              <label htmlFor="confirm">Confirm Password</label>
              <input type="password" name="confirm" value="" placeholder="Confirm password" className="form-control" />
            </div>
            <div className="form-group">
              <button type="submit" className="btn btn-primary">
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
