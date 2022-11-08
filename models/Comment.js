const { Model, DataTypes} = require('sequelize');
const sequelize = require('../config/connection');

class Comment extends Model {}

Comment.init(
 {
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
    },
    comment: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            len: [2,1000]
        }
    },
    // reference username of the commenter (the user that created the comment)
    commenter: {
        type: DataTypes.STRING,
        references: {
            model: 'user',
            key: 'username',
        },

    },
    // reference post where comment is made
    post_id: {
        type: DataTypes.INTEGER,
        references: {
            model: 'post',
            key: 'id',
        },

    },
}, 
{
    sequelize,
    // change timestamps to true to include createdAt and updatedAt columns
    timestamps: true,
    freezeTableName: true,
    modelName: 'comment'
}
);

module.exports = Comment;