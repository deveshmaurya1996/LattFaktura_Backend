// models/Product.js
module.exports = (sequelize, DataTypes) => {
  const Product = sequelize.define(
    "Product",
    {
      product_name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      in_price: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: true,
      },
      price: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: true,
      },
      in_stock: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      user_id: { type: DataTypes.INTEGER, allowNull: false },
    },
    {
      tableName: "products",
      timestamps: true,
    }
  );

  return Product;
};
