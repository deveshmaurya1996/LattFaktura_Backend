const jwt = require("jsonwebtoken");

const JWT_SECRET = process.env.JWT_SECRET;

const generateAuthToken = (user) => {
  return jwt.sign(
    {
      id: user.id,
      email: user.email,
      businessName: user.businessName,
      contactPerson: user.contactPerson,
      address: user.address,
      postalNumber: user.postalNumber,
      city: user.city,
      phoneNumber: user.phoneNumber,
      // Add other relevant user properties if needed
    },
    JWT_SECRET,
    {
      expiresIn: "30d", // Token expiration time
      algorithm: "HS256", // Specify hashing algorithm
    }
  );
};

module.exports = {
  generateAuthToken,
};
