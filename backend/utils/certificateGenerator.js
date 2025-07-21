// import { fileURLToPath } from 'url';
// import fs from 'fs/promises';
// import path from 'path';
// import { PDFDocument, StandardFonts, rgb } from 'pdf-lib';

// // Fix for __dirname in ES Modules
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

// export async function generateNamedCertificate(userName) {
//   const certPath = path.join(__dirname, '../public/certificates/Certificate.pdf');
//   const existingPdfBytes = await fs.readFile(certPath);

//   const pdfDoc = await PDFDocument.load(existingPdfBytes);
//   const pages = pdfDoc.getPages();
//   const firstPage = pages[0];

//   const { width, height } = firstPage.getSize();

//   const font = await pdfDoc.embedFont(StandardFonts.HelveticaBold);

//   // Draw user name
//   firstPage.drawText(userName, {
//     x: width / 2 - userName.length * 6, // Center text roughly
//     y: height / 2,
//     size: 24,
//     font,
//     color: rgb(0, 0.5, 0),
//   });

//   const pdfBytes = await pdfDoc.save();
//   return pdfBytes;
// }

import fs from 'fs/promises';
import path from 'path';
//import cloudinary from '../configs/cloudinary.js';
//import cloudinary from '../configs/cloudinary';
import { fileURLToPath } from 'url';
import { PDFDocument, StandardFonts, rgb } from 'pdf-lib';
import tmp from 'tmp-promise';
import { v2 as cloudinary } from "cloudinary";

//dotenv.config();

cloudinary.config({
  //cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  cloud_name: "drziiij1z",
  //api_key: process.env.CLOUDINARY_API_KEY,
  api_key: "842514242192382",
  //api_secret: process.env.CLOUDINARY_API_SECRET,
  api_secret: "Jb3LqxWB7NNNq2puwktiH2wghik",
});  

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export async function generateAndUploadCertificate(userName, userId) {
  const certPath = path.join(__dirname, '../public/certificates/Certificate.pdf');
  const existingPdfBytes = await fs.readFile(certPath);

  const pdfDoc = await PDFDocument.load(existingPdfBytes);
  const pages = pdfDoc.getPages();
  const firstPage = pages[0];

  const { width, height } = firstPage.getSize();
  const font = await pdfDoc.embedFont(StandardFonts.HelveticaBold);

  firstPage.drawText(userName, {
    x: width / 2 - userName.length * 6,
    y: height / 2,
    size: 24,
    font,
    color: rgb(0, 0.5, 0),
  });

  const pdfBytes = await pdfDoc.save();

  // Save temporarily
  const tempFile = await tmp.file({ postfix: '.pdf' });
  await fs.writeFile(tempFile.path, pdfBytes);

  // Upload to Cloudinary
  const uploadResult = await cloudinary.uploader.upload(tempFile.path, {
    folder: 'certificates',
    public_id: `certificate_${userId}`,
    resource_type: 'raw', // important for non-image files
    use_filename: true,
    unique_filename: true,
  });

  //return uploadResult.secure_url;
  const certificateUrl = uploadResult.secure_url;
  //const certificateUrl = uploadResult.secure_url.replace('/upload/', '/upload/fl_attachment/');
  return certificateUrl;

  

  
  

}

