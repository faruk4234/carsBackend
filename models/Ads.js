const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const AdSchema = new Schema({
  ad_id: Schema.Types.ObjectId,

  mainTitle: {
    type: String,
    required: true,
  },

  km: {
    type: String,
    required: true,
  },

  price: {
    type: String,
  },

  description: {
    type: String,
  },

  images: {
    type: Array,
  },
});

module.exports = mongoose.model("ads", AdSchema);
