const React = require('react');
const PropTypes = require('prop-types');
const SideNavLayout = require('./components/SideNavLayout');

class BlogForm extends React.Component {
  render() {
    const { currentUser, questionsTxtArr, purchaseDateFormatted, claim, companyInfo, questionsPath } = this.props;

    return (
      <SideNavLayout currentUser={currentUser} pageStyles="/assets/dist/styles/claim-detail.css">
        <a className="go-back" href={`/admin/${currentUser.username}/claims`}>
          {'< '}
          Mis reclamos
        </a>
        <div className="claim-header">
          <h2 className="claim-header__title">Detalle del reclamo</h2>
          <span className="claim-header__status status-label status-label--active">Abierto</span>
        </div>
        <div className="questions">
          <img src={companyInfo.logoUrl} />
          {questionsTxtArr && questionsTxtArr.map(question => <p className="question">{question}</p>)}
        </div>
        <div className="claim-wrapper">
          <div className="comunication-column">
            <div className="chat-window">
              <div className="chat-window__meeting-info">
                <span>Conversación agendada para el 29/09 a las 18:30</span>
              </div>
              <div className="chat-window__msgs chat-window__msgs--empty">
                <p>No hay mensajes nuevos</p>
              </div>
              <div className="chat-window__write">
                <input type="text" name="message" id="" />
                <img src="http://grupcor.com/wp-content/uploads/2018/08/77422939433582.png" alt="" />
              </div>
            </div>
          </div>
          <div className="claim-details">
            <h4>Adjuntos</h4>
            <div className="attached-files list-shadow">
              <div className="file-info">
                <span>factura-de-compra.jpg</span>
                <img src="http://grupcor.com/wp-content/uploads/2018/08/trash-icon.png" alt="" />
              </div>
              <div className="add-btn">
                <img src="http://grupcor.com/wp-content/uploads/2018/08/plus.png" alt="" />
              </div>
            </div>
            <a href="#" className="odr-btn">
              Celebrar acuerdo
            </a>
            <a href={`/remove/${claim.id}`} className="cancel-btn">
              Cancelar reclamo
            </a>
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
