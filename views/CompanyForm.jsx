const React = require('react');
const PropTypes = require('prop-types');
const SimpleLayout = require('./components/SimpleLayout.jsx');

class BlogForm extends React.Component {
  render() {
    const { title, currentUser, company } = this.props;

    return (
      <SimpleLayout currentUser={currentUser}>
        <div className="row">
          <div className="span12">
            <h1>{title}</h1>
          </div>
        </div>
        <div className="row">
          <div className="span8">
            <form method="POST" action="/new-company">
              <div className="field required">
                <label htmlFor="id_legal_name">Razón Social</label>
                <input type="text" required name="legal_name" id="id_legal_name" value={company && company.legalName} />
              </div>

              <div className="field required">
                <label htmlFor="id_tax_id">CUIT / CUIL</label>
                <input type="text" required name="tax_id" id="id_tax_id" value={company && company.taxId} />
              </div>

              {company && <input type="hidden" name="company_id" id="company_id" value={company.id} />}

              <input type="submit" className="btn" value="Guardar" />
            </form>
          </div>
        </div>
      </SimpleLayout>
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
