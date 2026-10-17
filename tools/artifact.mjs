// Après le build : produit dist/equilibre.html, la version publiable sur claude.ai
// (la page de claude.ai fournit elle-même doctype, <html>, <head> et <body>).
import fs from 'node:fs';
const html = fs.readFileSync('dist/index.html', 'utf8');
const head = html.match(/<head>([\s\S]*?)<\/head>/)[1].trim();
const body = html.match(/<body>([\s\S]*?)<\/body>/)[1].trim();
fs.writeFileSync('dist/equilibre.html', `${head}\n${body}\n`);
console.log(`dist/equilibre.html : ${(fs.statSync('dist/equilibre.html').size / 1024 / 1024).toFixed(2)} Mo`);
