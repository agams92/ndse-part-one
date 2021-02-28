const multer = require("multer");
const { BOOKS_FILE_PATH } = require("../constants");

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, BOOKS_FILE_PATH);
  },
  filename(req, file, cb) {
    cb(
      null,
      `${new Date().toISOString().replace(/:/g, "-")}-${file.originalname}`
    );
  },
});

const allowedTypes = ["application/pdf"];

const fileFilter = (req, file, cb) => {
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

module.exports = multer({
  storage,
  fileFilter,
});
