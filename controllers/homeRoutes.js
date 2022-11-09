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


// GET one post by id
router.get('/post/:id', async (req, res) => {
try {
    const dbPostData = await Post.findByPk(req.params.id, {
      include: [
        {
          model: User,
          attributes: [
            'username',
          ],
        },
        {
            model: Comment,
            attributes: [
              'comment',
              'createdAt'
            ],
          },
      ],
    })
    const post = dbPostData.get({ plain: true });
    res.render('post', {post, loggedIn: req.session.loggedIn});
} catch (err) {
    console.log(err);
    res.status(500).json(err);
}
});

// login route
router.get('/login', (req, res) => {
    if (req.sessionStore.loggedIn) {
        res.redirect('/');
        return;
    } res.render('login');
});

module.exports = router;