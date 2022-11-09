const router = require('express').Router();
const { User, Post, Comment } = require('../../models')

// GET one post by id
// display title, contents, creator's username (from user table), date created
// include comments?
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


// create post
    // enter title and contents
router.post('/', async (req, res) => {
    try {
        const postData = await Post.create({
            title: req.body.title,
            contents: req.body.contents,
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



module.exports = router;