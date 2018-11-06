const jwt = require('jsonwebtoken');
class Token {
  // Checks if the token is valid
  verify(token) {
    return new Promise((resolve, reject) =>
      jwt.verify(token, process.env.SECRET, (err, data) => (err ? reject(err) : resolve(data)))
    );
  }

  // Parses the token from the request
  receiveToken(req, res, next) {
    if (req.headers.authorization) {
      req.authToken = req.headers.authorization.replace(/^Bearer\s/, '');
    }
    next();
  }

  // Decodes token according to token headers
  decode(token) {
    return jwt.decode(token);
  }

  // Helper function to generate new token
  // generateToken(payload) {
  //   return new Promise((resolve, reject) =>
  //     jwt.sign(payload, process.env.SECRET, (err, data) => (err ? reject(err) : resolve(data)))
  //   );
  // }

  // Middleware for creating token
  createToken(req, res, next) {
    jwt.sign(res.locals.newTokenData, process.env.SECRET, (err, jwt) => {
      if (err) console.error('Error in TokenService.createToken:', err);
      res.locals.token = jwt;
      next();
    });
  }
}

module.exports = new Token();
