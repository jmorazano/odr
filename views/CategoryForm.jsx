const React = require('react');
const PropTypes = require('prop-types');
const SideNavLayout = require('./components/SideNavLayout.jsx');

class CategoryForm extends React.Component {
  render() {
    const { currentUser, category } = this.props;

    return (
      <SideNavLayout
        currentUser={currentUser}
        pageStyles="/assets/dist/styles/category-form.css"
        pageScript="/assets/dist/scripts/categoryForm.js"
      >
        <div className="">
          <h1>Crear categoria</h1>
          <div className="centered">
            {/* <form method="POST" action="/new-company"> */}
            <div className="group">
              <input
                type="text"
                required
                name="category_name"
                id="id_category_name"
                value={category && category.name}
              />
              <span className="highlight" />
              <span className="bar" />
              <label htmlFor="id_category_name">Nombre de la categoria</label>
            </div>

            <h2>Niveles de preguntas</h2>
            <div data-js="level-info" data-level="1" className="levels-wrapper">
              <div data-js="level" className="level-wrapper">
                <div className="group">
                  <input type="number" required name="level_index" id="id_level_index" value="1" />
                  <span className="highlight" />
                  <span className="bar" />
                  <label htmlFor="id_level_index">Número de nivel</label>
                </div>
                <button className="odr-btn remove-level">Eliminar Nivel</button>
                <h3 className="question-title">Preguntas</h3>
                <div className="questions-wrapper">
                  <div data-js="question" data-qnumber="1" className="question">
                    <span className="remove-question">Quitar</span>
                    <div className="group">
                      <input
                        type="text"
                        required
                        name="question_txt"
                        id="id_question_txt"
                        value={category && category.levels.levelIndex}
                      />
                      <span className="highlight" />
                      <span className="bar" />
                      <label htmlFor="id_question_txt">Pregunta</label>
                    </div>
                    <div className="group">
                      <input
                        type="number"
                        required
                        name="next_level"
                        id="id_next_level"
                        value={category && category.levels.levelIndex}
                      />
                      <span className="highlight" />
                      <span className="bar" />
                      <label htmlFor="id_next_level">Nivel siguiente</label>
                    </div>
                  </div>
                </div>
                <button id="add-question" data-js="add-question" className="odr-btn">
                  Agregar Pregunta
                </button>
              </div>
            </div>
            <button id="add-level" className="odr-btn">
              Agregar Nivel
            </button>

            {category && <input type="hidden" name="category_id" id="category_id" value={category.id} />}
            <input type="submit" id="post-data" className="odr-btn" value="Guardar Categoria" />
            {/* </form> */}
          </div>
          <div className="clone-models">
            <div data-js="level-model">
              <div className="group">
                <input type="number" required name="level_index" id="id_level_index" value="1" />
                <span className="highlight" />
                <span className="bar" />
                <label htmlFor="id_level_index">Número de nivel</label>
              </div>
              <button className="odr-btn remove-level">Eliminar Nivel</button>
              <h3 className="question-title">Preguntas</h3>
              <div className="questions-wrapper">
                <div data-js="question-model" data-qnumber="1" className="question">
                  <span className="remove-question">Quitar</span>
                  <div className="group">
                    <input
                      type="text"
                      required
                      name="question_txt"
                      id="id_question_txt"
                      value={category && category.levels.levelIndex}
                    />
                    <span className="highlight" />
                    <span className="bar" />
                    <label htmlFor="id_question_txt">Pregunta</label>
                  </div>
                  <div className="group">
                    <input
                      type="number"
                      required
                      name="next_level"
                      id="id_next_level"
                      value={category && category.levels.levelIndex}
                    />
                    <span className="highlight" />
                    <span className="bar" />
                    <label htmlFor="id_next_level">Nivel siguiente</label>
                  </div>
                </div>
              </div>
              <button id="add-question" data-js="add-question" className="odr-btn">
                Agregar Pregunta
              </button>
            </div>
          </div>
        </div>
      </SideNavLayout>
    );
  }
}

CategoryForm.defaultProps = {
  title: 'Default title',
};

CategoryForm.propType = {
  title: PropTypes.string,
  searchResults: PropTypes.object,
};

module.exports = CategoryForm;
