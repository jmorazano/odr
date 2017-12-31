const React = require('react');
const Header = require('./Header.jsx');
const SidebarNav = require('./SidebarNav.jsx');

class SimpleLayout extends React.Component {
  render() {
    const { currentUser } = this.props;
    return (
      <html>
        <head>
          <meta charSet="utf-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
          <meta httpEquiv="cleartype" content="on" />
          <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
          <meta name="theme-color" content="#fff059" />
          <title>ODR Argentina | Beta Version</title>
          {/* TODO: CHANGE BOOTSTRAP V TO REACT */}
          <link rel="stylesheet" href="//netdna.bootstrapcdn.com/bootstrap/3.1.1/css/bootstrap.min.css" />
          <script src="//ajax.googleapis.com/ajax/libs/jquery/1.11.0/jquery.min.js" />
          <script src="//netdna.bootstrapcdn.com/bootstrap/3.1.1/js/bootstrap.min.js" />

          <link href="https://fonts.googleapis.com/css?family=Roboto:300,400,700" rel="stylesheet" />
          <link href="/assets/dist/styles/main.css" rel="stylesheet" />
        </head>
        <body>
          <header role="banner" data-js="header" className="header">
            <Header currentUser={currentUser} query={this.props.query} />
          </header>
          <nav className="sidebar-nav">
            <SidebarNav currentUser={currentUser} />
          </nav>
          <main role="main" className="main">
            <div className="main__content">{this.props.children}</div>
          </main>
          <script src="https://cdnjs.cloudflare.com/ajax/libs/react/16.0.0/umd/react.production.min.js" />
          <script src="https://cdnjs.cloudflare.com/ajax/libs/react-dom/16.0.0/umd/react-dom.production.min.js" />
        </body>
      </html>
    );
  }
}

module.exports = SimpleLayout;
