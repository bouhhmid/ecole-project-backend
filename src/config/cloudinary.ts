import * as dotenv from 'dotenv';
dotenv.config(); // ✅ charger .env

import { v2 as cloudinary } from 'cloudinary';

console.log('ENV CHECK:', process.env.CLOUDINARY_API_KEY); // 👈 debug

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export default cloudinary;