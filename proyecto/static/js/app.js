"use strict";
const $ = (s, c = document) => c.querySelector(s);
const $$ = (s, c = document) => [...c.querySelectorAll(s)];
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/* Año */
$("#year").textContent = new Date().getFullYear();

/* Efecto de escritura */
const frases = [
  "Técnico en Informática · futuro Ing. en TICs",
  "Apasionado por la IA, el ML, el DL y la ciberseguridad",
  "Nunca dejar de aprender.",
];
(async function escribir() {
  const el = $("#typed");
  if (reduceMotion) { el.textContent = frases[0]; return; }
  let i = 0;
  while (true) {
    const t = frases[i % frases.length];
    for (let c = 1; c <= t.length; c++) { el.textContent = t.slice(0, c); await sleep(42); }
    await sleep(1500);
    for (let c = t.length; c >= 0; c--) { el.textContent = t.slice(0, c); await sleep(18); }
    await sleep(300);
    i++;
  }
})();

/* Fondo matrix sutil */
(function matrix() {
  const canvas = $("#matrix");
  const ctx = canvas.getContext("2d");
  const chars = "01{}[]<>/\\$#_=+*".split("");
  const size = 16;
  let drops = [];
  function resize() {
    canvas.width = innerWidth;
    canvas.height = innerHeight;
    drops = Array.from({ length: Math.floor(canvas.width / size) }, () => Math.random() * -50);
  }
  resize();
  addEventListener("resize", resize);
  function draw() {
    ctx.fillStyle = "rgba(7, 4, 13, 0.12)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "#a855f7";
    ctx.font = size + "px monospace";
    drops.forEach((y, i) => {
      ctx.fillText(chars[Math.floor(Math.random() * chars.length)], i * size, y * size);
      drops[i] = y * size > canvas.height && Math.random() > 0.975 ? 0 : y + 1;
    });
  }
  if (!reduceMotion) setInterval(draw, 70);
})();

/* Filtros + búsqueda */
let filtro = "todos";
const pins = $$(".pin");
function aplicar() {
  const q = $("#search").value.trim().toLowerCase();
  let visibles = 0;
  pins.forEach((p) => {
    const cats = p.dataset.cat.split(" ");
    const texto = (p.dataset.text + " " + p.textContent).toLowerCase();
    const okFiltro = filtro === "todos" || cats.includes(filtro);
    const okBusqueda = !q || texto.includes(q);
    const mostrar = okFiltro && okBusqueda;
    p.classList.toggle("hide", !mostrar);
    if (mostrar) visibles++;
  });
  $("#empty").hidden = visibles > 0;
}
$$(".chip").forEach((c) =>
  c.addEventListener("click", () => {
    $$(".chip").forEach((x) => x.classList.remove("active"));
    c.classList.add("active");
    filtro = c.dataset.filter;
    aplicar();
  })
);
$("#search").addEventListener("input", aplicar);

/* Lightbox */
const lb = $("#lightbox");
$$(".photo").forEach((f) =>
  f.addEventListener("click", () => {
    $("#lbImg").src = $("img", f).src;
    $("#lbImg").alt = $("img", f).alt;
    $("#lbCap").textContent = $("figcaption", f).textContent;
    lb.classList.add("open");
    lb.setAttribute("aria-hidden", "false");
  })
);
const cerrar = () => { lb.classList.remove("open"); lb.setAttribute("aria-hidden", "true"); };
$("#lbClose").addEventListener("click", cerrar);
lb.addEventListener("click", (e) => { if (e.target === lb) cerrar(); });
addEventListener("keydown", (e) => { if (e.key === "Escape") cerrar(); });