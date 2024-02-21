import mongoose from "mongoose";
const forgotSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      trim: true,
    },
    otp_number: {
      type: String,
      required: true,
      trim: true,
    },
    expire_time: {
      type: String,
      required: true,
      trim: true,
    },
  },
  { timestamps: true }
);
let ForgotPass = mongoose.model("Forgot_password", forgotSchema);
export default ForgotPass;
