const { getTerms } = require("../controllers/termsController");

async function termsRoutes(fastify, options) {
  fastify.get("/terms", { preHandler: fastify.authenticate }, getTerms);
}

module.exports = termsRoutes;
