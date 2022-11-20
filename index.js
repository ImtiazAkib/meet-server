const express = require("express");
const cors = require("cors");
const { MongoClient, ServerApiVersion } = require("mongodb");
const ObjectId = require("mongodb").ObjectId;
const app = express();
const port = process.env.PORT || 5000;

//Middleware
app.use(cors());
app.use(express.json());

// user = user
// pass = LtkiEYXnR8of7X2G

//Mongodb

const uri =
  "mongodb+srv://user:LtkiEYXnR8of7X2G@cluster0.tsciz.mongodb.net/?retryWrites=true&w=majority";

const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});

async function run() {
  try {
    await client.connect();
    const database = client.db("users");
    const productsCollection = database.collection("user");

    // GET DATA
    app.get("/users", async (req, res) => {
      const cursor = productsCollection.find({});
      const result = await cursor.toArray();
      res.send(result);
    });

    //Add Product
    app.post("/users", async (req, res) => {
      const user = req.body;
      const doc = {
        gmail: user.gmail,
        password: user.password,
      };
      const result = await productsCollection.insertOne(doc);
      res.send(result);
    });
  } finally {
    // await client.close();
  }
}

run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("Hello World!!!");
});

app.listen(port, () => {
  console.log("Listening to port", port);
});
