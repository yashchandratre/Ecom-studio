const mongoose = require("mongoose");

const cuserSchema = new mongoose.Schema(
  {
    fname: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    city: {
      type: String,
      required: true,
      trim: true,
    },
    phno: {
      type: String,
      required: true,
      trim: true,
    },
  },
  { timestamps: true }
);

const Cuser = mongoose.model("Cuser", cuserSchema);

module.exports = Cuser;
