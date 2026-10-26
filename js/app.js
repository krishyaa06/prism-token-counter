(() => {
  const { $, $$, store, debounce, esc } = Prism;
  const SAMPLE = `// Prism Token Counter — paste a prompt, a file or a whole conversation.\nexport async function summarize(repoFiles, model = "gpt-4o-mini") {\n  const context = repoFiles.map((f) => \`### \${f.path}\\n\${f.content}\`).join("\\n\\n");\n  const prompt = \`You are a senior engineer. Summarize this codebase in 5 bullet points.\\n\\n\${context}\`;\n  return callLLM({ model, messages: [{ role: "user", content: prompt }] });\n}\n\nThe quick brown fox jumps over the lazy dog. Tokens ≠ words: "unbelievably" may be 3 tokens, while "the" is 1.`;
  const prices = store.get("tok:prices", {});
  const M = Core.MODELS.map((m) => ({ ...m, ...(prices[m.id] || {}) }));
  function render() {
    const t = $("#in").value; store.set("tok:in", t);
    const s = Core.stats(t);
    for (const k of ["tokens", "chars", "words", "lines"]) $(`#k-${k}`).textContent = s[k].toLocaleString();
    $("#tv").hidden = !$("#viz").checked;
    if ($("#viz").checked) { const seg = Core.segments(t, 6000); $("#tv").innerHTML = seg.map((x, i) => `<span class="c${i % 5}" title="~${x.n} token${x.n > 1 ? "s" : ""}">${esc(x.text)}</span>`).join("") + (seg.reduce((n, x) => n + x.text.length, 0) < t.length ? `<span class="muted">… (preview truncated)</span>` : ""); }
    const out = Math.max(0, +$("#outTok").value || 0), reqs = Math.max(1, +$("#reqs").value || 1);
    $("#models").innerHTML = M.map((m, i) => { const used = s.tokens + out, pct = Math.min(100, (used / m.ctx) * 100); return `<div class="model"><div class="top"><b>${esc(m.name)}</b><span class="price">${Core.fmtCost(Core.cost(s.tokens, out, m) * reqs)}</span></div><div class="meta">in $<input data-i="${i}" data-k="in" value="${m.in}" aria-label="${esc(m.name)} input price" /> out $<input data-i="${i}" data-k="out" value="${m.out}" aria-label="${esc(m.name)} output price" /> / 1M · ${pct < 0.1 && used ? "<0.1" : pct.toFixed(1)}% of ${(m.ctx / 1000).toLocaleString()}k ctx</div><div class="meter ${used > m.ctx ? "over" : ""}"><i style="width:${Math.max(pct, used ? 0.5 : 0)}%"></i></div></div>`; }).join("");
    $$("#models input").forEach((el) => (el.onchange = () => { const m = M[+el.dataset.i]; m[el.dataset.k] = Math.max(0, parseFloat(el.value) || 0); prices[m.id] = { in: m.in, out: m.out }; store.set("tok:prices", prices); render(); }));
  }
  $("#in").value = store.get("tok:in", SAMPLE);
  $("#in").addEventListener("input", debounce(render, 120));
  ["#outTok", "#reqs", "#viz"].forEach((s) => $(s).addEventListener("input", render));
  $("#clear").onclick = () => { $("#in").value = ""; render(); };
  $("#file").onchange = async (e) => { const f = e.target.files[0]; if (f) { $("#in").value = await f.text(); render(); } };
  render();
})();
