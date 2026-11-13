import { writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import path from "node:path";
import sharp from "sharp";

const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const publicFolder = path.join(projectRoot, "public");
const photosFolder = path.join(projectRoot, "src", "assets", "photos");
const INK = "#3a1d43";
const PAPER = "#f9f0f5";
const LILAC = "#cbb6ea";

const markShapes = `
  <rect x="20" y="2" width="16" height="16" rx="4" transform="rotate(45 28 10)"/>
  <rect x="34" y="16" width="16" height="16" rx="4" transform="rotate(45 42 24)" opacity=".55"/>
  <rect x="6" y="16" width="16" height="16" rx="4" transform="rotate(45 14 24)" opacity=".8"/>
  <rect x="20" y="30" width="16" height="16" rx="4" transform="rotate(45 28 38)" opacity=".35"/>`;

const iconSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">
  <rect width="64" height="64" rx="14" fill="${PAPER}"/>
  <g fill="${INK}" transform="translate(4 8)">${markShapes}</g>
</svg>`;

function wrapPngAsIco(png, size) {
  const header = Buffer.alloc(22);
  header.writeUInt16LE(0, 0);
  header.writeUInt16LE(1, 2);
  header.writeUInt16LE(1, 4);
  header.writeUInt8(size, 6);
  header.writeUInt8(size, 7);
  header.writeUInt8(0, 8);
  header.writeUInt8(0, 9);
  header.writeUInt16LE(1, 10);
  header.writeUInt16LE(32, 12);
  header.writeUInt32LE(png.length, 14);
  header.writeUInt32LE(22, 18);
  return Buffer.concat([header, png]);
}

async function writeIcons() {
  const ICO_SIZE = 48;
  const icoPng = await sharp(Buffer.from(iconSvg)).resize(ICO_SIZE, ICO_SIZE).png().toBuffer();
  await writeFile(path.join(publicFolder, "favicon.svg"), iconSvg);
  await writeFile(path.join(publicFolder, "favicon.ico"), wrapPngAsIco(icoPng, ICO_SIZE));
  await sharp(Buffer.from(iconSvg)).resize(180, 180).png().toFile(path.join(publicFolder, "apple-touch-icon.png"));
}

async function writeOpenGraphImage() {
  const WIDTH = 1200;
  const HEIGHT = 630;
  const PHOTO_SIZE = 470;
  const PHOTO_LEFT = 650;
  const PHOTO_TOP = 80;
  const backgroundSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="${WIDTH}" height="${HEIGHT}">
    <rect width="${WIDTH}" height="${HEIGHT}" fill="${PAPER}"/>
    <rect x="${PHOTO_LEFT - 24}" y="${PHOTO_TOP - 24}" width="${PHOTO_SIZE + 48}" height="${PHOTO_SIZE + 48}" rx="84" fill="${LILAC}" opacity=".45"/>
    <g fill="${INK}" transform="translate(80 205) scale(1.9)">${markShapes}</g>
    <text x="80" y="430" font-family="Helvetica Neue, Helvetica, Arial, sans-serif" font-size="150" font-weight="500" letter-spacing="-6" fill="${INK}">Aurea</text>
  </svg>`;
  const photoMask = Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="${PHOTO_SIZE}" height="${PHOTO_SIZE}"><rect width="${PHOTO_SIZE}" height="${PHOTO_SIZE}" rx="64"/></svg>`);
  const photo = await sharp(path.join(photosFolder, "ringa-1.webp"))
    .resize(PHOTO_SIZE, PHOTO_SIZE, { fit: "cover" })
    .composite([{ input: photoMask, blend: "dest-in" }])
    .png()
    .toBuffer();
  await sharp(Buffer.from(backgroundSvg))
    .composite([{ input: photo, left: PHOTO_LEFT, top: PHOTO_TOP }])
    .png()
    .toFile(path.join(publicFolder, "og.png"));
}

await writeIcons();
await writeOpenGraphImage();
console.log("favicon.svg, favicon.ico, apple-touch-icon.png, og.png");
