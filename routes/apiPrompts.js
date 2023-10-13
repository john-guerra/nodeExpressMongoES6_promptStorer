import express from "express";

import { myDB } from "../db/MyDB.js";

// Named export
export const router = express.Router();

// /api/prompts
router.get("/", async (req, res) => {
  console.log("should return prompts");

  const prompts = await myDB.getPrompts();
  console.log("got prompts", prompts);

  res.json(prompts);
});

// /api/prompts/create
router.post("/create", async (req, res) => {
  console.log("create Prompt", req.body);

  const resDB = await myDB.createPrompt(req.body);
  console.log("created prompt", resDB);

  res.json({ ok: true, res: resDB });
});

// /api/prompts/create
router.delete("/delete", async (req, res) => {
  console.log("Delete Prompt", req.body);

  const { _id } = req.body;

  const resDB = await myDB.deletePrompt({_id});
  console.log(" prompt deleted", resDB);

  if (res.deletedCount >= 1) {
    res.json({ ok: true, res: resDB });
  } else {
    res.json({ ok: false, msg: "Error deleting", res: resDB });
  }
  
});

// Default export
export default router;
