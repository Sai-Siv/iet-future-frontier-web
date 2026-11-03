import multer from 'multer';
import { HttpError } from '../utils/HttpError.js';
import { IMAGE_TYPES, DOCUMENT_TYPES, MAX_FILE_SIZE, matchesFileType } from '../utils/fileTypes.js';

const createUpload = ({ allowedTypes, typeLabel, maxFiles, isAllowedField = () => true }) =>
  multer({
    storage: multer.memoryStorage(),
    limits: { fileSize: MAX_FILE_SIZE, files: maxFiles, fields: 200, fieldSize: 256 * 1024 },
    fileFilter: (req, file, callback) => {
      if (!isAllowedField(file.fieldname)) {
        return callback(new HttpError(400, 'An unexpected file was uploaded.'));
      }
      if (!allowedTypes.includes(file.mimetype)) {
        return callback(new HttpError(400, `Only ${typeLabel} files are allowed.`));
      }
      callback(null, true);
    },
  });

export const imageUpload = (maxFiles = 1) =>
  createUpload({ allowedTypes: IMAGE_TYPES, typeLabel: 'PNG, JPG or WEBP', maxFiles });

// Award questions are identified by numeric IDs, which are used as the file field names.
export const awardDocumentUpload = createUpload({
  allowedTypes: DOCUMENT_TYPES,
  typeLabel: 'PDF, Word, or image',
  maxFiles: 20,
  isAllowedField: (name) => /^\d{1,15}$/.test(name),
});

/** The browser-declared type can be forged, so compare it with the file's actual bytes. */
export const verifyFileContents = (req, res, next) => {
  const collected = req.file ? [req.file] : Array.isArray(req.files) ? req.files : Object.values(req.files || {}).flat();
  const invalid = collected.find((file) => !matchesFileType(file.buffer, file.mimetype));
  if (invalid) {
    return next(new HttpError(400, 'An uploaded file does not match its file type.'));
  }
  next();
};
