const React = require('react');
const PropTypes = require('prop-types');
const SideNavLayout = require('./components/SideNavLayout.jsx');

class UserPosts extends React.Component {
  render() {
    const { userClaims, userCompanies, currentUser, isOwner } = this.props;
    console.log('USER CLAIMS----->', userClaims);
    console.log('USER COMPANIES----->', userCompanies);
    return (
      <SideNavLayout currentUser={currentUser}>
        <div className="row">
          <div className="span9">
            <h1>Reclamos de {currentUser.username}</h1>
            <br />
            {userClaims &&
              userClaims.map(post => (
                <div>
                  <h2>
                    {post.title}
                    {isOwner && (
                      <a href={`/edit/${post.id}`} className="btn btn-primary btn-small">
                        edit
                      </a>
                    )}
                  </h2>
                  <p>{post.body}</p>
                </div>
              ))}
          </div>

          <div className="span9">
            <h1>Empresas de {currentUser.username}</h1>
            <br />
            {userCompanies &&
              userCompanies.map(company => (
                <div>
                  <h2>
                    {company.legalName}
                    {isOwner && (
                      <a href={`/company/edit/${company.id}`} className="btn btn-primary btn-small">
                        edit
                      </a>
                    )}
                  </h2>
                  <p>{company.taxId}</p>
                </div>
              ))}
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
