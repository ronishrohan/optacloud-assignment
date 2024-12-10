import mongoose, { Model, Schema } from "mongoose";

const UserSchema = Schema({
  username: {
    unique: true,
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

const UserModel = mongoose.model("User", UserSchema);

export { UserModel  };
