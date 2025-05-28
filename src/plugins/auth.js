const fp = require("fastify-plugin");
const jwt = require("jsonwebtoken");

const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key";

module.exports = fp(async (fastify, opts) => {
  fastify.decorate("authenticate", async (request, reply) => {
    try {
      const authHeader = request.headers.authorization;
      if (!authHeader) {
        return reply
          .status(401)
          .send({ error: "Missing authorization header" });
      }
      const token = authHeader.split(" ")[1];
      if (!token) {
        return reply
          .status(401)
          .send({ error: "Invalid authorization header format" });
      }
      const decoded = jwt.verify(token, JWT_SECRET);
      request.user = decoded;
    } catch (err) {
      reply.status(401).send({ error: "Unauthorized" });
    }
  });
});
