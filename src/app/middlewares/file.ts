import multer from 'multer';
import fs from 'fs';
import { BOOKS_FILE_PATH, APP_ROOT_PATH } from '../constants';

const storage = multer.diskStorage({
  destination(_, __, cb) {
    cb(null, BOOKS_FILE_PATH);
  },
  filename(_, file, cb) {
    cb(null, `${new Date().toISOString().replace(/:/g, '-')}-${file.originalname}`);
  },
});

const allowedTypes = ['application/pdf'];

const fileFilter = (_:any, file:any, cb:any) => {
  const { mimetype } = file;
  if (allowedTypes.includes(mimetype)) {
    cb(null, true);
  } else {
    cb(new Error(`Sorry, I cannot accept file with this type: ${mimetype}`));
  }
};

export default multer({
  storage,
  fileFilter,
});
