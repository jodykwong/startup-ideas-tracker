import { renderers } from './renderers.mjs';
import { c as createExports } from './chunks/entrypoint_CwPJxodn.mjs';
import { manifest } from './manifest_DmscFOo2.mjs';

const _page0 = () => import('./pages/_image.astro.mjs');
const _page1 = () => import('./pages/api/ai/enhance.astro.mjs');
const _page2 = () => import('./pages/api/auth/signin.astro.mjs');
const _page3 = () => import('./pages/api/auth/signout.astro.mjs');
const _page4 = () => import('./pages/api/auth/signup.astro.mjs');
const _page5 = () => import('./pages/api/test/db.astro.mjs');
const _page6 = () => import('./pages/api/test/gemini.astro.mjs');
const _page7 = () => import('./pages/auth/callback.astro.mjs');
const _page8 = () => import('./pages/auth.astro.mjs');
const _page9 = () => import('./pages/dashboard.astro.mjs');
const _page10 = () => import('./pages/test-api.astro.mjs');
const _page11 = () => import('./pages/index.astro.mjs');

const pageMap = new Map([
    ["node_modules/astro/dist/assets/endpoint/generic.js", _page0],
    ["src/pages/api/ai/enhance.ts", _page1],
    ["src/pages/api/auth/signin.ts", _page2],
    ["src/pages/api/auth/signout.ts", _page3],
    ["src/pages/api/auth/signup.ts", _page4],
    ["src/pages/api/test/db.ts", _page5],
    ["src/pages/api/test/gemini.ts", _page6],
    ["src/pages/auth/callback.astro", _page7],
    ["src/pages/auth.astro", _page8],
    ["src/pages/dashboard.astro", _page9],
    ["src/pages/test-api.astro", _page10],
    ["src/pages/index.astro", _page11]
]);
const serverIslandMap = new Map();
const _manifest = Object.assign(manifest, {
    pageMap,
    serverIslandMap,
    renderers,
    middleware: () => import('./_noop-middleware.mjs')
});
const _args = {
    "middlewareSecret": "48378dc2-0884-48af-9058-06d40c39fa6b",
    "skewProtection": false
};
const _exports = createExports(_manifest, _args);
const __astrojsSsrVirtualEntry = _exports.default;

export { __astrojsSsrVirtualEntry as default, pageMap };
