import express from "express";
import { notFound, errorHandler } from "./middlewares/errorHandler.js";
import users from "./routes/users.js";
import dotenv from "dotenv";
import CONNECT_DB from "./config/db.js";
import path from "path"
dotenv.config();

const app = express();
CONNECT_DB();
app.use(express.json());
app.use("/api/users", users);
const __dirname = path.resolve();
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/client/build")));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
} else {
  app.get("/", (req, res) => {
    res.send("API is running");
  });
}

app.use(notFound);
app.use(errorHandler);
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server is running at ${PORT}`));
