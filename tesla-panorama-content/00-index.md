---
id: index
title: Mapa del panorama Tesla
order: 0
tags: [index, panorama]
lang: es
updated: 2026-09-04
path: primary
---

# Mapa — Qué estudiar y en qué orden

## Ruta primaria (recomendada)

Objetivo: entender **Tesla como compañía hoy** (2026), no memorizar un guion de entrevista.

| # | Archivo | Qué aprendes | Tiempo orientativo | UI avanzada |
|---|---------|--------------|--------------------|-------------|
| 01 | `01-que-es-tesla.md` | Misión, qué es Tesla hoy (auto + energy + AI/robotics a alto nivel) | 8–12 min | — |
| 02 | `02-estructura.md` | Organización pública: segmentos, fábricas (IR), ES/EU | 10–15 min | **structure map** (`structure_map` JSON) |
| 03 | `03-productos.md` | Gama cliente (3/Y/S/X, Cybertruck en contexto ES/EU), Energy, software | 12–18 min | — |
| 04 | `04-como-opera.md` | Compra → entrega → servicio; Supercharger; ops del día a día | 10–15 min | — |
| 05 | `05-actualidad.md` | Timeline-ready + cómo verificar en tesla.com / IR | 8–12 min | **news timeline** (`timeline` JSON) |
| 06 | `06-cultura.md` | First principles, ownership, velocidad, seguridad/calidad | 8–12 min | — |
| 07 | `07-banco-panorama.md` | Quiz 30 preguntas sobre el panorama | 20–40 min | wrong-answer review (banco) |
| 08 | `08-comparador-productos.md` | Atributos para comparador (segmento, carga, ES caveats) | 8–10 min | **product comparator** (`product_comparator` JSON) |

### Flujo sugerido en la UI

```
Inicio → Qué es Tesla → Estructura (mapa) → Productos / Comparador
      → Cómo opera → Actualidad (timeline) → Cultura → Quiz panorama
      [toggle] Módulo opcional FTT / STAR
```

### Bloques parseables (app)

| Archivo | Fence | Clave raíz | Uso |
|---------|-------|------------|-----|
| `02-estructura.md` | JSON fence | `structure_map.nodes[]` | Nodos del mapa interactivo |
| `05-actualidad.md` | JSON fence | `timeline.events[]` | Eventos del timeline |
| `08-comparador-productos.md` | JSON fence | `product_comparator.products[]` | Filas del comparador |

Frontmatter YAML en cada lección: `id`, `title`, `order`, `tags`, `lang`, `updated`, `path`, y opcionalmente `ui_features`.

---

## Ruta opcional — FTT / STAR

Solo si el usuario elige “Carreras / Future Talent”.

| Archivo | Contenido |
|---------|-----------|
| `opcional-ftt/programa-ftt.md` | Resumen del programa FTT España (datos públicos) |
| `opcional-ftt/banco-ftt.md` | Quiz corto orientado a programa |
| `opcional-ftt/historias-star.md` | Plantillas STAR de práctica |

> 💡 FTT es una **capa secundaria**. El progreso principal se mide sobre módulos 01–08 (panorama).

---

## Secciones de app sugeridas

1. **Explorar** — lecciones 01–06  
2. **Mapa de estructura** — parsear `02`  
3. **Comparador** — parsear `08` (+ narrativa `03`)  
4. **Timeline actualidad** — parsear `05`  
5. **Jugar / Quiz** — banco panorama (+ review de fallos)  
6. **Opcional: Carreras** — FTT + STAR  

## Reglas de honestidad

- Sin organigramas internos inventados.  
- Sin earnings numbers inventados fuera de IR citado.  
- Software de asistencia (Autopilot / FSD Supervised): **nombre y disponibilidad varían por mercado**.  
- Contenido fechado: **2026-09-04**; la app debería poder refrescar módulos.
