const User = require('./User');
const Post = require('./Post');
const Comment = require('./Comment');

// model associations

// user can have many posts
User.hasMany(Post, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE'
});

// post belongs to user
Post.belongsTo(User, {
    foreignKey: 'user_id'
});

// user can have many comments
User.hasMany(Comment, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE'
});

// comment belongs to user
Comment.belongsTo(User, {
    foreignKey: 'user_id'
});

// post can have many comments
Post.hasMany(Comment, {
    foreignKey: 'post_id'
});

// comments belong to one post
Comment.belongsTo(Post, {
    foreignKey: 'post_id'
});


module.exports = { User, Post, Comment };