const React = require('react');
const PropTypes = require('prop-types');
const SideNavLayout = require('./components/SideNavLayout');

class UserConfig extends React.Component {
  render() {
    const { currentUser, questionsTxtArr, purchaseDateFormatted, claim, companyInfo, questionsPath } = this.props;

    return (
      <SideNavLayout currentUser={currentUser} pageStyles="/assets/dist/styles/claim-form.css">
        <div className="admin-wrapper">
          <ul>
            <li>
              <a href="/new-company">Agregar empresa</a>
            </li>
            <li>...</li>
            <li>...</li>
          </ul>
        </div>
      </SideNavLayout>
    );
  }
}

UserConfig.defaultProps = {
  title: 'Default title',
};

UserConfig.propType = {
  title: PropTypes.string,
  searchResults: PropTypes.object,
};

module.exports = UserConfig;
