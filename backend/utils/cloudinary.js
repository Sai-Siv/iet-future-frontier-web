import { v2 as cloudinary } from 'cloudinary';
import dotenv from 'dotenv';

dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

console.log('Cloudinary configured for cloud:', process.env.CLOUDINARY_CLOUD_NAME);

/**
 * Upload a file buffer to Cloudinary
 * @param {Buffer} buffer - The file buffer
 * @param {string} folder - The Cloudinary folder path (e.g. 'protoplanet/payments')
 * @param {string} mimetype - The file MIME type
 * @returns {Promise<string>} - The secure public URL of the uploaded file
 */
export async function uploadToCloudinary(buffer, folder, mimetype) {
  return new Promise((resolve, reject) => {
    const resourceType = mimetype === 'application/pdf' ? 'raw' : 'image';

    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder,
        resource_type: resourceType,
      },
      (error, result) => {
        if (error) {
          console.error('Cloudinary upload error:', error);
          return reject(new Error('Failed to upload file to Cloudinary: ' + error.message));
        }
        console.log('Cloudinary upload success:', result.secure_url);
        resolve(result.secure_url);
      }
    );

    uploadStream.end(buffer);
  });
}

export default cloudinary;
