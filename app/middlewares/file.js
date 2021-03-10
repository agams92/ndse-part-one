const multer = require('multer');
const fs = require('fs');
const { BOOKS_FILE_PATH, APP_ROOT_PATH } = require('../constants');

const storage = multer.diskStorage({
  destination(_, __, cb) {
    cb(null, BOOKS_FILE_PATH);
  },
  filename(_, file, cb) {
    cb(null, `${new Date().toISOString().replace(/:/g, '-')}-${file.originalname}`);
  },
});

const allowedTypes = ['application/pdf'];

const fileFilter = (_, file, cb) => {
  const { mimetype } = file;
  if (allowedTypes.includes(mimetype)) {
    cb(null, true);
  } else {
    cb(new Error(`Sorry, I cannot accept file with this type: ${mimetype}`));
  }
};

module.exports = multer({
  storage,
  fileFilter,
});
