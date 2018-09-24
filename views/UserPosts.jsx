const React = require('react');
const PropTypes = require('prop-types');
const SideNavLayout = require('./components/SideNavLayout.jsx');

class UserPosts extends React.Component {
  render() {
    const { userClaims, userCompanies, currentUser, isOwner } = this.props;
    return (
      <SideNavLayout pageStyles="/assets/dist/styles/user-admin.css" currentUser={currentUser}>
        <div className="admin-wrapper">
          <div className="claim-wrapper">
            <h3 className="admin-title">Ultimas notificaciones</h3>
            <ul className="claim-list list-shadow">
              <li className="claim-list__item list-shadow__item">
                <a href="#" className="">
                  <img
                    src="http://grupcor.com/wp-content/uploads/2018/08/notification-flat.png"
                  />
                  <span>Claro respondió a tu reclamo del 17/08</span>
                </a>
              </li>
            </ul>
          </div>
          <div className="claim-wrapper">
            <h3 className="admin-title">Mis Reclamos Activos</h3>
            <ul className="claim-list list-shadow">
              {userClaims &&
                userClaims.map(claim => (
                  <li className="claim-list__item list-shadow__item">
                    <a href={`/admin/${currentUser.username}/claims/${claim.id}`} className="">
                      <img src={claim.company.logoUrl} alt={claim.company.legalName} />
                      <span>{claim.data.description}</span>
                    </a>
                  </li>
                ))}
            </ul>
          </div>
          {/* {userCompanies && (
            <div className="company-wrapper">
              <h3 className="admin-title">Empresas administradas</h3>
              <ul className="company-list list-shadow">
                {userCompanies.map(company => (
                  <li className="company-list__item list-shadow__item">
                    <a href={`/company/edit/${company.id}`} className="">
                      <img src={company.logoUrl} alt={company.legalName} />
                      <span>{company.legalName}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )} */}
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
