const { Post } = require('../models');

const postdata = [
    {
        title: '',
        contents: '',
        user_id: 1,
    },
    {
        title: '',
        contents: '',
        user_id: 2,
    },
    {
        title: '',
        contents: '',
        user_id: 1,
    },
]


const seedPosts = () => Post.bulkCreate(postdata);

module.exports = seedPosts;