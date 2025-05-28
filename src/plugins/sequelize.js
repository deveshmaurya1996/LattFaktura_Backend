const fp = require('fastify-plugin');
const sequelize = require('../config/db');

// Import Sequelize DataTypes
const { DataTypes } = require('sequelize');

// Import and define models
const Terms = require('../models/Terms')(sequelize, DataTypes);
const Product = require('../models/Product')(sequelize, DataTypes);
const User = require('../models/User')(sequelize, DataTypes);

module.exports = fp(async (fastify, opts) => {
  await sequelize.sync(); // Sync models to DB

  // Attach models to Fastify instance
  fastify.decorate('db', {
    sequelize,
    Terms,
    Product,
    User,
  });
});
