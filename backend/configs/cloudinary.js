// backend/configs/cloudinary.js
import { v2 as cloudinary } from "cloudinary";
import dotenv from "dotenv";

dotenv.config();

cloudinary.config({
  //cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  cloud_name: "drziiij1z",
  //api_key: process.env.CLOUDINARY_API_KEY,
  api_key: "842514242192382",
  //api_secret: process.env.CLOUDINARY_API_SECRET,
  api_secret: "Jb3LqxWB7NNNq2puwktiH2wghik",
});

export default cloudinary;