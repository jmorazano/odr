const Blog = require('../models/blog');
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
          console.log('USER COMPANIES----->', userCompanies);
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
    claimCompany: req.param('company_id'),
  };

  res.render('BlogForm', templateData);
};

module.exports.writePost = (req, res) => {
  if (req.param('blog_id') !== undefined) {
    Blog.findById(req.param('blog_id'), (err, blogpost) => {
      if (err) {
        res.send('unable to find the note');
      }

      blogpost.title = req.body.title;
      blogpost.body = req.body.body;
      blogpost.save();

      res.redirect('/edit/' + blogpost.id);
    });
  } else {
    // Create a new blog post
    const blogpost = new Blog(); // create Blog object
    blogpost.title = req.body.title;
    blogpost.urltitle = req.body.title
      .toLowerCase()
      .replace(/[^\w ]+/g, '')
      .replace(/ +/g, '_');
    blogpost.body = req.body.body;

    blogpost.user = req.user; // associate logged in user with blog post

    blogpost.save();

    res.redirect(`/edit/${blogpost.id}`);
  }
};

module.exports.newCompany = (req, res) => {
  const templateData = {
    title: 'Create a new Company',
    currentUser: req.user,
  };

  res.render('CompanyForm', templateData);
};

module.exports.CompanyPost = (req, res) => {
  if (req.param('company_id') !== undefined) {
    Company.findById(req.param('company_id'), (err, company) => {
      if (err) {
        res.send('unable to find the note');
      }

      company.legalName = req.body.legal_name;
      company.taxId = req.body.tax_id;
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
  Blog.findById(req.param('blog_id'), (err, blogpost) => {
    console.log('BLOG POST USER: ', blogpost.user);
    console.log('REQUEST USER: ', req.user.id);
    if (err) {
      res.send('Uhoh something went wrong');
      console.log(err);
    } else if (blogpost.user != req.user.id) {
      res.send('You dooooooo not own this blog post.');
    } else {
      console.log(blogpost);

      const templateData = {
        title: 'Edit Blog Post',
        blogpost,
        currentUser: req.user,
      };

      res.render('BlogForm', { templateData });
    }
  });
};
