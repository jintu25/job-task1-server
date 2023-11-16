const express = require("express");
const app = express();
const port = process.env.PORT || 5000;
const cors = require("cors");
require("dotenv").config();
const jwt = require("jsonwebtoken");
// midilware
app.use(cors());
app.use(express.json());

//  ---------------verifyJWT----------------------------
function verifyJWT(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).send("Unauthorized access");
  }
  const token = authHeader.split(" ")[1];
  jwt.verify(token, process.env.ACCESS_TOKEN, function (err, decoded) {
    if (err) {
      return res.status(403).send({ message: "Forbidden access" });
    }
    req.decoded = decoded;
    next();
  });
}
module.exports = verifyJWT;

const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.t6zznhm.mongodb.net/?retryWrites=true&w=majority`;

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    const productCollection = client.db("headphone").collection("products");
    const cartsCollection = client.db("headphone").collection("carts");
    const usersCollection = client.db("headphone").collection("users");

    app.get('/products', async(req, res) => {
        const result = await productCollection.find().toArray()
        res.send(result)
    })
  } finally {
  }
}
run().catch((error) => console.error(error));


app.get("/", (req, res) => {
    res.send(`headphone website is running ${port}`);
  });
  
  app.listen(port, () => {
    console.log("server is running now");
  });