const router = require('express').Router();
const { User, Post, Comment } = require('../../models')


// get all comments
// router.get('/', (req, res) => {
//     Comment.findAll({})
//     .then(commentData => res.json(commentData))
//     .catch (err => {
//         res.status(500).json(err)
//     });
// });

// create comment
router.post('/', async (req, res) => {
    try {
        const newComment = await Comment.create({
            ...req.body,
            user_id: req.session.user_id,
        });
        res.json(newComment);
    } catch (err) {
        res.status(500).json(err);
    }
})

module.exports = router;