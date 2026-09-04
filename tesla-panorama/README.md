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

## Rutas útiles

| Ruta | Vista |
|------|--------|
| `#/` | Dashboard / inicio |
| `#/mapa` | Mapa de estructura |
| `#/comparador` | Comparador de productos |
| `#/actualidad-timeline` | Timeline actualidad |
| `#/actualidad-timeline?modo=cambios` | **¿Qué ha cambiado?** (uncertain / recent / verify) |
| `#/glosario` | Glosario con búsqueda |
| `#/carga` | Carga / Europa (capas cualitativas) |
| `#/ops` | Ops día a día (stepper Sales→Service) |
| `#/examen` | Quiz + repaso de fallos |

## Qué incluye

| Capa | Contenido |
|------|-----------|
| **Primaria** | 6 lecciones + quiz panorama (32 Q, cortas con autoevaluación) |
| **Herramientas** | Mapa · Comparador · Timeline (+ ¿Qué ha cambiado?) · Glosario · Carga EU · Ops journey · Quiz / miss-review |
| **Opcional** | Toggle «Modo Future Talent» → programa FTT, banco corto FTT, STAR |

Progreso en `localStorage` clave `tesla-panorama-v2` (incluye `lastWrongIds` para el repaso).

## Estructura

```
tesla-panorama/
  index.html
  css/app.css
  js/data.js       # módulos + STRUCTURE_MAP + PRODUCT_COMPARATOR + ACTUALIDAD_TIMELINE
                   # + GLOSSARY + CHARGING_EU + OPS_FLOW + CONTENT_PACK_META
  js/quiz-data.js  # QUIZ_BANK + QUIZ_BANK_FTT
  js/app.js
  README.md
```

Datos embebidos desde `tesla-panorama-content/` (incl. `09-glosario.md`, `10-charging-europa.md`, `11-ops-dia-a-dia.md` cuando existan). Preferir hechos públicos; marcas **uncertain** / **perishable** no son specs inventadas.

## Aviso

No oficial. Sin organigramas inventados ni leaks de entrevista. Verifica en [tesla.com/es_es](https://www.tesla.com/es_es), [Find Us](https://www.tesla.com/es_ES/findus) y el portal de empleo.
