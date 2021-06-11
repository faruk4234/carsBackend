const mongoose = require("mongoose");

module.exports = () => {
  mongoose
    .connect("mongodb://localhost/carsBackend")
    .then(() => {
      console.log("mongo db bağlantısı sağlandı");
    })
    .catch((err) => {
      console.log("hata: " + err);
    });
};
