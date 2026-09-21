# UniTalent Web MVP

Test móvil de orientación universitaria (España): 18 preguntas → preview del cluster #1 → paywall 9 € → informe completo (top 3, grados, unis, checklist).

**Orientación informativa, no oficial.** Verificar títulos en [RUCT](https://www.educacion.gob.es/ruct) y acceso en [QEDU](https://www.educacion.gob.es/notasdecorte).

## Abrir en local

```bash
cd /workspace/unitalent-web
python3 -m http.server 8080
```

Luego abre en el navegador (móvil o DevTools responsive):

- http://127.0.0.1:8080/
- o http://localhost:8080/

> Hace falta un servidor HTTP (no abras `index.html` como `file://`) porque se carga `data/questions.json` con `fetch`.

## Flujo de demo

1. **Landing** → «Empezar el test»
2. Responde las **18 preguntas** (single / multi hasta 3 / escala 1–5)
3. **Vista previa** gratis: solo cluster #1 + barra
4. «Desbloquear informe · 9 €» → pantalla de pago
5. **Simular pago** (MVP; Bizum placeholder `[tu Bizum]`) → desbloqueo en `localStorage`
6. **Informe completo**: perfil, top 3 clusters, grados, universidades de ejemplo, contraste, checklist, disclaimer

Para rehacer el test: botón al final del informe (el unlock se mantiene en el dispositivo).

Para resetear el pago simulado en DevTools:

```js
localStorage.removeItem('unitalent_unlock_v1');
```

## Estructura

```
unitalent-web/
├── index.html          # SPA
├── css/styles.css      # Mobile-first
├── js/data.js          # Clusters, grados, unis (desde markdown)
├── js/app.js           # Scoring + flujo + paywall
├── data/questions.json # Preguntas + tags
└── README.md
```

## Scoring (resumen)

- `single` / `multi`: +1.0 por cada tag de la opción
- `scale` 1–5: valor × 0.4 por tag de la pregunta
- Ranking por suma; % relativo al cluster máximo
- Preview: top 1 · Informe: top 3 (+ barras top 5)

## Pago MVP

Sin Stripe. Botón **Simular pago** + instrucciones Bizum con placeholder `[tu Bizum]`. El flag `unitalent_unlock_v1` en `localStorage` desbloquea el informe en ese navegador.

## Origen del contenido

Derivado de `/workspace/unitalent/` (`questions.json`, guion, clusters, unis, plantilla de informe). Fecha de contenido: **2026-09-21**.
