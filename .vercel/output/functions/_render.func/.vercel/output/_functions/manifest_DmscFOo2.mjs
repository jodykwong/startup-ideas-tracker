import 'cookie';
import 'kleur/colors';
import { N as NOOP_MIDDLEWARE_FN } from './chunks/astro-designed-error-pages_DG3qrAFy.mjs';
import 'es-module-lexer';
import { g as decodeKey } from './chunks/astro/server_yeaJpcWl.mjs';
import 'clsx';

function sanitizeParams(params) {
  return Object.fromEntries(
    Object.entries(params).map(([key, value]) => {
      if (typeof value === "string") {
        return [key, value.normalize().replace(/#/g, "%23").replace(/\?/g, "%3F")];
      }
      return [key, value];
    })
  );
}
function getParameter(part, params) {
  if (part.spread) {
    return params[part.content.slice(3)] || "";
  }
  if (part.dynamic) {
    if (!params[part.content]) {
      throw new TypeError(`Missing parameter: ${part.content}`);
    }
    return params[part.content];
  }
  return part.content.normalize().replace(/\?/g, "%3F").replace(/#/g, "%23").replace(/%5B/g, "[").replace(/%5D/g, "]");
}
function getSegment(segment, params) {
  const segmentPath = segment.map((part) => getParameter(part, params)).join("");
  return segmentPath ? "/" + segmentPath : "";
}
function getRouteGenerator(segments, addTrailingSlash) {
  return (params) => {
    const sanitizedParams = sanitizeParams(params);
    let trailing = "";
    if (addTrailingSlash === "always" && segments.length) {
      trailing = "/";
    }
    const path = segments.map((segment) => getSegment(segment, sanitizedParams)).join("") + trailing;
    return path || "/";
  };
}

function deserializeRouteData(rawRouteData) {
  return {
    route: rawRouteData.route,
    type: rawRouteData.type,
    pattern: new RegExp(rawRouteData.pattern),
    params: rawRouteData.params,
    component: rawRouteData.component,
    generate: getRouteGenerator(rawRouteData.segments, rawRouteData._meta.trailingSlash),
    pathname: rawRouteData.pathname || void 0,
    segments: rawRouteData.segments,
    prerender: rawRouteData.prerender,
    redirect: rawRouteData.redirect,
    redirectRoute: rawRouteData.redirectRoute ? deserializeRouteData(rawRouteData.redirectRoute) : void 0,
    fallbackRoutes: rawRouteData.fallbackRoutes.map((fallback) => {
      return deserializeRouteData(fallback);
    }),
    isIndex: rawRouteData.isIndex
  };
}

function deserializeManifest(serializedManifest) {
  const routes = [];
  for (const serializedRoute of serializedManifest.routes) {
    routes.push({
      ...serializedRoute,
      routeData: deserializeRouteData(serializedRoute.routeData)
    });
    const route = serializedRoute;
    route.routeData = deserializeRouteData(serializedRoute.routeData);
  }
  const assets = new Set(serializedManifest.assets);
  const componentMetadata = new Map(serializedManifest.componentMetadata);
  const inlinedScripts = new Map(serializedManifest.inlinedScripts);
  const clientDirectives = new Map(serializedManifest.clientDirectives);
  const serverIslandNameMap = new Map(serializedManifest.serverIslandNameMap);
  const key = decodeKey(serializedManifest.key);
  return {
    // in case user middleware exists, this no-op middleware will be reassigned (see plugin-ssr.ts)
    middleware() {
      return { onRequest: NOOP_MIDDLEWARE_FN };
    },
    ...serializedManifest,
    assets,
    componentMetadata,
    inlinedScripts,
    clientDirectives,
    routes,
    serverIslandNameMap,
    key
  };
}

const manifest = deserializeManifest({"hrefRoot":"file:///Users/jodykwong/Documents/AI/StartUp-Ideas-Website/startup-ideas-tracker-astro/","adapterName":"@astrojs/vercel/serverless","routes":[{"file":"api/ai/enhance","links":[],"scripts":[],"styles":[],"routeData":{"route":"/api/ai/enhance","isIndex":false,"type":"endpoint","pattern":"^\\/api\\/ai\\/enhance\\/?$","segments":[[{"content":"api","dynamic":false,"spread":false}],[{"content":"ai","dynamic":false,"spread":false}],[{"content":"enhance","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/api/ai/enhance.ts","pathname":"/api/ai/enhance","prerender":true,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"api/auth/signin","links":[],"scripts":[],"styles":[],"routeData":{"route":"/api/auth/signin","isIndex":false,"type":"endpoint","pattern":"^\\/api\\/auth\\/signin\\/?$","segments":[[{"content":"api","dynamic":false,"spread":false}],[{"content":"auth","dynamic":false,"spread":false}],[{"content":"signin","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/api/auth/signin.ts","pathname":"/api/auth/signin","prerender":true,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"api/auth/signout","links":[],"scripts":[],"styles":[],"routeData":{"route":"/api/auth/signout","isIndex":false,"type":"endpoint","pattern":"^\\/api\\/auth\\/signout\\/?$","segments":[[{"content":"api","dynamic":false,"spread":false}],[{"content":"auth","dynamic":false,"spread":false}],[{"content":"signout","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/api/auth/signout.ts","pathname":"/api/auth/signout","prerender":true,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"api/auth/signup","links":[],"scripts":[],"styles":[],"routeData":{"route":"/api/auth/signup","isIndex":false,"type":"endpoint","pattern":"^\\/api\\/auth\\/signup\\/?$","segments":[[{"content":"api","dynamic":false,"spread":false}],[{"content":"auth","dynamic":false,"spread":false}],[{"content":"signup","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/api/auth/signup.ts","pathname":"/api/auth/signup","prerender":true,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"api/test/db","links":[],"scripts":[],"styles":[],"routeData":{"route":"/api/test/db","isIndex":false,"type":"endpoint","pattern":"^\\/api\\/test\\/db\\/?$","segments":[[{"content":"api","dynamic":false,"spread":false}],[{"content":"test","dynamic":false,"spread":false}],[{"content":"db","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/api/test/db.ts","pathname":"/api/test/db","prerender":true,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"api/test/gemini","links":[],"scripts":[],"styles":[],"routeData":{"route":"/api/test/gemini","isIndex":false,"type":"endpoint","pattern":"^\\/api\\/test\\/gemini\\/?$","segments":[[{"content":"api","dynamic":false,"spread":false}],[{"content":"test","dynamic":false,"spread":false}],[{"content":"gemini","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/api/test/gemini.ts","pathname":"/api/test/gemini","prerender":true,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"auth/callback/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/auth/callback","isIndex":false,"type":"page","pattern":"^\\/auth\\/callback\\/?$","segments":[[{"content":"auth","dynamic":false,"spread":false}],[{"content":"callback","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/auth/callback.astro","pathname":"/auth/callback","prerender":true,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"auth/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/auth","isIndex":false,"type":"page","pattern":"^\\/auth\\/?$","segments":[[{"content":"auth","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/auth.astro","pathname":"/auth","prerender":true,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"dashboard/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/dashboard","isIndex":false,"type":"page","pattern":"^\\/dashboard\\/?$","segments":[[{"content":"dashboard","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/dashboard.astro","pathname":"/dashboard","prerender":true,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"test-api/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/test-api","isIndex":false,"type":"page","pattern":"^\\/test-api\\/?$","segments":[[{"content":"test-api","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/test-api.astro","pathname":"/test-api","prerender":true,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/","isIndex":true,"type":"page","pattern":"^\\/$","segments":[],"params":[],"component":"src/pages/index.astro","pathname":"/","prerender":true,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_image","pattern":"^\\/_image$","segments":[[{"content":"_image","dynamic":false,"spread":false}]],"params":[],"component":"node_modules/astro/dist/assets/endpoint/generic.js","pathname":"/_image","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}}],"site":"https://startup-ideas-tracker.vercel.app","base":"/","trailingSlash":"ignore","compressHTML":true,"componentMetadata":[["/Users/jodykwong/Documents/AI/StartUp-Ideas-Website/startup-ideas-tracker-astro/src/pages/test-api.astro",{"propagation":"none","containsHead":true}],["/Users/jodykwong/Documents/AI/StartUp-Ideas-Website/startup-ideas-tracker-astro/src/pages/auth.astro",{"propagation":"none","containsHead":true}],["/Users/jodykwong/Documents/AI/StartUp-Ideas-Website/startup-ideas-tracker-astro/src/pages/auth/callback.astro",{"propagation":"none","containsHead":true}],["/Users/jodykwong/Documents/AI/StartUp-Ideas-Website/startup-ideas-tracker-astro/src/pages/dashboard.astro",{"propagation":"none","containsHead":true}],["/Users/jodykwong/Documents/AI/StartUp-Ideas-Website/startup-ideas-tracker-astro/src/pages/index.astro",{"propagation":"none","containsHead":true}]],"renderers":[],"clientDirectives":[["idle","(()=>{var l=(o,t)=>{let i=async()=>{await(await o())()},e=typeof t.value==\"object\"?t.value:void 0,s={timeout:e==null?void 0:e.timeout};\"requestIdleCallback\"in window?window.requestIdleCallback(i,s):setTimeout(i,s.timeout||200)};(self.Astro||(self.Astro={})).idle=l;window.dispatchEvent(new Event(\"astro:idle\"));})();"],["load","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).load=e;window.dispatchEvent(new Event(\"astro:load\"));})();"],["media","(()=>{var s=(i,t)=>{let a=async()=>{await(await i())()};if(t.value){let e=matchMedia(t.value);e.matches?a():e.addEventListener(\"change\",a,{once:!0})}};(self.Astro||(self.Astro={})).media=s;window.dispatchEvent(new Event(\"astro:media\"));})();"],["only","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).only=e;window.dispatchEvent(new Event(\"astro:only\"));})();"],["visible","(()=>{var l=(s,i,o)=>{let r=async()=>{await(await s())()},t=typeof i.value==\"object\"?i.value:void 0,c={rootMargin:t==null?void 0:t.rootMargin},n=new IntersectionObserver(e=>{for(let a of e)if(a.isIntersecting){n.disconnect(),r();break}},c);for(let e of o.children)n.observe(e)};(self.Astro||(self.Astro={})).visible=l;window.dispatchEvent(new Event(\"astro:visible\"));})();"]],"entryModules":{"\u0000@astrojs-ssr-adapter":"_@astrojs-ssr-adapter.mjs","\u0000noop-middleware":"_noop-middleware.mjs","\u0000@astrojs-ssr-virtual-entry":"entry.mjs","\u0000@astro-page:src/pages/api/ai/enhance@_@ts":"pages/api/ai/enhance.astro.mjs","\u0000@astro-page:src/pages/api/auth/signin@_@ts":"pages/api/auth/signin.astro.mjs","\u0000@astro-page:src/pages/api/auth/signout@_@ts":"pages/api/auth/signout.astro.mjs","\u0000@astro-page:src/pages/api/auth/signup@_@ts":"pages/api/auth/signup.astro.mjs","\u0000@astro-page:src/pages/api/test/db@_@ts":"pages/api/test/db.astro.mjs","\u0000@astro-page:src/pages/api/test/gemini@_@ts":"pages/api/test/gemini.astro.mjs","\u0000@astro-page:src/pages/auth/callback@_@astro":"pages/auth/callback.astro.mjs","\u0000@astro-page:src/pages/auth@_@astro":"pages/auth.astro.mjs","\u0000@astro-page:src/pages/dashboard@_@astro":"pages/dashboard.astro.mjs","\u0000@astro-page:src/pages/test-api@_@astro":"pages/test-api.astro.mjs","\u0000@astro-renderers":"renderers.mjs","\u0000@astro-page:src/pages/index@_@astro":"pages/index.astro.mjs","\u0000@astro-page:node_modules/astro/dist/assets/endpoint/generic@_@js":"pages/_image.astro.mjs","/Users/jodykwong/Documents/AI/StartUp-Ideas-Website/startup-ideas-tracker-astro/node_modules/astro/dist/env/setup.js":"chunks/astro/env-setup_Cr6XTFvb.mjs","\u0000@astrojs-manifest":"manifest_DmscFOo2.mjs","/astro/hoisted.js?q=4":"_astro/hoisted.l0sNRNKZ.js","/astro/hoisted.js?q=0":"_astro/hoisted.BWnk_QUC.js","/astro/hoisted.js?q=1":"_astro/hoisted.CXw9fTzB.js","/astro/hoisted.js?q=2":"_astro/hoisted.DTmeQ0Ue.js","/astro/hoisted.js?q=3":"_astro/hoisted.DdXVe7ox.js","@astrojs/react/client.js":"_astro/client.BRZKPEzt.js","astro:scripts/before-hydration.js":""},"inlinedScripts":[],"assets":["/_astro/auth.CsD5T60q.css","/_astro/Layout.astro_astro_type_script_index_1_lang.rL_5vgxQ.js","/_astro/client.BRZKPEzt.js","/_astro/hoisted.BWnk_QUC.js","/_astro/hoisted.CXw9fTzB.js","/_astro/hoisted.DTmeQ0Ue.js","/_astro/hoisted.DdXVe7ox.js","/api/ai/enhance","/api/auth/signin","/api/auth/signout","/api/auth/signup","/api/test/db","/api/test/gemini","/auth/callback/index.html","/auth/index.html","/dashboard/index.html","/test-api/index.html","/index.html"],"buildFormat":"directory","checkOrigin":false,"serverIslandNameMap":[],"key":"NHeDJpHzP3qv4xF2IK87tjoU3mR1MFE+0EDTAlJDREQ=","experimentalEnvGetSecretEnabled":false});

export { manifest };
