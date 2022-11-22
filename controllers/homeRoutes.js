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

// get one post
router.get('/post/:id', async (req, res) => {
    try {
        const dbPostData = await Post.findByPk(req.params.id, {
            include: [
                {
                    model: User,
                    attributes: ['username'],
                }, {
                    model: Comment,
                    include: [User]
                }
            ],
        });
        const post = dbPostData.get({ plain: true });
        res.render('post', {
            ...post,
            loggedIn: req.session.loggedIn,
        });
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
  });

// DASHBOARD - GET all posts logged in user has created
router.get('/dashboard', async (req, res) => {
    try {
        const dbUserData = await User.findbyPk(req.session.user_id, {
            include: [
                {
                    model: Post,
                }
            ]
        });
        const user = dbUserData.get({ plain: true });
        res.render('dashboard', {...user, loggedIn: req.session.loggedIn});
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
    });

// login route
router.get('/login', (req, res) => {
    if (req.session.loggedIn) {
        res.redirect('/');
        return;
    } res.render('login');
});

// signup 
router.get('/signup', (req,res) => {
    if (req.session.loggedIn) {
        res.redirect('/');
        return;
    }
    res.render('signup');
})



module.exports = router;