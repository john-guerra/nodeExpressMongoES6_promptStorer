import "dotenv/config"; // to load .env file

import { MongoClient, ObjectId } from "mongodb";

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

  myDB.createPrompt = async (prompt) => {
    const { client, db } = connect();

    const promptsCollection = db.collection("prompts");

    try {
      const result = await promptsCollection.insertOne(prompt);
      return result;
    } finally {
      console.log("create Prompts db closing connection");
      client.close();
    }
  };

  myDB.deletePrompt = async ({ _id }) => {
    const { client, db } = connect();

    if (!_id) {
      throw new Error("No _id provided");
    }

    const promptsCollection = db.collection("prompts");

    try {
      const result = await promptsCollection.deleteOne({
        _id: new ObjectId(_id),
      });
      return result;
    } finally {
      console.log("delete Prompts db closing connection");
      client.close();
    }
  };

  return myDB;
}

export const myDB = MyDB();
