const express = require("express");
const cors = require("cors");
const connectToDB = require("./db/db.js");
const authRouter = require("./Routes/route.js");

const app = express();
app.use(cors());
app.use(express.json());
app.use("/api/auth", authRouter);

app.listen(process.env.PORT, () => {
  console.log(`server is on port is ${process.env.PORT}`);
  connectToDB().then(console.log("MongoDb Connected Successfully"));
});
