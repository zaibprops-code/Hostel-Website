// One-off generator: rasterizes the Riwaq arch mark to a multi-resolution
// favicon.ico (16/32/48) so the site root serves a raster favicon that
// Google's favicon crawler reliably picks up. Run: node scripts/gen-favicon.mjs
import React from "react";
import { ImageResponse } from "next/og.js";
import { writeFileSync } from "node:fs";

const arch = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40"><path fill="#d7ba70" fill-rule="evenodd" d="M7 33V18a13 13 0 0 1 26 0V33H27V18a7 7 0 0 0-14 0V33Z"/><rect x="6" y="31.4" width="28" height="3.4" rx="1.7" fill="#d7ba70"/></svg>`;
const archSrc = `data:image/svg+xml;utf8,${encodeURIComponent(arch)}`;

async function renderPng(size) {
  const inner = Math.round(size * 0.82);
  const el = React.createElement(
    "div",
    {
      style: {
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "#163a30",
      },
    },
    React.createElement("img", { width: inner, height: inner, src: archSrc }),
  );
  const res = new ImageResponse(el, { width: size, height: size });
  return Buffer.from(await res.arrayBuffer());
}

function buildIco(images) {
  const count = images.length;
  const header = Buffer.alloc(6);
  header.writeUInt16LE(0, 0);
  header.writeUInt16LE(1, 2); // type: icon
  header.writeUInt16LE(count, 4);

  let offset = 6 + count * 16;
  const entries = [];
  const datas = [];
  for (const { size, buf } of images) {
    const e = Buffer.alloc(16);
    e.writeUInt8(size >= 256 ? 0 : size, 0); // width
    e.writeUInt8(size >= 256 ? 0 : size, 1); // height
    e.writeUInt8(0, 2); // palette
    e.writeUInt8(0, 3); // reserved
    e.writeUInt16LE(1, 4); // color planes
    e.writeUInt16LE(32, 6); // bits per pixel
    e.writeUInt32LE(buf.length, 8); // size of data
    e.writeUInt32LE(offset, 12); // offset of data
    entries.push(e);
    datas.push(buf);
    offset += buf.length;
  }
  return Buffer.concat([header, ...entries, ...datas]);
}

const sizes = [48, 32, 16];
const images = [];
for (const size of sizes) {
  images.push({ size, buf: await renderPng(size) });
}
const ico = buildIco(images);
writeFileSync(new URL("../src/app/favicon.ico", import.meta.url), ico);
console.log(
  "Wrote src/app/favicon.ico:",
  ico.length,
  "bytes ·",
  sizes.map((s) => `${s}x${s}`).join(", "),
);
