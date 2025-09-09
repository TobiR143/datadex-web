import { renderers } from './renderers.mjs';
import { s as serverEntrypointModule } from './chunks/_@astrojs-ssr-adapter_CvSoi7hX.mjs';
import { manifest } from './manifest_wcarfM8N.mjs';
import { createExports } from '@astrojs/netlify/ssr-function.js';

const serverIslandMap = new Map();;

const _page0 = () => import('./pages/_image.astro.mjs');
const _page1 = () => import('./pages/egg-group/_name_.astro.mjs');
const _page2 = () => import('./pages/location/_id_/_versiongroup_.astro.mjs');
const _page3 = () => import('./pages/move/_id_/pokemons.astro.mjs');
const _page4 = () => import('./pages/pokemon/_id_.astro.mjs');
const _page5 = () => import('./pages/index.astro.mjs');
const pageMap = new Map([
    ["node_modules/.pnpm/astro@5.12.3_@netlify+blobs@10.0.10_@types+node@24.1.0_jiti@2.5.1_rollup@4.45.1_typescript@5.8.3_yaml@2.8.1/node_modules/astro/dist/assets/endpoint/generic.js", _page0],
    ["src/pages/egg-group/[name].astro", _page1],
    ["src/pages/location/[id]/[versionGroup].astro", _page2],
    ["src/pages/move/[id]/pokemons.astro", _page3],
    ["src/pages/pokemon/[id].astro", _page4],
    ["src/pages/index.astro", _page5]
]);

const _manifest = Object.assign(manifest, {
    pageMap,
    serverIslandMap,
    renderers,
    actions: () => import('./_noop-actions.mjs'),
    middleware: () => import('./_noop-middleware.mjs')
});
const _args = {
    "middlewareSecret": "7ffcb28f-eb59-4457-a7ed-fef0ccddb3ff"
};
const _exports = createExports(_manifest, _args);
const __astrojsSsrVirtualEntry = _exports.default;
const _start = 'start';
if (_start in serverEntrypointModule) {
	serverEntrypointModule[_start](_manifest, _args);
}

export { __astrojsSsrVirtualEntry as default, pageMap };
