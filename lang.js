// Langues du site de Canif (comme celui de Moka) : chaque texte existe en 7 versions,
// marquées class="lang-fr", "lang-en", "lang-es", "lang-pt", "lang-nl", "lang-de", "lang-it".
// Le choix est gardé dans le navigateur ; au premier passage, on prend la langue du navigateur.
(function () {
  const langs = { fr: "🇫🇷", en: "🇬🇧", es: "🇪🇸", pt: "🇧🇷", nl: "🇳🇱", de: "🇩🇪", it: "🇮🇹" };
  const css = document.createElement("style");
  css.textContent = Object.keys(langs).map(l => `.lang-${l}{display:none!important}html[lang="${l}"] .lang-${l}{display:revert!important}`).join("")
    + "nav.langs{position:absolute;top:10px;right:12px;display:flex;gap:2px;flex-wrap:wrap;justify-content:flex-end;max-width:60vw}"
    + "nav.langs button{font-size:20px;line-height:1;background:none;border:2px solid transparent;border-radius:9px;padding:3px 5px;cursor:pointer}"
    + "nav.langs button[aria-pressed=true]{border-color:var(--moss,#1f5fae)}";
  document.head.appendChild(css);
  function set(l) {
    document.documentElement.lang = l;
    nav.querySelectorAll("button").forEach(b => b.setAttribute("aria-pressed", b.dataset.l === l));
    const t = document.querySelector(`[data-title-${l}]`);
    if (t) document.title = t.getAttribute(`data-title-${l}`);
    try { localStorage.setItem("lang", l); } catch (e) {}
  }
  const nav = document.createElement("nav");
  nav.className = "langs";
  nav.setAttribute("aria-label", "Language");
  Object.entries(langs).forEach(([l, flag]) => {
    const b = document.createElement("button");
    b.textContent = flag; b.dataset.l = l; b.title = l.toUpperCase(); b.onclick = () => set(l);
    nav.appendChild(b);
  });
  document.body.prepend(nav);
  let start = "en";
  try { start = localStorage.getItem("lang") || (navigator.language || "en").slice(0, 2).toLowerCase(); } catch (e) {}
  set(langs[start] ? start : "en");
})();
