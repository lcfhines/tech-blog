const sequelize = require('../config/connection');
const seedPosts = require('./postData');
const seedComments = require('./commentData');
const seedUsers = require('./userData');

const seedAll = async () => {
  await sequelize.sync({ force: true });

  await seedPosts();

  await seedComments();

  await seedUsers();

  process.exit(0);
};

seedAll();