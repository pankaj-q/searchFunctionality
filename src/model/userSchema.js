import mongoose from 'mongoose';

const userSchema = new mongoose.schema(
  {
    name: String,
    email: String,
    password: String,
  },
  { timestamps: true },
);

const user = mongoose.model("USER", userSchema);
export default userSchema;
