<!-- ═════════════ HEADER ═════════════ -->
<p align="center">
  <img src="https://capsule-render.vercel.app/api?type=waving&color=0:07060f,50:00D2FF,100:3EE69A&height=200&section=header&text=Prism%20Token%20Counter&fontSize=48&fontColor=ffffff&animation=fadeIn&fontAlignY=36&desc=Token%20estimate%20%C2%B7%20cost%20%C2%B7%20context%20fit&descAlignY=58&descSize=16" width="100%" alt="Prism Token Counter" />
</p>

<p align="center">
  <img src="https://readme-typing-svg.demolab.com?font=JetBrains+Mono&weight=600&size=19&duration=2600&pause=800&color=00D2FF&center=true&vCenter=true&width=680&lines=~1%2C284+tokens;%240.0042+per+request;12%25+of+200k+context;See+how+text+splits" alt="Typing SVG" />
</p>

<p align="center">
  <a href="https://github.com/krishyaa06/prism-token-counter/actions/workflows/ci.yml"><img src="https://img.shields.io/github/actions/workflow/status/krishyaa06/prism-token-counter/ci.yml?branch=main&style=for-the-badge&label=CI&logo=githubactions&logoColor=white" alt="CI" /></a>
  <a href="https://krishyaa06.github.io/prism-token-counter/"><img src="https://img.shields.io/badge/Live_Demo-Open-00D2FF?style=for-the-badge&logo=githubpages&logoColor=black" alt="Live demo" /></a>
  <img src="https://img.shields.io/badge/Vanilla-HTML%20%7C%20CSS%20%7C%20JS-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black" alt="Vanilla JS" />
  <img src="https://img.shields.io/badge/dependencies-0-00D2FF?style=for-the-badge" alt="Zero dependencies" />
  <a href="LICENSE"><img src="https://img.shields.io/github/license/krishyaa06/prism-token-counter?style=for-the-badge&color=3EE69A" alt="License" /></a>
</p>

<p align="center">
  <img src="assets/screenshots/desktop.png" width="90%" alt="Prism Token Counter screenshot" />
</p>

<img src="https://raw.githubusercontent.com/andreasbm/readme/master/assets/lines/aqua.png" width="100%" />

## ⚡ Overview

**Prism Token Counter** answers the questions you have before sending a big prompt: how many tokens is this, what will it cost, and will it fit? It uses a fast GPT-style pre-tokenizer with BPE-like heuristics (no downloads, instant on large files), colours each token chunk so you can see how text splits, and estimates cost and context use for several popular models. Prices are editable and remembered, since providers change them.

## ✨ Features

- **Instant token estimate** + characters, words, lines
- **Token view** — colour-coded chunks with per-chunk counts on hover
- **Cost per request** across GPT-4o, Claude, Gemini, Llama (Groq) — multiply by request count
- **Context-window meters** that turn red when you overflow
- **Editable prices** saved locally
- Open any text file; nothing is uploaded

## 📸 Screenshots

<table>
  <tr>
    <td width="68%"><img src="assets/screenshots/desktop.png" width="100%" alt="Prism Token Counter on desktop" /></td>
    <td width="32%"><img src="assets/screenshots/mobile.png" width="100%" alt="Prism Token Counter on mobile" /></td>
  </tr>
</table>

## 🚀 Quick Start

**Use it online:** [https://krishyaa06.github.io/prism-token-counter/](https://krishyaa06.github.io/prism-token-counter/)

**Run locally:**

```bash
git clone https://github.com/krishyaa06/prism-token-counter.git
cd prism-token-counter
# open index.html in your browser, or serve it:
npx serve .
```

## 🛠️ Usage

Paste text or open a file, set the expected output tokens and number of requests, and read the cost and context meters. Click a price to edit it for your provider.

> Counts are estimates (typically within ~10% for English and code). For exact billing use your provider's tokenizer.

## 📁 Project Structure

```
prism-token-counter/
├── assets/
│   ├── logo.png
│   └── logo.svg
├── css/
│   ├── app.css
│   └── prism.css
├── js/
│   ├── app.js   # UI and token view
│   ├── core.js   # pre-tokenizer, estimator, cost maths — tested in Node
│   └── prism.js
├── test/
│   └── core.test.js
├── .gitignore
├── LICENSE
├── index.html
└── package.json
```

## 🧪 Tests

```bash
npm test
```

Tests use the built-in `node:test` runner, so there is nothing to install. CI runs them on Node 20 and 22.

## 🤝 Contributing

1. Fork the repo and create a branch: `git checkout -b feature/my-idea`
2. Make your change and add a test in `test/`
3. Run `npm test` and open a Pull Request

## 🔷 Part of Prism Protocol

Prism Token Counter is one of the open-source tools built by [Prism Protocol](https://dc.gg/prismprotocol), a tech community where young builders learn, ship and compete together.

## 👤 Author

<table>
  <tr>
    <td align="center">
      <a href="https://github.com/krishyaa06"><img src="https://github.com/krishyaa06.png" width="90" style="border-radius:50%" /><br><b>Soumya Bhandare</b></a><br>
      <sub>Founder @ Prism Protocol</sub>
    </td>
    <td>
      <a href="https://dc.gg/prismprotocol"><img src="https://img.shields.io/badge/Discord-Prism%20Protocol-5865F2?style=for-the-badge&logo=discord&logoColor=white" /></a><br>
      <a href="https://instagram.com/prism_protocol_"><img src="https://img.shields.io/badge/Instagram-@prism__protocol__-E4405F?style=for-the-badge&logo=instagram&logoColor=white" /></a><br>
      <a href="https://x.com/krishyaa06"><img src="https://img.shields.io/badge/X-@krishyaa06-000000?style=for-the-badge&logo=x&logoColor=white" /></a>
    </td>
  </tr>
</table>

## 📄 License

Released under the [MIT License](LICENSE).

<p align="center">
  <b>If you like this project, consider giving it a ⭐</b><br>
  <sub>"Build. Create. Compete." · Made with ⚡ by Prism Protocol</sub>
</p>

<img src="https://capsule-render.vercel.app/api?type=waving&color=0:3EE69A,50:00D2FF,100:07060f&height=110&section=footer" width="100%" />
