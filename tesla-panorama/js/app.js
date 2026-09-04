(function () {
  "use strict";

  const STORAGE_KEY = "tesla-ftt-panorama-v1";
  const $main = document.getElementById("main");
  const $pill = document.getElementById("progress-pill");

  const state = {
    view: "home",
    moduleId: null,
    quiz: null,
    starId: "ownership",
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
    return s;
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
    const mods = window.MODULES.filter((m) => m.order >= 1);
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
    document.querySelectorAll("[data-nav]").forEach((btn) => {
      const nav = btn.getAttribute("data-nav");
      const active =
        nav === view ||
        (view === "module" && nav === "modules") ||
        (view === "quiz-play" && nav === "examen") ||
        (view === "quiz-result" && nav === "examen");
      btn.classList.toggle("active", active);
    });
  }

  function navigate(view, opts = {}) {
    state.view = view;
    if (opts.moduleId) state.moduleId = opts.moduleId;
    if (opts.starId) state.starId = opts.starId;
    if (opts.quiz) state.quiz = opts.quiz;
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
    return navigate("home");
  }

  /* ---------- RENDERERS ---------- */

  function renderHome() {
    const pct = globalProgress();
    const history = getStore().quizHistory || [];
    const lastQuiz = history[history.length - 1];
    const doneCount = window.MODULES.filter((m) => moduleProgress(m.id) >= 100).length;

    return `
      <section class="hero">
        <div class="hero-kicker">Future Talent Traineeship · ES</div>
        <h1>Tu panorama Tesla para el FTT</h1>
        <p>${escapeHtml(window.APP_META.audience)}. Estudio interactivo (~${escapeHtml(window.APP_META.studyHours)}): misión, productos, viaje del cliente, cultura, programa, examen y STAR.</p>
        <div class="hero-actions">
          <button type="button" class="btn btn-primary" data-go="path">Empezar ruta FTT</button>
          <button type="button" class="btn btn-ghost" data-go="examen">Modo examen</button>
        </div>
      </section>

      <div class="grid grid-stats">
        <div class="card stat-card"><div class="num">${pct}%</div><div class="lbl">Progreso global</div></div>
        <div class="card stat-card"><div class="num">${doneCount}/${window.MODULES.length}</div><div class="lbl">Módulos al 100%</div></div>
        <div class="card stat-card"><div class="num">${(window.QUIZ_BANK || []).length}</div><div class="lbl">Preguntas banco</div></div>
        <div class="card stat-card"><div class="num">${lastQuiz ? lastQuiz.pct + "%" : "—"}</div><div class="lbl">Último examen</div></div>
      </div>

      <div class="section-head">
        <div>
          <h2>Mapa de módulos</h2>
          <p>Ruta recomendada: Misión → Productos → Cliente → FTT → Cultura → Examen → STAR</p>
        </div>
      </div>
      <div class="grid grid-2" id="module-map">
        ${window.MODULES.map((m) => moduleCard(m)).join("")}
      </div>
    `;
  }

  function moduleCard(m) {
    const p = moduleProgress(m.id);
    return `
      <button type="button" class="card card-clickable" data-module="${escapeHtml(m.id)}">
        <div class="card-icon">${escapeHtml(m.icon)}</div>
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
    return `
      <div class="section-head"><div><h2>Todos los módulos</h2><p>Progreso guardado en este navegador (localStorage).</p></div></div>
      <div class="grid grid-2">${window.MODULES.map((m) => moduleCard(m)).join("")}</div>
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
    markModuleOpened(m.id);
    const p = moduleProgress(m.id);
    const nextId = window.STUDY_PATH[window.STUDY_PATH.indexOf(m.id) + 1];
    const next = window.MODULES.find((x) => x.id === nextId);

    return `
      <nav class="breadcrumb">
        <button type="button" data-go="home">Inicio</button>
        <span>/</span>
        <button type="button" data-go="modules">Módulos</button>
        <span>/</span>
        <span>${escapeHtml(m.title)}</span>
      </nav>
      <div class="module-hero">
        <div class="tag">${escapeHtml(m.tags.join(" · "))}</div>
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
        ${next ? `<button type="button" class="btn btn-ghost" data-module="${escapeHtml(next.id)}">Siguiente: ${escapeHtml(next.title)}</button>` : `<button type="button" class="btn btn-ghost" data-go="examen">Ir al examen</button>`}
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

  function buildQuiz(count, tag) {
    let pool = (window.QUIZ_BANK || []).filter(isAutoScore);
    if (tag && tag !== "all") pool = pool.filter((q) => q.tags.some((t) => t.toLowerCase() === tag.toLowerCase()));
    const shuffled = pool.slice().sort(() => Math.random() - 0.5);
    const selected = shuffled.slice(0, Math.min(count, shuffled.length));
    return {
      questions: selected,
      index: 0,
      answers: {},
      revealed: {},
      tag: tag || "all",
      startedAt: Date.now(),
    };
  }

  function allTags() {
    const set = new Set();
    (window.QUIZ_BANK || []).forEach((q) => q.tags.forEach((t) => set.add(t)));
    return Array.from(set).sort();
  }

  function renderExamenSetup() {
    const tags = allTags();
    const autoCount = (window.QUIZ_BANK || []).filter(isAutoScore).length;
    const shortCount = (window.QUIZ_BANK || []).length - autoCount;
    return `
      <section class="quiz-setup">
        <div class="module-hero">
          <div class="tag">Banco de examen</div>
          <h1>Modo examen</h1>
          <p>${autoCount} preguntas auto-corregibles · ${shortCount} de respuesta corta (autoevaluación). Mezcla, filtra por tag y revisa explicaciones.</p>
        </div>
        <div class="card">
          <h3>Configurar simulacro</h3>
          <p style="color:var(--muted);font-size:.9rem;margin:.4rem 0 1rem">Elige tamaño y tema. Se guardará tu puntuación en este navegador.</p>
          <div class="tag-row" id="quiz-tags">
            <button type="button" class="chip active" data-tag="all">Todos</button>
            ${tags.map((t) => `<button type="button" class="chip" data-tag="${escapeHtml(t)}">${escapeHtml(t)}</button>`).join("")}
          </div>
          <div class="hero-actions" style="margin-top:1rem">
            <button type="button" class="btn btn-primary" data-start-quiz="15">Simulacro rápido (15)</button>
            <button type="button" class="btn btn-ghost" data-start-quiz="30">Examen largo (30)</button>
            <button type="button" class="btn btn-ghost" data-start-quiz="999">Todo el banco</button>
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

  function currentQuizTag() {
    const active = document.querySelector("#quiz-tags .chip.active");
    return active ? active.getAttribute("data-tag") : (state.quizTag || "all");
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
    } else {
      // true/false
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

    return `
      <section class="quiz-play">
        <div class="quiz-progress">Pregunta ${i + 1} de ${total} · ${escapeHtml((q.tags || []).join(", "))}</div>
        <div class="progress-bar" style="margin-bottom:1rem"><span style="width:${Math.round((i / total) * 100)}%"></span></div>
        <div class="card">
          <h2 style="margin:0 0 .5rem;font-size:1.15rem">${escapeHtml(q.question)}</h2>
          <p style="margin:0;color:var(--muted);font-size:.8rem">${escapeHtml(q.type)}</p>
          ${optionsHtml}
          ${revealed ? `<div class="callout tip"><strong>Explicación:</strong> ${escapeHtml(q.explanation || "—")}<br/><span style="color:var(--muted)">Respuesta: ${escapeHtml(q.answer)}</span></div>` : ""}
          <div class="hero-actions">
            ${!revealed ? `<button type="button" class="btn btn-primary" data-reveal ${!selected ? "disabled style=\"opacity:.5\"" : ""}>Comprobar</button>` : ""}
            ${revealed && i < total - 1 ? `<button type="button" class="btn btn-primary" data-next-q>Siguiente</button>` : ""}
            ${revealed && i === total - 1 ? `<button type="button" class="btn btn-primary" data-finish-quiz>Ver resultado</button>` : ""}
            <button type="button" class="btn btn-ghost" data-go="examen">Abandonar</button>
          </div>
        </div>
      </section>
    `;
  }

  function finishQuiz() {
    const qz = state.quiz;
    let correct = 0;
    qz.questions.forEach((q) => {
      if (normalizeAnswer(q, qz.answers[q.id])) correct++;
    });
    const total = qz.questions.length;
    const pct = total ? Math.round((correct / total) * 100) : 0;
    const s = getStore();
    s.quizHistory = s.quizHistory || [];
    s.quizHistory.push({ at: Date.now(), correct, total, pct, tag: qz.tag });
    if (pct >= 70) {
      s.modules["banco-examen"] = s.modules["banco-examen"] || {};
      s.modules["banco-examen"].opened = true;
      s.modules["banco-examen"].done = true;
    } else {
      s.modules["banco-examen"] = s.modules["banco-examen"] || {};
      s.modules["banco-examen"].opened = true;
    }
    saveStore(s);
    state.quizResult = { correct, total, pct, questions: qz.questions, answers: qz.answers };
    state.view = "quiz-result";
    render();
  }

  function renderQuizResult() {
    const r = state.quizResult;
    if (!r) return renderExamenSetup();
    const msg =
      r.pct >= 85 ? "Excelente panorama. Listo para pulir STAR." :
      r.pct >= 70 ? "Buen nivel. Repasa los fallos y vuelve al módulo ligado al tag." :
      r.pct >= 50 ? "Vas camino. Revisa Misión, Productos y FTT otra vez." :
      "Empieza por la ruta de estudio recomendada y repite el simulacro.";

    const review = r.questions.map((q) => {
      const ok = normalizeAnswer(q, r.answers[q.id]);
      return `<div class="card" style="border-color:${ok ? "rgba(34,197,94,.4)" : "rgba(227,25,55,.45)"}">
        <div style="font-size:.78rem;color:var(--muted);margin-bottom:.35rem">${ok ? "✅ Correcta" : "❌ Incorrecta"} · ${escapeHtml((q.tags || []).join(", "))}</div>
        <strong>${escapeHtml(q.question)}</strong>
        <p style="margin:.5rem 0 0;color:var(--muted);font-size:.88rem">Tu respuesta: ${escapeHtml(r.answers[q.id] || "—")} · Correcta: ${escapeHtml(q.answer)}</p>
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
            <button type="button" class="btn btn-primary" data-go="examen">Nuevo simulacro</button>
            <button type="button" class="btn btn-ghost" data-go="star">Ir a STAR</button>
            <button type="button" class="btn btn-ghost" data-go="home">Inicio</button>
          </div>
        </div>
        <div class="section-head"><div><h2>Repaso</h2></div></div>
        <div class="grid">${review}</div>
      </section>
    `;
  }

  /* ---------- STAR ---------- */

  function renderStar() {
    const templates = window.STAR_TEMPLATES;
    const current = templates.find((t) => t.id === state.starId) || templates[0];
    state.starId = current.id;
    const saved = (getStore().star || {})[current.id] || {};

    return `
      <div class="module-hero">
        <div class="tag">Entrevistas</div>
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
    let html = "";
    switch (state.view) {
      case "home": html = renderHome(); break;
      case "modules": html = renderModulesList(); break;
      case "module": html = renderModule(); break;
      case "examen": html = renderExamenSetup(); break;
      case "quiz-play": html = renderQuizPlay(); break;
      case "quiz-result": html = renderQuizResult(); break;
      case "star": html = renderStar(); break;
      default: html = renderHome();
    }
    $main.innerHTML = html;
    bindDynamic();
  }

  function openModule(id) {
    const m = window.MODULES.find((x) => x.id === id);
    if (!m) return;
    if (m.isQuiz) return navigate("examen");
    if (m.isStar) return navigate("star");
    navigate("module", { moduleId: id });
  }

  function firstIncomplete() {
    for (const id of window.STUDY_PATH) {
      if (moduleProgress(id) < 100) return id;
    }
    return window.STUDY_PATH[0];
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

    // quiz setup
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

    // quiz play
    $main.querySelectorAll("[data-answer]").forEach((btn) => {
      btn.addEventListener("click", () => {
        if (!state.quiz) return;
        const q = state.quiz.questions[state.quiz.index];
        state.quiz.answers[q.id] = btn.getAttribute("data-answer");
        render();
      });
    });
    const revealBtn = $main.querySelector("[data-reveal]");
    if (revealBtn) {
      revealBtn.addEventListener("click", () => {
        const q = state.quiz.questions[state.quiz.index];
        if (!state.quiz.answers[q.id]) return;
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

    // star
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
    // avoid loops: only parse if hash doesn't match current intentional nav
    parseHash();
  });

  // boot
  updateProgressPill();
  if (location.hash && location.hash.length > 2) parseHash();
  else navigate("home");
})();
