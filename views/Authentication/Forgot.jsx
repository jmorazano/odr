const React = require('react');
const PropTypes = require('prop-types');
const SimpleLayout = require('./../components/SimpleLayout');

class Forgot extends React.Component {
  render() {
    const { currentUser } = this.props;
    return (
      <SimpleLayout currentUser={currentUser}>
        <div>
          <div class="span8">
            <form className="form-group" method="POST">
              <div class="">
                <label for="email">email</label>
                <input type="text" name="email" id="email" />
              </div>
              <div class="field">
                <input type="submit" class="btn btn-primary" value="Forgot" />
              </div>
            </form>
          </div>
        </div>
      </SimpleLayout>
    );
  }
}

Forgot.defaultProps = {
  title: 'Default title',
};

Forgot.propType = {
  title: PropTypes.string,
  searchResults: PropTypes.object,
};

module.exports = Forgot;
