// cloudinaryConfig.js
import cloudinary from 'cloudinary';
import multer from 'multer';

// Configure Cloudinary
cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Configure multer to use memory storage
const storage = multer.memoryStorage();
const upload = multer({ storage });

// Function to upload image to Cloudinary
const imageUploadUtil = async (file) => {
  const result = await cloudinary.v2.uploader.upload(file, {
    resource_type: 'auto',
  });
  return result;
};

export { upload, imageUploadUtil };
