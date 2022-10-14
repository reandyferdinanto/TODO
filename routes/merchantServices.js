const express = require("express");
const router = express.Router();
const merchantServices = require("../services/merchantServices");

const jwt = require("jsonwebtoken");
const accessTokenSecret = "TestDulu";
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.json());

const authenticateJWT = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (authHeader) {
    const token = authHeader.split(" ")[1];

    jwt.verify(token, accessTokenSecret, (err, user) => {
      if (err) {
        return res.sendStatus(403);
      }

      req.user = user;
      next();
    });
  } else {
    res.sendStatus(401);
  }
};

router.get("/", authenticateJWT, async function (req, res, next) {
  try {
    res.json(await merchantServices.getMultiple(req.query.page));
  } catch (err) {
    console.error(`Error while getting merchant services `, err.message);
    next(err);
  }
});

module.exports = router;

router.post("/", authenticateJWT, async function (req, res, next) {
  try {
    res.json(await merchantServices.create(req.body));
  } catch (err) {
    console.error(`Error while creating programming language`, err.message);
    next(err);
  }
});

module.exports = router;

/* DELETE programming language */
router.delete("/:id", authenticateJWT, async function (req, res, next) {
  // res
  //   .status(401)
  //   .json({ message: "You need to be logged in to access this resource" });
  try {
    res.json(await merchantServices.remove(req.params.id));
  } catch (err) {
    console.error(`Error while deleting programming language`, err.message);
    next(err);
  }
});
