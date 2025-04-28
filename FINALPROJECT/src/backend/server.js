import express from "express";
import cors from "cors";
import { MongoClient } from "mongodb";
const app = express();

app.use(cors());
app.use(express.json());

const url = "mongodb://localhost:27017";
const dbName = "playerinsights";
const client = new MongoClient(url);
let db;

const port = 8080;
const host = "localhost";

const leagues = ["nba", "mlb"];
const baseUrl = "https://api.linemate.io/api/";
const extensions = [
  "/v1/discovery/cards?premium=true",
  "/v1/discovery/cards?cardGroup=PERFECT_HIT_RATE_RECENT_FORM&premium=true",
  "/v1/discovery/cards?cardGroup=ALTERNATES&premium=true",
  "/v1/discovery/cards?cardGroup=PERFECT_HIT_RATE_ALTERNATES&premium=true",
  "/v1/discovery/cards?cardGroup=RISKY&premium=true",
];

const dataTypes = [
  "baselines",
  "perfectbaselines",
  "altlines",
  "perfectaltlines",
  "risky",
];

async function startServer() {
  try {
    await client.connect();
    db = client.db(dbName);
    console.log("Connected to MongoDB");

    app.listen(port, () => {
      console.log("App listening on http://%s:%s", host, port);
    });
  } catch (err) {
    console.error("Failed to connect to MongoDB", err);
  }
}

async function addData() {
  try {
    await client.connect();
    console.log("MongoDB client connected for POST Request");

    await db.collection("alldata").deleteMany({});

    for (let i = 0; i < 2; i++) {
      for (let j = 0; j < 5; j++) {
        const response = await fetch(`${baseUrl}${leagues[i]}${extensions[j]}`);
        if (!response.ok) {
          console.log("SOMETHING WRONG!");
          return;
        }

        await db
          .collection(`${leagues[i].toUpperCase()}${dataTypes[j]}`)
          .deleteMany({});

        const json = await response.json();
        if (json.length != 0) {
          await db.collection("alldata").insertMany(json);
          await db
            .collection(`${leagues[i].toUpperCase()}${dataTypes[j]}`)
            .insertMany(json);
        }
      }
    }
  } catch (err) {
    console.error(err);
  }
}

async function higherChances() {
  try {
    await client.connect();
    console.log("MongoDB client connected for POST and GET request.");

    const response = await db
      .collection("alldata")
      .find({ $expr: { $gte: [{ $size: "$narratives" }, 3] } })
      .toArray();
    if (response.length !== 0)
      db.collection("higherchances").insertMany(response);
  } catch (err) {
    console.error(err);
  }
}

app.post("/addData", async (req, res) => {
  try {
    await addData();
    await higherChances();
    res.status(200).send({ message: "Data added and processed successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).send({ message: "Failed to add data", error: err.message });
  }
});

const collections = [
  "MLBbaselines",
  "MLBperfectbaselines",
  "",
  "",
  "MLBrisky",
  "NBAbaselines",
  "NBAperfectbaselines",
  "NBAaltlines",
  "NBAperfectaltlines",
  "NBArisky",
  "higherchances",
  "alldata",
];

collections.forEach((collection) => {
  app.get(`/${collection}`, async (req, res) => {
    try {
      await client.connect();
      console.log(`MongoDB client connected for GET Request /${collection}`);

      const results = await db.collection(`${collection}`).find({}).toArray();

      res.status(200).send(results);
    } catch (err) {
      console.error(err);
      res.status(500).send("Error fetching data.");
    }
  });
});

/**
 * Need to run these functions once per day so that data gets updated...
 * startServer().then(() => addData()).then(() => higherChances());
 */

startServer();
// startServer()
//   .then(() => addData())
//   .then(() => higherChances());
