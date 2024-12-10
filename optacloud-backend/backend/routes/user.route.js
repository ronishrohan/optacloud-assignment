import { Router } from "express";
import { UserModel as User } from "../models/user.model.js";

export const userRouter = Router();

userRouter.post("/login", async (req, res) => {
  const existUser = await User.findOne({ username: req.body.username });

  if (!existUser) {
    const user = await User.create({
      username: req.body.username,
      password: req.body.password,
    });
  } else {
    if (existUser.password !== req.body.password) {
      return res.send({ status: "error", username: "" });
    }
  }

  return res.send({ status: "success", username: existUser.username });
});
