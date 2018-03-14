const Claim = require('../models/claim');
const User = require('../models/user');
const Company = require('../models/company');
const Category = require('../models/category');
const queryService = require('../services/query.service');

module.exports.odr = (req, res) => {
  const query = Company.find({});

  query.populate('user');
  query.sort('-lastupdated');
  query.exec((err, companies) => {
    if (err) {
      console.log('ERROR ON BLOG QUERY-------->', err);
      res.send('uhoh, something happened when fetching companies.');
    } else {
      const templateData = {
        companies,
        currentUser: req.user,
      };
      res.render('Odr', templateData);
    }
  });
};

module.exports.userPosts = (req, res) => {
  const userQuery = User.findOne({ username: req.params.username });

  userQuery.exec((err, user) => {
    if (err) {
      res.send('unable to find user');
    } else {
      Promise.all([queryService.userClaims(user.id), queryService.userCompanies(user.id)])
        .then(([userClaims, userCompanies]) => {
          const templateData = {
            userCompanies,
            currentUser: req.user,
            bloguser: user,
          };

          const claimsWithCompanyDetail = userClaims.map((claim) => {
            return queryService.companyInfo(claim.company).then((companyInfo) => {
              claim.company = companyInfo;
              return claim;
            });
          });

          Promise.all(claimsWithCompanyDetail).then((fullClaims) => {
            // if logged in, is this user the requested user?
            if (req.user !== undefined) {
              templateData.isOwner = req.user.id === user.id;
            }
            templateData.userClaims = fullClaims;
            res.render('UserPosts', templateData);
          });
        })
        .catch(err => next(err));
    }
  });
};

module.exports.removeClaim = (req, res) => {
  queryService.removeClaim(req.params.claim_id).then(() => {
    res.redirect(`/user/${req.user.username}`);
  });
};

module.exports.write = (req, res) => {
  const templateData = {
    title: 'Realizar un reclamo',
    currentUser: req.user,
  };

  if (req.params.company_id !== undefined) {
    queryService.companyInfo(req.params.company_id).then((company) => {
      queryService.getCategoryInfo(company.category).then((categoryInfo) => {
        templateData.companyInfo = company;
        templateData.title = `Realizar un reclamo a ${company.legalName}`;

        if (req.query.q1) {
          const queryQuestionsObj = req.query;
          const queryQuestions = Object.keys(queryQuestionsObj);
          const lastQuestionId = queryQuestionsObj[queryQuestions[queryQuestions.length - 1]];
          const currentLevel = categoryInfo.levels.filter((level) => {
            const lastQuestionSearch = level.questions.filter(question => question.id === lastQuestionId);
            if (lastQuestionSearch.length > 0) {
              return true;
            }
            return false;
          });

          const nextLevelIndex = currentLevel[0].questions.filter(question => question.id === lastQuestionId)[0]
            .nextLevel;

          if (nextLevelIndex === 0) {
            templateData.questionsPath = queryQuestions.map(key => queryQuestionsObj[key]);

            console.log('questions path -->', templateData.questionsPath);

            res.render('ClaimForm', templateData);
            res.end();
          } else {
            templateData.questions = categoryInfo.levels.filter(
              level => level.levelIndex === nextLevelIndex
            )[0].questions;

            let nextUrl = `/write/${company.id}?`;

            queryQuestions.forEach(question => (nextUrl += `${question}=${queryQuestionsObj[question]}&`));
            nextUrl += `q${queryQuestions.length + 1}=`;

            templateData.nextUrl = nextUrl;
            res.render('QuestionsView', templateData);
          }
        } else {
          const firstLevel = categoryInfo.levels.filter(level => level.levelIndex === 1);
          templateData.questions = firstLevel[0].questions;
          templateData.nextUrl = `/write/${company.id}?q1=`;
          res.render('QuestionsView', templateData);
        }
      });
    });
  }
};

module.exports.writeCongrats = (req, res) => {
  const templateData = {
    currentUser: req.user,
  };

  res.render('ClaimCongrats', templateData);
};

module.exports.writePost = (req, res) => {
  if (req.params.claim_id !== undefined) {
    Claim.findById(req.param('claim_id'), (err, claim) => {
      if (err) {
        res.send('unable to find the note');
      }

      claim.data.purchaseDate = req.body.purchase_date;
      claim.data.paidAmount = req.body.paid_amount;
      claim.data.description = req.body.description;
      claim.save();

      res.redirect(`/edit/${claim.id}`);
    });
  } else {
    // Create a new claim post
    const claim = new Claim(); // create Blog object
    claim.author = req.user; // associate logged in user
    if (req.body.company_id !== undefined) {
      queryService.companyInfo(req.body.company_id).then((company) => {
        claim.company = company;
        claim.data.purchaseDate = req.body.purchase_date;
        claim.data.paidAmount = req.body.paid_amount;
        claim.data.description = req.body.description;
        claim.data.questions = req.body.questions;
        claim.data.files = req.body.files;
        claim.save();
        res.redirect('/congrats');
      });
    }
  }
};

module.exports.edit = (req, res) => {
  Claim.findById(req.param('claim_id'), (err, claim) => {
    if (err) {
      res.send('Uhoh something went wrong');
      console.log(err);
    } else if (claim.author != req.user.id) {
      res.send('You do not own this claim.');
    } else {
      const templateData = {
        title: 'Editar reclamo',
        claim,
        currentUser: req.user,
      };
      const formattedPurchaseDate = templateData.claim.data.purchaseDate.toISOString().slice(0, 10);
      templateData.purchaseDateFormatted = formattedPurchaseDate;

      queryService.companyInfo(claim.company).then((company) => {
        templateData.companyInfo = company;
        queryService.getQuestionTxt(company.category, claim.data.questions).then((questionsTxt) => {
          templateData.questionsTxtArr = questionsTxt;
          res.render('ClaimForm', templateData);
        });
      });
    }
  });
};

module.exports.newCompany = (req, res) => {
  queryService.getCategories().then((categories) => {
    const templateData = {
      title: 'Create a new Company',
      currentUser: req.user,
      categories,
    };
    res.render('CompanyForm', templateData);
  });
};

module.exports.companyPost = (req, res) => {
  if (req.param('company_id') !== undefined) {
    Company.findById(req.param('company_id'), (err, company) => {
      if (err) {
        res.send('unable to find the note');
      }

      company.legalName = req.body.legal_name;
      company.urltitle = req.body.legal_name
        .toLowerCase()
        .replace(/[^\w ]+/g, '')
        .replace(/ +/g, '_');
      company.taxId = req.body.tax_id;
      company.logoUrl = req.body.logo_url;
      company.category = req.body.category;
      company.save();

      res.redirect(`user/${req.user.username}`);
    });
  } else {
    // Create a new blog post
    const company = new Company();
    company.legalName = req.body.legal_name;
    company.urltitle = req.body.legal_name
      .toLowerCase()
      .replace(/[^\w ]+/g, '')
      .replace(/ +/g, '_');
    company.taxId = req.body.tax_id;
    company.userAdmin = req.user; // associate logged in user with company
    company.logoUrl = req.body.logo_url;
    company.category = req.body.category;

    company.save();

    res.redirect(`user/${req.user.username}`);
  }
};

module.exports.companyEdit = (req, res) => {
  Company.findById(req.param('company_id'), (err, company) => {
    if (err) {
      res.send('Uhoh something went wrong');
      console.log(err);
    } else if (company.userAdmin != req.user.id) {
      res.send('You do not own this company.');
    } else {
      queryService.getCategories().then((categories) => {
        const templateData = {
          title: 'Edit company info',
          company,
          currentUser: req.user,
          categories,
        };
        res.render('CompanyForm', templateData);
      });
    }
  });
};

module.exports.newCategory = (req, res) => {
  const templateData = {
    currentUser: req.user,
  };

  res.render('CategoryForm', templateData);
};

module.exports.categoryPost = (req, res) => {
  console.log('--------- ajax POST arrived ---------');
  console.log('Body request----->', req.body.name);

  if (req.params.category_id !== undefined) {
    Category.findById(req.param('category_id'), (err, category) => {
      if (err) {
        res.send('unable to find category');
      }
      category.name = req.body.name;
      category.levels = req.body.levels;
      category.author = req.user; // associate logged in user with category
      category.save();

      res.contentType('json');
      res.send({ url: `categories/edit/${category.id}` });
    });
  } else {
    // Create a new category
    const category = new Category();
    category.name = req.body.name;
    category.levels = req.body.levels;
    category.author = req.user; // associate logged in user with category

    category.save();

    res.contentType('json');
    res.send({ url: `categories/edit/${category.id}` });
  }
};

module.exports.getCategories = (req, res) => {
  const query = Category.find({});

  query.populate('user');
  query.sort('-lastupdated');
  query.exec((err, categories) => {
    if (err) {
      console.log('ERROR ON CATEGORY QUERY-------->', err);
      res.send('uhoh, something happened when fetching categories.');
    } else {
      const templateData = {
        categories,
        currentUser: req.user,
      };
      console.log('CATEGORY AUTHOR -------->', categories[0].author);
      res.render('CategoriesView', templateData);
      // res.contentType('json');
      // res.send({ categories });
    }
  });
};

module.exports.categoryEdit = (req, res) => {
  Category.findById(req.param('category_id'), (err, category) => {
    if (err) {
      res.send('Uhoh something went wrong');
      console.log(err);
    } else if (category.author != req.user.id) {
      res.send('You do not own this category.');
    } else {
      const templateData = {
        title: 'Editar categoria',
        category,
        currentUser: req.user,
      };

      console.log('Template data from category Edit ------>', templateData);

      res.render('CategoryEdit', templateData);
    }
  });
};
