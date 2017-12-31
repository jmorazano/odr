const React = require('react');
const Suggest = require('./Suggest.jsx');

class Header extends React.Component {
  render() {
    const { currentUser } = this.props;

    return (
      <div>
        <div className="user-info">
          <img
            src="https://freeiconshop.com/wp-content/uploads/edd/person-flat.png"
            alt=""
            className="user-info__avatar"
          />
          <p className="user-info__name">{currentUser.username}</p>
        </div>
        <div className="nav-items">
          <div className="nav-item">
            <a href="#" className="nav-item__link">
              Resumen
            </a>
          </div>
          <div className="nav-item">
            <a href="#" className="nav-item__link">
              Mis Reclamos
            </a>
          </div>
          <div className="nav-item">
            <a href="#" className="nav-item__link">
              Mi Reputación
            </a>
          </div>
          <div className="nav-item">
            <a href="#" className="nav-item__link">
              Ayuda
            </a>
          </div>
          <div className="nav-item">
            <a href="#" className="nav-item__link">
              Configuración
            </a>
          </div>
        </div>
      </div>
    );
  }
}

module.exports = Header;
