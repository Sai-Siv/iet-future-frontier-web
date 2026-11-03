// Cloudinary's Free plan caps uploads at about this size.
export const MAX_FILE_SIZE = 10 * 1024 * 1024;

const startsWith = (buffer, bytes, offset = 0) =>
  buffer.length >= offset + bytes.length && bytes.every((byte, i) => buffer[offset + i] === byte);
const ascii = (text) => [...Buffer.from(text, 'ascii')];

const isPng = (b) => startsWith(b, [0x89, 0x50, 0x4e, 0x47]);
const isJpeg = (b) => startsWith(b, [0xff, 0xd8, 0xff]);
const isWebp = (b) => startsWith(b, ascii('RIFF')) && startsWith(b, ascii('WEBP'), 8);
const isHeic = (b) => startsWith(b, ascii('ftyp'), 4);
// The PDF format allows some bytes before the header, but markup there means an HTML file in disguise.
const isPdf = (b) => {
  const header = b.subarray(0, 1024);
  const position = header.indexOf('%PDF-');
  return position >= 0 && !header.subarray(0, position).includes('<');
};
const isDoc = (b) => startsWith(b, [0xd0, 0xcf, 0x11, 0xe0]);
const isDocx = (b) => startsWith(b, [0x50, 0x4b, 0x03, 0x04]);

const SIGNATURES = {
  'image/png': isPng,
  'image/jpeg': isJpeg,
  'image/jpg': isJpeg,
  'image/webp': isWebp,
  'image/heic': isHeic,
  'image/heif': isHeic,
  'application/pdf': isPdf,
  'application/msword': isDoc,
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document': isDocx,
};

export const IMAGE_TYPES = ['image/png', 'image/jpeg', 'image/jpg', 'image/webp'];
export const DOCUMENT_TYPES = Object.keys(SIGNATURES);

export const matchesFileType = (buffer, mimetype) => Boolean(SIGNATURES[mimetype]?.(buffer));
