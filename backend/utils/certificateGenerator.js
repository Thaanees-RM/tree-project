import { fileURLToPath } from 'url';
import fs from 'fs/promises';
import path from 'path';
import { PDFDocument, StandardFonts, rgb } from 'pdf-lib';

// Fix for __dirname in ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export async function generateNamedCertificate(userName) {
  const certPath = path.join(__dirname, '../public/certificates/Certificate.pdf');
  const existingPdfBytes = await fs.readFile(certPath);

  const pdfDoc = await PDFDocument.load(existingPdfBytes);
  const pages = pdfDoc.getPages();
  const firstPage = pages[0];

  const { width, height } = firstPage.getSize();

  const font = await pdfDoc.embedFont(StandardFonts.HelveticaBold);

  // Draw user name
  firstPage.drawText(userName, {
    x: width / 2 - userName.length * 6, // Center text roughly
    y: height / 2,
    size: 24,
    font,
    color: rgb(0, 0.5, 0),
  });

  const pdfBytes = await pdfDoc.save();
  return pdfBytes;
}
