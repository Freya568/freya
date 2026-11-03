import { deflateSync } from "node:zlib";
import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..", "public", "images", "photos");
mkdirSync(root, { recursive: true });

function crc32(buf) {
  let c = ~0;
  for (let i = 0; i < buf.length; i += 1) {
    c ^= buf[i];
    for (let k = 0; k < 8; k += 1) c = (c >>> 1) ^ (0xedb88320 & -(c & 1));
  }
  return ~c >>> 0;
}

function chunk(type, data) {
  const name = Buffer.from(type);
  const length = Buffer.alloc(4);
  length.writeUInt32BE(data.length);
  const body = Buffer.concat([name, data]);
  const crc = Buffer.alloc(4);
  crc.writeUInt32BE(crc32(body));
  return Buffer.concat([length, body, crc]);
}

function png(width, height, paint) {
  const stride = width * 3 + 1;
  const raw = Buffer.alloc(stride * height);
  for (let y = 0; y < height; y += 1) {
    const row = y * stride;
    raw[row] = 0;
    const ny = y / height;
    for (let x = 0; x < width; x += 1) {
      const tone = paint(x / width, ny);
      const i = row + 1 + x * 3;
      raw[i] = tone;
      raw[i + 1] = tone;
      raw[i + 2] = tone;
    }
  }
  const ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(width, 0);
  ihdr.writeUInt32BE(height, 4);
  ihdr[8] = 8;
  ihdr[9] = 2;
  const signature = Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]);
  const idat = deflateSync(raw, { level: 9 });
  return Buffer.concat([signature, chunk("IHDR", ihdr), chunk("IDAT", idat), chunk("IEND", Buffer.alloc(0))]);
}

const scenes = [
  (x, y) => 40 + x * 70 + Math.sin(y * 9) * 18,
  (x, y) => 210 - y * 80 + Math.cos(x * 8) * 16,
  (x, y) => 90 + Math.sin((x + y) * 6) * 40 + y * 30,
  (x, y) => 30 + (1 - y) * 140 + Math.sin(x * 18) * 8,
  (x, y) => 160 - Math.abs(x - 0.45) * 180 + Math.sin(y * 14) * 10,
  (x, y) => 70 + y * 40 + Math.cos((x - 0.2) * 10) * 22,
  (x, y) => 120 + Math.sin(x * 4) * 30 + Math.cos(y * 3) * 24,
  (x, y) => 50 + x * 40 + (y > 0.62 ? 70 : 0) + Math.sin(x * 30) * 4,
];

scenes.forEach((paint, index) => {
  const n = index + 1;
  const square = png(960, 960, (x, y) => clamp(paint(x, y)));
  const wide = png(1200, 800, (x, y) => clamp(paint(y, x) + 12));
  writeFileSync(join(root, `sample-${n}.png`), square);
  writeFileSync(join(root, `sample-${n}b.png`), wide);
  console.log(`sample-${n}`);
});

function clamp(value) {
  return Math.max(0, Math.min(255, Math.round(value)));
}

const pdfLines = [
  "Lin Wan",
  "Photographer / writer",
  "hello@example.com",
  "",
  "This PDF is a placeholder.",
  "Replace public/resume.pdf with your own file.",
  "",
  "2023-now  Independent photographer",
  "2021-2023  Visual editor",
  "2019-2021  Photography assistant",
];

const stream = pdfLines
  .map((line, index) => {
    const safe = line.replace(/[()\\]/g, "");
    return `BT /F1 12 Tf 64 ${760 - index * 22} Td (${safe}) Tj ET`;
  })
  .join("\n");

const objects = [
  "1 0 obj << /Type /Catalog /Pages 2 0 R >> endobj\n",
  "2 0 obj << /Type /Pages /Kids [3 0 R] /Count 1 >> endobj\n",
  "3 0 obj << /Type /Page /Parent 2 0 R /MediaBox [0 0 612 792] /Contents 4 0 R /Resources << /Font << /F1 5 0 R >> >> >> endobj\n",
  `4 0 obj << /Length ${Buffer.byteLength(stream)} >> stream\n${stream}\nendstream\nendobj\n`,
  "5 0 obj << /Type /Font /Subtype /Type1 /BaseFont /Helvetica >> endobj\n",
];

let pdf = "%PDF-1.4\n";
const offsets = [0];
for (const object of objects) {
  offsets.push(Buffer.byteLength(pdf));
  pdf += object;
}
const xref = Buffer.byteLength(pdf);
pdf += `xref\n0 6\n0000000000 65535 f \n`;
for (let i = 1; i <= 5; i += 1) {
  pdf += `${String(offsets[i]).padStart(10, "0")} 00000 n \n`;
}
pdf += `trailer << /Size 6 /Root 1 0 R >>\nstartxref\n${xref}\n%%EOF`;
writeFileSync(join(dirname(root), "..", "resume.pdf"), pdf);
console.log("resume.pdf");
