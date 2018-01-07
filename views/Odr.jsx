const React = require('react');
const PropTypes = require('prop-types');
const SimpleLayout = require('./components/SimpleLayout');

class Odr extends React.Component {
  render() {
    const { companies, currentUser } = this.props;
    return (
      <SimpleLayout currentUser={currentUser} pageStyles="/assets/dist/styles/landing.css" query="">
        <section className="hero">
          <div className="hero__info">
            <h1 className="hero__title">Titulo del hero</h1>
            <p className="hero__text">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Magnam ad possimus incidunt quis architecto,
              sequi facere moledolor!
            </p>
            <a href="#companies" className="hero__cta odr-btn">
              Hacer reclamo
            </a>
          </div>
        </section>
        <section className="how-it-works pattern-bg">
          <h2 className="how-it-works__title">¿Cómo funciona?</h2>
          <div className="how-it-works__content">
            <ul className="steps">
              <li className="steps__item">Step 1</li>
              <li className="steps__item">Step 2</li>
              <li className="steps__item">Step 3</li>
              <li className="steps__item">Step 4</li>
            </ul>
            <div className="video">
              <img src="http://boxes53.com/images/video-dummy.gif" alt="" className="video__dummy" />
            </div>
          </div>
        </section>
        <section id="companies" className="companies pattern-bg">
          <h2 className="companies__title">Inicia un reclamo</h2>
          <span className="glyphicon glyphicon-chevron-left companies-arrow companies-arrow--left" />
          <span className="glyphicon glyphicon-chevron-right companies-arrow companies-arrow--right" />
          <div className="centered">
            <div className="group">
              <input type="text" required="required" />
              <span className="highlight" />
              <span className="bar" />
              <label>Buscar empresa</label>
            </div>
          </div>
          <div className="companies__wrapper">
            <ul className="company-list">
              {companies.map(company => (
                <li style={{ backgroundImage: 'url(' + company.logoUrl + ')' }} className="company-list__item">
                  <a href={`/write/${company.id}`} data-js={company.legalName}>
                    {company.legalName}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </section>
        <section className="faqs pattern-bg">
          <h2 className="faqs__title">Preguntas Frecuentes</h2>
          <div id="accordion" className="faqs__accordion" role="tablist">
            <div className="card">
              <div className="card-header" role="tab" id="headingOne">
                <h5 className="mb-0">
                  <a
                    className="collapsed accordion-toggle"
                    data-toggle="collapse"
                    href="#collapseOne"
                    role="button"
                    aria-expanded="true"
                    aria-controls="collapseOne"
                  >
                    ¿Pregunta numero #1?
                  </a>
                </h5>
              </div>

              <div
                id="collapseOne"
                className="collapse"
                role="tabpanel"
                aria-labelledby="headingOne"
                data-parent="#accordion"
              >
                <div className="card-body">
                  Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf
                  moon officia aute, non cupidatat skateboard dolor brunch. Food truck quinoa nesciunt laborum eiusmod.
                  Brunch 3 wolf moon tempor, sunt aliqua put a bird on it squid single-origin coffee nulla assumenda
                  shoreditch et. Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea
                  proident. Ad vegan excepteur butcher vice lomo. Leggings occaecat craft beer farm-to-table, raw denim
                  aesthetic synth nesciunt you probably haven't heard of them accusamus labore sustainable VHS.
                </div>
              </div>
            </div>
            <div className="card">
              <div className="card-header" role="tab" id="headingTwo">
                <h5 className="mb-0">
                  <a
                    className="accordion-toggle collapsed"
                    data-toggle="collapse"
                    href="#collapseTwo"
                    role="button"
                    aria-expanded="false"
                    aria-controls="collapseTwo"
                  >
                    ¿Pregunta numero #2?
                  </a>
                </h5>
              </div>
              <div
                id="collapseTwo"
                className="collapse"
                role="tabpanel"
                aria-labelledby="headingTwo"
                data-parent="#accordion"
              >
                <div className="card-body">
                  Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf
                  moon officia aute, non cupidatat skateboard dolor brunch. Food truck quinoa nesciunt laborum eiusmod.
                  Brunch 3 wolf moon tempor, sunt aliqua put a bird on it squid single-origin coffee nulla assumenda
                  shoreditch et. Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea
                  proident. Ad vegan excepteur butcher vice lomo. Leggings occaecat craft beer farm-to-table, raw denim
                  aesthetic synth nesciunt you probably haven't heard of them accusamus labore sustainable VHS.
                </div>
              </div>
            </div>
            <div className="card">
              <div className="card-header" role="tab" id="headingThree">
                <h5 className="mb-0">
                  <a
                    className="accordion-toggle collapsed"
                    data-toggle="collapse"
                    href="#collapseThree"
                    role="button"
                    aria-expanded="false"
                    aria-controls="collapseThree"
                  >
                    ¿Pregunta numero #3?
                  </a>
                </h5>
              </div>
              <div
                id="collapseThree"
                className="collapse"
                role="tabpanel"
                aria-labelledby="headingThree"
                data-parent="#accordion"
              >
                <div className="card-body">
                  Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf
                  moon officia aute, non cupidatat skateboard dolor brunch. Food truck quinoa nesciunt laborum eiusmod.
                  Brunch 3 wolf moon tempor, sunt aliqua put a bird on it squid single-origin coffee nulla assumenda
                  shoreditch et. Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea
                  proident. Ad vegan excepteur butcher vice lomo. Leggings occaecat craft beer farm-to-table, raw denim
                  aesthetic synth nesciunt you probably haven't heard of them accusamus labore sustainable VHS.
                </div>
              </div>
            </div>
          </div>
        </section>
        <h1 />
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
