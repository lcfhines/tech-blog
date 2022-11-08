const { Model, DataTypes} = require('sequelize');
const sequelize = require('../config/connection');

class Post extends Model {}

Post.init(
 {
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            len: [2,200]
        }
    },
    contents: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            len: [2,5000]
        }
    },
    // reference username of the poster (the user that created the post)
    poster: {
        type: DataTypes.STRING,
        references: {
            model: 'user',
            key: 'username',
        },

    },
}, 
{
    sequelize,
    // change timestamps to true to include createdAt and updatedAt columns
    timestamps: true,
    freezeTableName: true,
    modelName: 'post'
}
);

module.exports = Post;