require("dotenv").config();
const fastify = require("fastify")({ logger: true });

fastify.register(require("@fastify/cors"), {
  origin: ["http://localhost:3000", "https://latt-faktura-frontend.vercel.app"],
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
});
fastify.register(require("@fastify/cookie"));
fastify.register(require("@fastify/formbody"));

const sequelizePlugin = require("./plugins/sequelize");
const authPlugin = require("./plugins/auth");
const userRoutes = require("./routes/userRoutes");
const product = require("./routes/product");

fastify.register(sequelizePlugin);
fastify.register(authPlugin);
fastify.register(userRoutes);
fastify.register(product);

const start = async () => {
  try {
    await fastify.listen({ port: 5000, host: "0.0.0.0" });
    fastify.log.info("Server listening on http://localhost:5000");
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();
