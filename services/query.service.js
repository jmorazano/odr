const Claim = require('../models/claim');
const Company = require('../models/company');
const Category = require('../models/category');

class QueryService {
  userClaims(userId) {
    // User claims
    const claimQuery = Claim.find({ author: userId });
    claimQuery.sort('-lastupdated');
    const userClaims = claimQuery.exec((error, claims) => {
      if (error) {
        return error;
      }
      return claims;
    });

    return userClaims;
  }

  removeClaim(claimId) {
    // Remove claim  by Id
    const remove = Claim.remove({ _id: claimId }, (err) => {
      if (!err) {
        return 'Se borró el reclamo';
      }
      return 'Hubo un error';
    });

    return remove;
  }

  userCompanies(userId) {
    const companyQuery = Company.find({ userAdmin: userId });
    companyQuery.sort('-lastupdated');
    const userCompanies = companyQuery.exec((error, companies) => {
      if (error) {
        return error;
      }
      return companies;
    });

    return userCompanies;
  }

  companyInfo(companyId) {
    const companyQuery = Company.findOne({ _id: companyId });
    const companyInfo = companyQuery.exec((error, company) => {
      if (error) {
        return error;
      }
      return company;
    });

    return companyInfo;
  }

  getCategories() {
    const categoryQuery = Category.find({});
    const queryResults = categoryQuery.exec((error, categories) => {
      if (error) {
        return error;
      }
      return categories;
    });

    return queryResults;
  }

  getCategoryInfo(categoryId) {
    const categoryQuery = Category.findById(categoryId);
    const queryResults = categoryQuery.exec((error, category) => {
      if (error) {
        return error;
      }
      return category;
    });
    return queryResults;
  }

  getQuestionTxt(categoryId, questionsIdArr) {
    return this.getCategoryInfo(categoryId).then((categoryInfo) => {
      const questionsArr = questionsIdArr.map((questionId, index) => {
        const currentLevel = categoryInfo.levels.filter((level) => {
          const lastQuestionSearch = level.questions.filter(question => question.id === questionId);
          if (lastQuestionSearch.length > 0) {
            return true;
          }
          return false;
        });
        const currentQuestion = currentLevel[0].questions.filter(question => question.id === questionId);
        return currentQuestion[0];
      });

      const questionsTxtArr = questionsArr.map(question => question.text);
      return questionsTxtArr;
    });
  }
}

module.exports = new QueryService();
