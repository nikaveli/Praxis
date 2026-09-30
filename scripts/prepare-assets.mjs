import sharp from 'sharp';
import { mkdir, copyFile, writeFile } from 'node:fs/promises';
import { execFileSync } from 'node:child_process';
const source = 'Assets/PRAXIS';
const out = 'public/media';
await mkdir(out, { recursive: true });
const icloud = 'iCloud Photos from Praxis Jiu Jitsu Academy LLC';
const assets = {
  community: 'DSC00453-scaled.jpg', mission: 'DSC00397-scaled.jpg',
  adults: 'DSC00444-scaled.jpg', kids: 'DSC00378-scaled.jpg', women: 'DSC00465-scaled.jpg',
  darien: 'DSC06098-scaled.webp', nikki: 'DSC06066-scaled.webp',
  technique: 'DSC00243 (1).jpg',
  owners: 'Praxis-owners-2.webp',
  academy: 'Praxis_Jiu_Jitsu_Academy_interior-18.jpg',
  platform: 'Praxis_Jiu_Jitsu_Academy_interior-21.jpg',
  academyGroup: `${icloud}/IMG_1317.jpg`,
  praxisGi: 'DSC09667.jpg',
  adultPractice: 'DSC09658.jpg',
  kidsCoaching: 'DSC00407-scaled.jpg',
  womensPractice: 'DSC00280 (1).jpg',
  giRack: 'Praxis_Jiu_Jitsu_Academy_interior-8.jpg',
  kidsDrilling: `${icloud}/IMG_1488.jpg`,
  academyPractice: `${icloud}/IMG_7937.jpg`,
  trainingSpace: 'Praxis_Jiu_Jitsu_Academy_interior-20.jpg',
  classInstruction: `${icloud}/praxisjul26b.jpg`,
  fundamentals: `${icloud}/IMG_1552.jpg`,
  kidsPractice: `${icloud}/IMG_1407.jpg`,
  classGathering: `${icloud}/IMG_1323.jpg`,
  entrance: 'Praxis_Jiu_Jitsu_Academy_interior-16.jpg',
  visitorSeating: 'Praxis_Jiu_Jitsu_Academy_interior-12.jpg',
};
const manifest = {};
for (const [name, file] of Object.entries(assets)) {
  const meta = await sharp(`${source}/${file}`).metadata();
  manifest[name] = { source: file, width: meta.width, height: meta.height, derivatives: [] };
  for (const width of [640, 1280, 1920]) {
    const output = `${name}-${width}.webp`;
    const info = await sharp(`${source}/${file}`).rotate().resize({ width, withoutEnlargement: true }).webp({ quality: 82 }).toFile(`${out}/${output}`);
    manifest[name].derivatives.push({ file: output, width: info.width, height: info.height, bytes: info.size });
  }
}
await sharp(`${source}/praxisGroup-scaled.jpg`).resize(1200,630,{fit:"cover",position:"centre"}).webp({quality:85}).toFile(`${out}/social.webp`);
// Preserve the original logo pixels; crop only its surrounding blank margins.
const logo = `${source}/IMG_1067-scaled.webp`;
await sharp(logo).trim({ background: '#E9E8E3', threshold: 20 }).resize({ width: 1000 }).webp({ quality: 95 }).toFile(`${out}/logo.webp`);
const logoMeta = await sharp(`${out}/logo.webp`).metadata();
manifest.logo = { source: 'IMG_1067-scaled.webp', width: logoMeta.width, height: logoMeta.height };
await sharp(logo).trim({ background: '#E9E8E3', threshold: 20 }).extract({ left: 0, top: 0, width: 510, height: 560 }).resize(128,128,{fit:'contain',background:'#E9E8E3'}).png().toFile(`${out}/favicon.png`);
await copyFile(`${source}/praxisHero-Video (1).mp4`, `${out}/hero.mp4`);
const poster = execFileSync('ffmpeg', ['-v','error','-ss','2','-i',`${out}/hero.mp4`,'-frames:v','1','-vf','scale=1920:-2','-f','image2pipe','-c:v','png','-'], { maxBuffer: 20 * 1024 * 1024 });
await sharp(poster).webp({quality:85}).toFile(`${out}/hero-poster.webp`);
execFileSync('ffmpeg', ['-y','-v','error','-i',`${out}/hero.mp4`,'-an','-vf','scale=960:-2','-c:v','libx264','-crf','25','-preset','fast','-movflags','+faststart',`${out}/hero-mobile.mp4`]);
await writeFile(`${out}/manifest.json`, JSON.stringify(manifest,null,2));
console.log(`Prepared ${Object.keys(assets).length} responsive photo sets, logo, favicon and hero media.`);
