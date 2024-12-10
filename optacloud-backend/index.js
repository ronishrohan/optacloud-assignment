import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectDb } from "./backend/database/helpers/connectDb.js";
import { userRouter } from "./backend/routes/user.route.js";
dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

await connectDb();

app.get("/", (req, res) => {
    res.send("Hello World!");
});


app.use("/users", userRouter)

app.listen(3000, () => {
    console.log("Server is running on port 3000");
})