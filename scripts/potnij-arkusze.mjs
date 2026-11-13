import { mkdir } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import path from "node:path";
import sharp from "sharp";

const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const sheetsFolder = path.join(projectRoot, "zrodla", "arkusze");
const photosFolder = path.join(projectRoot, "src", "assets", "photos");
const GUTTER_INSET = 8;

const sheets = {
  pre: { xs: [[0, 673], [687, 1360]], ys: [[0, 1015], [1029, 2048]] },
  ringa: { xs: [[0, 1014], [1034, 2048]], ys: [[0, 1016], [1032, 2048]] },
  ringb: { xs: [[0, 1016], [1032, 2048]], ys: [[0, 1014], [1030, 2048]] },
  studio: { xs: [[0, 676], [685, 1360]], ys: [[0, 1019], [1029, 2048]] },
  life: { xs: [[0, 672], [688, 1360]], ys: [[0, 1016], [1032, 2048]] },
  base: { xs: [[0, 674], [687, 1361], [1374, 2048]], ys: [[0, 673], [684, 1360]] },
  styled: { xs: [[0, 677], [685, 1365], [1373, 2048]], ys: [[0, 676], [684, 1360]] },
  styled2: { xs: [[0, 1017], [1031, 2048]], ys: [[0, 1017], [1031, 2048]] },
  prod: { xs: [[0, 2048]], ys: [[0, 1360]] }
};

await mkdir(photosFolder, { recursive: true });

for (const [sheetName, grid] of Object.entries(sheets)) {
  const sheetFile = path.join(sheetsFolder, `${sheetName}.png`);
  let cellIndex = 0;
  for (const [yStart, yEnd] of grid.ys) {
    for (const [xStart, xEnd] of grid.xs) {
      const region = {
        left: xStart + GUTTER_INSET,
        top: yStart + GUTTER_INSET,
        width: xEnd - xStart - GUTTER_INSET * 2,
        height: yEnd - yStart - GUTTER_INSET * 2
      };
      const photoFile = path.join(photosFolder, `${sheetName}-${cellIndex}.webp`);
      await sharp(sheetFile).extract(region).webp({ quality: 92 }).toFile(photoFile);
      console.log(`${sheetName}-${cellIndex}.webp ${region.width}x${region.height}`);
      cellIndex += 1;
    }
  }
}
