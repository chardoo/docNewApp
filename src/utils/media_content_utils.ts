import { Request } from 'express';
import { FileFilterCallback } from 'multer';
import * as multer from 'multer';

const acceptedMimeTypes = new Set([
  'image/apng', 'image/gif', 'image/jpeg',
  'image/jpg', 'image/png', 'image/svg+xml', 'image/webp',
]);



/**
 *@description: Checks for file mime type
 * @param req :Request
 * @param file :Express.Multer.Filter
 * @param cb :(arg0: null, arg1: boolean)
 * @returns : void
 */
const mediaMimeFilter = (req: Request, file: Express.Multer.File, cb: FileFilterCallback) => {
  if (
    acceptedMimeTypes.has(file.mimetype)
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const localContentStorage = () => {
  const storage = multer.diskStorage({
    destination: 'public/uploads',
    filename: (_: Request, file: Express.Multer.File, cb) => {
      cb(null, `${new Date().toISOString().replace(/:/g, '-')}-${file.originalname}`);
    },
  });
  return multer.default({
    storage,
    fileFilter: mediaMimeFilter,
    limits: { fileSize: 30000000 }, // 10mb
  }).array(
    'image',
  );
};

export default {
 localContentStorage,
};

