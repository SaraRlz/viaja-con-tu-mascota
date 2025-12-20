const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const inputDir = path.join(__dirname, '../assets/images');
const outputDir = path.join(__dirname, '../assets/images-optimization');
const tableFile = path.join(__dirname, '../assets/resultados-optimizacion.txt');

if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

let table =
  'Nombre\tFormato Original\tFormato Nuevo\tPeso Original (KB)\tPeso Optimizado (KB)\tReducción (%)\n';

if (!fs.existsSync(inputDir)) {
  console.error('La carpeta de imágenes no existe:', inputDir);
  process.exit(1);
}

fs.readdirSync(inputDir).forEach(file => {
  const inputPath = path.join(inputDir, file);
  const ext = path.extname(file).toLowerCase();
  const baseName = path.basename(file, ext);

  const statsOriginal = fs.statSync(inputPath);
  const sizeOriginal = statsOriginal.size / 1024;

  if (sizeOriginal < 100) {
    const outputPath = path.join(outputDir, file);
    fs.copyFileSync(inputPath, outputPath);

    table += `${file}\t${ext.slice(1)}\t${ext.slice(1)}\t${sizeOriginal.toFixed(
      2
    )}\t${sizeOriginal.toFixed(2)}\t0\n`;

    console.log(`${file} no se convierte (imagen demasiado pequeña)`);
    fs.writeFileSync(tableFile, table);
    return;
  }

  const outputPath = path.join(outputDir, baseName + '.webp');

  sharp(inputPath)
    .resize({ width: 1200 })
    .webp({ quality: 80 })
    .toFile(outputPath)
    .then(() => {
      const statsOptimized = fs.statSync(outputPath);
      const sizeOptimized = statsOptimized.size / 1024;
      const reduction = (
        ((sizeOriginal - sizeOptimized) / sizeOriginal) *
        100
      ).toFixed(2);

      table += `${file}\t${ext.slice(1)}\twebp\t${sizeOriginal.toFixed(
        2
      )}\t${sizeOptimized.toFixed(2)}\t${reduction}\n`;

      fs.writeFileSync(tableFile, table);

      console.log(
        `${file} optimizada: ${sizeOriginal.toFixed(
          2
        )}KB → ${sizeOptimized.toFixed(2)}KB (${reduction}%)`
      );
    })
    .catch(err => console.error(`Error con ${file}:`, err));
});
