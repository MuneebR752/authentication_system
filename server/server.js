const express = require("express");
const connectDB = require("./config/mongoDB");
const dotenv = require("dotenv");
const morgan = require("morgan");
const cors = require("cors");
const app = express();
const User = require("./models/user");
app.use(morgan("dev"));
app.use(cors());
app.use(express.json());
dotenv.config({ path: ".env" });
const route = require("./routes/user");
// Connect Database
connectDB();

app.post("/signup", route);
app.post("/login", route);
app.delete("/", route);
app.post("/auth", route);
app.get("/", async (req, res) => {
  res.send(await User.find());
});
app.listen(5000, () => console.log("Server started on port 5000"));
