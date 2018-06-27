const React = require('react');
const PropTypes = require('prop-types');
const SideNavLayout = require('./components/SideNavLayout.jsx');

class UserPosts extends React.Component {
  render() {
    const { currentUser } = this.props;
    return (
      <SideNavLayout pageStyles="/assets/dist/styles/user-admin.css" currentUser={currentUser}>
        <div className="admin-wrapper">
          <div className="claim-wrapper">
            <h3 className="admin-title">Ayuda</h3>
            <ul className="claim-list list-shadow">
            </ul>
          </div>
        </div>
      </SideNavLayout>
    );
  }
}

UserPosts.defaultProps = {
  title: 'Default title',
};

UserPosts.propType = {
  title: PropTypes.string,
  searchResults: PropTypes.object,
};

module.exports = UserPosts;
