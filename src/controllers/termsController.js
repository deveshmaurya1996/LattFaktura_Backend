const Terms = require("../models/Terms");

// controllers/termsController.js
exports.getTerms = async (req, reply) => {
  const lang = req.query.lang || "en";
  try {
    const terms = await Terms.findAll({ where: { language: lang } });
    reply.send(terms);
  } catch (error) {
    fastify.log.error(error);
    reply.status(500).send({ error: "Unable to fetch terms" });
  }
};
