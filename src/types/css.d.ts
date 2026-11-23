// Next.js 14 hanya mendeklarasikan *.module.css; CSS global seperti ./globals.css
// butuh deklarasi sendiri agar TypeScript tidak menandainya sebagai modul hilang.
declare module "*.css";
