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
    compareLeft: "model-3",
    compareRight: "model-y",
    compareMode: "vehicles",
    timelineId: null,
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
    const tools = ["map", "compare", "timeline"];
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
      return id ? "#/actualidad-timeline/" + id : "#/actualidad-timeline";
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
    if (parts[0] === "actualidad-timeline") return navigate("timeline", { timelineId: parts[1] || null });
    return navigate("home");
  }

  /* ---------- RENDERERS ---------- */

  function toolCardsHtml() {
    const wrong = (getStore().lastWrongIds || []).length;
    return `
      <div class="section-head">
        <div>
          <h2>Herramientas</h2>
          <p>Mapa, comparador, timeline y quiz — primera clase en el dashboard.</p>
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
          <p>Hitos del pack ${escapeHtml(window.APP_META.updated)} — sin fechas inventadas.</p>
          <span class="tool-cta">Ver timeline →</span>
        </button>
        <button type="button" class="card card-clickable tool-card" data-go="examen">
          <div class="card-icon">?</div>
          <h3>Quiz + repaso</h3>
          <p>Simulacro con autoevaluación. ${wrong ? `<strong>${wrong} fallos</strong> listos para repasar.` : "Repaso de fallos tras cada intento."}</p>
          <span class="tool-cta">Ir al quiz →</span>
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

  /* ---------- STRUCTURE MAP ---------- */

  function renderMap() {
    const areas = window.STRUCTURE_MAP || [];
    const activeId = state.mapAreaId || areas[0]?.id;
    const active = areas.find((a) => a.id === activeId) || areas[0];
    if (!active) return `<p class="empty">Mapa no disponible.</p>`;

    return `
      <nav class="breadcrumb">
        <button type="button" data-go="home">Inicio</button>
        <span>/</span>
        <span>Mapa de estructura</span>
      </nav>
      <div class="module-hero">
        <div class="tag">Interactivo · áreas públicas</div>
        <h1>▦ Mapa de estructura</h1>
        <p>Haz clic en un área de negocio u operativa. Detalle a la derecha (o debajo en móvil). Sin organigramas inventados.</p>
      </div>
      <div class="map-layout">
        <div class="map-grid" role="list">
          ${areas.map((a) => `
            <button type="button" class="map-node accent-${escapeHtml(a.accent || "red")} ${a.id === active.id ? "active" : ""}" data-map-area="${escapeHtml(a.id)}" role="listitem">
              <span class="map-node-icon">${escapeHtml(a.icon)}</span>
              <span class="map-node-title">${escapeHtml(a.title)}</span>
              <span class="map-node-short">${escapeHtml(a.short)}</span>
            </button>
          `).join("")}
        </div>
        <aside class="map-panel card" id="map-detail">
          <div class="map-panel-kicker">${escapeHtml(active.icon)} ${escapeHtml(active.title)}</div>
          <h2>${escapeHtml(active.short)}</h2>
          <p class="map-lead">${escapeHtml(active.detail.lead)}</p>
          <ul class="bullets">
            ${(active.detail.points || []).map((p) => `<li>${escapeHtml(p)}</li>`).join("")}
          </ul>
          ${active.detail.related ? `
            <div class="hero-actions" style="margin-top:1rem">
              <button type="button" class="btn btn-ghost btn-sm" data-module="${escapeHtml(active.detail.related)}">Ver módulo relacionado</button>
            </div>` : ""}
        </aside>
      </div>
      <p class="callout tip" style="margin-top:1rem">A nivel público Tesla se entiende por negocios (auto/energy) y nodos (fábricas, tiendas, service, Superchargers). El reporting interno detallado no es material obligatorio.</p>
    `;
  }

  /* ---------- COMPARATOR ---------- */

  function comparePool() {
    return state.compareMode === "energy"
      ? (window.COMPARE_ENERGY || [])
      : (window.COMPARE_VEHICLES || []);
  }

  function renderCompare() {
    const pool = comparePool();
    if (pool.length < 2) return `<p class="empty">Comparador sin datos.</p>`;

    let left = pool.find((p) => p.id === state.compareLeft) || pool[0];
    let right = pool.find((p) => p.id === state.compareRight) || pool[1];
    if (left.id === right.id) {
      right = pool.find((p) => p.id !== left.id) || pool[0];
    }
    state.compareLeft = left.id;
    state.compareRight = right.id;

    const keys = Array.from(new Set([
      ...Object.keys(left.attrs || {}),
      ...Object.keys(right.attrs || {}),
    ]));

    const opts = (selected) => pool.map((p) =>
      `<option value="${escapeHtml(p.id)}" ${p.id === selected ? "selected" : ""}>${escapeHtml(p.name)}</option>`
    ).join("");

    return `
      <nav class="breadcrumb">
        <button type="button" data-go="home">Inicio</button>
        <span>/</span>
        <span>Comparador</span>
      </nav>
      <div class="module-hero">
        <div class="tag">Hechos públicos · cualitativo</div>
        <h1>⇄ Comparador de productos</h1>
        <p>Atributos de panorama para conversación ES/EU. Sin km, precios ni CV inventados — verifica cifras en tesla.com/es_es.</p>
      </div>
      <div class="compare-mode-row">
        <button type="button" class="chip ${state.compareMode === "vehicles" ? "active" : ""}" data-compare-mode="vehicles">Vehículos</button>
        <button type="button" class="chip ${state.compareMode === "energy" ? "active" : ""}" data-compare-mode="energy">Energy</button>
      </div>
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
              <th>${escapeHtml(left.name)}</th>
              <th>${escapeHtml(right.name)}</th>
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
      <div class="callout warn">Si no estás seguro de un número (autonomía WLTP, precio, potencia), omítelo. Este comparador prioriza tipología, relevancia de mercado y notas cualitativas.</div>
      <div class="hero-actions">
        <button type="button" class="btn btn-ghost" data-module="productos">Abrir módulo Productos</button>
      </div>
    `;
  }

  /* ---------- ACTUALIDAD TIMELINE ---------- */

  function renderTimeline() {
    const items = window.ACTUALIDAD_TIMELINE || [];
    const activeId = state.timelineId || items[0]?.id;
    const active = items.find((i) => i.id === activeId) || items[0];

    return `
      <nav class="breadcrumb">
        <button type="button" data-go="home">Inicio</button>
        <span>/</span>
        <button type="button" data-module="actualidad">Actualidad</button>
        <span>/</span>
        <span>Timeline</span>
      </nav>
      <div class="module-hero">
        <div class="tag">Pack ${escapeHtml(window.APP_META.updated)} · sin fechas inventadas</div>
        <h1>◉ Timeline de actualidad</h1>
        <p>Hitos pedagógicos del módulo Actualidad. Pulsa un nodo para el detalle y la pregunta de lectura sana.</p>
      </div>
      <div class="tl-interactive">
        ${items.map((it) => {
          const on = active && it.id === active.id;
          return `
            <button type="button" class="tl-interactive-item ${on ? "active" : ""}" data-timeline-id="${escapeHtml(it.id)}">
              <div class="tl-interactive-rail" aria-hidden="true"><span class="tl-interactive-dot"></span></div>
              <div class="tl-interactive-body">
                <div class="tl-when">${escapeHtml(it.when)} · <span class="tl-cat">${escapeHtml(it.category)}</span></div>
                <h3>${escapeHtml(it.title)}</h3>
                ${on ? `
                  <p>${escapeHtml(it.body)}</p>
                  ${it.ask ? `<div class="callout tip"><strong>Pregúntate:</strong> ${escapeHtml(it.ask)}</div>` : ""}
                ` : `<p class="tl-preview">${escapeHtml(it.body.slice(0, 90))}…</p>`}
              </div>
            </button>`;
        }).join("")}
      </div>
      <div class="hero-actions" style="margin-top:1rem">
        <button type="button" class="btn btn-primary" data-module="actualidad">Estudiar módulo Actualidad</button>
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
      m.id === "actualidad" ? `<button type="button" class="btn btn-ghost" data-go="timeline">Abrir timeline</button>` : "";

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
        if (go === "timeline") return navigate("timeline", { timelineId: state.timelineId });
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
        navigate("timeline", { timelineId: btn.getAttribute("data-timeline-id") });
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
