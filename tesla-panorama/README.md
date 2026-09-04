# Tesla Panorama

SPA estática (HTML/CSS/JS) con look de **exposición / pitch**: portada, wordmark tipográfico, modo exposición y panel de herramientas. Contenido en español (España/EU), paleta negro / blanco / rojo.

**Contenido fuente:** `tesla-panorama-content/` (ruta primaria). **Modo Future Talent** (FTT + STAR) es opcional y va **apagado por defecto**.

> **Proyecto educativo / no afiliado a Tesla, Inc.** La marca tipográfica del header es un wordmark geométrico propio (no el logo oficial de Tesla).

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
| `#/` o `#/inicio` | **Portada** (hero exposición) |
| `#/panel` | Panel / dashboard (herramientas + módulos) |
| `#/exposicion` o `#/expo` | Entra en **modo exposición** (paso 0) |
| `#/exposicion/2` | Modo exposición en el paso N |
| `#/mapa` | Mapa de estructura |
| `#/comparador` | Comparador de productos |
| `#/actualidad-timeline` | Timeline actualidad |
| `#/actualidad-timeline?modo=cambios` | **¿Qué ha cambiado?** (uncertain / recent / verify) |
| `#/glosario` | Glosario con búsqueda |
| `#/carga` | Carga / Europa (capas cualitativas) |
| `#/ops` | Ops día a día (stepper Sales→Service) |
| `#/modulos` | Lista de módulos |
| `#/modulo/:id` | Lección |
| `#/examen` | Quiz + repaso de fallos |

### Modo exposición

Recorrido curado con tipografía ampliada y menos chrome:

1. Qué es → 2. Estructura/mapa → 3. Productos/comparador → 4. Ops → 5. Actualidad → 6. Quiz

- Toggle **Expo** en el header, CTA en portada, o ruta `#/exposicion`
- Teclado: `←` / `→` (o PageUp/PageDown), `Esc` para salir
- Progress dots en la barra de exposición

## Qué incluye

| Capa | Contenido |
|------|-----------|
| **Presentación** | Portada · wordmark SVG · modo exposición · panel |
| **Primaria** | 6 lecciones + quiz panorama (32 Q, cortas con autoevaluación) |
| **Herramientas** | Mapa · Comparador · Timeline (+ ¿Qué ha cambiado?) · Glosario · Carga EU · Ops journey · Quiz / miss-review |
| **Opcional** | Toggle «Modo Future Talent» → programa FTT, banco corto FTT, STAR |

Progreso en `localStorage` clave `tesla-panorama-v2` (incluye `lastWrongIds` para el repaso).

## Estructura

```
tesla-panorama/
  index.html
  assets/wordmark.svg
  css/app.css
  js/data.js       # módulos + STRUCTURE_MAP + PRODUCT_COMPARATOR + ACTUALIDAD_TIMELINE
                   # + GLOSSARY + CHARGING_EU + OPS_FLOW + CONTENT_PACK_META
  js/quiz-data.js  # QUIZ_BANK + QUIZ_BANK_FTT
  js/app.js
  README.md
```

## Demo rápida (60 s)

1. Abre `#/` — portada con wordmark y valor prop.
2. Pulsa **Modo exposición** → avanza con `→` por mapa, comparador, ops, actualidad, quiz.
3. `Esc` → vuelve al panel (`#/panel`) o portada; explora herramientas.

## Aviso

No oficial. Sin organigramas inventados ni leaks de entrevista. Verifica en [tesla.com/es_es](https://www.tesla.com/es_es), [Find Us](https://www.tesla.com/es_ES/findus) y el portal de empleo.
