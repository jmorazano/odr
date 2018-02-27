const successCallback = (data) => {
  const baseUrl = window.location.origin;
  window.location.href = `${baseUrl}/${data.url}`;
};

const dataDummy = {
  name: 'Aerolinea',
  levels: [
    {
      levelIndex: '1',
      questions: [
        {
          text: 'Cancelacion/Demora de vuelo',
          shortName: 'cancelaciondemora_de_vuelo',
          orderIndex: 0,
          nextLevel: 2,
        },
        {
          text: 'Problemas de equipaje',
          shortName: 'problemas_de_equipaje',
          orderIndex: 1,
          nextLevel: 3,
        },
        {
          text: 'Problemas de reserva/precios',
          shortName: 'problemas_de_reservaprecios',
          orderIndex: 2,
          nextLevel: 4,
        },
        {
          text: 'Vuelo perdido',
          shortName: 'vuelo_perdido',
          orderIndex: 3,
          nextLevel: 5,
        },
        {
          text: 'Conducta del staff',
          shortName: 'conducta_del_staff',
          orderIndex: 4,
          nextLevel: 0,
        },
        {
          text: 'Problema en el vuelo',
          shortName: 'problema_en_el_vuelo',
          orderIndex: 5,
          nextLevel: 0,
        },
        {
          text: 'Check-in',
          shortName: 'checkin',
          orderIndex: 6,
          nextLevel: 0,
        },
        {
          text: 'Asistencia especial',
          shortName: 'asistencia_especial',
          orderIndex: 7,
          nextLevel: 0,
        },
        {
          text: 'Programa de millas',
          shortName: 'programa_de_millas',
          orderIndex: 8,
          nextLevel: 6,
        },
      ],
    },
    {
      levelIndex: '2',
      questions: [
        {
          text: 'Demorado',
          shortName: 'demorado',
          orderIndex: 0,
          nextLevel: 0,
        },
        {
          text: 'Cancelado',
          shortName: 'cancelado',
          orderIndex: 1,
          nextLevel: 0,
        },
      ],
    },
    {
      levelIndex: '3',
      questions: [
        {
          text: 'Demorado',
          shortName: 'demorado',
          orderIndex: 0,
          nextLevel: 0,
        },
        {
          text: 'Cargos extras',
          shortName: 'cargos_extras',
          orderIndex: 1,
          nextLevel: 0,
        },
        {
          text: 'Dañado',
          shortName: 'daado',
          orderIndex: 2,
          nextLevel: 0,
        },
        {
          text: 'Perdido',
          shortName: 'perdido',
          orderIndex: 3,
          nextLevel: 0,
        },
        {
          text: 'Equipaje de mano',
          shortName: 'equipaje_de_mano',
          orderIndex: 4,
          nextLevel: 0,
        },
      ],
    },
    {
      levelIndex: '4',
      questions: [
        {
          text: 'Problema de reserva',
          shortName: 'problema_de_reserva',
          orderIndex: 0,
          nextLevel: 0,
        },
        {
          text: 'Problemas de Precio/Pago',
          shortName: 'problemas_de_preciopago',
          orderIndex: 1,
          nextLevel: 0,
        },
        {
          text: 'Sobrevendido',
          shortName: 'sobrevendido',
          orderIndex: 2,
          nextLevel: 0,
        },
      ],
    },
    {
      levelIndex: '5',
      questions: [
        {
          text: 'Boarding denegado',
          shortName: 'boarding_denegado',
          orderIndex: 0,
          nextLevel: 0,
        },
        {
          text: 'Conexion perdida',
          shortName: 'conexion_perdida',
          orderIndex: 1,
          nextLevel: 0,
        },
      ],
    },
    {
      levelIndex: '6',
      questions: [
        {
          text: 'Programa de millas 1',
          shortName: 'programa_de_millas_1',
          orderIndex: 0,
          nextLevel: 7,
        },
        {
          text: 'Programa de millas 2',
          shortName: 'programa_de_millas_2',
          orderIndex: 1,
          nextLevel: 7,
        },
        {
          text: 'Programa de millas 3',
          shortName: 'programa_de_millas_3',
          orderIndex: 2,
          nextLevel: 7,
        },
      ],
    },
    {
      levelIndex: '7',
      questions: [
        {
          text: 'Compra de millas',
          shortName: 'compra_de_millas',
          orderIndex: 0,
          nextLevel: 0,
        },
        {
          text: 'Canje de millas',
          shortName: 'canje_de_millas',
          orderIndex: 1,
          nextLevel: 0,
        },
      ],
    },
  ],
};

const postCategoryData = (data) => {
  const catId = document.querySelector('#category_id');
  let postUrl = '';

  if (catId) {
    postUrl = `/categories/edit/${catId.value}`;
  } else {
    postUrl = '/categories/new-category';
  }

  $.ajax({
    url: postUrl,
    type: 'POST',
    dataType: 'json',
    data: JSON.stringify(data),
    contentType: 'application/json',
    cache: false,
    timeout: 5000,
    complete() {
      console.log('process complete');
    },
    success(response) {
      successCallback(response);
    },
    error() {
      console.log('process error');
    },
  });
};

const getLevelQuestions = (levelNode) => {
  const questionsNode = levelNode.querySelectorAll('.question');
  const questionArr = [];
  questionsNode.forEach((question, index) => {
    const questionObj = {};
    questionObj.text = question.querySelector('#id_question_txt').value;
    questionObj.shortName = questionObj.text
      .toLowerCase()
      .replace(/[^\w ]+/g, '')
      .replace(/ +/g, '_');
    questionObj.orderIndex = index;
    questionObj.nextLevel = parseInt(question.querySelector('#id_next_level').value);

    questionArr.push(questionObj);
  });

  return questionArr;
};

const prepareCategoryData = () => {
  const categoryData = {};
  const inputLevels = document.querySelectorAll('.level-wrapper');

  categoryData.name = document.querySelector('#id_category_name').value;
  categoryData.levels = [];

  inputLevels.forEach((level) => {
    const levelObj = {};
    levelObj.levelIndex = level.querySelector('#id_level_index').value;
    levelObj.questions = getLevelQuestions(level);

    categoryData.levels.push(levelObj);
  });
  return categoryData;
};

// Remove element
const removeElement = elem => elem.parentNode.removeChild(elem);

// Button actions

// Save category
const postBtn = document.getElementById('post-data');
postBtn.addEventListener('click', () => {
  const categoryData = prepareCategoryData();
  // const categoryData = dataDummy;
  postCategoryData(categoryData);
});

// Add question
$(document).on('click', '#add-question', (e) => {
  const questionWrapper = e.target.previousSibling;

  const questionElement = document.querySelector('[data-js=question-model]').cloneNode(true);
  questionElement.dataset.js = 'question';
  questionElement.querySelector('#id_question_txt').value = '';
  questionElement.querySelector('#id_next_level').value = '';

  questionWrapper.appendChild(questionElement);
});

// Remove question
$(document).on('click', '.remove-question', (e) => {
  removeElement(e.target.parentElement);
});

// Add level
const addLevelBtn = document.getElementById('add-level');
addLevelBtn.addEventListener('click', () => {
  const levelsWrapper = document.querySelector('.levels-wrapper');
  const newLevelElement = document.querySelector('[data-js=level-model]').cloneNode(true);
  newLevelElement.dataset.js = 'level';
  // Set new level number
  const newLevelIndex = document.querySelectorAll('.level-wrapper').length + 1;
  newLevelElement.className = 'level-wrapper';
  newLevelElement.querySelector('#id_level_index').value = newLevelIndex;

  levelsWrapper.appendChild(newLevelElement);
});

// Remove level
$(document).on('click', '.remove-level', (e) => {
  removeElement(e.target.parentElement);
});
