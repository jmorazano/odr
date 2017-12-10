const React = require('react');
const PropTypes = require('prop-types');
const SimpleLayout = require('./components/SimpleLayout');

class Odr extends React.Component {
  render() {
    const { templateData } = this.props;
    console.log(templateData);
    return (
      <SimpleLayout breadCrumbs="" query="">
        <h1>Template Data: {templateData.posts}</h1>
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
