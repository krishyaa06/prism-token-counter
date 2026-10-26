/* Prism Token Counter · core logic (heuristic BPE-style estimator) */
(function (root, factory) {
  const api = factory();
  if (typeof module === "object" && module.exports) module.exports = api;
  else root.Core = api;
})(typeof self !== "undefined" ? self : this, function () {
  // GPT-style pre-tokenizer: contractions, words (with leading space), numbers (1-3 digits), punctuation runs, whitespace
  const PRE = /'(?:[sdmt]|ll|ve|re)| ?\p{L}+| ?\p{N}{1,3}| ?[^\s\p{L}\p{N}]+|\s+(?!\S)|\s+/gu;
  const COMMON = new Set("the of and to in is that for it as with was on be at by this are or from an which have not but you all can if will one has more their do about when there your use what so new also get make like just function return const let var import export class def self true false null none".split(" "));
  function pieces(text) { return String(text).match(PRE) || []; }
  function chunkTokens(p) {
    const w = p.trim();
    if (!w) return p.length > 1 && p.includes("\n") ? Math.ceil(p.length / 4) : 1;
    if (/^\p{N}+$/u.test(w)) return 1;
    if (/^[^\s\p{L}\p{N}]+$/u.test(w)) return Math.ceil(w.length / 2);
    if (/[^\x00-\x7F]/.test(w)) { const cjk = (w.match(/[\u3040-\u30ff\u3400-\u9fff\uac00-\ud7af]/g) || []).length; return Math.max(1, cjk + Math.ceil((w.length - cjk) / 2.5)); }
    if (COMMON.has(w.toLowerCase()) || w.length <= 7) return 1;
    // split camelCase/snake parts, each part ~ 1 token per ~4.5 chars
    return w.split(/(?<=[a-z])(?=[A-Z])|_/).reduce((n, part) => n + (part.length <= 7 ? 1 : Math.ceil(part.length / 5)), 0);
  }
  function count(text) {
    const ps = pieces(text);
    return ps.reduce((n, p) => n + chunkTokens(p), 0);
  }
  function stats(text) {
    const t = String(text);
    return { chars: t.length, words: (t.match(/\S+/g) || []).length, lines: t ? t.split("\n").length : 0, tokens: count(t), bytes: new TextEncoder().encode(t).length };
  }
  function segments(text, max = 4000) {
    const out = []; let acc = "";
    for (const p of pieces(text)) { if (acc.length > max) break; out.push({ text: p, n: chunkTokens(p) }); acc += p; }
    return out;
  }
  const MODELS = [
    { id: "gpt-4o", name: "GPT-4o", ctx: 128000, in: 2.5, out: 10 },
    { id: "gpt-4o-mini", name: "GPT-4o mini", ctx: 128000, in: 0.15, out: 0.6 },
    { id: "claude-sonnet", name: "Claude Sonnet", ctx: 200000, in: 3, out: 15 },
    { id: "claude-haiku", name: "Claude Haiku", ctx: 200000, in: 0.8, out: 4 },
    { id: "gemini-flash", name: "Gemini Flash", ctx: 1000000, in: 0.1, out: 0.4 },
    { id: "llama-70b", name: "Llama 3.3 70B (Groq)", ctx: 128000, in: 0.59, out: 0.79 },
  ];
  function cost(tokensIn, tokensOut, model) { return (tokensIn * model.in + tokensOut * model.out) / 1e6; }
  function fmtCost(usd) { return usd === 0 ? "$0" : usd < 0.01 ? `$${usd.toFixed(5)}` : `$${usd.toFixed(usd < 1 ? 4 : 2)}`; }
  return { count, stats, pieces, segments, chunkTokens, MODELS, cost, fmtCost };
});
