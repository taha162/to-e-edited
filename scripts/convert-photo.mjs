import fs from "node:fs/promises";
import path from "node:path";
import heicConvert from "heic-convert";
import sharp from "sharp";

const SRC = String.raw`C:\Users\totoj\Downloads\Telegram Desktop\IMG_8972.HEIC`;
const PUBLIC_DIR = path.resolve("public");
const OUT_JPG = path.join(PUBLIC_DIR, "portrait.jpg");
const OUT_WEBP = path.join(PUBLIC_DIR, "portrait.webp");

async function main() {
  await fs.mkdir(PUBLIC_DIR, { recursive: true });

  const buf = await fs.readFile(SRC);
  console.log(`Loaded HEIC (${buf.byteLength} bytes)`);

  const jpegBuf = await heicConvert({ buffer: buf, format: "JPEG", quality: 0.95 });
  console.log("HEIC → JPEG decoded");

  // Re-encode + resize via sharp for cinematic delivery
  const meta = await sharp(jpegBuf).metadata();
  console.log(`Source: ${meta.width} x ${meta.height}`);

  const longEdge = 1400;
  const ratio = (meta.width ?? 0) >= (meta.height ?? 0)
    ? longEdge / (meta.width ?? 1)
    : longEdge / (meta.height ?? 1);
  const w = Math.round((meta.width ?? 1) * ratio);
  const h = Math.round((meta.height ?? 1) * ratio);

  await sharp(jpegBuf)
    .rotate() // honor EXIF orientation
    .resize(w, h, { fit: "inside" })
    .jpeg({ quality: 88, mozjpeg: true })
    .toFile(OUT_JPG);
  console.log(`Saved ${OUT_JPG} (${w} x ${h})`);

  await sharp(jpegBuf)
    .rotate()
    .resize(w, h, { fit: "inside" })
    .webp({ quality: 84 })
    .toFile(OUT_WEBP);
  console.log(`Saved ${OUT_WEBP} (${w} x ${h})`);
}

main().catch((e) => {
  console.error("FAIL:", e);
  process.exit(1);
});
