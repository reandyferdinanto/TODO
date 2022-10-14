const express = require("express");
const router = express.Router();
const merchantProduct = require("../services/product");

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

// POST - Create New Product
router.post("/", authenticateJWT, async function (req, res, next) {
  res
    .status(401)
    .json({ message: "You need to be logged in to access this resource" });
  try {
    res.json(await merchantProduct.create(req.body));
  } catch (err) {
    console.error(`Error while creating new product`, err.message);
    next(err);
  }
});

// DELETE - Delete Product
router.delete("/:id", authenticateJWT, async function (req, res, next) {
  res
    .status(401)
    .json({ message: "You need to be logged in to access this resource" });
  try {
    res.json(await merchantProduct.remove(req.params.id));
  } catch (err) {
    console.error(`Error while deleting product`, err.message);
    next(err);
  }
});

// PUT - Update Product
router.put("/:id", authenticateJWT, async function (req, res, next) {
  res
    .status(401)
    .json({ message: "You need to be logged in to access this resource" });
  try {
    res.json(await merchantProduct.update(req.params.id, req.body));
  } catch (err) {
    console.error(`Error while updating product`, err.message);
    next(err);
  }
});

//  GET to get list of user merchant
router.get("/", authenticateJWT, async function (req, res, next) {
  res
    .status(401)
    .json({ message: "You need to be logged in to access this resource" });
  try {
    res.json(await merchantProduct.getMultiple(req.query.page));
  } catch (err) {
    console.error(`Error while getting Products `, err.message);
    next(err);
  }
});

module.exports = router;
