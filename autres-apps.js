/* « Mes autres applications » : la même section sur les sites de Moka, Canif, Sesame et Atelier.
   <section id="autres-apps" data-current="moka"></section> puis <script src="autres-apps.js"></script>.
   La langue suit celle de la page (attribut lang, ou la classe « en » des pages français/anglais) et change avec elle. */
(function () {
  var APPS = [
    { id: "moka", name: "Moka", site: "https://xavier38.github.io/moka/", repo: "https://github.com/xavier38/moka",
      icon: "https://xavier38.github.io/moka/icon.png",
      tag: { fr: "Un petit café pour votre Mac : il reste éveillé en un clic.", en: "A little coffee for your Mac: keep it awake in one click.",
             es: "Un cafecito para tu Mac: mantenlo despierto con un clic.", pt: "Um cafezinho para o seu Mac: mantenha-o acordado com um clique.",
             nl: "Een kopje koffie voor je Mac: houd hem wakker met één klik.", de: "Ein kleiner Kaffee für deinen Mac: wach mit einem Klick.",
             it: "Un caffè per il tuo Mac: tienilo sveglio con un clic." } },
    { id: "canif", name: "Canif", site: "https://xavier38.github.io/canif/", repo: "https://github.com/xavier38/canif",
      icon: "https://xavier38.github.io/canif/icon.png",
      tag: { fr: "Le couteau suisse de votre Mac : 28 outils dans une seule app, Moka compris.", en: "Your Mac's Swiss army knife: 28 tools in one app, Moka included.",
             es: "La navaja suiza de su Mac: 28 herramientas en una sola app, Moka incluida.", pt: "O canivete suíço do seu Mac: 28 ferramentas em um só app, incluindo o Moka.",
             nl: "Het Zwitserse zakmes van uw Mac: 28 tools in één app, Moka inbegrepen.", de: "Das Schweizer Taschenmesser für Ihren Mac: 28 Werkzeuge in einer App, Moka inklusive.",
             it: "Il coltellino svizzero del tuo Mac: 28 strumenti in un'unica app, Moka compresa." } },
    { id: "sesame", name: "Sesame", site: "https://xavier38.github.io/sesame/", repo: "https://github.com/xavier38/sesame",
      icon: "https://xavier38.github.io/sesame/icon.png?v=20261104n",
      tag: { fr: "Tous vos clouds dans une seule application.", en: "All your clouds in one app.",
             es: "Todas tus nubes en una sola app.", pt: "Todas as suas nuvens numa só app.",
             nl: "Al je clouds in één app.", de: "Alle deine Clouds in einer App.",
             it: "Tutti i tuoi cloud in un'unica app." } },
    { id: "gouache", name: "Atelier", site: "https://xavier38.github.io/gouache/", repo: "https://github.com/xavier38/gouache",
      icon: "https://xavier38.github.io/gouache/icon.png?v=20261106",
      tag: { fr: "Vos photos méritent un atelier : retouchez-les sur votre Mac, sans compte ni nuage.", en: "Your photos deserve a studio: edit them on your Mac, no account, no cloud.",
             es: "Tus fotos merecen un taller: retócalas en tu Mac, sin cuenta ni nube.", pt: "As suas fotos merecem um ateliê: retoque-as no seu Mac, sem conta nem nuvem.",
             nl: "Je foto’s verdienen een atelier: bewerk ze op je Mac, zonder account of cloud.", de: "Deine Fotos verdienen ein Atelier: bearbeite sie auf deinem Mac, ohne Konto und Cloud.",
             it: "Le tue foto meritano un atelier: ritoccale sul tuo Mac, senza account né cloud." } }
  ];
  var T = {
    fr: { title: "Mes autres applications", lead: "Gratuites elles aussi, pour Mac.", site: "Découvrir", repo: "Sur GitHub" },
    en: { title: "My other apps", lead: "Free as well, for Mac.", site: "Discover", repo: "On GitHub" },
    es: { title: "Mis otras apps", lead: "También gratis, para Mac.", site: "Descubrir", repo: "En GitHub" },
    pt: { title: "As minhas outras apps", lead: "Também gratuitas, para Mac.", site: "Descobrir", repo: "No GitHub" },
    nl: { title: "Mijn andere apps", lead: "Ook gratis, voor de Mac.", site: "Ontdekken", repo: "Op GitHub" },
    de: { title: "Meine anderen Apps", lead: "Ebenfalls kostenlos, für den Mac.", site: "Entdecken", repo: "Auf GitHub" },
    it: { title: "Le mie altre app", lead: "Anche queste gratuite, per Mac.", site: "Scopri", repo: "Su GitHub" }
  };
  var root = document.getElementById("autres-apps");
  if (!root) return;
  var html = document.documentElement;

  function lang() {
    if (html.classList.contains("en")) return "en";  // pages français/anglais : bouton FR / EN
    var l = (html.lang || "fr").slice(0, 2).toLowerCase();
    return T[l] ? l : "en";
  }

  var style = document.createElement("style");
  style.textContent =
    "#autres-apps{margin:44px 0 8px}#autres-apps h2{margin:0 0 4px}#autres-apps .aa-lead{margin:0 0 14px;opacity:.75}" +
    "#autres-apps .aa-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(260px,1fr));gap:14px}" +
    "#autres-apps .aa-card{display:flex;gap:14px;align-items:center;padding:16px;border-radius:16px;border:1px solid rgba(128,128,128,.28);background:rgba(128,128,128,.06)}" +
    "#autres-apps img{width:64px;height:64px;border-radius:15px;flex:none;box-shadow:0 4px 12px rgba(0,0,0,.18)}" +
    "#autres-apps h3{margin:0 0 2px;font-size:18px}#autres-apps p.aa-tag{margin:0 0 8px;font-size:14.5px;opacity:.8}" +
    "#autres-apps .aa-links{display:flex;gap:12px;flex-wrap:wrap;font-size:14.5px;font-weight:600}#autres-apps .aa-links a{color:inherit}";
  document.head.appendChild(style);

  function render() {
    var l = lang(), t = T[l], current = root.getAttribute("data-current");
    var cards = APPS.filter(function (a) { return a.id !== current; }).map(function (a) {
      return '<div class="aa-card"><a href="' + a.site + '"><img src="' + a.icon + '" alt="' + a.name + '"></a><div>' +
        '<h3>' + a.name + '</h3><p class="aa-tag">' + a.tag[l] + '</p>' +
        '<div class="aa-links"><a href="' + a.site + '">' + t.site + ' →</a></div></div></div>';
    }).join("");
    root.innerHTML = "<h2>" + t.title + '</h2><p class="aa-lead">' + t.lead + '</p><div class="aa-grid">' + cards + "</div>";
  }
  render();
  new MutationObserver(render).observe(html, { attributes: true, attributeFilter: ["lang", "class"] });
})();
