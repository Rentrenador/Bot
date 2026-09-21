# UniTalent Web MVP (RIASEC)

Test móvil de orientación universitaria (España): **30 Likert RIASEC + 4 prácticas** → preview gratis (letra dominante + cluster) → paywall 9 € → informe completo (código Holland, top clusters, grados, unis, checklist).

**Orientación inspirada en el modelo Holland/RIASEC; no es SDS licenciado ni test clínico validado.** Verificar títulos en [RUCT](https://www.educacion.gob.es/ruct) y acceso en [QEDU](https://www.educacion.gob.es/notasdecorte).

## Hosting (GitHub Pages)

URL oficial (Content-Type `text/html`):

**https://rentrenador.github.io/Bot/unitalent-web/**

No uses jsDelivr para el HTML (puede servirlo como `text/plain` en móviles).

## Abrir en local

```bash
cd unitalent-web
python3 -m http.server 8080
```

Luego abre: http://127.0.0.1:8080/

> Hace falta un servidor HTTP (no abras `index.html` como `file://`) porque se carga `data/questions.json` con `fetch`.

## Flujo de demo

1. **Landing** → «Empezar el test»
2. Responde las **34 preguntas** (30 escalas RIASEC 1–5 + 4 preferencias)
3. **Vista previa** gratis: código / letra #1 + cluster principal
4. «Desbloquear informe · 9 €» → pantalla de pago
5. **Simular pago** → desbloqueo en `localStorage`
6. **Informe completo**: perfil RIASEC, código Holland, top 3 clusters, grados, unis, checklist

Para resetear el pago simulado:

```js
localStorage.removeItem('unitalent_unlock_v2');
```

## Scoring (Holland / RIASEC)

1. Media aritmética por letra **R / I / A / S / E / C** (5 ítems Likert cada una).
2. Orden descendente → **código de 2–3 letras** (p. ej. `IAS`, `RES`).
3. Afinidad de cluster ≈ Σ(medias primary) + 0,5 × Σ(medias secondary) según `cluster_riasec_map`.
4. Q31–Q34 (modalidad, movilidad, confort STEM, formato) **no** suman al RIASEC; matizan el informe.

## Estructura

```
unitalent-web/
├── index.html
├── css/styles.css
├── js/data.js          # Clusters, unis, letter labels, disclaimers
├── js/app.js           # RIASEC scoring + flujo + paywall
├── js/questions-embed.js # Banco embebido (window.UNITALENT_QUESTIONS)
├── data/questions.json # Banco RIASEC (mvp-0.3-clarity)
└── README.md
```

## Origen del contenido

Derivado de `unitalent/` (`questions.json`, guion, clusters, unis, plantilla). Fecha de contenido: **2026-09-21**.
