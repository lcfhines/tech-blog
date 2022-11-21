const router = require('express').Router();
const { User, Post, Comment } = require('../../models')

// create post
    // enter title and contents
router.post('/', async (req, res) => {
    try {
        const postData = await Post.create({
            ...req.body,
            user_id: req.body.user_id,
        });
        res.status(200).json(postData)
    } catch (err) {
        res.status(500).json(err);
    }
});

// update post by id
    // change title or contents

router.put('/:id', async (req, res) => {
    try {
        const post = await Post.update({
            title: req.body.title,
            contents: req.body.contents,
        },
        {
            where: {
                id: req.params.id,
            },
        });
        res.status(200).json(post);
    } catch (err) {
        res.status(500).json(err);
    };
});

// delete post
    // delete post by id
router.delete('delete/:id', async (req, res) => {
    try {
        const postData = await Post.destroy({
            where: {
                id: req.params.id,
                user_id: req.session.user_id,
            },
        });

        if (!postData) {
            res.status(404).json({message: 'no post found with this id'});
            return;
        }
        res.status(200).json(postData);
    } catch (err) {
        res.status(500).json(err);
    }
})


module.exports = router;