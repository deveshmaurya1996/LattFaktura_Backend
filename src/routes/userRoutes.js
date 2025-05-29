const {
  registerUser,
  loginUser,
  getProfile,
  changeLanguagePreference,
} = require("../controllers/userController");

async function userRoutes(fastify, options) {
  fastify.post("/register", async (request, reply) => {
    await registerUser(request, reply);
  });

  fastify.post("/login", async (request, reply) => {
    await loginUser(request, reply);
  });

  fastify.get(
    "/profile",
    { preHandler: fastify.authenticate },
    async (request, reply) => {
      await getProfile(request, reply);
    }
  );

  fastify.patch(
    "/language",
    { preHandler: fastify.authenticate },
    async (request, reply) => {
      await changeLanguagePreference(request, reply);
    }
  );
}

module.exports = userRoutes;
