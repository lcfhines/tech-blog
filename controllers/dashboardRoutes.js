const router = require('express').Router();
const { User, Post, Comment } = require('../models')

// GET all posts logged in user has created
router.get('/dashboard', async (req, res) => {
    try {
        const dbPostData = await Post.findAll({
            where: {
                username: req.session.username
            }
        })
        const post = dbPostData.get({ plain: true });
        res.render('post', {post, loggedIn: req.session.loggedIn});
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
    });





module.exports = router;