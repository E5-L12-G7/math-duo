"""Assemble le parcours Analyse dans equilibre.html.

- Le contenu pédagogique (cours, flashcards) vient des fichiers analyse/*.md produits par
  l'agent analyste-cours ; on en retire les sections réservées aux développeurs
  (exercices générables, notes d'intégration, plan) avant de les embarquer.
- Les exercices (générateurs vérifiables) viennent de src/ana-gen.js.
- Le lecteur de Markdown et la création des cours viennent de src/ana-courses.js.

Le script est idempotent : on peut le relancer après chaque modification.
Usage : python build_ana.py
"""
import re, json, pathlib, sys, argparse

ROOT = pathlib.Path(__file__).parent
HTML = ROOT / 'equilibre.html'
DEV_SECTIONS = ('## Exercices générables', '## Notes pour l', '# Plan du parcours')

def clean_md(text):
    out, skip = [], False
    for line in text.splitlines():
        if line.startswith('# Chapitre'):
            skip = False
        elif line.startswith('#') and any(line.startswith(s) for s in DEV_SECTIONS):
            skip = True
            continue
        elif line.startswith('## ') and skip and not line.startswith(DEV_SECTIONS):
            skip = False
        if not skip:
            out.append(line)
    return '\n'.join(out).replace('</script', '<\\/script')

def region(s, name, content, anchor, before=True):
    """Insère ou remplace le bloc /*<ANA:name>*/ … /*</ANA:name>*/ à côté de l'ancre."""
    a, b = f'/*<ANA:{name}>*/', f'/*</ANA:{name}>*/'
    block = f'{a}\n{content}\n{b}'
    if a in s:
        return re.sub(re.escape(a) + r'.*?' + re.escape(b), lambda m: block, s, flags=re.S)
    assert s.count(anchor) == 1, f'ancre introuvable ou ambiguë : {anchor[:60]}'
    return s.replace(anchor, block + '\n' + anchor if before else anchor + '\n' + block)

TRACK_ORDER = ('tg', 'fs', 'sp', 'pr')

def load_json(fp):
    try:
        return json.loads(fp.read_text(encoding='utf-8'))
    except Exception as e:
        print(f'ATTENTION : {fp.name} ignoré ({e})', file=sys.stderr)
        return None

def track_files(only):
    out = []
    for t in TRACK_ORDER:
        if only and t not in only:
            continue
        out += sorted((ROOT / 'src').glob(f'tr-{t}*.js'))
    return out

def main():
    ap = argparse.ArgumentParser()
    ap.add_argument('--out', help='écrit le résultat ailleurs (tests) au lieu de equilibre.html')
    ap.add_argument('--only', help='parcours à inclure, ex. tg,fs (par défaut : tous)')
    args = ap.parse_args()
    only = set(args.only.split(',')) if args.only else None
    s = HTML.read_text(encoding='utf-8')
    # Les analyses de TD passent avant le cours complet : en cas de chapitre en double, la version TD (lue sur le texte original) l'emporte.
    files = sorted((ROOT / 'analyse').glob('*.md'), key=lambda f: (f.name.startswith('cours'), f.name))
    md = '\n\n'.join(clean_md(f.read_text(encoding='utf-8')) for f in files)
    tag_a, tag_b = '<script type="text/markdown" id="ana-src">', '</script><!--/ana-src-->'
    md_block = f'{tag_a}\n{md}\n{tag_b}'
    if tag_a in s:
        s = re.sub(re.escape(tag_a) + r'.*?' + re.escape(tag_b), lambda m: md_block, s, flags=re.S)
    else:
        anchor = '<script>\n/* ================= utilitaires'
        assert s.count(anchor) == 1
        s = s.replace(anchor, md_block + '\n' + anchor)
    gen_files = [ROOT / 'src/ana-gen.js'] + sorted((ROOT / 'src').glob('ana-gen-*.js')) + [ROOT / 'src/ana-units.js'] + track_files(only)
    gen = '\n'.join(f.read_text(encoding='utf-8') for f in gen_files)
    s = region(s, 'gen', gen, 'const UNITS=[\n')
    s = region(s, 'algchain', (ROOT / 'src/alg-chain.js').read_text(encoding='utf-8'), 'const UNITS=[\n')
    s = region(s, 'push', (ROOT / 'src/push.js').read_text(encoding='utf-8'), '/* Cinq parcours')
    s = region(s, 'courses', (ROOT / 'src/ana-courses.js').read_text(encoding='utf-8'), 'const COURSE={},CMAP={};')
    s = region(s, 'enrich', '\n'.join((ROOT / f).read_text(encoding='utf-8') for f in ('src/widgets.js', 'src/enrich.js')), 'const COURSE={},CMAP={};')
    for a, z, f in (('/*<ANALYSIS>*/', '/*</ANALYSIS>*/', 'src/analysis.js'), ('/*<ANCSS>*/', '/*</ANCSS>*/', 'src/analysis.css')):
        if a in s:
            s = s[:s.index(a)] + a + '\n' + (ROOT / f).read_text(encoding='utf-8') + '\n' + s[s.index(z):]
    s = region(s, 'calc', (ROOT / 'src/calc.js').read_text(encoding='utf-8'), "document.addEventListener('keydown',e=>{")
    s = region(s, 'draft', (ROOT / 'src/draft.js').read_text(encoding='utf-8'), '/* ---- Résultats ---- */')
    s = region(s, 'draftcss', (ROOT / 'src/draft.css').read_text(encoding='utf-8'), '.keys2{background:var(--soft)')
    peda = []
    for fp in sorted((ROOT / 'peda').glob('*.json')):
        d = load_json(fp)
        if d is not None:
            peda += d if isinstance(d, list) else [d]
    peda_js = 'const PEDA=' + json.dumps(peda, ensure_ascii=False).replace('</', '<\\/') + ';\n' + (ROOT / 'src/peda.js').read_text(encoding='utf-8')
    s = region(s, 'peda', peda_js, 'const COURSE={},CMAP={};')
    s = region(s, 'pedacss', (ROOT / 'src/peda.css').read_text(encoding='utf-8'), '.keys2{background:var(--soft)')
    s = region(s, 'srs', (ROOT / 'src/srs.js').read_text(encoding='utf-8'), '/* ---- Modèle de compétences ---- */')
    s = region(s, 'srscss', (ROOT / 'src/srs.css').read_text(encoding='utf-8'), '.keys2{background:var(--soft)')
    cards = {}
    for fp in sorted((ROOT / 'cards').glob('*.json')):
        d = load_json(fp)
        if isinstance(d, dict):
            cards.update(d)
    cards_js = 'const CARDS_SRC=' + json.dumps(cards, ensure_ascii=False).replace('</', '<' + chr(92) + '/') + ';' + chr(10) + (ROOT / 'src/cards.js').read_text(encoding='utf-8')
    s = region(s, 'cards', cards_js, 'const COURSE={},CMAP={};')
    s = region(s, 'chain', (ROOT / 'src/chain.js').read_text(encoding='utf-8'), '/* ---- Cours interactifs')
    s = region(s, 'chaincss', (ROOT / 'src/chain.css').read_text(encoding='utf-8'), '.keys2{background:var(--soft)')
    # petits ajustements une seule fois
    s = s.replace('ALLSK.forEach(k=>k.t=TIERS[k.id]||2);', 'ALLSK.forEach(k=>k.t=TIERS[k.id]||k.t||2);')
    s = s.replace("<li${j?' hidden':''}>${mx(m)}", "<li${j?' hidden':''}>${c.raw?m:mx(m)}")
    (pathlib.Path(args.out) if args.out else HTML).write_text(s, encoding='utf-8')
    print(f'{len(files)} fichier(s) d’analyse intégrés, {len(md)//1024} Ko de Markdown')

if __name__ == '__main__':
    main()
