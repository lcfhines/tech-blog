const User = require('./User');
const Post = require('./Post');
const Comment = require('./Comment');

// model associations

// user can have many posts
User.hasMany(Post, {
    foreignKey: 'username',
    onDelete: 'CASCADE'
});

// post can only have one user that created it
Post.hasOne(User, {
    foreignKey: 'poster'
});

// user can have many comments
User.hasMany(Comment, {
    foreignKey: 'username',
    onDelete: 'CASCADE'
});

// comment can only have one user that created it
Comment.hasOne(User, {
    foreignKey: 'commenter'
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