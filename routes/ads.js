var express = require("express");
var router = express.Router();
const path = require("path");
const multer = require("multer");

const Ads = require("../models/Ads");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./Images/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
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
  try {
    console.log(req.files, req.body.km, req.body.mainTitle);

    const Adss = new Ads({
      mainTitle: req.body.mainTitle,
      km: req.body.km,
      price: req.body.price,
      description: req.body.description,
      images: req.files.map((file) => file.path),
    });

    const promise = Adss.save();
    promise
      .then((data) => {
        res.json(data);
      })
      .catch((err) => {
        res.json(err);
      });
  } catch (error) {
    console.log(error);
  }
});

router.get("/listAll", (req, res) => {
  const promise = Ads.find({});

  promise
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      res.json(err);
    });
});

module.exports = router;
