const React = require('react');
const PropTypes = require('prop-types');
const SideNavLayout = require('./components/SideNavLayout.jsx');

class UserPosts extends React.Component {
  render() {
    const { userClaims, userCompanies, currentUser, isOwner } = this.props;
    return (
      <SideNavLayout pageStyles="/assets/dist/styles/user-admin.css" currentUser={currentUser}>
        <div className="admin-wrapper">
          <p>Aquí debería ir el resumen de su cuenta, por ejemplo:</p>
          <p>Cantidad de reclamos abiertos, mensajes pendientes (notificaciones)</p>
          {userCompanies &&
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
          }
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
