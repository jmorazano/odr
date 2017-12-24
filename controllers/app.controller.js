const meliService = require('./../services/meli.service');
const meliTransform = require('./../services/meli.transform');
const Blog = require('../models/blog.js');
const User = require('../models/user.js');

module.exports.root = (req, res) => {
  console.log(process.env.NODE_ENV);
  res.render('Home');
};

module.exports.search = (req, res, next) => {
  meliService
    .search(req.query.q)
    .then((data) => {
      const parsedData = meliTransform.getParsedSearch(data);
      parsedData.author = res.locals.author;
      res.render('Search', {
        title: 'Resultados de búsqueda',
        searchResults: parsedData,
        query: req.query.q,
      });
    })
    .catch(next);
};

module.exports.items = (req, res, next) => {
  meliService
    .item(req.params.id)
    .then((data) => {
      const parsedData = meliTransform.getParsedItem(data.category, data.item, data.description);
      parsedData.author = res.locals.author;
      res.render('Item', {
        title: 'Detalle del item',
        itemDetails: parsedData,
      });
    })
    .catch(next);
};

module.exports.suggest = (req, res) => {
  res.send(`Entra a suggest: ${req.params}`);
};

module.exports.odr = (req, res) => {
  const query = Blog.find({});

  query.populate('user');
  query.sort('-lastupdated');
  query.exec((err, blogposts) => {
    if (err) {
      console.log('ERROR ON BLOG QUERY-------->', err);
      res.send('uhoh, something happened when getting blog posts.');
    } else {
      const templateData = {
        posts: blogposts,
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
      const query = Blog.find({ user: user.id });
      query.sort('-lastupdated');
      query.exec((error, blogposts) => {
        if (error) {
          res.send('uhoh, something happened when getting blog posts.');
        } else {
          const templateData = {
            title: `${user.username} s Blog Posts`,
            posts: blogposts,
            currentUser: req.user,
            bloguser: user,
          };

          // if logged in, is this user the requested user?
          if (req.user !== undefined) {
            templateData.isOwner = req.user.id === user.id;
          }

          res.render('UserPosts', templateData);
        }
      });
    }
  });
};

module.exports.write = (req, res) => {
  const templateData = {
    title: 'Create a new blog post',
    currentUser: req.user,
  };

  res.render('BlogForm', { templateData });
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

module.exports.edit = (req, res) => {
  console.log(req.param('blog_id'));

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
