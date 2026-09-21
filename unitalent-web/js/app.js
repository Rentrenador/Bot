/**
 * UniTalent MVP — quiz scoring, flow, paywall (simulated).
 */
(function () {
  "use strict";

  const STORAGE_KEY = "unitalent_unlock_v1";
  const ANSWERS_KEY = "unitalent_answers_v1";
  const RESULTS_KEY = "unitalent_results_v1";

  const state = {
    questions: null,
    scoring: null,
    answers: {},
    currentIndex: 0,
    results: null,
    unlocked: false,
  };

  const $ = (sel, el = document) => el.querySelector(sel);
  const $$ = (sel, el = document) => [...el.querySelectorAll(sel)];

  function showScreen(id) {
    $$(".screen").forEach((s) => s.classList.remove("active"));
    const screen = $(`#screen-${id}`);
    if (screen) screen.classList.add("active");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function loadUnlock() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return false;
      const data = JSON.parse(raw);
      return !!(data && data.unlocked);
    } catch {
      return false;
    }
  }

  function saveUnlock() {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({ unlocked: true, at: new Date().toISOString() })
    );
    state.unlocked = true;
  }

  function clearSession(keepUnlock = true) {
    localStorage.removeItem(ANSWERS_KEY);
    localStorage.removeItem(RESULTS_KEY);
    if (!keepUnlock) localStorage.removeItem(STORAGE_KEY);
    state.answers = {};
    state.currentIndex = 0;
    state.results = null;
  }

  async function loadQuestions() {
    const res = await fetch("data/questions.json");
    if (!res.ok) throw new Error("No se pudo cargar questions.json");
    const data = await res.json();
    state.questions = data.questions.sort((a, b) => a.order - b.order);
    state.scoring = data.scoring;
  }

  /* ---------- Scoring ---------- */
  function scoreAnswers(answers) {
    const { single_weight, multi_weight, scale_weight_factor, clusters } =
      state.scoring;
    const scores = {};
    clusters.forEach((c) => (scores[c] = 0));

    for (const q of state.questions) {
      const ans = answers[q.id];
      if (ans == null) continue;

      if (q.type === "single") {
        const opt = q.options.find((o) => o.id === ans);
        if (opt) {
          opt.tags.forEach((t) => {
            if (scores[t] != null) scores[t] += single_weight;
          });
        }
      } else if (q.type === "multi") {
        const ids = Array.isArray(ans) ? ans : [];
        ids.forEach((oid) => {
          const opt = q.options.find((o) => o.id === oid);
          if (opt) {
            opt.tags.forEach((t) => {
              if (scores[t] != null) scores[t] += multi_weight;
            });
          }
        });
      } else if (q.type === "scale") {
        const val = Number(ans);
        if (!Number.isFinite(val)) continue;
        const w = val * scale_weight_factor;
        (q.tags || []).forEach((t) => {
          if (scores[t] != null) scores[t] += w;
        });
      }
    }

    const maxScore = Math.max(...Object.values(scores), 0.0001);
    const ranked = Object.entries(scores)
      .map(([id, score]) => ({
        id,
        score,
        pct: Math.round((score / maxScore) * 100),
      }))
      .sort((a, b) => b.score - a.score || a.id.localeCompare(b.id));

    return { scores, ranked, maxScore };
  }

  function profileKeywords(ranked) {
    const top3 = ranked.slice(0, 3);
    return top3.map((r) => {
      const c = window.UNITALENT_DATA.clusters[r.id];
      return (c && c.keywords[0]) || c.shortName;
    });
  }

  function buildWhyBullets(clusterId, answers) {
    const bullets = [];
    const cluster = window.UNITALENT_DATA.clusters[clusterId];

    for (const q of state.questions) {
      if (bullets.length >= 4) break;
      const ans = answers[q.id];
      if (ans == null) continue;

      if (q.type === "single") {
        const opt = q.options.find((o) => o.id === ans);
        if (opt && opt.tags.includes(clusterId)) {
          bullets.push(
            `En «${shortQ(q.text)}» elegiste: «${opt.label}».`
          );
        }
      } else if (q.type === "multi") {
        const ids = Array.isArray(ans) ? ans : [];
        const matched = ids
          .map((id) => q.options.find((o) => o.id === id))
          .filter((o) => o && o.tags.includes(clusterId));
        if (matched.length) {
          bullets.push(
            `Te interesan áreas como ${matched
              .map((m) => m.label)
              .slice(0, 2)
              .join(" y ")}.`
          );
        }
      } else if (q.type === "scale") {
        const val = Number(ans);
        if (val >= 4 && (q.tags || []).includes(clusterId)) {
          bullets.push(
            `Autoevaluación alta (${val}/5) en: ${shortQ(q.text)}.`
          );
        }
      }
    }

    if (!bullets.length && cluster) {
      bullets.push(cluster.description);
    }
    return bullets.slice(0, 5);
  }

  function shortQ(text) {
    return text.replace(/^¿/, "").replace(/\?$/, "").slice(0, 55);
  }

  function profileParagraph(ranked, answers) {
    const top = ranked[0];
    const c = window.UNITALENT_DATA.clusters[top.id];
    const second = ranked[1]
      ? window.UNITALENT_DATA.clusters[ranked[1].id]
      : null;

    let styleHint = "";
    const q07 = answers["q07_trabajo_equipo"];
    if (q07) {
      const opt = state.questions
        .find((q) => q.id === "q07_trabajo_equipo")
        ?.options.find((o) => o.id === q07);
      if (opt) styleHint = ` En equipo tiendes a: ${opt.label.toLowerCase()}.`;
    }

    return (
      `Tu perfil se alinea especialmente con «${c.name}» (${top.pct}% de afinidad relativa). ` +
      `${c.description}` +
      (second
        ? ` También aparece afinidad con «${second.name}», lo que sugiere un perfil versátil.`
        : "") +
      styleHint +
      ` Este informe es orientativo: contraste siempre la oferta real en RUCT y las notas de acceso en QEDU.`
    );
  }

  /* ---------- Quiz UI ---------- */
  function renderQuestion() {
    const q = state.questions[state.currentIndex];
    const total = state.questions.length;
    const n = state.currentIndex + 1;

    $("#progress-label").textContent = `Pregunta ${n} de ${total}`;
    $("#progress-fill").style.width = `${(n / total) * 100}%`;

    const blockNames = {
      intereses: "Intereses",
      estilo: "Estilo de trabajo",
      habilidades: "Habilidades",
    };
    $("#block-tag").textContent = blockNames[q.block] || q.block;
    $("#q-text").textContent = q.text;

    const hint = $("#q-hint");
    const container = $("#options");
    container.innerHTML = "";

    if (q.type === "multi") {
      hint.textContent = `Puedes elegir hasta ${q.max_selections || 3} opciones.`;
      hint.hidden = false;
      q.options.forEach((opt) => {
        const selected = (state.answers[q.id] || []).includes(opt.id);
        const btn = document.createElement("button");
        btn.type = "button";
        btn.className = "option" + (selected ? " selected" : "");
        btn.innerHTML = `<span class="check"></span><span class="label">${escapeHtml(
          opt.label
        )}</span>`;
        btn.addEventListener("click", () => toggleMulti(q, opt.id));
        container.appendChild(btn);
      });
    } else if (q.type === "scale") {
      hint.textContent = "";
      hint.hidden = true;
      const wrap = document.createElement("div");
      wrap.innerHTML = `
        <div class="scale-labels">
          <span>${escapeHtml(q.scale_labels?.["1"] || "Bajo")}</span>
          <span>${escapeHtml(q.scale_labels?.["5"] || "Alto")}</span>
        </div>
        <div class="scale" role="group" aria-label="Escala 1 a 5"></div>
      `;
      const scale = wrap.querySelector(".scale");
      const current = state.answers[q.id];
      for (let i = q.scale_min || 1; i <= (q.scale_max || 5); i++) {
        const b = document.createElement("button");
        b.type = "button";
        b.className = "scale-btn" + (current === i ? " selected" : "");
        b.textContent = String(i);
        b.addEventListener("click", () => {
          state.answers[q.id] = i;
          renderQuestion();
          updateNav();
        });
        scale.appendChild(b);
      }
      container.appendChild(wrap);
    } else {
      hint.hidden = true;
      q.options.forEach((opt) => {
        const selected = state.answers[q.id] === opt.id;
        const btn = document.createElement("button");
        btn.type = "button";
        btn.className = "option" + (selected ? " selected" : "");
        btn.innerHTML = `<span class="radio"></span><span class="label">${escapeHtml(
          opt.label
        )}</span>`;
        btn.addEventListener("click", () => {
          state.answers[q.id] = opt.id;
          renderQuestion();
          updateNav();
        });
        container.appendChild(btn);
      });
    }

    updateNav();
  }

  function toggleMulti(q, optId) {
    const max = q.max_selections || 3;
    let cur = Array.isArray(state.answers[q.id])
      ? [...state.answers[q.id]]
      : [];
    const idx = cur.indexOf(optId);
    if (idx >= 0) {
      cur.splice(idx, 1);
    } else {
      if (cur.length >= max) return;
      cur.push(optId);
    }
    state.answers[q.id] = cur;
    renderQuestion();
  }

  function isAnswered(q) {
    const a = state.answers[q.id];
    if (q.type === "multi") return Array.isArray(a) && a.length > 0;
    if (q.type === "scale") return typeof a === "number";
    return typeof a === "string" && a.length > 0;
  }

  function updateNav() {
    const q = state.questions[state.currentIndex];
    const prev = $("#btn-prev");
    const next = $("#btn-next");
    prev.disabled = state.currentIndex === 0;
    next.disabled = !isAnswered(q);
    next.textContent =
      state.currentIndex === state.questions.length - 1
        ? "Ver resultado"
        : "Siguiente";
  }

  function escapeHtml(s) {
    return String(s)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  /* ---------- Preview / Report ---------- */
  function renderAffinityBars(ranked, limit, container) {
    container.innerHTML = "";
    ranked.slice(0, limit).forEach((r) => {
      const c = window.UNITALENT_DATA.clusters[r.id];
      const row = document.createElement("div");
      row.className = "affinity-row";
      row.innerHTML = `
        <div class="affinity-name">${escapeHtml(c.shortName)}</div>
        <div class="affinity-track"><div class="affinity-fill" style="width:${
          r.pct
        }%"></div></div>
        <div class="affinity-pct">${r.pct}%</div>
      `;
      container.appendChild(row);
    });
  }

  function showPreview() {
    const { ranked } = state.results;
    const top = ranked[0];
    const c = window.UNITALENT_DATA.clusters[top.id];

    $("#preview-badge").textContent = `Tu cluster #1 · ${top.pct}% afinidad`;
    $("#preview-title").textContent = c.name;
    $("#preview-desc").textContent = c.description;
    renderAffinityBars(ranked, 1, $("#preview-bars"));

    const teaser = $("#preview-teaser");
    teaser.innerHTML = `
      <p style="margin:0;font-size:0.9rem;color:var(--text-muted)">
        También encajan contigo: <strong>${ranked
          .slice(1, 3)
          .map((r) => window.UNITALENT_DATA.clusters[r.id].shortName)
          .join(", ")}</strong>…
        Grados, universidades y plan de acción en el informe completo.
      </p>
    `;

    showScreen("preview");
  }

  function showPaywall() {
    const D = window.UNITALENT_DATA;
    $("#pay-bizum").textContent = D.bizumPlaceholder;
    showScreen("paywall");
  }

  function showReport() {
    const D = window.UNITALENT_DATA;
    const { ranked } = state.results;
    const top3 = ranked.slice(0, 3);
    const low = ranked.slice(-2).reverse();

    const now = new Date();
    const dateStr = now.toLocaleDateString("es-ES", {
      year: "numeric",
      month: "long",
      day: "numeric",
      timeZone: "Europe/Madrid",
    });

    $("#report-date").textContent = `Informe generado el ${dateStr}`;
    $("#report-disclaimer").textContent = D.disclaimerShort;

    const kws = profileKeywords(ranked);
    const kwEl = $("#report-keywords");
    kwEl.innerHTML = kws
      .map((k) => `<span class="kw">${escapeHtml(k)}</span>`)
      .join("");

    $("#report-profile").textContent = profileParagraph(
      ranked,
      state.answers
    );
    renderAffinityBars(ranked, 5, $("#report-bars"));

    const clustersEl = $("#report-clusters");
    clustersEl.innerHTML = "";
    top3.forEach((r, i) => {
      const c = D.clusters[r.id];
      const bullets = buildWhyBullets(r.id, state.answers);
      const card = document.createElement("div");
      card.className = "card";
      card.innerHTML = `
        <div>
          <span class="rank">#${i + 1}</span>
          <strong>${escapeHtml(c.name)}</strong>
          <span style="color:var(--text-muted);font-size:0.9rem"> · ${
            r.pct
          }% afinidad</span>
        </div>
        <p class="cluster-desc" style="margin-top:0.65rem">${escapeHtml(
          c.description
        )}</p>
        <p style="font-weight:600;font-size:0.9rem;margin:0.75rem 0 0.25rem">Por qué encaja contigo</p>
        <ul class="bullet-list">${bullets
          .map((b) => `<li>${escapeHtml(b)}</li>`)
          .join("")}</ul>
        <p style="font-weight:600;font-size:0.9rem;margin:0.75rem 0 0.25rem">Ejemplos de grados</p>
        <ul class="degrees">${c.degrees
          .slice(0, 6)
          .map((d) => `<li>${escapeHtml(d)}</li>`)
          .join("")}</ul>
        <p style="font-size:0.88rem;color:var(--text-muted)"><strong>Salidas orientativas:</strong> ${escapeHtml(
          c.salidas
        )}</p>
        <p style="font-size:0.88rem;margin-bottom:0"><strong>Atención:</strong> ${escapeHtml(
          c.nuance
        )}</p>
        <p style="font-weight:600;font-size:0.9rem;margin:1rem 0 0.25rem">Universidades públicas de ejemplo</p>
        <span class="badge-illus">Ejemplos ilustrativos — no es ranking oficial</span>
        <table class="uni-table">
          <thead><tr><th>Universidad</th><th>Nota</th></tr></thead>
          <tbody>
            ${c.unis
              .map(
                (u) =>
                  `<tr><td>${escapeHtml(u.name)}</td><td>${escapeHtml(
                    u.note
                  )}</td></tr>`
              )
              .join("")}
          </tbody>
        </table>
        <div class="link-row">
          <a class="link-chip" href="${D.links.ruct}" target="_blank" rel="noopener">Buscar en RUCT</a>
          <a class="link-chip" href="${D.links.qedu}" target="_blank" rel="noopener">Notas de corte (QEDU)</a>
        </div>
      `;
      clustersEl.appendChild(card);
    });

    const lowEl = $("#report-low");
    lowEl.innerHTML = low
      .map((r) => {
        const c = D.clusters[r.id];
        return `<p style="margin:0.35rem 0"><strong>${escapeHtml(
          c.name
        )}</strong> (${r.pct}%) — menor afinidad según tus respuestas. No lo descartes por curiosidad; puede complementar tu vía principal.</p>`;
      })
      .join("");

    const checkEl = $("#report-checklist");
    checkEl.innerHTML = D.checklist
      .map(
        (item, i) =>
          `<li><input type="checkbox" id="chk-${i}" /><label for="chk-${i}">${escapeHtml(
            item
          )}</label></li>`
      )
      .join("");

    $("#report-full-disclaimer").textContent = D.disclaimer;
    showScreen("report");
  }

  function finishQuiz() {
    state.results = scoreAnswers(state.answers);
    try {
      localStorage.setItem(ANSWERS_KEY, JSON.stringify(state.answers));
      localStorage.setItem(RESULTS_KEY, JSON.stringify(state.results));
    } catch {
      /* ignore quota */
    }

    if (state.unlocked) {
      showReport();
    } else {
      showPreview();
    }
  }

  /* ---------- Events ---------- */
  function bindEvents() {
    $("#btn-start").addEventListener("click", () => {
      state.currentIndex = 0;
      if (!Object.keys(state.answers).length) state.answers = {};
      showScreen("quiz");
      renderQuestion();
    });

    $("#btn-prev").addEventListener("click", () => {
      if (state.currentIndex > 0) {
        state.currentIndex--;
        renderQuestion();
      }
    });

    $("#btn-next").addEventListener("click", () => {
      const q = state.questions[state.currentIndex];
      if (!isAnswered(q)) return;
      if (state.currentIndex < state.questions.length - 1) {
        state.currentIndex++;
        renderQuestion();
      } else {
        finishQuiz();
      }
    });

    $("#btn-unlock").addEventListener("click", () => showPaywall());
    $("#btn-back-preview").addEventListener("click", () => showPreview());

    $("#btn-simulate-pay").addEventListener("click", () => {
      saveUnlock();
      if (!state.results) {
        state.results = scoreAnswers(state.answers);
      }
      showReport();
    });

    $("#btn-retake").addEventListener("click", () => {
      if (
        confirm(
          "¿Rehacer el test? Se borrarán tus respuestas actuales. El desbloqueo del informe se mantiene en este dispositivo."
        )
      ) {
        clearSession(true);
        state.unlocked = loadUnlock();
        showScreen("landing");
      }
    });

    $("#btn-print").addEventListener("click", () => window.print());

    $$(".logo").forEach((el) => {
      el.addEventListener("click", (e) => {
        e.preventDefault();
        showScreen("landing");
      });
    });
  }

  async function init() {
    state.unlocked = loadUnlock();
    bindEvents();

    const D = window.UNITALENT_DATA;
    $("#landing-disclaimer").textContent = D.disclaimer;
    $("#footer-disclaimer").textContent = D.disclaimerShort;
    $("#ruct-link").href = D.links.ruct;
    $("#qedu-link").href = D.links.qedu;
    $("#pay-price-num").textContent = String(D.priceEur);

    try {
      await loadQuestions();
    } catch (err) {
      console.error(err);
      alert(
        "Error cargando el test. Sirve la carpeta con un servidor local (python3 -m http.server)."
      );
      return;
    }

    // Restore session if unlocked + results exist
    try {
      const savedResults = localStorage.getItem(RESULTS_KEY);
      const savedAnswers = localStorage.getItem(ANSWERS_KEY);
      if (savedAnswers) state.answers = JSON.parse(savedAnswers);
      if (savedResults) state.results = JSON.parse(savedResults);
    } catch {
      /* ignore */
    }

    showScreen("landing");
  }

  document.addEventListener("DOMContentLoaded", init);
})();
