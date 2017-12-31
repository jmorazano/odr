const React = require('react');
const PropTypes = require('prop-types');
const SimpleLayout = require('./components/SimpleLayout');

class Odr extends React.Component {
  render() {
    const { companies, currentUser } = this.props;
    console.log('CURRENT USER FROM ODR.JSX--->', currentUser);

    return (
      <SimpleLayout currentUser={currentUser} breadCrumbs="" query="">
        <h1>
          Empresas asociadas a ODR:
          {companies.map(company => <h2>{company.legalName}</h2>)}
        </h1>
      </SimpleLayout>
    );
  }
}

Odr.defaultProps = {
  title: 'Default title',
};

Odr.propType = {
  title: PropTypes.string,
  searchResults: PropTypes.object,
};

module.exports = Odr;
