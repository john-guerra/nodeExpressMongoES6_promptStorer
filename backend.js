import express from "express";

import apiRouter from "./routes/api.js";

const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.static("frontend"));
app.use("/api", apiRouter);

app.listen(PORT, () => console.log(`First Listening on port ${PORT}`));
