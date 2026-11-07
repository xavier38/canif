// Langues du site de Canif (comme celui de Moka) : chaque texte existe en 7 versions,
// marquées class="lang-fr", "lang-en", "lang-es", "lang-pt", "lang-nl", "lang-de", "lang-it".
// Le choix est gardé dans le navigateur ; au premier passage, on prend la langue du navigateur.
(function () {
  const langs = { fr: "🇫🇷", en: "🇬🇧", es: "🇪🇸", pt: "🇧🇷", nl: "🇳🇱", de: "🇩🇪", it: "🇮🇹" };
  const names = {fr:"Français",en:"English",es:"Español",pt:"Português (Brasil)",nl:"Nederlands",de:"Deutsch",it:"Italiano"};
  const labels={fr:"Choisir la langue",en:"Choose language",es:"Elegir idioma",pt:"Escolher idioma",nl:"Taal kiezen",de:"Sprache wählen",it:"Scegli la lingua"};
  const css = document.createElement("style");
  css.textContent = Object.keys(langs).map(l => `.lang-${l}{display:none!important}html[lang="${l}"] .lang-${l}{display:revert!important}`).join("")
    + "nav.langs{position:static;display:flex;gap:4px;flex-wrap:wrap;justify-content:flex-end;width:calc(100% - 36px);max-width:824px;margin:10px auto 0}"
    + "nav.langs button{min-width:36px;min-height:36px;box-sizing:border-box;font-size:20px;line-height:1;background:none;border:2px solid transparent;border-radius:9px;padding:3px 5px;cursor:pointer}"
    + "nav.langs button[aria-pressed=true]{border-color:var(--moss,#1f5fae)}"
    + ":focus-visible{outline:3px solid var(--moss,#1f5fae);outline-offset:4px}";
  document.head.appendChild(css);
  function set(l) {
    document.documentElement.lang = l;
    nav.setAttribute("aria-label",labels[l]);
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
    const glyph=document.createElement("span"); glyph.textContent=flag; glyph.setAttribute("aria-hidden","true"); b.appendChild(glyph); b.dataset.l = l; b.lang = l; b.title = names[l]; b.setAttribute("aria-label", names[l]); b.onclick = () => set(l);
    nav.appendChild(b);
  });
  document.body.prepend(nav);
  let start = "en";
  try { start = localStorage.getItem("lang") || (navigator.language || "en").slice(0, 2).toLowerCase(); } catch (e) {}
  set(langs[start] ? start : "en");
})();
