// gta6-meme-x-01 entry point (Node 22, standard library only).
//
// The entry is the X post itself: the house reads POST.json from this
// repository, looks the post up on X, and hands its first picture and text
// to the judge. All this program does is copy POST.json from its own
// directory into $MAKEFUN_OUTPUT_DIR (default /output), where the gate
// reads it. Nothing it writes is judged.
//
// Run it from anywhere; it finds POST.json next to this file, never via
// the working directory:
//   MAKEFUN_OUTPUT_DIR=out node main.ts
//
// POST.json here still holds a placeholder address; replace it with the
// real post URL after posting the meme, before submitting.

import { copyFileSync, mkdirSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const here = dirname(fileURLToPath(import.meta.url));
const outputDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
const source = join(here, "POST.json");
const target = join(outputDir, "POST.json");

mkdirSync(outputDir, { recursive: true });
try {
  copyFileSync(source, target);
} catch (err) {
  console.error(
    `could not copy ${source} to ${target}: ${(err as Error).message}`,
  );
  process.exit(1);
}
console.log(`POST.json -> ${target}`);
