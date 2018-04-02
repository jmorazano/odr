const React = require('react');
const PropTypes = require('prop-types');
const SimpleLayout = require('./components/SimpleLayout');

class BlogForm extends React.Component {
  render() {
    const { currentUser, questionsTxtArr, purchaseDateFormatted, claim, companyInfo, questionsPath } = this.props;

    return (
      <SimpleLayout currentUser={currentUser} pageStyles="/assets/dist/styles/claim-form.css">
        <div className="company-info">
          <img className="company-info__logo" src={companyInfo.logoUrl} alt={companyInfo.legalName} />
          <h2 className="company-info__name">{companyInfo.legalName}</h2>
          <p className="company-info__txt">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorum quis unde ea dolores eius enim omnis
            tempora alias quos asperiores delectus sed!
          </p>
        </div>

        {claim && <h4>Reclamo para:</h4>}
        {questionsTxtArr && questionsTxtArr.map(question => <p>{question}</p>)}

        <div className="claim-form">
          <h3>Detalle de su reclamo</h3>
          <form method="POST" action={questionsTxtArr ? '' : '/write'}>
            <div className="group">
              <input
                type="date"
                required
                name="purchase_date"
                id="purchase_date"
                value={claim && purchaseDateFormatted}
                className="always-focus"
              />
              <span className="highlight" />
              <span className="bar" />
              <label htmlFor="purchase_date">Fecha</label>
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
              <label htmlFor="paid_amount">Monto a reclamar</label>
            </div>

            <div className="group">
              <textarea name="description" id="description" rows="4" cols="150">
                {claim && claim.data.description}
              </textarea>
              <span className="highlight" />
              <span className="bar" />
              <label htmlFor="description">Descripción</label>
            </div>

            <div className="group">
              <input multiple type="file" name="file" id="files" />
              <span className="highlight" />
              <span className="bar" />
              <label htmlFor="file">Adjuntar archivos</label>
            </div>

            {questionsPath && questionsPath.map(question => <input type="hidden" name="questions" value={question} />)}
            {claim && <input type="hidden" name="claim_id" id="claim_id" value={claim.id} />}
            {companyInfo && <input type="hidden" name="company_id" id="company_id" value={companyInfo.id} />}

            <input type="submit" className="odr-btn" value="Guardar" />
            {claim && (
              <a className="remove-link" href={`/remove/${claim.id}`}>
                Eliminar reclamo
              </a>
            )}
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
