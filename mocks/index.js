const nock = require('nock');

const meliNock = nock('https://api.mercadolibre.com/').persist();
const searchMock = require('./search.json');
const suggestMock = require('./suggest.json');
const itemMock = require('./item.json');
const itemDescriptionMock = require('./item-description.json');
const categoryMock = require('./category.json');

// Item
meliNock
  .get(/\/items\/.*\/description/)
  .reply(200, itemDescriptionMock)
  .get(/\/items\/.*/)
  .reply(200, itemMock)
  .get(/\/categories\/.*/)
  .reply(200, categoryMock);

// Search
meliNock
  .get('/sites/MLA/search')
  .query(true)
  .reply(200, searchMock);

// Suggest
meliNock
  .get('/sites/MLA/autosuggest')
  .query(true)
  .reply(200, suggestMock);

