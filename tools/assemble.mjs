// Assemble le code de l'appli à partir de src/manifest.json (remplace build_ana.py).
// Le script reste un seul module : les fichiers sont concaténés dans l'ordre du manifeste,
// donc toute déclaration en double est une erreur de compilation (détectée au build).
import fs from 'node:fs';
import path from 'node:path';

const ROOT = path.resolve(path.dirname(new URL(import.meta.url).pathname.replace(/^\/([A-Za-z]:)/, '$1')), '..');
const read = (p) => fs.readFileSync(path.join(ROOT, p), 'utf8');
const list = (dir, re) => fs.readdirSync(path.join(ROOT, dir)).filter((f) => re.test(f)).sort().map((f) => `${dir}/${f}`);
const TRACKS = ['tg', 'fs', 'sp', 'pr', 'm1', 'm2', 's1'];
const DEV = ['## Exercices générables', '## Notes pour l', '# Plan du parcours'];

/** Retire des cours Markdown les sections réservées aux développeurs. */
export function cleanMd(text) {
  const out = [];
  let skip = false;
  for (const line of text.split(/\r?\n/)) {
    if (line.startsWith('# Chapitre')) skip = false;
    else if (line.startsWith('#') && DEV.some((d) => line.startsWith(d))) { skip = true; continue; }
    else if (line.startsWith('## ') && skip && !DEV.some((d) => line.startsWith(d))) skip = false;
    if (!skip) out.push(line);
  }
  return out.join('\n');
}

const json = (p) => {
  try { return JSON.parse(read(p)); } catch (e) { throw new Error(`JSON invalide : ${p} (${e.message})`); }
};
const genFiles = () => ['src/ana-gen.js', ...list('src', /^ana-gen-.*\.js$/), 'src/ana-units.js',
  ...TRACKS.flatMap((t) => list('src', new RegExp(`^tr-${t}.*\\.js$`)))];

/** Données de contenu, injectées comme constantes JS. */
export function data() {
  const md = list('analyse', /\.md$/).map((f) => cleanMd(read(f))).join('\n\n');
  const peda = list('peda', /\.json$/).flatMap((f) => { const d = json(f); return Array.isArray(d) ? d : [d]; });
  const cards = Object.assign({}, ...list('cards', /\.json$/).map(json));
  const graph = Object.fromEntries(list('graph', /\.json$/).map((f) => { const g = json(f); return [g.track || path.basename(f, '.json'), g]; }));
  const cours = (fs.existsSync(path.join(ROOT, 'cours')) ? list('cours', /\.json$/) : []).map(json);
  return { md, peda, cards, graph, cours };
}

/** Liste ordonnée des fichiers sources (pour le rechargement à chaud). */
export function sources() {
  const m = json('src/manifest.json');
  const js = m.js.flatMap((e) => (e === '@gen' ? genFiles() : e.startsWith('@') ? [] : [e]));
  return { css: m.css, js, content: [...list('analyse', /\.md$/), ...list('peda', /\.json$/), ...list('cards', /\.json$/), ...list('graph', /\.json$/), ...(fs.existsSync(path.join(ROOT, 'cours')) ? list('cours', /\.json$/) : [])] };
}

/** Le code complet de l'appli, dans l'ordre du manifeste. */
export function assembleJs() {
  const m = json('src/manifest.json'), d = data();
  const lit = (v) => JSON.stringify(v).replace(/</g, '\\u003c');
  const parts = [`const ANA_MD=${lit(d.md)};`];
  for (const e of m.js) {
    if (e === '@gen') parts.push(...genFiles().map((f) => `/* ${f} */\n${read(f)}`));
    else if (e === '@data:peda') parts.push(`const PEDA=${lit(d.peda)};`);
    else if (e === '@data:cards') parts.push(`const CARDS_SRC=${lit(d.cards)};`);
    else if (e === '@data:graph') parts.push(`const GRAPH_SRC=${lit(d.graph)};`);
    else if (e === '@data:cours') parts.push(`const COURS_SRC=${lit(d.cours)};`);
    else parts.push(`/* ${e} */\n${read(e)}`);
  }
  return parts.join('\n');
}

export function assembleCss() {
  return json('src/manifest.json').css.map((f) => read(f)).join('\n');
}

export { ROOT };
