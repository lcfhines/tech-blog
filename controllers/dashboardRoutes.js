const router = require('express').Router();
const { User, Post, Comment } = require('../models')

// DASHBOARD - GET all posts logged in user has created
router.get('/', async (req, res) => {
    try {
        const dbPostData = await Post.findAll({
        where: {
            user_id: req.session.user_id
        },
        include: [
            {
                model: Comment,
                include: {
                    model: User,
                }
            },
            {
                model: User,
            }
        ]
    })
    const posts = dbPostData.map(post => post.get({ plain: true }));
    res.render('dashboard', { posts, loggedIn: true });
} catch (err) {
    console.log(err);
    res.status(500).json(err);
}
});



module.exports = router;