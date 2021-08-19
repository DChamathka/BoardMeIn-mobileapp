const mongoose = require("mongoose");

const OwnerSchema = new mongoose.Schema(
  {
    firstname: {
      type: String,
      required: true,
    },
    lastname: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    bio: {
      type: String,
      default: "",
      // required: true,
    },
    location: {
      type: String,
      default: "",
      //required: true,
    },
    role: {
      type: Number,
      default: 2,
      //   1 - admin // 2 - owner // 3 - guest
    },
    pic: {
      type: String,
      default:
        "https://st3.depositphotos.com/15648834/17930/v/600/depositphotos_179308454-stock-illustration-unknown-person-silhouette-glasses-profile.jpg",
    },
  },
  { timestamps: true }
);

const Owner = mongoose.model("Owner", OwnerSchema);

module.exports = Owner;