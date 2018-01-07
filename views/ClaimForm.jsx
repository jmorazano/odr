const React = require('react');
const PropTypes = require('prop-types');
const SimpleLayout = require('./components/SimpleLayout');

class BlogForm extends React.Component {
  render() {
    const { currentUser, title, claim, companyInfo } = this.props;

    return (
      <SimpleLayout currentUser={currentUser} pageStyles="/assets/dist/styles/claim-form.css">
        <div className="company-info">
          <img className="company-info__logo" src={companyInfo.logoUrl} alt={companyInfo.legalName} />
          <h3 className="company-info__name">{companyInfo.legalName}</h3>
          <p className="company-info__txt">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorum quis unde ea dolores eius enim omnis
            tempora alias quos asperiores delectus sed!
          </p>
        </div>

        <div className="claim-form">
          <h1>{title}</h1>
          <form method="POST" action="/write">
            <div className="group">
              <input
                type="date"
                required
                name="purchase_date"
                id="purchase_date"
                value={claim && claim.data.purchaseDate}
              />
              <span className="highlight" />
              <span className="bar" />
              <label htmlFor="purchase_date">Fecha de compra</label>
            </div>

            <div className="group">
              <input
                type="number"
                required
                name="paid_amount"
                id="paid_amount"
                value={claim && claim.data.paidAmount}
              />
              <span className="highlight" />
              <span className="bar" />
              <label htmlFor="paid_amount">Monto abonado</label>
            </div>

            <div className="group">
              <textarea name="description" id="description" rows="4" cols="150">
                {claim && claim.data.description}
              </textarea>
              <span className="highlight" />
              <span className="bar" />
              <label htmlFor="description">Descripción</label>
            </div>

            {claim && <input type="hidden" name="claim_id" id="claim_id" value={claim.id} />}
            {companyInfo && <input type="hidden" name="company_id" id="company_id" value={companyInfo.id} />}

            <input type="submit" className="odr-btn" value="Guardar" />
          </form>
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
