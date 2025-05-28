// models/Terms.js
module.exports = (sequelize, DataTypes) => {
  const Terms = sequelize.define('Terms', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    language: { type: DataTypes.STRING(5), allowNull: false }, // 'en', 'sv'
    content: { type: DataTypes.TEXT, allowNull: false },
  }, {
    timestamps: true,
  });

  return Terms;
};
