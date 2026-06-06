import mongoose from "mongoose";

const googleTokenSchema = new mongoose.Schema(
  {
    refreshToken: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

const GoogleToken = mongoose.model("GoogleToken", googleTokenSchema);

export default GoogleToken;
