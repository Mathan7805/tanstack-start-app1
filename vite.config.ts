/*
// @lovable.dev/vite-tanstack-config already includes the following — do NOT add them manually
// or the app will break with duplicate plugins:
//   - tanstackStart, viteReact, tailwindcss, tsConfigPaths, cloudflare (build-only),
//     componentTagger (dev-only), VITE_* env injection, @ path alias, React/TanStack dedupe,
//     error logger plugins, and sandbox detection (port/host/strictPort).
// You can pass additional config via defineConfig({ vite: { ... } }) if needed.
import { defineConfig } from "@lovable.dev/vite-tanstack-config";

// Redirect TanStack Start's bundled server entry to src/server.ts (our SSR error wrapper).
// @cloudflare/vite-plugin builds from this — wrangler.jsonc main alone is insufficient.
export default defineConfig({
  tanstackStart: {
    server: { entry: "server" },
  },
});
*/

// vite.config.ts
import { defineConfig } from 'vite'
import { tanstackStart } from '@tanstack/start/vite'

export default defineConfig({
  plugins: [
    tanstackStart(),
    {
      name: 'fix-tanstack-virtual-modules',
      resolveId(source) {
        const virtualIds = [
          'tanstack-start-route-tree:v',
          'tanstack-start-manifest:v',
          'tanstack-start-server-fn-manifest:v',
          'tanstack-start-injected-head-scripts:v'
        ]
        if (virtualIds.includes(source)) {
          return { id: source, external: true }
        }
        return null
      }
    }
  ]
})
