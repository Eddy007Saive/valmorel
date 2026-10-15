// Loader webpack-compatible (utilisé via turbopack.rules) qui vide un module : sert à retirer
// `next/dist/build/polyfills/polyfill-module` du bundle client. Voir lib/empty-module.js et next.config.ts.
module.exports = function emptyLoader() {
  return "export {};";
};
