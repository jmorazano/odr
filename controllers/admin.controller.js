const User = require('../models/user');
const queryService = require('../services/query.service');

module.exports.adminRoot = (req, res) => {
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

module.exports.userClaims = (req, res) => {
  const userQuery = User.findOne({ username: req.params.username });

  userQuery.exec((err, user) => {
    if (err) {
      res.send('unable to find user');
    } else {
      queryService
        .userClaims(user.id)
        .then((userClaims) => {
          const templateData = {
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

module.exports.reputation = (req, res) => {
  const templateData = {
    currentUser: req.user,
  };

  res.render('UserReputation', templateData);
};

module.exports.help = (req, res) => {
  const templateData = {
    currentUser: req.user,
  };

  res.render('UserReputation', templateData);
};

module.exports.userConfig = (req, res) => {
  const templateData = {
    currentUser: req.user,
  };

  res.render('UserReputation', templateData);
};
