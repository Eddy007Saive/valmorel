// Module vide : remplace `next/dist/build/polyfills/polyfill-module` (Array.prototype.at/flat/flatMap,
// Object.fromEntries/hasOwn, trimStart/trimEnd, Promise.finally, Symbol.description), tous Baseline
// depuis Safari 15.4 (mars 2022) et déjà couverts par le browserslist du projet (safari >= 16.4).
// Lighthouse les signalait en « Ancien JavaScript » (17,7 Kio). Voir next.config.ts.
export {};
