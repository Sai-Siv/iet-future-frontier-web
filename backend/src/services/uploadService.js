import cloudinary from '../config/cloudinary.js';

/**
 * Uploads a file buffer to Cloudinary.
 * @param {Buffer} buffer
 * @param {string} folder - Cloudinary folder path
 * @returns {Promise<string>} the public HTTPS URL of the file
 */
export const uploadFile = (buffer, folder) =>
  new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream({ folder, resource_type: 'auto' }, (error, result) => {
      if (error) return reject(new Error(`Cloudinary upload failed: ${error.message}`));
      resolve(result.secure_url);
    });
    stream.end(buffer);
  });
