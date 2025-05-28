const bcrypt = require("bcrypt");
const { generateAuthToken } = require("../utils/common");

// Register user
exports.registerUser = async (request, reply) => {
  const User = request.server.db.User;

  try {
    const {
      businessName,
      contactPerson,
      address,
      postalNumber,
      city,
      email,
      phoneNumber,
      password,
    } = request.body;

    // Basic validation
    if (
      !businessName ||
      !contactPerson ||
      !address ||
      !postalNumber ||
      !city ||
      !email ||
      !phoneNumber ||
      !password
    ) {
      return reply.status(400).send({ error: "All fields are required" });
    }

    // Check if email exists
    const existingUser = await User.findOne({ where: { email } });

    if (existingUser) {
      return reply.status(409).send({ error: "Email already registered" });
    }

    // Hash password
    const passwordHash = await bcrypt.hash(password, 10);

    // Create user
    const user = await User.create({
      businessName,
      contactPerson,
      address,
      postalNumber,
      city,
      email,
      phoneNumber,
      passwordHash,
    });

    // Send user data without passwordHash
    const userData = user.toJSON();
    delete userData.passwordHash;

    const token = generateAuthToken(userData);

    reply.status(201).send({
      user: userData,
      token,
    });
  } catch (err) {
    console.error("🔥 Registration Error:", err);
    reply.status(500).send({ error: "Registration failed" });
  }
};

// Login user
exports.loginUser = async (request, reply) => {
  const User = request.server.db.User;

  try {
    const { email, password } = request.body;

    if (!email || !password) {
      return reply.status(400).send({ error: "Email and password required" });
    }

    const user = await User.findOne({ where: { email } });

    if (!user) {
      return reply.status(401).send({ error: "Invalid email or password" });
    }

    const valid = await user.validatePassword(password);
    if (!valid) {
      return reply.status(401).send({ error: "Invalid email or password" });
    }
    const token = generateAuthToken(user);
    // Create JWT token
    reply.status(201).send({
      user: user,
      token,
    });
  } catch (err) {
    console.error("🔥 Login Error:", err);
    reply.status(500).send({ error: "Login failed" });
  }
};

// Fetch Profile

exports.getProfile = async (request, reply) => {
  const User = request.server.db.User;

  try {
    if (!User) {
      return reply.code(404).send({ error: "User not found" });
    }

    reply.status(200).send({
      user: request.user,
    });
  } catch (error) {
    console.error(error);
    reply.code(500).send({ error: "Unable to fetch profile" });
  }
};
