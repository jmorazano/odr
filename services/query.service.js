const Blog = require('../models/blog');
const Company = require('../models/company');
const Category = require('../models/category');

class QueryService {
  userClaims(userId) {
    // User claims
    const claimQuery = Blog.find({ user: userId });
    claimQuery.sort('-lastupdated');
    const userClaims = claimQuery.exec((error, claims) => {
      if (error) {
        return error;
      }
      return claims;
    });

    return userClaims;
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
}

module.exports = new QueryService();
