const test = require("node:test");
const assert = require("node:assert/strict");
const C = require("../js/core.js");
test("pre-tokenizer keeps leading spaces on words", () => {
  assert.deepEqual(C.pieces("Hello world, it's 2026!"), ["Hello", " world", ",", " it", "'s", " 202", "6", "!"]);
});
test("count is in a sane range vs chars/4 heuristic", () => {
  const en = "The quick brown fox jumps over the lazy dog. ".repeat(20);
  const n = C.count(en);
  assert.ok(n >= 190 && n <= 230, `got ${n}`); // ~10 tokens per sentence
  const code = "export function addNumbers(firstValue, secondValue) { return firstValue + secondValue; }";
  const c = C.count(code); assert.ok(c > 12 && c < 30, `got ${c}`);
});
test("stats", () => {
  assert.deepEqual(C.stats("a b\nc"), { chars: 5, words: 3, lines: 2, tokens: C.count("a b\nc"), bytes: 5 });
  assert.equal(C.stats("").tokens, 0);
});
test("cost", () => {
  const m = { in: 3, out: 15 };
  assert.equal(C.cost(1e6, 1e6, m), 18);
  assert.equal(C.fmtCost(0.0012), "$0.00120");
  assert.equal(C.fmtCost(2.5), "$2.50");
});
