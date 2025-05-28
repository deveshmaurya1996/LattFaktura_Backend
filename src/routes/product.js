const {
  addProduct,
  deleteProduct,
  getProducts,
  updateProduct,
} = require("../controllers/productController");

async function productRoutes(fastify, options) {
  fastify.get("/products", { preHandler: fastify.authenticate }, getProducts);
  fastify.post("/product", { preHandler: fastify.authenticate }, addProduct);
  fastify.put(
    "/product/:id",
    { preHandler: fastify.authenticate },
    updateProduct
  );
  fastify.delete(
    "/product/:id",
    { preHandler: fastify.authenticate },
    deleteProduct
  );
}

module.exports = productRoutes;
