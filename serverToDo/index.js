const express = require("express");
const cors = require("cors");
const pool = require("./db");

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

let families = require("./Routes/families.route");
app.use("/families", families);
let members = require("./Routes/members.route");
app.use("/members", members);
let tasks = require("./Routes/tasks.route");
app.use("/tasks", tasks);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
