const JWT = require("jsonwebtoken");
const generateToken = (payload) => {
  return JWT.sign({ payload }, process.env.SECRET_KEY, {
    expiresIn: "2 days",
  });
};

module.exports = {
  generateToken,
};
