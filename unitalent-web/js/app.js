/**
 * UniTalent MVP — RIASEC Holland scoring, quiz flow, Stripe Payment Link paywall.
 * Mean per letter → Holland code 2–3 letters → cluster affinity map.
 */
(function () {
  "use strict";

  const STORAGE_KEY = "unitalent_unlock_v2";
  const ANSWERS_KEY = "unitalent_answers_v2";
  const RESULTS_KEY = "unitalent_results_v2";
  const LETTERS = ["R", "I", "A", "S", "E", "C"];

  const state = {
    questions: null,
    scoring: null,
    meta: null,
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

  function applyQuestionsPayload(data) {
    if (!data || !Array.isArray(data.questions) || !data.questions.length) {
      throw new Error("questions payload vacío o inválido");
    }
    state.questions = data.questions.slice().sort((a, b) => a.order - b.order);
    state.scoring = data.scoring;
    state.meta = data;
  }

  async function loadQuestions() {
    const embedded = window.UNITALENT_QUESTIONS;
    if (embedded && Array.isArray(embedded.questions) && embedded.questions.length) {
      applyQuestionsPayload(embedded);
      return;
    }
    try {
      const res = await fetch("data/questions.json");
      if (!res.ok) throw new Error("No se pudo cargar questions.json");
      const data = await res.json();
      applyQuestionsPayload(data);
    } catch (err) {
      if (embedded) {
        applyQuestionsPayload(embedded);
        return;
      }
      throw err;
    }
  }

  /* ---------- RIASEC Scoring ---------- */
  function meanLetterScores(answers) {
    const sums = {};
    const counts = {};
    LETTERS.forEach((L) => {
      sums[L] = 0;
      counts[L] = 0;
    });

    for (const q of state.questions) {
      if (q.block !== "riasec" || !q.riasec) continue;
      const ans = answers[q.id];
      if (ans == null) continue;
      const val = Number(ans);
      if (!Number.isFinite(val)) continue;
      const L = q.riasec;
      if (!sums.hasOwnProperty(L)) continue;
      sums[L] += val;
      counts[L] += 1;
    }

    const means = {};
    LETTERS.forEach((L) => {
      means[L] = counts[L] > 0 ? sums[L] / counts[L] : 0;
    });
    return { means, counts, sums };
  }

  function hollandCodeFromMeans(means, topN) {
    const n = topN || (state.scoring && state.scoring.top_letters_for_report) || 3;
    const rankedLetters = LETTERS.map((L) => ({
      letter: L,
      mean: means[L],
    })).sort(
      (a, b) =>
        b.mean - a.mean ||
        LETTERS.indexOf(a.letter) - LETTERS.indexOf(b.letter)
    );
    const top = rankedLetters.slice(0, n);
    const code = top.map((t) => t.letter).join("");
    return { rankedLetters, topLetters: top, code };
  }

  function clusterAffinity(means) {
    const D = window.UNITALENT_DATA;
    const map =
      (state.scoring && state.scoring.cluster_riasec_map) ||
      D.clusterRiasecMap;
    const clusterIds =
      (state.scoring && state.scoring.clusters) || Object.keys(map);

    const scored = clusterIds.map((id) => {
      const m = map[id] || { primary: [], secondary: [] };
      let score = 0;
      (m.primary || []).forEach((L) => {
        score += means[L] || 0;
      });
      (m.secondary || []).forEach((L) => {
        score += 0.5 * (means[L] || 0);
      });
      return {
        id,
        score,
        primary: m.primary || [],
        secondary: m.secondary || [],
      };
    });

    const maxScore = Math.max(...scored.map((s) => s.score), 0.0001);
    const ranked = scored
      .map((s) => ({
        ...s,
        pct: Math.round((s.score / maxScore) * 100),
      }))
      .sort((a, b) => b.score - a.score || a.id.localeCompare(b.id));

    return { ranked, maxScore };
  }

  function extractPractical(answers) {
    const practical = {
      modality: null,
      mobility: null,
      confortStem: null,
      format: null,
      tags: [],
    };

    for (const q of state.questions) {
      if (q.block !== "practico") continue;
      const ans = answers[q.id];
      if (ans == null) continue;

      if (q.type === "single") {
        const opt = q.options.find((o) => o.id === ans);
        if (!opt) continue;
        practical.tags.push(...(opt.tags || []));
        if (q.id === "q31_modalidad_estudio") practical.modality = opt.label;
        if (q.id === "q32_movilidad") practical.mobility = opt.label;
        if (q.id === "q34_formato_aprendizaje") practical.format = opt.label;
      } else if (q.type === "scale" && q.id === "q33_confort_stem") {
        practical.confortStem = Number(ans);
      }
    }
    return practical;
  }

  function scoreAnswers(answers) {
    const { means, counts } = meanLetterScores(answers);
    const { rankedLetters, topLetters, code } = hollandCodeFromMeans(means, 3);
    const { ranked, maxScore } = clusterAffinity(means);
    const practical = extractPractical(answers);

    return {
      means,
      counts,
      rankedLetters,
      topLetters,
      hollandCode: code,
      ranked,
      maxScore,
      practical,
    };
  }

  function formatMean(m) {
    return (Math.round(m * 10) / 10).toFixed(1).replace(".", ",");
  }

  function profileKeywords(results) {
    const D = window.UNITALENT_DATA;
    return results.topLetters.slice(0, 3).map((t) => {
      return D.letterKeywords[t.letter] || t.letter;
    });
  }

  function buildWhyBullets(clusterId, results) {
    const D = window.UNITALENT_DATA;
    const map =
      (state.scoring && state.scoring.cluster_riasec_map) ||
      D.clusterRiasecMap;
    const m = map[clusterId] || { primary: [], secondary: [] };
    const bullets = [];
    const labels = D.letterLabels;

    (m.primary || []).forEach((L) => {
      const mean = results.means[L];
      bullets.push(
        `Tu letra ${L} (${labels[L]}) puntúa ${formatMean(mean)}/5 y activa este cluster.`
      );
    });
    (m.secondary || []).forEach((L) => {
      const mean = results.means[L];
      if (mean >= 3) {
        bullets.push(
          `También refuerza la letra secundaria ${L} (${labels[L]}, ${formatMean(mean)}/5).`
        );
      }
    });

    if (results.hollandCode) {
      bullets.push(
        `Encaja con tu código Holland ilustrativo «${results.hollandCode}».`
      );
    }

    const cluster = D.clusters[clusterId];
    if (bullets.length < 2 && cluster) bullets.push(cluster.description);

    // STEM comfort nuance
    const stem = results.practical && results.practical.confortStem;
    if (
      stem != null &&
      stem <= 2 &&
      (clusterId === "stem" || clusterId === "ingenieria")
    ) {
      bullets.push(
        `Nota: tu confort STEM es bajo (${stem}/5); conviene refuerzo o vías más aplicadas.`
      );
    }

    return bullets.slice(0, 5);
  }

  function profileParagraph(results) {
    const D = window.UNITALENT_DATA;
    const top = results.topLetters;
    const code = results.hollandCode;
    const labels = top
      .map(
        (t) =>
          `**${t.letter}** ${D.letterLabels[t.letter].split(" (")[0]} (${formatMean(t.mean)}/5)`
      )
      .join(" · ")
      .replace(/\*\*/g, "");

    const topCluster = results.ranked[0];
    const c = D.clusters[topCluster.id];
    const p = results.practical;

    let practicalHint = "";
    if (p) {
      const bits = [];
      if (p.modality) bits.push(`modalidad «${p.modality}»`);
      if (p.mobility) bits.push(`movilidad «${p.mobility}»`);
      if (p.format) bits.push(`formato «${p.format}»`);
      if (p.confortStem != null)
        bits.push(`confort STEM ${p.confortStem}/5`);
      if (bits.length) practicalHint = ` Preferencias prácticas: ${bits.join("; ")}.`;
    }

    return (
      `Tu perfil ilustrativo RIASEC destaca el código «${code}»: ${labels}. ` +
      `El cluster con mayor afinidad es «${c.name}» (${topCluster.pct}%). ` +
      `${c.description}` +
      practicalHint +
      ` Este informe es orientativo (adaptación Holland/RIASEC, no SDS): contraste siempre en RUCT y QEDU.`
    );
  }

  function shortQ(text) {
    return text.replace(/^¿/, "").replace(/\?$/, "").slice(0, 55);
  }

  /* ---------- Quiz UI ---------- */
  function renderQuestion() {
    const q = state.questions[state.currentIndex];
    const total = state.questions.length;
    const n = state.currentIndex + 1;

    $("#progress-label").textContent = `Pregunta ${n} de ${total}`;
    $("#progress-fill").style.width = `${(n / total) * 100}%`;

    const blockNames = {
      riasec: q.riasec
        ? `RIASEC · ${q.riasec}`
        : "RIASEC",
      practico: "Preferencias prácticas",
      intereses: "Intereses",
      estilo: "Estilo de trabajo",
      habilidades: "Habilidades",
    };
    $("#block-tag").textContent = blockNames[q.block] || q.block;
    $("#q-text").textContent = q.text;

    const hint = $("#q-hint");
    const container = $("#options");
    container.innerHTML = "";

    const scaleLabels =
      q.scale_labels_override ||
      (state.scoring && state.scoring.scale_labels) ||
      q.scale_labels ||
      {};

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
      const lo = scaleLabels["1"] || "Nada / no me gusta";
      const hi = scaleLabels["5"] || "Mucho / me encanta";
      hint.textContent = "";
      hint.hidden = true;
      const wrap = document.createElement("div");
      wrap.className = "likert-wrap";
      wrap.innerHTML = `
        <div class="scale-labels">
          <span>${escapeHtml(lo)}</span>
          <span>${escapeHtml(hi)}</span>
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
  function renderLetterBars(rankedLetters, limit, container) {
    container.innerHTML = "";
    const D = window.UNITALENT_DATA;
    const top = rankedLetters.slice(0, limit);
    const maxMean = Math.max(...top.map((t) => t.mean), 0.0001);
    top.forEach((t) => {
      const pct = Math.round((t.mean / 5) * 100);
      const label = D.letterLabels[t.letter] || t.letter;
      const row = document.createElement("div");
      row.className = "affinity-row";
      row.innerHTML = `
        <div class="affinity-name">${escapeHtml(t.letter)} · ${escapeHtml(
        label.split(" (")[0]
      )}</div>
        <div class="affinity-track"><div class="affinity-fill" style="width:${pct}%"></div></div>
        <div class="affinity-pct">${formatMean(t.mean)}</div>
      `;
      container.appendChild(row);
    });
  }

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
    const results = state.results;
    const { ranked, topLetters, hollandCode } = results;
    const top = ranked[0];
    const c = window.UNITALENT_DATA.clusters[top.id];
    const topLetter = topLetters[0];
    const D = window.UNITALENT_DATA;

    $("#preview-badge").textContent = `Código ${hollandCode} · letra #1: ${topLetter.letter}`;
    $("#preview-title").textContent = c.name;
    $("#preview-desc").textContent =
      `Tu letra dominante es ${topLetter.letter} — ${D.letterLabels[topLetter.letter]} (${formatMean(topLetter.mean)}/5). ` +
      `Cluster asociado: ${c.description}`;

    // Free preview: top letter bars + 1 cluster
    renderLetterBars(results.rankedLetters, 2, $("#preview-bars"));

    const teaser = $("#preview-teaser");
    teaser.innerHTML = `
      <p style="margin:0;font-size:0.9rem;color:var(--text-muted)">
        Preview gratis: código <strong>${escapeHtml(hollandCode)}</strong> y cluster
        <strong>${escapeHtml(c.shortName)}</strong> (${top.pct}% afinidad).
        Perfil RIASEC completo, top clusters, grados y universidades en el informe.
      </p>
    `;

    showScreen("preview");
  }

  function setPaywallStep(step) {
    const step1 = $("#paywall-step-1");
    const step2 = $("#paywall-step-2");
    if (!step1 || !step2) return;
    const is1 = step === 1;
    step1.hidden = !is1;
    step2.hidden = is1;
  }

  function showPaywall() {
    const D = window.UNITALENT_DATA;
    const price2 = $("#pay-price-num-2");
    if (price2) price2.textContent = String(D.priceEur);
    const check = $("#pay-accept-check");
    const cont = $("#btn-pay-continue");
    if (check) check.checked = false;
    if (cont) cont.disabled = true;
    setPaywallStep(1);
    showScreen("paywall");
  }

  function showReport() {
    const D = window.UNITALENT_DATA;
    const results = state.results;
    const { ranked, hollandCode, topLetters } = results;
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

    const codeEl = $("#report-holland-code");
    if (codeEl) {
      codeEl.hidden = false;
      codeEl.className = "report-holland";
      codeEl.innerHTML = `<span aria-hidden="true">◆</span> ${escapeHtml(hollandCode)}`;
      codeEl.setAttribute("title", "Código Holland ilustrativo (no SDS licenciado)");
    }

    const kws = profileKeywords(results);
    const kwEl = $("#report-keywords");
    kwEl.innerHTML = kws
      .map((k) => `<span class="kw">${escapeHtml(k)}</span>`)
      .join("");

    $("#report-profile").textContent = profileParagraph(results);

    const letterBars = $("#report-letter-bars");
    if (letterBars) {
      renderLetterBars(results.rankedLetters, 6, letterBars);
    }
    renderAffinityBars(ranked, 5, $("#report-bars"));

    const clustersEl = $("#report-clusters");
    clustersEl.innerHTML = "";
    top3.forEach((r, i) => {
      const c = D.clusters[r.id];
      const bullets = buildWhyBullets(r.id, results);
      const lettersHint = [
        ...(r.primary || []).map((L) => L),
        ...(r.secondary || []).map((L) => L + "·sec"),
      ].join(", ");
      const card = document.createElement("div");
      card.className = "card";
      card.innerHTML = `
        <div>
          <span class="rank">#${i + 1}</span>
          <strong>${escapeHtml(c.name)}</strong>
          <span style="color:var(--text-muted);font-size:0.9rem"> · ${
            r.pct
          }% afinidad · letras ${escapeHtml(lettersHint)}</span>
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
    const lowLetters = results.rankedLetters.slice(-2).reverse();
    lowEl.innerHTML =
      `<p style="margin:0.35rem 0"><strong>Letras menores:</strong> ${lowLetters
        .map(
          (t) =>
            `${t.letter} (${formatMean(t.mean)}/5)`
        )
        .join(" · ")}</p>` +
      low
        .map((r) => {
          const c = D.clusters[r.id];
          return `<p style="margin:0.35rem 0"><strong>${escapeHtml(
            c.name
          )}</strong> (${r.pct}%) — menor afinidad según tu perfil RIASEC. No lo descartes por curiosidad; puede complementar tu vía principal.</p>`;
        })
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


  /* ---------- Stripe return / unlock ---------- */
  function getPaymentLink() {
    const D = window.UNITALENT_DATA || {};
    return D.stripePaymentLink || "";
  }

  function cleanPaidQueryParam() {
    try {
      const url = new URL(window.location.href);
      if (!url.searchParams.has("paid")) return;
      url.searchParams.delete("paid");
      const qs = url.searchParams.toString();
      const next = url.pathname + (qs ? "?" + qs : "") + url.hash;
      window.history.replaceState({}, "", next);
    } catch {
      /* ignore */
    }
  }

  function consumePaidQueryParam() {
    try {
      const params = new URLSearchParams(window.location.search);
      const raw = params.get("paid");
      if (raw == null) return false;
      const v = String(raw).trim().toLowerCase();
      return v === "1" || v === "true" || v === "yes";
    } catch {
      return false;
    }
  }

  function goToStripeCheckout() {
    const link = getPaymentLink();
    if (!link) {
      alert("Enlace de pago no configurado. Prueba más tarde o contacta soporte.");
      return;
    }
    // Success URL is configured in the Stripe Payment Link dashboard.
    window.location.href = link;
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

    const acceptCheck = $("#pay-accept-check");
    const continueBtn = $("#btn-pay-continue");
    if (acceptCheck && continueBtn) {
      acceptCheck.addEventListener("change", () => {
        continueBtn.disabled = !acceptCheck.checked;
      });
      continueBtn.addEventListener("click", () => {
        if (!acceptCheck.checked) return;
        setPaywallStep(2);
      });
    }

    const backStep1 = $("#btn-back-pay-step1");
    if (backStep1) {
      backStep1.addEventListener("click", () => setPaywallStep(1));
    }

    const stripeBtn = $("#btn-stripe-pay");
    if (stripeBtn) {
      stripeBtn.addEventListener("click", () => goToStripeCheckout());
    }

    const simBtn = $("#btn-simulate-pay");
    if (simBtn) {
      simBtn.addEventListener("click", () => {
        saveUnlock();
        if (!state.results) {
          state.results = scoreAnswers(state.answers);
        }
        showReport();
      });
    }

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
        "Error cargando el test. Recarga la página; si persiste, avisa al soporte."
      );
      return;
    }

    try {
      const savedResults = localStorage.getItem(RESULTS_KEY);
      const savedAnswers = localStorage.getItem(ANSWERS_KEY);
      if (savedAnswers) state.answers = JSON.parse(savedAnswers);
      if (savedResults) state.results = JSON.parse(savedResults);
    } catch {
      /* ignore */
    }

    const paidReturn = consumePaidQueryParam();
    if (paidReturn) {
      saveUnlock();
      cleanPaidQueryParam();
      if (state.results || (state.answers && Object.keys(state.answers).length)) {
        if (!state.results && state.questions) {
          state.results = scoreAnswers(state.answers);
        }
        if (state.results) {
          showReport();
          return;
        }
      }
      // Unlocked but no answers yet → landing with unlock already saved
      showScreen("landing");
      return;
    }

    showScreen("landing");
  }

  // Expose for smoke tests
  window.UNITALENT_SCORE = {
    scoreAnswers: (answers) => {
      if (!state.questions) throw new Error("questions not loaded");
      return scoreAnswers(answers);
    },
    getState: () => state,
  };

  document.addEventListener("DOMContentLoaded", init);
})();
