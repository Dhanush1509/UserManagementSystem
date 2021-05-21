import express from "express";
import { notFound, errorHandler } from "./middlewares/errorHandler.js";
import users from "./routes/users.js";
import dotenv from "dotenv";
import CONNECT_DB from "./config/db.js";
dotenv.config();

const app = express();
CONNECT_DB();
app.use(express.json());
app.use("/api/users", users);
app.get("/",(req, res) =>{res.json({"message":"api is running"})})



app.use(notFound);
app.use(errorHandler);
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server is running at ${PORT}`));
