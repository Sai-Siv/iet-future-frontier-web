// Cloudinary's Free plan caps uploads at about this size.
export const MAX_FILE_SIZE = 10 * 1024 * 1024;

const startsWith = (buffer, bytes, offset = 0) =>
  buffer.length >= offset + bytes.length && bytes.every((byte, i) => buffer[offset + i] === byte);

const isPng = (b) => startsWith(b, [0x89, 0x50, 0x4e, 0x47]);
const isJpeg = (b) => startsWith(b, [0xff, 0xd8, 0xff]);
// The PDF format allows some bytes before the header, but markup there means an HTML file in disguise.
const isPdf = (b) => {
  const header = b.subarray(0, 1024);
  const position = header.indexOf('%PDF-');
  return position >= 0 && !header.subarray(0, position).includes('<');
};

const SIGNATURES = {
  'image/png': isPng,
  'image/jpeg': isJpeg,
  'image/jpg': isJpeg,
  'application/pdf': isPdf,
};

export const IMAGE_TYPES = ['image/png', 'image/jpeg', 'image/jpg'];
export const DOCUMENT_TYPES = Object.keys(SIGNATURES);

export const matchesFileType = (buffer, mimetype) => Boolean(SIGNATURES[mimetype]?.(buffer));
