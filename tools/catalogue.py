"""Produit docs/catalogue-generateurs.md : la liste des générateurs d'exercices déjà écrits et testés."""
import re, pathlib
ROOT = pathlib.Path(__file__).parent.parent
src = (ROOT / 'tools/equilibre.backup-v13.html').read_text(encoding='utf-8')
a = src.index('  /* ---- Parcours Statistiques ---- */'); b = src.index('];\n/*<ANA:push>*/')
stat = src[a:b]
old = (ROOT / 'archive/ana-units.old.js').read_text(encoding='utf-8')
alg = src[src.index('const UNITS=['):a]
out = ['# Catalogue des générateurs existants (réutilisables tels quels)', '',
       'Chaque ligne : `générateur` — nom d’origine (niveau). Ces fonctions sont déjà définies et testées dans l’appli : '
       'on peut les réutiliser dans un nouveau chapitre avec `SKA(\'nouvel.id\',\'Nom\',gXxx,niveau)`. '
       'Les identifiants de compétence doivent être nouveaux et uniques. Ne réutilise pas les générateurs du parcours Algèbre 2 (il reste en place).', '']
UNIT = re.compile(r"\{id:'([^']+)'.*?name:'((?:[^'\\]|\\.)*)'.*?skills:\[(.*?)\]\}", re.S)
SKILL = re.compile(r"SK?A?\('([^']+)','((?:[^'\\]|\\.)*)',(g\w+)(?:,(\d))?\)")
def units(txt, label):
    out.append('## ' + label)
    for um in UNIT.finditer(txt):
        out.append(f"### {um.group(2)} (ancien chapitre {um.group(1)})")
        for sm in SKILL.finditer(um.group(3)):
            out.append(f"- `{sm.group(3)}` — {sm.group(2)}" + (f" (niveau {sm.group(4)})" if sm.group(4) else ''))
        out.append('')
units(stat, 'Ancien parcours Statistiques (générateurs définis dans equilibre.html)')
units(old, 'Ancien parcours Analyse (générateurs dans src/ana-gen*.js)')
units(alg, 'Parcours Algèbre 2 (toujours en place, pour information seulement)')
(ROOT / 'docs/catalogue-generateurs.md').write_text('\n'.join(out), encoding='utf-8')
print(sum(1 for l in out if l.startswith('- `')), 'générateurs')
