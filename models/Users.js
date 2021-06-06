const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const LoginSchmma = new Schema({
  user_id: Schema.Types.ObjectId,

  nameAndSurname: {
    type: String,
    required: true,
  },

  email: {
    type: String,
    required: "true",
    unique: true,
  },

  password: {
    type: String,
    required: "true",
    minlength: 6,
    maxlenght: 20,
  },
});

module.exports = mongoose.model("login", LoginSchmma);
