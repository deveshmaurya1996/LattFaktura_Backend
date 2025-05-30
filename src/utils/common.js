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
    },
    JWT_SECRET,
    {
      expiresIn: "30d",
      algorithm: "HS256",
    }
  );
};

module.exports = {
  generateAuthToken,
};
