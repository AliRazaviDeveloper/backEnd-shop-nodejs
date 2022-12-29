const mongoose = require("mongoose");

const otpSchema = new mongoose.Schema({
  code: { type: String },
  expired_at: { type: Date, default: new Date().getDate() + 120 },
});

const addressSchema = new mongoose.Schema({
  city: { type: String, required: true },
  street: { type: String, required: true },
  allay: { type: String, required: true },
  lat: { type: Number, required: true },
  long: { type: String, required: true },
  postalCode: { type: String, required: true },
});

const userSchema = new mongoose.Schema(
  {
    username: { type: String },
    email: { type: String },
    phone: { type: String, required: true },
    password: { type: String },
    otp: { type: otpSchema, required: true },
    avatar: { type: String, default: "/uploads/avatar/avatar.png" },
    discount: { type: Number, default: 0 },
    wallet: { type: String, default: 0 },
    nationalCode: { type: String },
    birthDay: { type: Date },
    address: { type: [addressSchema], default: [] },
  },
  {
    timestamps: true,
  }
);

module.exports = {
  userModel: mongoose.model("user", userSchema),
};
