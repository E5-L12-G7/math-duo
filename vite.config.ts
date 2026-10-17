import { defineConfig, type Plugin } from 'vite';
import { viteSingleFile } from 'vite-plugin-singlefile';
import path from 'node:path';
// @ts-ignore : module JS sans déclarations de types
import { assembleJs, assembleCss, sources, ROOT } from './tools/assemble.mjs';

/** Assemble l'appli (code, styles, contenu) en modules virtuels, et recharge la page quand une source change. */
function equilibre(): Plugin {
  const JS = 'virtual:equilibre', CSS = 'virtual:equilibre.css';
  return {
    name: 'equilibre',
    resolveId: (id) => (id === JS || id === CSS ? '\0' + id : null),
    load(id) {
      if (id === '\0' + JS) return assembleJs();
      if (id === '\0' + CSS) return assembleCss();
      return null;
    },
    configureServer(server) {
      const s = sources();
      const files = [...s.css, ...s.js, ...s.content, 'src/manifest.json'].map((f: string) => path.join(ROOT, f));
      server.watcher.add(files);
      server.watcher.on('change', (f) => {
        if (files.includes(path.normalize(f))) {
          for (const id of ['\0' + JS, '\0' + CSS]) {
            const m = server.moduleGraph.getModuleById(id);
            if (m) server.moduleGraph.invalidateModule(m);
          }
          server.ws.send({ type: 'full-reload' });
        }
      });
    },
  };
}

export default defineConfig({
  plugins: [equilibre(), viteSingleFile()],
  build: { target: 'es2022', minify: false, cssMinify: false, reportCompressedSize: false, modulePreload: { polyfill: false },
    rollupOptions: { treeshake: false } },
  server: { port: 8766 },
});
