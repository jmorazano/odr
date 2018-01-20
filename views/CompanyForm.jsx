const React = require('react');
const PropTypes = require('prop-types');
const SideNavLayout = require('./components/SideNavLayout.jsx');

class BlogForm extends React.Component {
  render() {
    const { title, currentUser, company } = this.props;

    return (
      <SideNavLayout currentUser={currentUser}>
        <div className="">
          <div className="span12">
            <h1>{title}</h1>
          </div>
        </div>
        <div className="">
          <div className="centered">
            <form method="POST" action="/new-company">
              <div className="group">
                <input type="text" required name="legal_name" id="id_legal_name" value={company && company.legalName} />
                <span className="highlight" />
                <span className="bar" />
                <label htmlFor="id_legal_name">Razón Social</label>
              </div>

              <div className="group">
                <input type="text" required name="tax_id" id="id_tax_id" value={company && company.taxId} />
                <span className="highlight" />
                <span className="bar" />
                <label htmlFor="id_tax_id">CUIT / CUIL</label>
              </div>

              <div className="group">
                <input type="text" required name="logo_url" id="logo_url" value={company && company.logo_url} />
                <span className="highlight" />
                <span className="bar" />
                <label htmlFor="logo_url">Logo url</label>
              </div>

              {company && <input type="hidden" name="company_id" id="company_id" value={company.id} />}
              <input type="submit" className="odr-btn" value="Guardar" />
            </form>
          </div>
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
