# Tesla Panorama

SPA estática (HTML/CSS/JS) para aprender el **panorama actual de Tesla** como compañía: qué es, estructura, productos, cómo opera, actualidad y cultura. UI en español (España), tema negro / blanco / rojo.

**Contenido fuente:** `tesla-panorama-content/` (ruta primaria). **Modo Future Talent** (FTT + STAR) es opcional y va **apagado por defecto**.

## Cómo abrir

```bash
cd tesla-panorama
python3 -m http.server 5173
# http://localhost:5173
```

O abre `index.html` / Live Server. Sin build ni Node.

Rutas útiles: `#/mapa`, `#/comparador`, `#/actualidad-timeline`, `#/examen`.

## Qué incluye

| Capa | Contenido |
|------|-----------|
| **Primaria** | 6 lecciones + quiz panorama (32 Q, cortas con autoevaluación) |
| **Herramientas** | Mapa de estructura · Comparador · Timeline actualidad · Repaso de fallos |
| **Opcional** | Toggle «Modo Future Talent» → programa FTT, banco corto FTT, STAR |

Progreso en `localStorage` clave `tesla-panorama-v2` (incluye `lastWrongIds` para el repaso).

## Estructura

```
tesla-panorama/
  index.html
  css/app.css
  js/data.js       # módulos + STRUCTURE_MAP (nodes) + PRODUCT_COMPARATOR + COMPARE_* + ACTUALIDAD_TIMELINE
  js/quiz-data.js  # QUIZ_BANK + QUIZ_BANK_FTT
  js/app.js
  README.md
```

## Aviso

No oficial. Sin organigramas inventados ni leaks de entrevista. Verifica en [tesla.com/es_es](https://www.tesla.com/es_es) y el portal de empleo.
