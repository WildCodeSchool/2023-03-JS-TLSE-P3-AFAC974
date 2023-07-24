const argon2 = require("@node-rs/argon2");
const jwt = require("jsonwebtoken");
const models = require("./models");
require("dotenv").config();

const hashingOptions = {
  type: argon2.argon2id,
  memoryCost: 2 ** 16,
  timeCost: 5,
  parallelism: 1,
};

const verifyEmail = (req, res, next) => {
  const data = req.body;
  models.user
    .findByEmail(data.email)
    .then(([rows]) => {
      if (rows.length === 0) {
        next();
      } else {
        res.status(409).send("Email already in use");
      }
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const hashPassword = (req, res, next) => {
  if (req.body.password) {
    argon2
      .hash(req.body.password, hashingOptions)
      .then((hashedPassword) => {
        req.body.hashedPassword = hashedPassword;
        delete req.body.password;
        next();
      })
      .catch((err) => {
        console.error(err);
        res.sendStatus(500);
      });
  } else {
    next();
  }
};

const verifyPassword = (req, res) => {
  argon2
    .verify(req.user.hashedPassword, req.body.password)
    .then((isVerified) => {
      if (isVerified) {
        const payload = { sub: req.user.id, role: req.user.role };
        const token = jwt.sign(payload, process.env.JWT_SECRET, {
          expiresIn: "2h",
        });
        delete req.user.hashedPassword;
        res.send({ token, user: req.user });
      } else {
        res.sendStatus(401);
      }
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const verifyToken = (req, res, next) => {
  try {
    const authorizationHeader = req.get("Authorization");

    if (authorizationHeader == null) {
      throw new Error("Authorization header is missing");
    }

    const [type, token] = authorizationHeader.split(" ");

    if (type !== "Bearer") {
      throw new Error("Authorization header has not the 'Bearer' type");
    }

    req.payload = jwt.verify(token, process.env.JWT_SECRET);

    next();
  } catch (err) {
    console.error(err);
    res.sendStatus(401);
  }
};

const verifyIsAdmin = (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    res.status(401).json({ message: "Unauthorized: Missing token" });
  }

  try {
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    const { role } = decodedToken;

    if (role !== 0) {
      res
        .status(403)
        .json({ message: "Unauthorized: Access denied for non-admin users" });
    }

    next();
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const verifyIsUser = (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    res.status(401).json({ message: "Unauthorized: Missing token" });
  }

  try {
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    const { role } = decodedToken;

    if (role !== 1) {
      res.status(403).json({ message: "Unauthorized: Access denied" });
    }

    next();
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = {
  verifyEmail,
  hashPassword,
  verifyPassword,
  verifyToken,
  verifyIsAdmin,
  verifyIsUser,
};
