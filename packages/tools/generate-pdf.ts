import fs from "fs";
import { mkdir, stat } from "node:fs/promises";
import path from "node:path";

import PDFDocument from "pdfkit";

async function folderExists(folderPath: string) {
  try {
    const stats = await stat(folderPath);
    return stats.isDirectory();
  } catch {
    return false;
  }
}

async function createMassivePdf({ pages = 10, sizePerPageMB = 5 }) {
  const generatedFolderPath = path.resolve(import.meta.dirname, "./generated");
  if (!folderExists(generatedFolderPath)) {
    await mkdir(generatedFolderPath);
  }
  const output = path.resolve(
    import.meta.dirname,
    `./generated/pdf_${new Date().getTime()}.pdf`
  );

  const doc = new PDFDocument({ autoFirstPage: false });
  const stream = fs.createWriteStream(output);
  doc.pipe(stream);

  const fakeData = "X".repeat(sizePerPageMB * 1024 * 1024); // ~5MB of junk per page

  for (let i = 0; i < pages; i++) {
    doc.addPage({ size: "LETTER" });
    doc.fontSize(12).text(`Page ${i + 1}`, 50, 50);

    // Add the large payload (invisible junk text to bloat size)
    doc.text(fakeData, 0, 100, {
      lineBreak: false,
      paragraphGap: 0,
      ellipsis: false,
    });

    console.log(`✅ Wrote page ${i + 1}`);
  }

  doc.end();

  stream.on("finish", () => {
    const stats = fs.statSync(output);
    console.log(
      `✅ Finished PDF: ${output} (${(stats.size / 1024 / 1024).toFixed(2)} MB)`
    );
  });
}

createMassivePdf({
  pages: 20,
  sizePerPageMB: 5, // ~100MB total
});
