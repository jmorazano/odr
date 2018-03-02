const React = require('react');
const PropTypes = require('prop-types');
const SimpleLayout = require('./components/SimpleLayout');

class QuestionsView extends React.Component {
  render() {
    const { currentUser, companyInfo, questions, nextUrl } = this.props;

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

        <div className="questions-wrapper">
          <h3>Indique a que corresponde su reclamo</h3>
          <ul className="question-list">
            {questions && questions.map(question => (
              <li className="question-list__item">
                <a href={nextUrl + question.id}>{question.text}</a>
              </li>
            ))}
          </ul>
        </div>
      </SimpleLayout>
    );
  }
}

QuestionsView.defaultProps = {
  title: 'Default title',
};

QuestionsView.propType = {
  title: PropTypes.string,
  searchResults: PropTypes.object,
};

module.exports = QuestionsView;
