const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// define the Schema (the structure of the article)
const userSchema = new Schema({
  type: String,
  name: [String, { default: "none" }],
  quest: String,
  ans1: String,
  ans2: String,
  ans3: String,
  ans4: String,
  ans5: String,
  number: Number,
});

// Create a model based on that schema
const Quset = mongoose.model("customer", userSchema);

// export the model
module.exports = Quset;
