const React = require('react');
const PropTypes = require('prop-types');
const SideNavLayout = require('./components/SideNavLayout');

class BlogForm extends React.Component {
  render() {
    const { currentUser, questionsTxtArr, purchaseDateFormatted, claim, companyInfo, questionsPath } = this.props;

    return (
      <SideNavLayout currentUser={currentUser} pageStyles="/assets/dist/styles/claim-form.css">
        <div className="admin-wrapper">
          <ul>
            <li>Chat</li>
            <li>Adjuntos</li>
            <li>...</li>
          </ul>
        </div>
      </SideNavLayout>
    );
  }
}

BlogForm.defaultProps = {
  title: 'Default title',
};

BlogForm.propType = {
  title: PropTypes.string,
  searchResults: PropTypes.object,
};

module.exports = BlogForm;
