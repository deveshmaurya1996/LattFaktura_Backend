const { Op } = require("sequelize");

exports.getProducts = async (req, reply) => {
  const { page = 1, limit = 10, search = "" } = req.query;
  const offset = (page - 1) * limit;
  const Product = req.server.db.Product;

  const userId = req.user?.id;

  if (!userId) {
    return reply.code(401).send({ message: "Unauthorized: no user ID found" });
  }
  try {
    const { count, rows } = await Product.findAndCountAll({
      where: {
        user_id: req.user.id,
        product_name: {
          [Op.like]: `%${search}%`,
        },
      },
      limit: parseInt(limit),
      offset: parseInt(offset),
      order: [["createdAt", "DESC"]],
    });

    reply.send({
      totalItems: count,
      totalPages: Math.ceil(count / limit),
      currentPage: parseInt(page),
      products: rows,
    });
  } catch (error) {
    console.error("Error fetching products:", error);
    reply.status(500).send({ message: "Error fetching products", error });
  }
};

exports.addProduct = async (req, reply) => {
  const Product = req.server.db.Product;
  const { product_name, in_price, price, in_stock, description } = req.body;
  const product = await Product.create({
    product_name,
    in_price,
    price,
    in_stock,
    description,
    user_id: req.user.id,
  });
  reply.send(product);
};

exports.updateProduct = async (req, reply) => {
  const Product = req.server.db.Product;
  const { id } = req.params;
  const product = await Product.findOne({
    where: { id, user_id: req.user.id },
  });
  if (!product) return reply.code(404).send({ error: "Product not found" });
  await product.update(req.body);
  reply.send(product);
};

exports.deleteProduct = async (req, reply) => {
  const Product = req.server.db.Product;
  const { id } = req.params;
  const product = await Product.findOne({
    where: { id, user_id: req.user.id },
  });
  if (!product) return reply.code(404).send({ error: "Product not found" });
  await product.destroy();
  reply.send({ message: "Product deleted successfully" });
};
