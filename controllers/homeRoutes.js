const router = require('express').Router();
const { User, Post, Comment } = require('../models')


// displays existing blog posts
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

// nav links for homepage, dashboard, log in

module.exports = router;