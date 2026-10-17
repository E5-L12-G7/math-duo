"""Migration unique : découpe equilibre.html en fichiers sources pour le projet Vite.

- Le CSS de base va dans src/styles/NN-*.css, le JS de base dans src/core/NN-*.js (découpé aux grands titres).
- Les régions déjà issues de fichiers (/*<ANA:…>*/) redeviennent des références à ces fichiers.
- src/manifest.json donne l'ordre exact d'assemblage (le script reste un seul module, comme aujourd'hui).
"""
import re, json, pathlib, unicodedata
ROOT = pathlib.Path(__file__).parent.parent
s = (ROOT / 'equilibre.html').read_text(encoding='utf-8')

REG_JS = {
    'gen': ['@gen'], 'algchain': ['src/alg-chain.js'], 'push': ['src/push.js'], 'srs': ['src/srs.js'],
    'ANALYSIS': ['src/analysis.js'], 'chain': ['src/chain.js'], 'courses': ['src/ana-courses.js'],
    'enrich': ['src/widgets.js', 'src/enrich.js'], 'peda': ['@data:peda', 'src/peda.js'],
    'cards': ['@data:cards', 'src/cards.js'], 'calc': ['src/calc.js'], 'draft': ['src/draft.js']}
REG_CSS = {'ANCSS': 'src/analysis.css', 'draftcss': 'src/draft.css', 'pedacss': 'src/peda.css', 'srscss': 'src/srs.css', 'chaincss': 'src/chain.css'}
MARK = re.compile(r'^/\*<(?:ANA:)?([A-Za-z]+)>\*/$')
END = re.compile(r'^/\*</(?:ANA:)?([A-Za-z]+)>\*/$')

def slug(t):
    t = unicodedata.normalize('NFKD', t).encode('ascii', 'ignore').decode().lower()
    t = re.sub(r'[^a-z0-9]+', '-', t).strip('-')
    return '-'.join(t.split('-')[:4]) or 'code'

def walk(text, regmap, kind):
    """Renvoie la liste d'entrées : ('base', lignes) ou ('ref', nom de région)."""
    out, buf, skip = [], [], None
    for line in text.split('\n'):
        st = line.strip()
        if skip:
            if END.match(st) and END.match(st).group(1) == skip:
                skip = None
            continue
        m = MARK.match(st)
        if m and m.group(1) in regmap:
            if buf: out.append(('base', buf)); buf = []
            out.append(('ref', m.group(1))); skip = m.group(1); continue
        buf.append(line)
    if buf: out.append(('base', buf))
    return out

HEAD = re.compile(r'^/\* ?(?:=+|-{2,}) ?(.+?) ?(?:=+|-{2,})? ?(?:\*/)?$')
def chunks(lines, min_lines):
    """Découpe un bloc de base aux grands titres de section (/* ==== … */ ou /* ---- … */)."""
    parts, cur, title = [], [], None
    for line in lines:
        m = HEAD.match(line.strip()) if line.startswith('/*') else None
        if m and len(cur) >= min_lines:
            parts.append((title, cur)); cur, title = [], None
        if m and title is None:
            title = m.group(1).split(':')[0].split('(')[0].strip(' =-*/')
        cur.append(line)
    if cur: parts.append((title, cur))
    return parts

manifest = {'css': [], 'js': []}
# --- CSS ---
a = s.index('<style>') + len('<style>'); b = s.index('</style>')
n = 0
for kind, val in walk(s[a:b].strip('\n'), REG_CSS, 'css'):
    if kind == 'ref':
        manifest['css'].append(REG_CSS[val]); continue
    for title, lines in chunks(val, 60):
        if not ''.join(lines).strip(): continue
        n += 1; fp = f'src/styles/{n:02d}-{slug(title or "base")}.css'
        (ROOT / fp).parent.mkdir(parents=True, exist_ok=True)
        (ROOT / fp).write_text('\n'.join(lines).strip('\n') + '\n', encoding='utf-8')
        manifest['css'].append(fp)
# --- JS ---
a = s.index('<script>\n') + len('<script>\n'); b = s.rindex('</script>')
n = 0
for kind, val in walk(s[a:b], REG_JS, 'js'):
    if kind == 'ref':
        manifest['js'] += REG_JS[val]; continue
    for title, lines in chunks(val, 120):
        if not ''.join(lines).strip(): continue
        n += 1; fp = f'src/core/{n:02d}-{slug(title or "code")}.js'
        (ROOT / fp).parent.mkdir(parents=True, exist_ok=True)
        (ROOT / fp).write_text('\n'.join(lines).strip('\n') + '\n', encoding='utf-8')
        manifest['js'].append(fp)
(ROOT / 'src/manifest.json').write_text(json.dumps(manifest, ensure_ascii=False, indent=1), encoding='utf-8')
# --- coquille HTML (hors style et scripts) ---
head = s[:s.index('<style>')].strip()
body = s[s.index('</style>') + len('</style>'):s.index('<script type="text/markdown"')].strip()
(ROOT / 'index.html').write_text(f'<!doctype html>\n<html lang="fr">\n<head>\n{head}\n</head>\n<body>\n{body}\n<script type="module" src="/src/main.ts"></script>\n</body>\n</html>\n', encoding='utf-8')
print(len(manifest['css']), 'fichiers CSS,', len(manifest['js']), 'entrées JS')
