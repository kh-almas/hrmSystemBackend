// require
const jwt = require("jsonwebtoken");
require("dotenv").config();

// user verify
const userVerify = (req, res, next) => {
  try {
    if (req.originalUrl.includes("image") || req.originalUrl.includes("cv") || req.originalUrl.includes("uploads")) {
      next();
    } else {
      const token = req.headers.authorization?.split(" ")[1];

      if (!token) throw "no token found";

      const decoded = jwt.verify(token, process.env.SECRET || "Tiggzy IT");

      req.decoded = decoded;

      next();
    }
  } catch (err) {
    console.error(`user verify error: ${err}`);

    return res.status(401).json({
      status: "error",
      body: { message: err || "invalid or expired token" },
    });
  }
};

// export
module.exports = userVerify;
