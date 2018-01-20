const Blog = require('../models/blog');
const Claim = require('../models/claim');
const User = require('../models/user');
const Company = require('../models/company');
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
            userClaims,
            userCompanies,
            currentUser: req.user,
            bloguser: user,
          };
          // if logged in, is this user the requested user?
          if (req.user !== undefined) {
            templateData.isOwner = req.user.id === user.id;
          }

          res.render('UserPosts', templateData);
        })
        .catch(err => next(err));
    }
  });
};

module.exports.write = (req, res) => {
  const templateData = {
    title: 'Realizar un reclamo',
    currentUser: req.user,
  };

  if (req.params.company_id !== undefined) {
    queryService.companyInfo(req.params.company_id).then((company) => {
      templateData.companyInfo = company;
      templateData.title = `Realizar un reclamo a ${company.legalName}`;
      res.render('ClaimForm', templateData);
    });
  } else {
    res.render('ClaimForm', templateData);
  }
};

module.exports.writePost = (req, res) => {
  if (req.param('claim_id') !== undefined) {
    Claim.findById(req.param('claim_id'), (err, claim) => {
      if (err) {
        res.send('unable to find the note');
      }

      claim.title = req.body.title;
      claim.body = req.body.body;
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

        claim.save();

        res.redirect(`/edit/${claim.id}`);
      });
    }
  }
};

module.exports.newCompany = (req, res) => {
  const templateData = {
    title: 'Create a new Company',
    currentUser: req.user,
  };

  res.render('CompanyForm', templateData);
};

module.exports.companyPost = (req, res) => {
  if (req.param('company_id') !== undefined) {
    Company.findById(req.param('company_id'), (err, company) => {
      if (err) {
        res.send('unable to find the note');
      }

      company.legalName = req.body.legal_name;
      company.taxId = req.body.tax_id;
      company.logoUrl = req.body.logo_url;
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
      const templateData = {
        title: 'Edit company info',
        company,
        currentUser: req.user,
      };

      res.render('CompanyForm', templateData);
    }
  });
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

      if (claim.company !== undefined) {
        queryService.companyInfo(claim.company).then((company) => {
          templateData.companyInfo = company;
          res.render('ClaimForm', templateData);
        });
      }
    }
  });
};
