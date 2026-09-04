(function () {
  "use strict";

  const STORAGE_KEY = "tesla-panorama-v2";
  const $main = document.getElementById("main");
  const $pill = document.getElementById("progress-pill");

  const state = {
    view: "home",
    moduleId: null,
    quiz: null,
    starId: "ownership",
    mapAreaId: null,
    compareLeft: "model3",
    compareRight: "modely",
    compareMode: "vehicles",
    timelineId: null,
    timelineMode: "all",
    glossaryQuery: "",
    glossaryTag: "all",
    glossaryId: null,
    chargingLayerId: null,
    opsStep: 0,
  };

  function loadStore() {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}");
    } catch {
      return {};
    }
  }
  function saveStore(data) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    updateProgressPill();
  }
  function getStore() {
    const s = loadStore();
    if (!s.modules) s.modules = {};
    if (!s.checklist) s.checklist = {};
    if (!s.star) s.star = {};
    if (!s.quizHistory) s.quizHistory = [];
    if (!Array.isArray(s.lastWrongIds)) s.lastWrongIds = [];
    if (typeof s.fttMode !== "boolean") s.fttMode = false;
    return s;
  }

  function isFttMode() {
    return !!getStore().fttMode;
  }

  function setFttMode(on) {
    const s = getStore();
    s.fttMode = !!on;
    saveStore(s);
    syncFttChrome();
    if (!on && (state.view === "star" || (state.moduleId && isOptionalModule(state.moduleId)))) {
      navigate("home");
      return;
    }
    render();
  }

  function isOptionalModule(id) {
    const m = window.MODULES.find((x) => x.id === id);
    return m && m.path === "optional-ftt";
  }

  function visibleModules() {
    const ftt = isFttMode();
    return (window.MODULES || []).filter((m) => ftt || m.path !== "optional-ftt");
  }

  function studyPath() {
    const base = (window.STUDY_PATH || []).slice();
    if (isFttMode()) return base.concat(window.STUDY_PATH_FTT || []);
    return base;
  }

  function activeQuizBank() {
    const pan = window.QUIZ_BANK || [];
    if (!isFttMode()) return pan;
    return pan.concat(window.QUIZ_BANK_FTT || []);
  }

  function syncFttChrome() {
    const on = isFttMode();
    document.querySelectorAll("[data-nav='star']").forEach((el) => {
      el.hidden = !on;
      el.style.display = on ? "" : "none";
    });
    document.body.classList.toggle("ftt-on", on);
    const brandStrong = document.querySelector(".brand-text strong");
    const brandSmall = document.querySelector(".brand-text small");
    if (brandStrong) brandStrong.textContent = on ? "Tesla · FTT" : "Tesla Panorama";
    if (brandSmall) brandSmall.textContent = on ? "Future Talent · opcional" : "Compañía · España / EU";
  }

  function moduleProgress(id) {
    const s = getStore();
    const m = window.MODULES.find((x) => x.id === id);
    if (!m) return 0;
    if (m.isQuiz) {
      const best = (s.quizHistory || []).reduce((a, h) => Math.max(a, h.pct || 0), 0);
      return Math.min(100, best);
    }
    if (m.isStar) {
      const templates = window.STAR_TEMPLATES || [];
      let filled = 0;
      templates.forEach((t) => {
        const entry = (s.star || {})[t.id] || {};
        const has = Object.values(entry).some((v) => String(v || "").trim().length > 20);
        if (has) filled++;
      });
      return templates.length ? Math.round((filled / templates.length) * 100) : 0;
    }
    return s.modules[id]?.done ? 100 : s.modules[id]?.opened ? 40 : 0;
  }

  function globalProgress() {
    const mods = studyPath()
      .map((id) => window.MODULES.find((m) => m.id === id))
      .filter(Boolean);
    if (!mods.length) return 0;
    const sum = mods.reduce((a, m) => a + moduleProgress(m.id), 0);
    return Math.round(sum / mods.length);
  }

  function updateProgressPill() {
    if ($pill) $pill.textContent = globalProgress() + "%";
  }

  function markModuleOpened(id) {
    const s = getStore();
    s.modules[id] = s.modules[id] || {};
    s.modules[id].opened = true;
    s.modules[id].openedAt = Date.now();
    saveStore(s);
  }

  function markModuleDone(id) {
    const s = getStore();
    s.modules[id] = s.modules[id] || {};
    s.modules[id].opened = true;
    s.modules[id].done = true;
    s.modules[id].doneAt = Date.now();
    saveStore(s);
  }

  function escapeHtml(str) {
    return String(str ?? "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  function setActiveNav(view) {
    const tools = ["map", "compare", "timeline", "glossary", "charging", "ops"];
    document.querySelectorAll("[data-nav]").forEach((btn) => {
      const nav = btn.getAttribute("data-nav");
      const active =
        nav === view ||
        (view === "module" && nav === "modules") ||
        (view === "quiz-play" && nav === "examen") ||
        (view === "quiz-result" && nav === "examen") ||
        (tools.includes(view) && nav === "home");
      btn.classList.toggle("active", active);
    });
  }

  function navigate(view, opts = {}) {
    if (view === "star" && !isFttMode()) {
      view = "home";
      opts = {};
    }
    if (view === "module" && opts.moduleId && isOptionalModule(opts.moduleId) && !isFttMode()) {
      view = "home";
      opts = {};
    }
    state.view = view;
    if (opts.moduleId) state.moduleId = opts.moduleId;
    if (opts.starId) state.starId = opts.starId;
    if (opts.quiz) state.quiz = opts.quiz;
    if (opts.mapAreaId !== undefined) state.mapAreaId = opts.mapAreaId;
    if (opts.compareLeft) state.compareLeft = opts.compareLeft;
    if (opts.compareRight) state.compareRight = opts.compareRight;
    if (opts.compareMode) state.compareMode = opts.compareMode;
    if (opts.timelineId !== undefined) state.timelineId = opts.timelineId;
    if (opts.timelineMode) state.timelineMode = opts.timelineMode;
    if (opts.glossaryQuery !== undefined) state.glossaryQuery = opts.glossaryQuery;
    if (opts.glossaryTag) state.glossaryTag = opts.glossaryTag;
    if (opts.glossaryId !== undefined) state.glossaryId = opts.glossaryId;
    if (opts.chargingLayerId !== undefined) state.chargingLayerId = opts.chargingLayerId;
    if (opts.opsStep !== undefined) state.opsStep = opts.opsStep;
    location.hash = buildHash(view, opts);
    render();
    $main.focus({ preventScroll: true });
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function buildHash(view, opts = {}) {
    if (view === "module" && (opts.moduleId || state.moduleId))
      return "#/modulo/" + (opts.moduleId || state.moduleId);
    if (view === "examen" || view === "quiz-play" || view === "quiz-result") return "#/examen";
    if (view === "star") return "#/star/" + (opts.starId || state.starId || "ownership");
    if (view === "modules") return "#/modulos";
    if (view === "map") {
      const id = opts.mapAreaId || state.mapAreaId;
      return id ? "#/mapa/" + id : "#/mapa";
    }
    if (view === "compare") return "#/comparador";
    if (view === "timeline") {
      const id = opts.timelineId || state.timelineId;
      const base = id ? "#/actualidad-timeline/" + id : "#/actualidad-timeline";
      const mode = opts.timelineMode || state.timelineMode;
      return mode && mode !== "all" ? base + "?modo=cambios" : base;
    }
    if (view === "glossary") {
      const id = opts.glossaryId || state.glossaryId;
      return id ? "#/glosario/" + id : "#/glosario";
    }
    if (view === "charging") {
      const id = opts.chargingLayerId || state.chargingLayerId;
      return id ? "#/carga/" + id : "#/carga";
    }
    if (view === "ops") {
      const step = opts.opsStep !== undefined ? opts.opsStep : state.opsStep;
      return step ? "#/ops/" + step : "#/ops";
    }
    return "#/";
  }

  function parseHash() {
    const h = (location.hash || "#/").replace(/^#/, "");
    const parts = h.split("/").filter(Boolean);
    if (!parts.length) return navigate("home");
    if (parts[0] === "modulos") return navigate("modules");
    if (parts[0] === "modulo" && parts[1]) {
      const m = window.MODULES.find((x) => x.id === parts[1]);
      if (m?.isQuiz) return navigate("examen");
      if (m?.isStar) return navigate("star", { starId: state.starId });
      return navigate("module", { moduleId: parts[1] });
    }
    if (parts[0] === "examen") return navigate("examen");
    if (parts[0] === "star") return navigate("star", { starId: parts[1] || "ownership" });
    if (parts[0] === "mapa") return navigate("map", { mapAreaId: parts[1] || null });
    if (parts[0] === "comparador") return navigate("compare");
    if (parts[0] === "actualidad-timeline") {
      const q = (location.hash.split("?")[1] || "");
      const mode = /modo=cambios/.test(q) ? "changed" : "all";
      return navigate("timeline", { timelineId: parts[1] || null, timelineMode: mode });
    }
    if (parts[0] === "glosario") return navigate("glossary", { glossaryId: parts[1] || null });
    if (parts[0] === "carga") return navigate("charging", { chargingLayerId: parts[1] || null });
    if (parts[0] === "ops") {
      const step = parts[1] ? parseInt(parts[1], 10) : 0;
      return navigate("ops", { opsStep: Number.isFinite(step) ? step : 0 });
    }
    return navigate("home");
  }

  /* ---------- RENDERERS ---------- */

  function toolCardsHtml() {
    const wrong = (getStore().lastWrongIds || []).length;
    return `
      <div class="section-head">
        <div>
          <h2>Herramientas</h2>
          <p>Mapa, comparador, timeline, glosario, carga EU, ops y quiz — primera clase en el dashboard.</p>
        </div>
      </div>
      <div class="grid grid-tools">
        <button type="button" class="card card-clickable tool-card" data-go="map">
          <div class="card-icon">▦</div>
          <h3>Mapa de estructura</h3>
          <p>Áreas de negocio clicables: vehículos, energy, software/IA, sales&amp;service, carga, manufactura.</p>
          <span class="tool-cta">Abrir mapa →</span>
        </button>
        <button type="button" class="card card-clickable tool-card" data-go="compare">
          <div class="card-icon">⇄</div>
          <h3>Comparador</h3>
          <p>Modelos lado a lado (y Powerwall vs Megapack). Solo atributos públicos cualitativos.</p>
          <span class="tool-cta">Comparar →</span>
        </button>
        <button type="button" class="card card-clickable tool-card" data-go="timeline">
          <div class="card-icon">◉</div>
          <h3>Timeline actualidad</h3>
          <p>Hitos del pack ${escapeHtml(window.APP_META.updated)} — modo «¿Qué ha cambiado?» incluido.</p>
          <span class="tool-cta">Ver timeline →</span>
        </button>
        <button type="button" class="card card-clickable tool-card" data-go="glossary">
          <div class="card-icon">Aa</div>
          <h3>Glosario</h3>
          <p>FSD, OTA, WLTP, Megapack, Delivery, Trade-in, Supercharger, HW… con búsqueda al escribir.</p>
          <span class="tool-cta">Buscar términos →</span>
        </button>
        <button type="button" class="card card-clickable tool-card" data-go="charging">
          <div class="card-icon">⌁</div>
          <h3>Carga / Europa</h3>
          <p>Supercharger vs Destination, casa y roaming — cards regionales, sin inventar stalls.</p>
          <span class="tool-cta">Ver ecosistema →</span>
        </button>
        <button type="button" class="card card-clickable tool-card" data-go="ops">
          <div class="card-icon">→</div>
          <h3>Ops día a día</h3>
          <p>Stepper Sales → Delivery → Service (lente cliente + handoffs internos visibles).</p>
          <span class="tool-cta">Recorrer journey →</span>
        </button>
        <button type="button" class="card card-clickable tool-card" data-go="examen">
          <div class="card-icon">?</div>
          <h3>Quiz + repaso</h3>
          <p>Simulacro con autoevaluación. ${wrong ? `<strong>${wrong} fallos</strong> listos para repasar.` : "Repaso de fallos tras cada intento."}</p>
          <span class="tool-cta">Ir al quiz →</span>
        </button>
        <button type="button" class="card card-clickable tool-card" data-go="timeline-changed">
          <div class="card-icon">Δ</div>
          <h3>¿Qué ha cambiado?</h3>
          <p>Filtro de timeline: uncertain / verify / recientes + resumen del pack de contenido.</p>
          <span class="tool-cta">Ver cambios →</span>
        </button>
      </div>
    `;
  }

  function renderHome() {
    const pct = globalProgress();
    const history = getStore().quizHistory || [];
    const lastQuiz = history[history.length - 1];
    const mods = visibleModules();
    const doneCount = mods.filter((m) => moduleProgress(m.id) >= 100).length;
    const ftt = isFttMode();
    const bankLen = activeQuizBank().length;

    return `
      <section class="hero">
        <div class="hero-kicker">Panorama Tesla · ES / EU · ${escapeHtml(window.APP_META.updated)}</div>
        <h1>Entiende Tesla como compañía hoy</h1>
        <p>${escapeHtml(window.APP_META.audience)}. Ruta primaria (~${escapeHtml(window.APP_META.studyHours)}): qué es, estructura, productos, cómo opera, actualidad, cultura y quiz. FTT/STAR solo si lo activas.</p>
        <div class="hero-actions">
          <button type="button" class="btn btn-primary" data-go="path">Empezar panorama</button>
          <button type="button" class="btn btn-ghost" data-go="map">Mapa estructura</button>
          <button type="button" class="btn btn-ghost" data-go="examen">Quiz panorama</button>
        </div>
      </section>

      <div class="card ftt-toggle-card">
        <div class="ftt-toggle-row">
          <div>
            <h3 style="margin:0 0 .25rem">Modo Future Talent</h3>
            <p style="margin:0;color:var(--muted);font-size:.88rem">FTT + STAR quedan ocultos por defecto. Actívalo solo si preparas el traineeship.</p>
          </div>
          <label class="switch" title="Modo Future Talent">
            <input type="checkbox" id="ftt-mode-toggle" ${ftt ? "checked" : ""} />
            <span class="switch-ui" aria-hidden="true"></span>
            <span class="switch-label">${ftt ? "ON" : "OFF"}</span>
          </label>
        </div>
      </div>

      <div class="grid grid-stats">
        <div class="card stat-card"><div class="num">${pct}%</div><div class="lbl">Progreso ${ftt ? "con FTT" : "panorama"}</div></div>
        <div class="card stat-card"><div class="num">${doneCount}/${mods.length}</div><div class="lbl">Módulos al 100%</div></div>
        <div class="card stat-card"><div class="num">${bankLen}</div><div class="lbl">Preguntas banco</div></div>
        <div class="card stat-card"><div class="num">${lastQuiz ? lastQuiz.pct + "%" : "—"}</div><div class="lbl">Último quiz</div></div>
      </div>

      ${toolCardsHtml()}

      <div class="section-head">
        <div>
          <h2>Mapa de módulos</h2>
          <p>Ruta primaria: Qué es Tesla → Estructura → Productos → Cómo opera → Actualidad → Cultura → Quiz${ftt ? " · [FTT] Programa → STAR" : ""}</p>
        </div>
      </div>
      <div class="grid grid-2" id="module-map">
        ${mods.map((m) => moduleCard(m)).join("")}
      </div>
    `;
  }

  function moduleCard(m) {
    const p = moduleProgress(m.id);
    const badge = m.path === "optional-ftt" ? `<span class="pill pill-ftt">FTT</span>` : "";
    return `
      <button type="button" class="card card-clickable" data-module="${escapeHtml(m.id)}">
        <div class="card-icon">${escapeHtml(m.icon)} ${badge}</div>
        <h3>${escapeHtml(m.title)}</h3>
        <p>${escapeHtml(m.short)}</p>
        <div class="card-meta">
          <div class="progress-bar" aria-hidden="true"><span style="width:${p}%"></span></div>
          <span>${p}%</span>
        </div>
      </button>
    `;
  }

  function renderModulesList() {
    const mods = visibleModules();
    const ftt = isFttMode();
    return `
      <div class="section-head"><div><h2>Todos los módulos</h2><p>Progreso en este navegador (localStorage · ${escapeHtml(STORAGE_KEY)}). ${ftt ? "Modo Future Talent activo." : "Solo ruta panorama."}</p></div></div>
      ${toolCardsHtml()}
      <div class="grid grid-2">${mods.map((m) => moduleCard(m)).join("")}</div>
    `;
  }

  /* ---------- STRUCTURE MAP (content schema: structure_map.nodes) ---------- */

  function structureNodes() {
    const sm = window.STRUCTURE_MAP;
    if (!sm) return [];
    if (Array.isArray(sm)) return sm;
    return sm.nodes || [];
  }

  function structureMeta() {
    const sm = window.STRUCTURE_MAP;
    if (!sm || Array.isArray(sm)) return { version: "", source_note: "" };
    return { version: sm.version || "", source_note: sm.source_note || "" };
  }

  const NODE_TYPE_META = {
    company: { icon: "◎", accent: "red", short: "Compañía" },
    segment: { icon: "▣", accent: "red", short: "Segmento IR" },
    strategic: { icon: "◈", accent: "blue", short: "Línea estratégica" },
    factory_vehicle: { icon: "▦", accent: "muted", short: "Fábrica vehículos" },
    factory_energy: { icon: "⚡", accent: "amber", short: "Fábrica energy" },
    customer_channel: { icon: "◎", accent: "green", short: "Canal cliente" },
    infra: { icon: "⌁", accent: "red", short: "Infraestructura" },
  };

  function nodeTypeMeta(type) {
    return NODE_TYPE_META[type] || { icon: "•", accent: "muted", short: type || "nodo" };
  }

  function childrenOf(nodes, parentId) {
    return nodes.filter((n) => n.parent === parentId);
  }

  function renderMap() {
    const nodes = structureNodes();
    const meta = structureMeta();
    if (!nodes.length) return `<p class="empty">Mapa no disponible.</p>`;

    const selectable = nodes.filter((n) => n.type !== "company");
    const activeId = state.mapAreaId || selectable[0]?.id || nodes[0]?.id;
    const active = nodes.find((a) => a.id === activeId) || selectable[0] || nodes[0];
    const tm = nodeTypeMeta(active.type);
    const kids = childrenOf(nodes, active.id);
    const parent = nodes.find((n) => n.id === active.parent);

    const groups = [
      { key: "segment", title: "Segmentos" },
      { key: "strategic", title: "Estratégico" },
      { key: "factory_vehicle", title: "Fábricas vehículos" },
      { key: "factory_energy", title: "Fábricas energy" },
      { key: "customer_channel", title: "Canales EU/ES" },
      { key: "infra", title: "Infra" },
    ];

    const panelBits = [];
    panelBits.push(`<div class="map-panel-kicker">${escapeHtml(tm.icon)} ${escapeHtml(tm.short)}${active.region ? " · " + escapeHtml(active.region) : ""}</div>`);
    panelBits.push(`<h2>${escapeHtml(active.label)}</h2>`);
    if (active.uncertain) {
      panelBits.push(`<span class="badge-uncertain">uncertain</span>`);
      panelBits.push(`<div class="callout warn verify-hint"><strong>Verificar en tesla.com</strong> — ${escapeHtml(active.verify_hint || "Línea estratégica pública; no organigrama fijo. Mira IR / tesla.com.")}</div>`);
    }
    if (parent) panelBits.push(`<p class="map-lead">Padre: <strong>${escapeHtml(parent.label)}</strong></p>`);
    if (active.status) panelBits.push(`<p class="map-lead">Estado: <strong>${escapeHtml(active.status)}</strong></p>`);
    if (active.products && active.products.length) {
      panelBits.push(`<p class="map-lead">Productos: ${escapeHtml(active.products.join(", "))}</p>`);
    }
    if (active.capacity) {
      panelBits.push(`<div class="callout tip"><strong>Capacidad instalada (IR Q2’26):</strong> ${escapeHtml(active.capacity)}${active.capacity_detail ? `<br/><span style="color:var(--muted);font-size:.85rem">${escapeHtml(active.capacity_detail)} · capacidad ≠ ritmo actual</span>` : ""}</div>`);
    }
    if (kids.length) {
      panelBits.push(`<h3 style="margin-top:1rem;font-size:.9rem">Nodos hijos</h3><ul class="bullets">${kids.map((k) => `<li>${escapeHtml(k.label)}${k.uncertain ? ' <span class="badge-uncertain">uncertain</span>' : ""}${k.capacity ? ` · <em>${escapeHtml(k.capacity)}</em>` : ""}</li>`).join("")}</ul>`);
    }
    panelBits.push(`<div class="hero-actions" style="margin-top:1rem"><button type="button" class="btn btn-ghost btn-sm" data-module="estructura">Ver módulo Estructura</button><a class="btn btn-ghost btn-sm" href="https://www.tesla.com/es_es" target="_blank" rel="noopener">tesla.com/es_es</a></div>`);

    return `
      <nav class="breadcrumb">
        <button type="button" data-go="home">Inicio</button>
        <span>/</span>
        <span>Mapa de estructura</span>
      </nav>
      <div class="module-hero">
        <div class="tag">structure_map · ${escapeHtml(meta.version || "pack")}</div>
        <h1>▦ Mapa de estructura</h1>
        <p>${escapeHtml(meta.source_note || "Nodos públicos parseados del contenido. Sin organigramas inventados.")}</p>
      </div>
      <div class="map-layout">
        <div class="map-groups">
          ${groups.map((g) => {
            const items = nodes.filter((n) => n.type === g.key);
            if (!items.length) return "";
            return `<div class="map-group"><h3 class="map-group-title">${escapeHtml(g.title)}</h3>
              <div class="map-grid" role="list">
                ${items.map((a) => {
                  const m = nodeTypeMeta(a.type);
                  return `<button type="button" class="map-node accent-${escapeHtml(m.accent)} ${a.id === active.id ? "active" : ""} ${a.uncertain ? "uncertain" : ""}" data-map-area="${escapeHtml(a.id)}" role="listitem">
                    <span class="map-node-icon">${escapeHtml(m.icon)}</span>
                    <span class="map-node-title">${escapeHtml(a.label)}${a.uncertain ? ' <span class="badge-uncertain">uncertain</span>' : ""}</span>
                    <span class="map-node-short">${escapeHtml(m.short)}${a.status ? " · " + escapeHtml(a.status) : ""}${a.capacity ? " · " + escapeHtml(a.capacity) : ""}</span>
                  </button>`;
                }).join("")}
              </div></div>`;
          }).join("")}
        </div>
        <aside class="map-panel card" id="map-detail">
          ${panelBits.join("\n")}
        </aside>
      </div>
      <p class="callout tip" style="margin-top:1rem">Capacidad instalada (IR) ≠ ritmo de producción actual. Verifica cifras en <a href="https://ir.tesla.com" target="_blank" rel="noopener">ir.tesla.com</a>.</p>
    `;
  }

  /* ---------- COMPARATOR (product_comparator schema) ---------- */

  function comparePool() {
    return state.compareMode === "energy"
      ? (window.COMPARE_ENERGY || [])
      : (window.COMPARE_VEHICLES || []);
  }

  function renderCompare() {
    const pool = comparePool();
    const pc = window.PRODUCT_COMPARATOR || {};
    if (pool.length < 1) return `<p class="empty">Comparador sin datos.</p>`;

    let left = pool.find((p) => p.id === state.compareLeft) || pool[0];
    let right = pool.find((p) => p.id === state.compareRight) || pool[1] || pool[0];
    if (left.id === right.id && pool.length > 1) {
      right = pool.find((p) => p.id !== left.id) || pool[0];
    }
    state.compareLeft = left.id;
    state.compareRight = right.id;

    const keys = Array.from(new Set([
      ...Object.keys(left.attrs || {}),
      ...Object.keys(right.attrs || {}),
    ]));

    const opts = (selected) => pool.map((p) =>
      `<option value="${escapeHtml(p.id)}" ${p.id === selected ? "selected" : ""}>${escapeHtml(p.name)}${p.uncertain ? " ⚠" : ""}</option>`
    ).join("");

    const uncertainBanner = [left, right].filter((p) => p.uncertain).map((p) =>
      `<div class="callout warn verify-hint"><span class="badge-uncertain">uncertain</span> <strong>${escapeHtml(p.name)}</strong>: ${escapeHtml(p.verify_hint || "Verificar en tesla.com/es_es")}</div>`
    ).join("");

    const caveats = (pc.caveats || []).map((c) => `<li>${escapeHtml(c)}</li>`).join("");
    const soft = pc.software_assistance;
    const softHtml = soft ? `<div class="callout tip" style="margin-top:.75rem"><strong>Software / asistencia:</strong> ${escapeHtml((soft.names || []).join(" / "))}. ${escapeHtml(soft.rule || "")}<br/><em>${escapeHtml(soft.es_status || "")}</em></div>` : "";

    return `
      <nav class="breadcrumb">
        <button type="button" data-go="home">Inicio</button>
        <span>/</span>
        <span>Comparador</span>
      </nav>
      <div class="module-hero">
        <div class="tag">product_comparator · ${escapeHtml(pc.version || "")} · mercado ${escapeHtml(pc.market_default || "ES")}</div>
        <h1>⇄ Comparador de productos</h1>
        <p>Schema del contenido New Bot. Sin km/precios fosilizados — verifica en <a href="https://www.tesla.com/es_es" target="_blank" rel="noopener">tesla.com/es_es</a>.</p>
      </div>
      <div class="compare-mode-row">
        <button type="button" class="chip ${state.compareMode === "vehicles" ? "active" : ""}" data-compare-mode="vehicles">Vehículos</button>
        <button type="button" class="chip ${state.compareMode === "energy" ? "active" : ""}" data-compare-mode="energy">Energy</button>
      </div>
      ${uncertainBanner}
      <div class="compare-pickers card">
        <label>
          <span>Producto A</span>
          <select id="compare-left">${opts(left.id)}</select>
        </label>
        <div class="compare-vs" aria-hidden="true">VS</div>
        <label>
          <span>Producto B</span>
          <select id="compare-right">${opts(right.id)}</select>
        </label>
      </div>
      <div class="compare-table-wrap">
        <table class="compare-table">
          <thead>
            <tr>
              <th>Atributo</th>
              <th>${escapeHtml(left.name)}${left.uncertain ? ' <span class="badge-uncertain">uncertain</span>' : ""}</th>
              <th>${escapeHtml(right.name)}${right.uncertain ? ' <span class="badge-uncertain">uncertain</span>' : ""}</th>
            </tr>
          </thead>
          <tbody>
            ${keys.map((k) => `
              <tr>
                <th scope="row">${escapeHtml(k)}</th>
                <td>${escapeHtml((left.attrs || {})[k] || "—")}</td>
                <td>${escapeHtml((right.attrs || {})[k] || "—")}</td>
              </tr>
            `).join("")}
          </tbody>
        </table>
      </div>
      ${caveats ? `<div class="card" style="margin-top:.85rem"><h3>Caveats</h3><ul class="bullets">${caveats}</ul></div>` : ""}
      ${softHtml}
      <div class="callout warn">Si no estás seguro de un número (autonomía WLTP, precio, potencia), omítelo y verifica en el configurador.</div>
      <div class="hero-actions">
        <button type="button" class="btn btn-ghost" data-module="productos">Abrir módulo Productos</button>
        <a class="btn btn-ghost" href="https://www.tesla.com/es_es" target="_blank" rel="noopener">Verificar en tesla.com</a>
      </div>
    `;
  }

  /* ---------- ACTUALIDAD TIMELINE (timeline.events schema) ---------- */

  function isTimelineChanged(it) {
    if (!it) return false;
    if (it.uncertain) return true;
    if (it.recent) return true;
    if (it.verify_hint) return true;
    if ((it.confidence || "").toLowerCase() === "medium") return true;
    if ((it.verify || []).length && (it.uncertain || it.recent || (it.confidence || "").toLowerCase() === "medium")) return true;
    return false;
  }

  function packChangesCardHtml() {
    const meta = window.CONTENT_PACK_META || {};
    const changes = meta.changelog || [];
    if (!changes.length && !meta.version) return "";
    return `
      <div class="card pack-changes-card">
        <div class="pack-changes-kicker">Últimos cambios del pack · ${escapeHtml(meta.version || meta.updated || window.APP_META.updated)}</div>
        <h3 style="margin:.25rem 0 .5rem">¿Qué ha cambiado en el contenido?</h3>
        <ul class="bullets">${changes.map((c) => `<li>${escapeHtml(c)}</li>`).join("")}</ul>
        ${meta.notes ? `<p class="pack-changes-note">${escapeHtml(meta.notes)}</p>` : ""}
      </div>`;
  }

  function renderTimeline() {
    const all = window.ACTUALIDAD_TIMELINE || [];
    const meta = window.ACTUALIDAD_TIMELINE_META || {};
    const mode = state.timelineMode || "all";
    const items = mode === "changed" ? all.filter(isTimelineChanged) : all;
    const activeId = state.timelineId || items[0]?.id || all[0]?.id;
    const active = items.find((i) => i.id === activeId) || items[0] || all.find((i) => i.id === activeId);

    return `
      <nav class="breadcrumb">
        <button type="button" data-go="home">Inicio</button>
        <span>/</span>
        <button type="button" data-module="actualidad">Actualidad</button>
        <span>/</span>
        <span>Timeline</span>
      </nav>
      <div class="module-hero">
        <div class="tag">timeline · ${escapeHtml(meta.version || window.APP_META.updated)} · sin fechas inventadas</div>
        <h1>◉ Timeline de actualidad</h1>
        <p>Eventos del contenido New Bot (${escapeHtml(String((meta.themes || []).join(", ")))}). Pulsa un hito para verificar fuentes.</p>
      </div>
      ${packChangesCardHtml()}
      <div class="compare-mode-row" role="tablist" aria-label="Filtro timeline">
        <button type="button" class="chip ${mode === "all" ? "active" : ""}" data-timeline-mode="all">Todos</button>
        <button type="button" class="chip ${mode === "changed" ? "active" : ""}" data-timeline-mode="changed">¿Qué ha cambiado?</button>
      </div>
      ${mode === "changed" ? `<p class="callout tip">Mostrando hitos <strong>uncertain</strong>, <strong>recent</strong>, confianza media o con hint de verificación (${items.length} de ${all.length}).</p>` : ""}
      <div class="tl-interactive">
        ${items.length ? items.map((it) => {
          const on = active && it.id === active.id;
          const when = it.when || it.date || "";
          const cat = it.category || it.theme || "";
          const body = it.body || it.summary || "";
          const preview = body.slice(0, 90) + (body.length > 90 ? "…" : "");
          const badges = [
            it.uncertain ? '<span class="badge-uncertain">uncertain</span>' : "",
            it.recent ? '<span class="badge-recent">recent</span>' : "",
            (it.confidence || "").toLowerCase() === "medium" ? '<span class="badge-verify">verify</span>' : "",
          ].filter(Boolean).join(" ");
          return `
            <button type="button" class="tl-interactive-item ${on ? "active" : ""} ${it.uncertain ? "uncertain" : ""} ${it.recent ? "recent" : ""}" data-timeline-id="${escapeHtml(it.id)}">
              <div class="tl-interactive-rail" aria-hidden="true"><span class="tl-interactive-dot"></span></div>
              <div class="tl-interactive-body">
                <div class="tl-when">${escapeHtml(when)} · <span class="tl-cat">${escapeHtml(cat)}</span> ${badges}${it.confidence ? ` · <span class="tl-cat">${escapeHtml(it.confidence)}</span>` : ""}</div>
                <h3>${escapeHtml(it.title)}</h3>
                ${on ? `
                  <p>${escapeHtml(body)}</p>
                  ${it.markets && it.markets.length ? `<p style="color:var(--muted);font-size:.82rem;margin:.35rem 0 0">Mercados: ${escapeHtml(it.markets.join(", "))}</p>` : ""}
                  ${it.uncertain || it.recent || (it.confidence || "").toLowerCase() === "medium" ? `<div class="callout warn verify-hint"><strong>Revisar</strong> — ${escapeHtml(it.verify_hint || "Verifica en tesla.com / autoridades; no fosilizar.")}</div>` : ""}
                  ${it.ask ? `<div class="callout tip"><strong>Verifica:</strong> ${escapeHtml(it.ask)}</div>` : ""}
                  ${(it.verify || []).length ? `<ul class="bullets" style="margin-top:.5rem">${it.verify.map((v) => `<li>${escapeHtml(v)}</li>`).join("")}</ul>` : ""}
                ` : `<p class="tl-preview">${escapeHtml(preview)}</p>`}
              </div>
            </button>`;
        }).join("") : `<p class="empty">No hay hitos en este filtro.</p>`}
      </div>
      <div class="hero-actions" style="margin-top:1rem">
        <button type="button" class="btn btn-primary" data-module="actualidad">Estudiar módulo Actualidad</button>
        <a class="btn btn-ghost" href="https://www.tesla.com/es_es" target="_blank" rel="noopener">tesla.com/es_es</a>
        <button type="button" class="btn btn-ghost" data-go="home">Inicio</button>
      </div>
    `;
  }

  function renderSection(sec) {
    switch (sec.type) {
      case "quote":
        return `<div class="callout quote"><strong>${escapeHtml(sec.title || "")}</strong><p>${escapeHtml(sec.body)}</p>${sec.note ? `<p style="color:var(--muted);font-size:.85rem;margin:.5rem 0 0">${escapeHtml(sec.note)}</p>` : ""}</div>`;
      case "callout":
        return `<div class="callout ${escapeHtml(sec.variant || "")}">${escapeHtml(sec.body)}</div>`;
      case "bullets":
        return `<div class="card"><h3>${escapeHtml(sec.title)}</h3><ul class="bullets">${sec.items.map((i) => `<li>${escapeHtml(i)}</li>`).join("")}</ul></div>`;
      case "phrases":
        return `<div class="card"><h3>${escapeHtml(sec.title)}</h3><ul class="bullets">${sec.items.map((i) => `<li>«${escapeHtml(i)}»</li>`).join("")}</ul></div>`;
      case "cards":
        return `<div class="section-head"><div><h2>${escapeHtml(sec.title)}</h2></div></div><div class="grid grid-2">${sec.items.map((i) => `<div class="card"><h3>${escapeHtml(i.title)}</h3><p>${escapeHtml(i.body)}</p></div>`).join("")}</div>`;
      case "table":
        return `<div class="section-head"><div><h2>${escapeHtml(sec.title)}</h2></div></div><div class="table-wrap"><table><thead><tr>${sec.headers.map((h) => `<th>${escapeHtml(h)}</th>`).join("")}</tr></thead><tbody>${sec.rows.map((r) => `<tr>${r.map((c) => `<td>${escapeHtml(c)}</td>`).join("")}</tr>`).join("")}</tbody></table></div>`;
      case "timeline":
        return `<div class="section-head"><div><h2>${escapeHtml(sec.title)}</h2></div></div><div class="timeline">${sec.items.map((it) => `
          <div class="timeline-item">
            <div class="tl-dot">${escapeHtml(it.step)}</div>
            <div class="tl-body">
              <div class="rot">${escapeHtml(it.rotation)}</div>
              <h4>${escapeHtml(it.title)}</h4>
              <p>${escapeHtml(it.body)}</p>
            </div>
          </div>`).join("")}</div>`;
      case "split":
        return `<div class="section-head"><div><h2>${escapeHtml(sec.title)}</h2></div></div><div class="grid grid-2">
          <div class="card"><h3>${escapeHtml(sec.left.title)}</h3><ul class="bullets">${sec.left.items.map((i) => `<li>${escapeHtml(i)}</li>`).join("")}</ul></div>
          <div class="card"><h3>${escapeHtml(sec.right.title)}</h3><ul class="bullets">${sec.right.items.map((i) => `<li>${escapeHtml(i)}</li>`).join("")}</ul></div>
        </div>`;
      case "checklist": {
        const store = getStore();
        const key = sec.storageKey || "checklist";
        const saved = store.checklist[key] || {};
        return `<div class="card"><h3>${escapeHtml(sec.title)}</h3><ul class="checklist">${sec.items.map((item, idx) => {
          const id = key + "-" + idx;
          const checked = saved[idx] ? "checked" : "";
          return `<li><input type="checkbox" data-check-key="${escapeHtml(key)}" data-check-idx="${idx}" id="${id}" ${checked}/><label for="${id}">${escapeHtml(item)}</label></li>`;
        }).join("")}</ul></div>`;
      }
      case "faq":
        return `<div class="section-head"><div><h2>${escapeHtml(sec.title)}</h2></div></div><div class="faq">${sec.items.map((f) => `<details><summary>${escapeHtml(f.q)}</summary><p>${escapeHtml(f.a)}</p></details>`).join("")}</div>`;
      default:
        return "";
    }
  }

  function renderModule() {
    const m = window.MODULES.find((x) => x.id === state.moduleId);
    if (!m) return `<p class="empty">Módulo no encontrado.</p>`;
    if (m.path === "optional-ftt" && !isFttMode()) {
      return `<p class="empty">Este módulo es FTT opcional. Activa <strong>Modo Future Talent</strong> en Inicio.</p>
        <button type="button" class="btn btn-primary" data-go="home">Ir al inicio</button>`;
    }
    markModuleOpened(m.id);
    const p = moduleProgress(m.id);
    const path = studyPath();
    const nextId = path[path.indexOf(m.id) + 1];
    const next = window.MODULES.find((x) => x.id === nextId);
    const extraTools =
      m.id === "estructura" ? `<button type="button" class="btn btn-ghost" data-go="map">Abrir mapa interactivo</button>` :
      m.id === "productos" ? `<button type="button" class="btn btn-ghost" data-go="compare">Abrir comparador</button>` :
      m.id === "como-opera" ? `<button type="button" class="btn btn-ghost" data-go="ops">Ops día a día</button><button type="button" class="btn btn-ghost" data-go="charging">Carga / Europa</button>` :
      m.id === "actualidad" ? `<button type="button" class="btn btn-ghost" data-go="timeline">Abrir timeline</button><button type="button" class="btn btn-ghost" data-go="timeline-changed">¿Qué ha cambiado?</button>` : "";

    return `
      <nav class="breadcrumb">
        <button type="button" data-go="home">Inicio</button>
        <span>/</span>
        <button type="button" data-go="modules">Módulos</button>
        <span>/</span>
        <span>${escapeHtml(m.title)}</span>
      </nav>
      <div class="module-hero">
        <div class="tag">${escapeHtml(m.tags.join(" · "))}${m.path === "optional-ftt" ? " · opcional FTT" : ""}</div>
        <h1>${escapeHtml(m.icon)} ${escapeHtml(m.title)}</h1>
        <p>${escapeHtml(m.summary)}</p>
        <div class="card-meta" style="margin-top:1rem">
          <div class="progress-bar"><span style="width:${p}%"></span></div>
          <span>${p}%</span>
        </div>
      </div>
      ${m.sections.map(renderSection).join("")}
      <div class="hero-actions" style="margin-top:1.5rem">
        <button type="button" class="btn btn-primary" data-done="${escapeHtml(m.id)}">Marcar como estudiado</button>
        ${extraTools}
        ${next ? `<button type="button" class="btn btn-ghost" data-module="${escapeHtml(next.id)}">Siguiente: ${escapeHtml(next.title)}</button>` : `<button type="button" class="btn btn-ghost" data-go="examen">Ir al quiz</button>`}
      </div>
    `;
  }

  /* ---------- QUIZ ---------- */

  function isAutoScore(q) {
    const t = (q.type || "").toLowerCase();
    return t.includes("opción") || t.includes("verdadero") || (q.options && q.options.length);
  }

  function normalizeAnswer(q, user) {
    if (!user) return false;
    const ans = String(q.answer || "").trim();
    if (q.options && q.options.length) {
      return user.toUpperCase() === ans.toUpperCase().replace(/[^A-D].*$/i, "").charAt(0) ||
        user.toUpperCase() === ans.toUpperCase();
    }
    const t = (q.type || "").toLowerCase();
    if (t.includes("verdadero") || t.includes("falso")) {
      const u = user.toLowerCase();
      const a = ans.toLowerCase();
      if (a.startsWith("verdadero") || a === "true" || a === "v") return u === "verdadero" || u === "v" || u === "true";
      if (a.startsWith("falso") || a === "false" || a === "f") return u === "falso" || u === "f" || u === "false";
    }
    return false;
  }

  function isShortAnswer(q) {
    const t = (q.type || "").toLowerCase();
    return t.includes("corta") || t.includes("abierta") || (!(q.options && q.options.length) && !t.includes("verdadero") && !t.includes("falso"));
  }

  function buildQuiz(count, tag) {
    let pool = activeQuizBank().slice();
    if (tag && tag !== "all") pool = pool.filter((q) => q.tags.some((t) => t.toLowerCase() === tag.toLowerCase()));
    const shuffled = pool.slice().sort(() => Math.random() - 0.5);
    const selected = shuffled.slice(0, Math.min(count, shuffled.length));
    return {
      questions: selected,
      index: 0,
      answers: {},
      revealed: {},
      selfGrade: {},
      tag: tag || "all",
      startedAt: Date.now(),
      missReview: false,
    };
  }

  function buildMissReviewQuiz() {
    const ids = getStore().lastWrongIds || [];
    const bank = activeQuizBank();
    const byId = new Map(bank.map((q) => [q.id, q]));
    const selected = ids.map((id) => byId.get(id)).filter(Boolean);
    return {
      questions: selected,
      index: 0,
      answers: {},
      revealed: {},
      selfGrade: {},
      tag: "repaso-fallos",
      startedAt: Date.now(),
      missReview: true,
    };
  }

  function allTags() {
    const set = new Set();
    activeQuizBank().forEach((q) => q.tags.forEach((t) => set.add(t)));
    return Array.from(set).sort();
  }

  function renderExamenSetup() {
    const tags = allTags();
    const bank = activeQuizBank();
    const autoCount = bank.filter(isAutoScore).length;
    const shortCount = bank.length - autoCount;
    const ftt = isFttMode();
    const wrongIds = getStore().lastWrongIds || [];
    const missBtn = wrongIds.length
      ? `<button type="button" class="btn btn-primary" data-miss-review>Repaso de fallos (${wrongIds.length})</button>`
      : "";
    return `
      <section class="quiz-setup">
        <div class="module-hero">
          <div class="tag">${ftt ? "Banco panorama + FTT" : "Banco panorama"}</div>
          <h1>Quiz</h1>
          <p>${bank.length} preguntas (${autoCount} auto-corregibles · ${shortCount} cortas con autoevaluación). Filtro por tag incluido.${ftt ? " Incluye el banco corto FTT." : ""}</p>
        </div>
        <div class="card">
          <h3>Configurar simulacro</h3>
          <p style="color:var(--muted);font-size:.9rem;margin:.4rem 0 1rem">Elige tamaño y tema. Se guarda la puntuación en este navegador. Tras un intento, puedes retomar solo las falladas.</p>
          <div class="tag-row" id="quiz-tags">
            <button type="button" class="chip active" data-tag="all">Todos</button>
            ${tags.map((t) => `<button type="button" class="chip" data-tag="${escapeHtml(t)}">${escapeHtml(t)}</button>`).join("")}
          </div>
          <div class="hero-actions" style="margin-top:1rem">
            <button type="button" class="btn btn-primary" data-start-quiz="15">Simulacro rápido (15)</button>
            <button type="button" class="btn btn-ghost" data-start-quiz="30">Examen largo (30)</button>
            <button type="button" class="btn btn-ghost" data-start-quiz="999">Todo el banco</button>
            ${missBtn}
          </div>
        </div>
        ${renderQuizHistory()}
      </section>
    `;
  }

  function renderQuizHistory() {
    const hist = (getStore().quizHistory || []).slice(-5).reverse();
    if (!hist.length) return "";
    return `<div class="section-head"><div><h2>Historial reciente</h2></div></div>
      <div class="grid">${hist.map((h) => `
        <div class="card" style="display:flex;justify-content:space-between;align-items:center;gap:1rem">
          <div>
            <strong>${h.correct}/${h.total}</strong> · ${h.pct}%
            <div style="color:var(--muted);font-size:.8rem">${new Date(h.at).toLocaleString("es-ES", { dateStyle: "short", timeStyle: "short" })} · tag: ${escapeHtml(h.tag || "all")}</div>
          </div>
          <span class="pill">${h.pct}%</span>
        </div>`).join("")}</div>`;
  }

  function renderQuizPlay() {
    const qz = state.quiz;
    if (!qz || !qz.questions.length) {
      return `<p class="empty">No hay preguntas para ese filtro. <button type="button" class="btn btn-ghost btn-sm" data-go="examen">Volver</button></p>`;
    }
    const i = qz.index;
    const q = qz.questions[i];
    const revealed = !!qz.revealed[q.id];
    const selected = qz.answers[q.id];
    const total = qz.questions.length;

    let optionsHtml = "";
    const shortQ = isShortAnswer(q);
    if (q.options && q.options.length) {
      optionsHtml = `<div class="option-list">${q.options.map((o) => {
        let cls = "option";
        if (selected === o.key) cls += " selected";
        if (revealed) {
          const ansKey = String(q.answer || "").trim().toUpperCase().charAt(0);
          if (o.key === ansKey) cls += " correct";
          else if (selected === o.key) cls += " wrong";
        }
        return `<button type="button" class="${cls}" data-answer="${escapeHtml(o.key)}" ${revealed ? "disabled" : ""}><strong>${escapeHtml(o.key)}.</strong> ${escapeHtml(o.text)}</button>`;
      }).join("")}</div>`;
    } else if (shortQ) {
      optionsHtml = `<textarea class="star-field" data-short-answer rows="4" placeholder="Escribe tu respuesta en 2–4 frases…" ${revealed ? "readonly" : ""}>${escapeHtml(selected || "")}</textarea>
        <p style="color:var(--muted);font-size:.8rem;margin:.4rem 0 0">Respuesta corta: luego comparas con el modelo (autoevaluación).</p>`;
    } else {
      const opts = [
        { key: "Verdadero", label: "Verdadero" },
        { key: "Falso", label: "Falso" },
      ];
      optionsHtml = `<div class="option-list">${opts.map((o) => {
        let cls = "option";
        if (selected === o.key) cls += " selected";
        if (revealed) {
          const ok = normalizeAnswer(q, o.key);
          if (ok) cls += " correct";
          else if (selected === o.key) cls += " wrong";
        }
        return `<button type="button" class="${cls}" data-answer="${escapeHtml(o.key)}" ${revealed ? "disabled" : ""}>${escapeHtml(o.label)}</button>`;
      }).join("")}</div>`;
    }

    const graded = qz.selfGrade[q.id];
    const shortGradeHtml = shortQ && revealed && graded === undefined
      ? `<div class="hero-actions" style="margin-top:.75rem">
           <span style="color:var(--muted);font-size:.85rem;align-self:center">¿Tu respuesta encaja con el modelo?</span>
           <button type="button" class="btn btn-primary" data-self-grade="yes">Sí, me cuadra</button>
           <button type="button" class="btn btn-ghost" data-self-grade="no">No, fallé</button>
         </div>`
      : shortQ && revealed && graded !== undefined
        ? `<p style="margin:.75rem 0 0;font-size:.9rem">${graded ? "✅ Autoevaluación: correcta" : "❌ Autoevaluación: a repasar"}</p>`
        : "";

    const canReveal = shortQ ? !!(selected && String(selected).trim()) : !!selected;
    const canAdvance = !shortQ || graded !== undefined;
    const modeLabel = qz.missReview ? "Repaso de fallos" : escapeHtml((q.tags || []).join(", "));

    return `
      <section class="quiz-play">
        <div class="quiz-progress">Pregunta ${i + 1} de ${total} · ${modeLabel}</div>
        <div class="progress-bar" style="margin-bottom:1rem"><span style="width:${Math.round((i / total) * 100)}%"></span></div>
        <div class="card">
          <h2 style="margin:0 0 .5rem;font-size:1.15rem">${escapeHtml(q.question)}</h2>
          <p style="margin:0;color:var(--muted);font-size:.8rem">${escapeHtml(q.type)}</p>
          ${optionsHtml}
          ${revealed ? `<div class="callout tip"><strong>Explicación:</strong> ${escapeHtml(q.explanation || "—")}<br/><span style="color:var(--muted)">Modelo: ${escapeHtml(q.answer)}</span></div>` : ""}
          ${shortGradeHtml}
          <div class="hero-actions">
            ${!revealed ? `<button type="button" class="btn btn-primary" data-reveal ${!canReveal ? "disabled style=\"opacity:.5\"" : ""}>Comprobar</button>` : ""}
            ${revealed && canAdvance && i < total - 1 ? `<button type="button" class="btn btn-primary" data-next-q>Siguiente</button>` : ""}
            ${revealed && canAdvance && i === total - 1 ? `<button type="button" class="btn btn-primary" data-finish-quiz>Ver resultado</button>` : ""}
            <button type="button" class="btn btn-ghost" data-go="examen">Abandonar</button>
          </div>
        </div>
      </section>
    `;
  }

  function finishQuiz() {
    const qz = state.quiz;
    let correct = 0;
    const wrongIds = [];
    qz.questions.forEach((q) => {
      let ok = false;
      if (isShortAnswer(q)) {
        ok = !!qz.selfGrade[q.id];
      } else {
        ok = normalizeAnswer(q, qz.answers[q.id]);
      }
      if (ok) correct++;
      else wrongIds.push(q.id);
    });
    const total = qz.questions.length;
    const pct = total ? Math.round((correct / total) * 100) : 0;
    const s = getStore();
    s.quizHistory = s.quizHistory || [];
    s.quizHistory.push({ at: Date.now(), correct, total, pct, tag: qz.tag, missReview: !!qz.missReview });
    s.lastWrongIds = wrongIds;
    s.modules["banco-panorama"] = s.modules["banco-panorama"] || {};
    s.modules["banco-panorama"].opened = true;
    if (pct >= 70) s.modules["banco-panorama"].done = true;
    saveStore(s);
    state.quizResult = { correct, total, pct, questions: qz.questions, answers: qz.answers, selfGrade: qz.selfGrade || {}, wrongIds };
    state.view = "quiz-result";
    render();
  }

  function renderQuizResult() {
    const r = state.quizResult;
    if (!r) return renderExamenSetup();
    const ftt = isFttMode();
    const msg =
      r.pct >= 85 ? "Excelente panorama de la compañía." :
      r.pct >= 70 ? "Buen nivel. Repasa los fallos y el módulo del tag." :
      r.pct >= 50 ? "Vas camino. Revisa Qué es Tesla, Productos y Cómo opera." :
      "Empieza por la ruta panorama y repite el simulacro.";

    const wrongCount = (r.wrongIds || []).length;
    const missBtn = wrongCount
      ? `<button type="button" class="btn btn-primary" data-miss-review>Repaso de fallos (${wrongCount})</button>`
      : "";

    const review = r.questions.map((q) => {
      const ok = isShortAnswer(q)
        ? !!r.selfGrade[q.id]
        : normalizeAnswer(q, r.answers[q.id]);
      const label = isShortAnswer(q)
        ? (ok ? "✅ Autoeval. OK" : "❌ Autoeval. falló")
        : (ok ? "✅ Correcta" : "❌ Incorrecta");
      return `<div class="card" style="border-color:${ok ? "rgba(34,197,94,.4)" : "rgba(227,25,55,.45)"}">
        <div style="font-size:.78rem;color:var(--muted);margin-bottom:.35rem">${label} · ${escapeHtml((q.tags || []).join(", "))}</div>
        <strong>${escapeHtml(q.question)}</strong>
        <p style="margin:.5rem 0 0;color:var(--muted);font-size:.88rem">Tu respuesta: ${escapeHtml(r.answers[q.id] || "—")} · Modelo: ${escapeHtml(q.answer)}</p>
        <p style="margin:.35rem 0 0;font-size:.88rem">${escapeHtml(q.explanation || "")}</p>
      </div>`;
    }).join("");

    return `
      <section class="quiz-result">
        <div class="module-hero" style="text-align:center">
          <div class="tag">Resultado</div>
          <div class="score-ring" style="--p:${r.pct}%"><span>${r.pct}%</span></div>
          <h1 style="margin-top:.5rem">${r.correct} / ${r.total} aciertos</h1>
          <p>${escapeHtml(msg)}</p>
          <div class="hero-actions" style="justify-content:center;margin-top:1rem">
            ${missBtn}
            <button type="button" class="btn ${missBtn ? "btn-ghost" : "btn-primary"}" data-go="examen">Nuevo simulacro</button>
            ${ftt ? `<button type="button" class="btn btn-ghost" data-go="star">Ir a STAR</button>` : ""}
            <button type="button" class="btn btn-ghost" data-go="home">Inicio</button>
          </div>
          ${wrongCount ? `<p style="margin:.85rem 0 0;color:var(--muted);font-size:.82rem">IDs de fallos guardados en localStorage (${escapeHtml(STORAGE_KEY)} · lastWrongIds).</p>` : ""}
        </div>
        <div class="section-head"><div><h2>Repaso</h2></div></div>
        <div class="grid">${review}</div>
      </section>
    `;
  }

  /* ---------- STAR ---------- */

  function renderStar() {
    if (!isFttMode()) {
      return `<p class="empty">STAR forma parte del <strong>Modo Future Talent</strong> (apagado). Actívalo en Inicio.</p>
        <button type="button" class="btn btn-primary" data-go="home">Ir al inicio</button>`;
    }
    const templates = window.STAR_TEMPLATES;
    const current = templates.find((t) => t.id === state.starId) || templates[0];
    state.starId = current.id;
    const saved = (getStore().star || {})[current.id] || {};

    return `
      <div class="module-hero">
        <div class="tag">Opcional · Future Talent</div>
        <h1>★ Kit STAR</h1>
        <p>6 historias de práctica (no son preguntas filtradas de Tesla). 60–90 s oral · Actions en 1ª persona · 1 métrica si existe.</p>
      </div>
      <div class="star-tabs">
        ${templates.map((t) => `<button type="button" class="${t.id === current.id ? "active" : ""}" data-star="${escapeHtml(t.id)}">${escapeHtml(t.title)}</button>`).join("")}
      </div>
      <div class="card">
        <h3>${escapeHtml(current.title)}</h3>
        <p style="color:var(--muted);margin:.4rem 0 1rem">${escapeHtml(current.prompt)}</p>
        <p style="font-size:.82rem;margin:0 0 1rem"><strong>Anclas:</strong> ${escapeHtml(current.anchors)} · <strong>Puente:</strong> ${escapeHtml(current.bridge)}</p>
        ${current.fields.map((f) => `
          <div class="star-field">
            <label for="star-${escapeHtml(f)}">${escapeHtml(f)}</label>
            <textarea id="star-${escapeHtml(f)}" data-star-field="${escapeHtml(f)}" placeholder="Escribe aquí…">${escapeHtml(saved[f] || "")}</textarea>
          </div>`).join("")}
        <div class="hero-actions">
          <button type="button" class="btn btn-primary" data-save-star>Guardar historia</button>
          <button type="button" class="btn btn-ghost" data-clear-star>Limpiar</button>
        </div>
        <p class="saved-hint" id="star-saved-hint"></p>
      </div>
      <div class="card" style="margin-top:1rem">
        <h3>Mini-rúbrica</h3>
        <ul class="bullets">
          <li>¿Se entiende el impacto en 10 segundos?</li>
          <li>¿Tus Actions son tuyas (verbos en primera persona)?</li>
          <li>¿Hay resultado (aunque sea aprendizaje duro)?</li>
          <li>¿Evitas jerga interna inventada de Tesla?</li>
          <li>¿Puedes contarla en español e inglés B1+?</li>
        </ul>
      </div>
    `;
  }

  /* ---------- GLOSARIO ---------- */

  function glossaryTerms() {
    return window.GLOSSARY || [];
  }

  function glossaryTags() {
    const set = new Set();
    glossaryTerms().forEach((t) => (t.tags || []).forEach((x) => set.add(x)));
    return Array.from(set).sort();
  }

  function filterGlossary() {
    const q = String(state.glossaryQuery || "").trim().toLowerCase();
    const tag = state.glossaryTag || "all";
    return glossaryTerms().filter((t) => {
      if (tag !== "all" && !(t.tags || []).includes(tag)) return false;
      if (!q) return true;
      const blob = [t.term, t.short, t.id, ...(t.tags || []), ...(t.related || [])].join(" ").toLowerCase();
      return blob.includes(q);
    });
  }

  function renderGlossary() {
    const all = glossaryTerms();
    const filtered = filterGlossary();
    const tags = glossaryTags();
    const activeId = state.glossaryId || filtered[0]?.id || all[0]?.id;
    const active = all.find((t) => t.id === activeId) || filtered[0];
    const related = (active?.related || [])
      .map((id) => all.find((t) => t.id === id))
      .filter(Boolean);

    return `
      <nav class="breadcrumb">
        <button type="button" data-go="home">Inicio</button>
        <span>/</span>
        <span>Glosario</span>
      </nav>
      <div class="module-hero">
        <div class="tag">glosario · ${all.length} términos · búsqueda en vivo</div>
        <h1>Aa Glosario Tesla</h1>
        <p>Definiciones públicas cortas (ES/EU). Naming y disponibilidad de software varían por mercado — verifica en tesla.com/es_es.</p>
      </div>
      <div class="glossary-search card">
        <label class="glossary-search-label" for="glossary-q">Buscar</label>
        <input type="search" id="glossary-q" placeholder="FSD, OTA, WLTP, Megapack, Delivery, Trade-in…" value="${escapeHtml(state.glossaryQuery || "")}" autocomplete="off" />
        <div class="tag-row" id="glossary-tags">
          <button type="button" class="chip ${state.glossaryTag === "all" ? "active" : ""}" data-glossary-tag="all">Todos</button>
          ${tags.map((t) => `<button type="button" class="chip ${state.glossaryTag === t ? "active" : ""}" data-glossary-tag="${escapeHtml(t)}">${escapeHtml(t)}</button>`).join("")}
        </div>
        <p class="glossary-count">${filtered.length} resultado${filtered.length === 1 ? "" : "s"}</p>
      </div>
      <div class="glossary-layout">
        <div class="glossary-list" role="list">
          ${filtered.length ? filtered.map((t) => `
            <button type="button" class="glossary-item ${t.id === active?.id ? "active" : ""}" data-glossary-id="${escapeHtml(t.id)}" role="listitem">
              <strong>${escapeHtml(t.term)}</strong>
              <span>${escapeHtml((t.tags || []).slice(0, 3).join(" · "))}</span>
            </button>`).join("") : `<p class="empty">Sin coincidencias. Prueba otro término.</p>`}
        </div>
        <aside class="card glossary-detail">
          ${active ? `
            <div class="map-panel-kicker">${escapeHtml((active.tags || []).join(" · "))}</div>
            <h2>${escapeHtml(active.term)}</h2>
            <p>${escapeHtml(active.short)}</p>
            ${related.length ? `<h3 style="margin-top:1rem;font-size:.9rem">Ver también</h3>
              <div class="tag-row">${related.map((r) => `<button type="button" class="chip" data-glossary-id="${escapeHtml(r.id)}">${escapeHtml(r.term)}</button>`).join("")}</div>` : ""}
            <div class="callout tip" style="margin-top:1rem">Fuente de estudio no oficial. Si un nombre de software no aparece en tu mercado, no lo inventes en una conversación de cliente.</div>
          ` : `<p class="empty">Selecciona un término.</p>`}
        </aside>
      </div>
    `;
  }

  /* ---------- CARGA / EUROPA ---------- */

  function renderCharging() {
    const data = window.CHARGING_EU || {};
    const layers = data.layers || [];
    const spain = data.spain || {};
    const activeId = state.chargingLayerId || layers[0]?.id;
    const active = layers.find((l) => l.id === activeId) || layers[0];
    const milestone = spain.milestone_press || {};
    const nodes = spain.nodes_for_ui || [];

    return `
      <nav class="breadcrumb">
        <button type="button" data-go="home">Inicio</button>
        <span>/</span>
        <span>Carga / Europa</span>
      </nav>
      <div class="module-hero">
        <div class="tag">charging · ${escapeHtml(data.version || "")} · mercado ${escapeHtml(data.market_default || "ES")}</div>
        <h1>⌁ Carga en Europa y España</h1>
        <p>Ecosistema de alto nivel: casa, Destination, Supercharger y notas de roaming. <strong>Sin mapa GPS inventado</strong> — números vivos en Find Us.</p>
      </div>
      <div class="grid grid-2">
        ${layers.map((l) => `
          <button type="button" class="card card-clickable charging-layer ${l.id === active?.id ? "active" : ""}" data-charging-layer="${escapeHtml(l.id)}">
            <div class="map-panel-kicker">${escapeHtml(l.kind || "capa")}</div>
            <h3>${escapeHtml(l.label)}</h3>
            <p>${escapeHtml(l.description)}</p>
          </button>`).join("")}
      </div>
      ${active ? `<div class="card" style="margin-top:1rem">
        <h3>${escapeHtml(active.label)}</h3>
        <p>${escapeHtml(active.description)}</p>
      </div>` : ""}
      <div class="section-head"><div><h2>España — lectura cualitativa</h2><p>${escapeHtml(spain.summary || "")}</p></div></div>
      <div class="grid grid-2">
        ${(spain.qualitative || []).map((q) => `<div class="card"><p style="margin:0">${escapeHtml(q)}</p></div>`).join("")}
      </div>
      ${milestone.claim ? `
        <div class="callout warn verify-hint" style="margin-top:1rem">
          <span class="badge-uncertain">perishable</span>
          <strong>Hito prensa (${escapeHtml(milestone.as_of || "")}, confianza ${escapeHtml(milestone.confidence || "medium")}):</strong>
          ${escapeHtml(milestone.claim)}
          <ul class="bullets" style="margin-top:.5rem">${(milestone.verify || []).map((v) => `<li>${escapeHtml(v)}</li>`).join("")}</ul>
        </div>` : ""}
      <div class="section-head"><div><h2>Cards de región / capa</h2><p>Enlaces oficiales — no inventamos stalls por ciudad.</p></div></div>
      <div class="grid grid-2">
        ${nodes.map((n) => `
          <div class="card region-card">
            <div class="map-panel-kicker">${escapeHtml(n.region || "ES/EU")} · ${escapeHtml(n.layer || "")}</div>
            <h3>${escapeHtml(n.label)}</h3>
            ${n.map_url ? `<a class="btn btn-ghost btn-sm" href="${escapeHtml(n.map_url)}" target="_blank" rel="noopener">Abrir mapa oficial</a>` : `<p style="color:var(--muted);font-size:.85rem;margin:0">Capa conceptual — verifica en Find Us / soporte.</p>`}
          </div>`).join("")}
      </div>
      ${(data.notes || []).length ? `<div class="card" style="margin-top:1rem"><h3>Notas</h3><ul class="bullets">${data.notes.map((n) => `<li>${escapeHtml(n)}</li>`).join("")}</ul></div>` : ""}
      <div class="hero-actions" style="margin-top:1rem">
        <a class="btn btn-primary" href="https://www.tesla.com/es_ES/findus" target="_blank" rel="noopener">Find Us ES</a>
        <a class="btn btn-ghost" href="https://www.tesla.com/trips" target="_blank" rel="noopener">Trip planner</a>
        <button type="button" class="btn btn-ghost" data-go="glossary">Glosario carga</button>
        <button type="button" class="btn btn-ghost" data-module="como-opera">Módulo Cómo opera</button>
      </div>
    `;
  }

  /* ---------- OPS DÍA A DÍA ---------- */

  function renderOps() {
    const flow = window.OPS_FLOW || {};
    const stages = flow.stages || [];
    if (!stages.length) return `<p class="empty">Ops flow no disponible.</p>`;
    let idx = Number(state.opsStep) || 0;
    if (idx < 0) idx = 0;
    if (idx >= stages.length) idx = stages.length - 1;
    state.opsStep = idx;
    const stage = stages[idx];

    return `
      <nav class="breadcrumb">
        <button type="button" data-go="home">Inicio</button>
        <span>/</span>
        <button type="button" data-module="como-opera">Cómo opera</button>
        <span>/</span>
        <span>Ops día a día</span>
      </nav>
      <div class="module-hero">
        <div class="tag">ops_flow · ${escapeHtml(flow.version || "")} · ${escapeHtml(flow.market_default || "ES")}</div>
        <h1>→ Ops día a día</h1>
        <p>${escapeHtml(flow.disclaimer || "Journey público venta → entrega → servicio.")} Complementa el módulo Cómo opera.</p>
      </div>
      <div class="ops-stepper" role="tablist" aria-label="Etapas del journey">
        ${stages.map((s, i) => `
          <button type="button" class="ops-step ${i === idx ? "active" : ""} ${i < idx ? "done" : ""}" data-ops-step="${i}" role="tab" aria-selected="${i === idx}">
            <span class="ops-step-num">${i + 1}</span>
            <span class="ops-step-label">${escapeHtml(s.title)}</span>
          </button>`).join("")}
      </div>
      <div class="card ops-stage-card">
        <div class="map-panel-kicker">Etapa ${idx + 1} / ${stages.length}</div>
        <h2>${escapeHtml(stage.title)}</h2>
        <p>${escapeHtml(stage.what_happens)}</p>
        <div class="grid grid-2" style="margin-top:1rem">
          <div class="card" style="background:var(--bg-elev)">
            <h3>Lo que ve el cliente</h3>
            <p>${escapeHtml(stage.customer_sees)}</p>
          </div>
          <div class="card" style="background:var(--bg-elev)">
            <h3>Equipo Tesla (visible)</h3>
            <p>${escapeHtml(stage.tesla_team)}</p>
          </div>
        </div>
        <div class="hero-actions" style="margin-top:1.1rem">
          <button type="button" class="btn btn-ghost" data-ops-step="${Math.max(0, idx - 1)}" ${idx === 0 ? "disabled style=\"opacity:.45\"" : ""}>← Anterior</button>
          <button type="button" class="btn btn-primary" data-ops-step="${Math.min(stages.length - 1, idx + 1)}" ${idx === stages.length - 1 ? "disabled style=\"opacity:.45\"" : ""}>Siguiente →</button>
        </div>
      </div>
      <div class="callout tip" style="margin-top:1rem">
        <strong>Handoffs clave:</strong> Sales → Delivery (no «empezar de cero»); Delivery → Ownership (carga en casa); Ownership → Service (síntomas claros); Service → Parts.
      </div>
      <div class="hero-actions">
        <button type="button" class="btn btn-ghost" data-module="como-opera">Abrir módulo Cómo opera</button>
        <button type="button" class="btn btn-ghost" data-go="charging">Carga / Europa</button>
        <button type="button" class="btn btn-ghost" data-go="glossary">Glosario ops</button>
      </div>
    `;
  }

  /* ---------- MAIN RENDER + EVENTS ---------- */

  function render() {
    setActiveNav(state.view);
    updateProgressPill();
    syncFttChrome();
    let html = "";
    switch (state.view) {
      case "home": html = renderHome(); break;
      case "modules": html = renderModulesList(); break;
      case "module": html = renderModule(); break;
      case "map": html = renderMap(); break;
      case "compare": html = renderCompare(); break;
      case "timeline": html = renderTimeline(); break;
      case "glossary": html = renderGlossary(); break;
      case "charging": html = renderCharging(); break;
      case "ops": html = renderOps(); break;
      case "examen": html = renderExamenSetup(); break;
      case "quiz-play": html = renderQuizPlay(); break;
      case "quiz-result": html = renderQuizResult(); break;
      case "star": html = renderStar(); break;
      default: html = renderHome();
    }
    $main.classList.remove("view-enter");
    $main.innerHTML = html;
    // force reflow for enter animation
    void $main.offsetWidth;
    $main.classList.add("view-enter");
    bindDynamic();
  }

  function openModule(id) {
    const m = window.MODULES.find((x) => x.id === id);
    if (!m) return;
    if (m.path === "optional-ftt" && !isFttMode()) return navigate("home");
    if (m.isQuiz) return navigate("examen");
    if (m.isStar) return navigate("star");
    navigate("module", { moduleId: id });
  }

  function firstIncomplete() {
    for (const id of studyPath()) {
      if (moduleProgress(id) < 100) return id;
    }
    return studyPath()[0];
  }

  function startMissReview() {
    const qz = buildMissReviewQuiz();
    if (!qz.questions.length) {
      navigate("examen");
      return;
    }
    state.quiz = qz;
    state.view = "quiz-play";
    location.hash = "#/examen";
    render();
  }

  function bindDynamic() {
    $main.querySelectorAll("[data-module]").forEach((el) => {
      el.addEventListener("click", () => openModule(el.getAttribute("data-module")));
    });
    $main.querySelectorAll("[data-go]").forEach((el) => {
      el.addEventListener("click", () => {
        const go = el.getAttribute("data-go");
        if (go === "path") return openModule(firstIncomplete());
        if (go === "examen") return navigate("examen");
        if (go === "star") return navigate("star");
        if (go === "home") return navigate("home");
        if (go === "modules") return navigate("modules");
        if (go === "map") return navigate("map", { mapAreaId: state.mapAreaId });
        if (go === "compare") return navigate("compare");
        if (go === "timeline") return navigate("timeline", { timelineId: state.timelineId, timelineMode: state.timelineMode || "all" });
        if (go === "timeline-changed") return navigate("timeline", { timelineMode: "changed", timelineId: null });
        if (go === "glossary") return navigate("glossary", { glossaryId: state.glossaryId });
        if (go === "charging") return navigate("charging", { chargingLayerId: state.chargingLayerId });
        if (go === "ops") return navigate("ops", { opsStep: state.opsStep || 0 });
      });
    });
    $main.querySelectorAll("[data-done]").forEach((el) => {
      el.addEventListener("click", () => {
        markModuleDone(el.getAttribute("data-done"));
        el.textContent = "✓ Estudiado";
        el.disabled = true;
      });
    });
    $main.querySelectorAll("[data-check-key]").forEach((el) => {
      el.addEventListener("change", () => {
        const key = el.getAttribute("data-check-key");
        const idx = el.getAttribute("data-check-idx");
        const s = getStore();
        s.checklist[key] = s.checklist[key] || {};
        s.checklist[key][idx] = el.checked;
        saveStore(s);
      });
    });

    const fttToggle = $main.querySelector("#ftt-mode-toggle");
    if (fttToggle) {
      fttToggle.addEventListener("change", () => setFttMode(fttToggle.checked));
    }

    $main.querySelectorAll("[data-map-area]").forEach((btn) => {
      btn.addEventListener("click", () => {
        navigate("map", { mapAreaId: btn.getAttribute("data-map-area") });
      });
    });

    $main.querySelectorAll("[data-compare-mode]").forEach((btn) => {
      btn.addEventListener("click", () => {
        const mode = btn.getAttribute("data-compare-mode");
        state.compareMode = mode;
        const pool = comparePool();
        state.compareLeft = pool[0]?.id || state.compareLeft;
        state.compareRight = pool[1]?.id || pool[0]?.id || state.compareRight;
        render();
      });
    });
    const leftSel = $main.querySelector("#compare-left");
    const rightSel = $main.querySelector("#compare-right");
    if (leftSel) {
      leftSel.addEventListener("change", () => {
        state.compareLeft = leftSel.value;
        render();
      });
    }
    if (rightSel) {
      rightSel.addEventListener("change", () => {
        state.compareRight = rightSel.value;
        render();
      });
    }

    $main.querySelectorAll("[data-timeline-id]").forEach((btn) => {
      btn.addEventListener("click", () => {
        navigate("timeline", { timelineId: btn.getAttribute("data-timeline-id"), timelineMode: state.timelineMode || "all" });
      });
    });
    $main.querySelectorAll("[data-timeline-mode]").forEach((btn) => {
      btn.addEventListener("click", () => {
        navigate("timeline", { timelineMode: btn.getAttribute("data-timeline-mode"), timelineId: null });
      });
    });

    const gq = $main.querySelector("#glossary-q");
    if (gq) {
      gq.addEventListener("input", () => {
        state.glossaryQuery = gq.value;
        render();
        const again = document.getElementById("glossary-q");
        if (again) {
          again.focus();
          const len = again.value.length;
          try { again.setSelectionRange(len, len); } catch (_) {}
        }
      });
    }
    $main.querySelectorAll("[data-glossary-tag]").forEach((btn) => {
      btn.addEventListener("click", () => {
        state.glossaryTag = btn.getAttribute("data-glossary-tag");
        render();
      });
    });
    $main.querySelectorAll("[data-glossary-id]").forEach((btn) => {
      btn.addEventListener("click", () => {
        navigate("glossary", { glossaryId: btn.getAttribute("data-glossary-id") });
      });
    });

    $main.querySelectorAll("[data-charging-layer]").forEach((btn) => {
      btn.addEventListener("click", () => {
        navigate("charging", { chargingLayerId: btn.getAttribute("data-charging-layer") });
      });
    });

    $main.querySelectorAll("[data-ops-step]").forEach((btn) => {
      btn.addEventListener("click", () => {
        if (btn.disabled) return;
        const step = parseInt(btn.getAttribute("data-ops-step"), 10);
        navigate("ops", { opsStep: Number.isFinite(step) ? step : 0 });
      });
    });

    let selectedTag = "all";
    $main.querySelectorAll("#quiz-tags .chip").forEach((chip) => {
      chip.addEventListener("click", () => {
        $main.querySelectorAll("#quiz-tags .chip").forEach((c) => c.classList.remove("active"));
        chip.classList.add("active");
        selectedTag = chip.getAttribute("data-tag");
        state.quizTag = selectedTag;
      });
    });
    $main.querySelectorAll("[data-start-quiz]").forEach((btn) => {
      btn.addEventListener("click", () => {
        const n = parseInt(btn.getAttribute("data-start-quiz"), 10);
        const tag = state.quizTag || selectedTag || "all";
        state.quiz = buildQuiz(n, tag);
        state.view = "quiz-play";
        location.hash = "#/examen";
        render();
      });
    });
    $main.querySelectorAll("[data-miss-review]").forEach((btn) => {
      btn.addEventListener("click", startMissReview);
    });

    $main.querySelectorAll("[data-answer]").forEach((btn) => {
      btn.addEventListener("click", () => {
        if (!state.quiz) return;
        const q = state.quiz.questions[state.quiz.index];
        state.quiz.answers[q.id] = btn.getAttribute("data-answer");
        render();
      });
    });
    const shortTa = $main.querySelector("[data-short-answer]");
    if (shortTa) {
      shortTa.addEventListener("input", () => {
        if (!state.quiz) return;
        const q = state.quiz.questions[state.quiz.index];
        state.quiz.answers[q.id] = shortTa.value;
        const btn = $main.querySelector("[data-reveal]");
        if (btn) {
          const ok = String(shortTa.value || "").trim().length > 0;
          btn.disabled = !ok;
          btn.style.opacity = ok ? "" : ".5";
        }
      });
    }
    $main.querySelectorAll("[data-self-grade]").forEach((btn) => {
      btn.addEventListener("click", () => {
        if (!state.quiz) return;
        const q = state.quiz.questions[state.quiz.index];
        state.quiz.selfGrade = state.quiz.selfGrade || {};
        state.quiz.selfGrade[q.id] = btn.getAttribute("data-self-grade") === "yes";
        render();
      });
    });
    const revealBtn = $main.querySelector("[data-reveal]");
    if (revealBtn) {
      revealBtn.addEventListener("click", () => {
        const q = state.quiz.questions[state.quiz.index];
        if (!String(state.quiz.answers[q.id] || "").trim()) return;
        state.quiz.revealed[q.id] = true;
        render();
      });
    }
    const nextBtn = $main.querySelector("[data-next-q]");
    if (nextBtn) {
      nextBtn.addEventListener("click", () => {
        state.quiz.index++;
        render();
      });
    }
    const finBtn = $main.querySelector("[data-finish-quiz]");
    if (finBtn) finBtn.addEventListener("click", finishQuiz);

    $main.querySelectorAll("[data-star]").forEach((btn) => {
      btn.addEventListener("click", () => navigate("star", { starId: btn.getAttribute("data-star") }));
    });
    const saveStar = $main.querySelector("[data-save-star]");
    if (saveStar) {
      saveStar.addEventListener("click", () => {
        const s = getStore();
        s.star[state.starId] = s.star[state.starId] || {};
        $main.querySelectorAll("[data-star-field]").forEach((ta) => {
          s.star[state.starId][ta.getAttribute("data-star-field")] = ta.value;
        });
        const filled = Object.values(s.star[state.starId]).filter((v) => String(v).trim().length > 20).length;
        if (filled >= 3) {
          s.modules["historias-star"] = s.modules["historias-star"] || {};
          s.modules["historias-star"].opened = true;
          s.modules["historias-star"].done = true;
        } else {
          s.modules["historias-star"] = s.modules["historias-star"] || {};
          s.modules["historias-star"].opened = true;
        }
        saveStore(s);
        const hint = document.getElementById("star-saved-hint");
        if (hint) {
          hint.textContent = "Guardado en este navegador · " + new Date().toLocaleTimeString("es-ES");
        }
        updateProgressPill();
      });
    }
    const clearStar = $main.querySelector("[data-clear-star]");
    if (clearStar) {
      clearStar.addEventListener("click", () => {
        $main.querySelectorAll("[data-star-field]").forEach((ta) => { ta.value = ""; });
        const s = getStore();
        s.star[state.starId] = {};
        saveStore(s);
      });
    }
  }

  document.querySelectorAll("[data-nav]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const nav = btn.getAttribute("data-nav");
      if (nav === "home") navigate("home");
      else if (nav === "modules") navigate("modules");
      else if (nav === "examen") navigate("examen");
      else if (nav === "star") navigate("star");
    });
  });

  window.addEventListener("hashchange", () => {
    parseHash();
  });

  syncFttChrome();
  updateProgressPill();
  if (location.hash && location.hash.length > 2) parseHash();
  else navigate("home");
})();
