const React = require('react');
const Suggest = require('./Suggest.jsx');

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.handleSearchKeyUp = this.handleSearchKeyUp.bind(this);
    this.state = {
      query: this.props.query,
      currentUser: this.props.currentUser,
    };
  }

  handleSearchKeyUp(e) {
    const query = e.target.value;
    if (query.length > 2) {
      this.setState({
        query,
      });
    }
  }

  render() {
    const { currentUser, messages } = this.props;
    return (
      <div>
        <div className="navbar navbar-inverse navbar-static-top" role="navigation">
          <div className="container">
            <div className="navbar-header">
              <button className="navbar-toggle" type="button" data-toggle="collapse" data-target=".navbar-collapse">
                <span className="sr-only">Toggle navigation</span>
                <span className="icon-bar" />
                <span className="icon-bar" />
                <span className="icon-bar" />
              </button>
              <a className="navbar-brand" href="/">
                ODR
              </a>
            </div>
            <div className="collapse navbar-collapse">
              <ul className="nav navbar-nav">
                <li className="active">
                  <a href="/">Inicio</a>
                </li>
                {this.props.currentUser && (
                  <li>
                    <a href={`/user/${currentUser.username}`}>Administrador</a>
                  </li>
                )}
                {!currentUser && (
                  <li>
                    <a href="/login">Login {currentUser}</a>
                  </li>
                )}
                {!currentUser && (
                  <li>
                    <a href="/register">Registrarse</a>
                  </li>
                )}
                {currentUser && (
                  <li>
                    <a href="/#companies">Cargar Reclamo</a>
                  </li>
                )}
                {currentUser && (
                  <li>
                    <a href="/logout">Salir</a>
                  </li>
                )}
              </ul>
            </div>
          </div>
        </div>
        <div className="notifications-wrapper">
          {/* {messages.error && <div className="alert alert-danger">{messages.error}</div>}
          {messages.info && <div className="alert alert-info">{messages.info}</div>}
          {messages.success && <div className="alert alert-success">{messages.success}</div>} */}
        </div>
      </div>
    );
  }
}

module.exports = Header;
