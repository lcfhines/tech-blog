const router = require('express').Router();
const { User, Post, Comment } = require('../models')


// display all blog posts on homepage
// GET all posts for homepage - if logged in
router.get('/', async (req, res) => {
    try {
        const dbPostData = await Post.findAll();

        const posts = dbPostData.map((post) => post.get({ plain: true }));

        res.render('homepage', {
            posts,
            loggedIn: req.session.loggedIn,
        });
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
})

// login route
router.get('/login', (req, res) => {
    if (req.sessionStore.loggedIn) {
        res.redirect('/');
        return;
    } res.render('login');
});


// get one post
router.get('/post/:id', async (req, res) => {
  try {
      const dbPostData = await Post.findByPk({
        where: {
          id: req.params.id
        },
      });

      const post = dbPostData.map((post) => post.get({ plain: true }));

      res.render('homepage', {
          post,
          loggedIn: req.session.loggedIn,
      });
  } catch (err) {
      console.log(err);
      res.status(500).json(err);
  }
});


module.exports = router;