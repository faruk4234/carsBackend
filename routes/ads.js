var express = require("express");
var router = express.Router();
const path = require("path");
const multer = require("multer");

const Ads = require("../models/Ads");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./uploads/");
  },
  filename: (req, file, cb) => {
    cb(
      null,
      file.filename + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 5,
  },
  fileFilter: fileFilter,
});

router.post("/", upload.array("images"), (req, res, next) => {
  console.log(req.file);
  const Adss = new Ads({
    mainTitle: req.body.mainTitle,
    km: req.body.km,
    price: req.body.price,
    description: req.body.description,
    images: req.file.path,
  });
  const promise = Adss.save();
  promise
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      res.json(err);
    });
});

router.post("/add", (req, res) => {
  res.json("sdasa");
});

module.exports = router;
