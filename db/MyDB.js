import "dotenv/config"; // to load .env file

import { MongoClient } from "mongodb";

function MyDB() {
  const uri = process.env.MONGO_URL || "mongodb://localhost:27017";
  const myDB = {};

  const connect = () => {
    console.log("Connecting to", uri.slice(0, 20));
    const client = new MongoClient(uri);
    const db = client.db("promptsStorer");

    return { client, db };
  };

  myDB.getPrompts = async ({ query = {}, MaxElements = 20 } = {}) => {
    const { client, db } = connect();

    const promptsCollection = db.collection("prompts");

    try {
      return await promptsCollection.find(query).limit(MaxElements).toArray();
    } finally {
      console.log("db closing connection");
      client.close();
    }
  };

  return myDB;
}

export const myDB = MyDB();
