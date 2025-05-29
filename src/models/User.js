const bcrypt = require("bcrypt");

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    "User",
    {
      id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
      businessName: { type: DataTypes.STRING, allowNull: false },
      contactPerson: { type: DataTypes.STRING, allowNull: false },
      address: { type: DataTypes.STRING, allowNull: false },
      postalNumber: { type: DataTypes.STRING, allowNull: false },
      city: { type: DataTypes.STRING, allowNull: false },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: { isEmail: true },
      },
      phoneNumber: { type: DataTypes.STRING, allowNull: false },
      passwordHash: { type: DataTypes.STRING, allowNull: false },
      languagepreference: {
        type: DataTypes.ENUM("en", "sv"),
        allowNull: false,
        defaultValue: "en",
      },
    },
    {
      tableName: "users",
      timestamps: true,
    }
  );

  // Instance method to validate password
  User.prototype.validatePassword = async function (password) {
    return await bcrypt.compare(password, this.passwordHash);
  };

  return User;
};
