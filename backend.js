import express from "express";

import bodyParser from "body-parser";

import apiRouterPrompts from "./routes/apiPrompts.js";
import apiRouterUsers from "./routes/apiUsers.js";

const app = express();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());


const PORT = process.env.PORT || 3000;

app.use(express.static("frontend"));
app.use("/api/prompts", apiRouterPrompts);
app.use("/api/users", apiRouterUsers);

app.listen(PORT, () => console.log(`First Listening on port ${PORT}`));
