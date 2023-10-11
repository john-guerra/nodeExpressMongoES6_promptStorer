import express from "express";

import { myDB } from "../db/MyDB.js";

// Named export
export const router = express.Router();

router.get("/prompts", async (req, res) => {
  console.log("should return prompts");

  
  const prompts = await myDB.getPrompts();
  console.log("got prompts", prompts);

  
  res.json(prompts);
});

// Default export
export default router;
