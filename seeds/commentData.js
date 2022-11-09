const { Comment } = require('../models');

const commentdata = [
    {
        comment: '',
        user_id: 1,
        post_id: 1,
    },
    {
        comment: '',
        user_id: 1,
        post_id: 2,
    },
    {
        comment: '',
        user_id: 2,
        post_id: 2,
    },
]


const seedComments = () => Comment.bulkCreate(commentdata);

module.exports = seedComments;