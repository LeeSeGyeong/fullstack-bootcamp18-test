const jwt = require('jsonwebtoken');

const verifyToken = (token) => {
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    return decoded;
  } catch (error) {
    if(error.name === 'TokenExpiredError'){
      res.status(401).json({ error: "TokenExpiredError" });
    }

    if(error.name === 'JsonWebTokenError'){
      res.status(401).json({ error: "JsonWebTokenError" });
    }

    if(error.name === 'NotBeforeError'){
      res.status(401).json({ error: "NotBeforeError" });
    }

    return false;
  }
}

const makeAccessToken = (id) => {
  try {
    return jwt.sign({
        id
      }, process.env.JWT_SECRET, {
        expiresIn: '2h'
      }
    );
  } catch (error) {
    res.status(401).json({ error: "makeAccessToken Error" });
  }
}

const makeRefreshToken = (id) => {
  try {
    return jwt.sign({
      id
    }, process.env.JWT_SECRET, {
      expiresIn: '14d'
    });
  } catch (error) {
    res.status(401).json({ error: "makeRefreshToken Error" });
  }
};

module.exports = { verifyToken , makeAccessToken, makeRefreshToken }
