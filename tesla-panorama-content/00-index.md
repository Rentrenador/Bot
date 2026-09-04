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
| 05 | `05-actualidad.md` | Timeline-ready + cómo verificar + modo “qué cambió” | 8–12 min | **news timeline** + **what_changed** |
| 06 | `06-cultura.md` | First principles, ownership, velocidad, seguridad/calidad | 8–12 min | — |
| 07 | `07-banco-panorama.md` | Quiz 30 preguntas sobre el panorama | 20–40 min | wrong-answer review (banco) |
| 08 | `08-comparador-productos.md` | Atributos para comparador (segmento, carga, ES caveats) | 8–10 min | **product comparator** (`product_comparator` JSON) |
| 09 | `09-glosario.md` | 30+ términos buscables (Autopilot, FSD, Supercharger, Giga…) | 10–15 min | **searchable glossary** (`glossary` JSON) |
| 10 | `10-charging-europa.md` | Supercharger / Destination / casa; AFIR; España cualitativo | 8–12 min | **charging map** (`charging_map` JSON) |
| 11 | `11-ops-dia-a-dia.md` | Card ops: venta → pedido → prep → entrega → servicio | 8–10 min | **ops flow** (`ops_flow` JSON) |

### Flujo sugerido en la UI

```
Inicio → Qué es Tesla → Estructura (mapa) → Productos / Comparador
      → Cómo opera → Ops día a día (card) → Carga Europa (mapa)
      → Actualidad (timeline + qué cambió) → Glosario (búsqueda)
      → Cultura → Quiz panorama
      [toggle] Módulo opcional FTT / STAR
```

### Bloques parseables (app)

| Archivo | Fence | Clave raíz | Uso |
|---------|-------|------------|-----|
| `02-estructura.md` | JSON fence | `structure_map.nodes[]` | Nodos del mapa interactivo |
| `05-actualidad.md` | JSON fence | `timeline.events[]` + `what_changed[]` | Timeline + modo “qué cambió” |
| `08-comparador-productos.md` | JSON fence | `product_comparator.products[]` | Filas del comparador |
| `09-glosario.md` | JSON fence | `glossary[]` | Glosario buscable (`id`, `term`, `short`, `tags`, `related`) |
| `10-charging-europa.md` | JSON fence | `charging_map` | Capas + notas ES (sin inventar stalls de ciudad) |
| `11-ops-dia-a-dia.md` | JSON fence | `ops_flow.stages[]` | Card venta→servicio |

> Parse note: **primer fence JSON** de cada archivo es la fuente machine-readable. En `05`, `what_changed` es **aditivo** junto a `timeline` (no rompe el schema previo).

Frontmatter YAML en cada lección: `id`, `title`, `order`, `tags`, `lang`, `updated`, `path`, y opcionalmente `ui_features`.

---

## Ruta opcional — FTT / STAR

Solo si el usuario elige “Carreras / Future Talent”.

| Archivo | Contenido |
|---------|-----------|
| `opcional-ftt/programa-ftt.md` | Resumen del programa FTT España (datos públicos) |
| `opcional-ftt/banco-ftt.md` | Quiz corto orientado a programa |
| `opcional-ftt/historias-star.md` | Plantillas STAR de práctica |

> 💡 FTT es una **capa secundaria**. El progreso principal se mide sobre módulos 01–11 (panorama).

---

## Secciones de app sugeridas

1. **Explorar** — lecciones 01–06 (+ 09–11 como herramientas)  
2. **Mapa de estructura** — parsear `02`  
3. **Comparador** — parsear `08` (+ narrativa `03`)  
4. **Timeline actualidad** — parsear `05.timeline`  
5. **¿Qué cambió?** — parsear `05.what_changed`  
6. **Glosario** — parsear `09`  
7. **Mapa de carga EU/ES** — parsear `10`  
8. **Ops card** — parsear `11`  
9. **Jugar / Quiz** — banco panorama (+ review de fallos)  
10. **Opcional: Carreras** — FTT + STAR  

## Reglas de honestidad

- Sin organigramas internos inventados.  
- Sin earnings numbers inventados fuera de IR citado.  
- Software de asistencia (Autopilot / FSD Supervised): **nombre y disponibilidad varían por mercado**.  
- Conteos de Superchargers / tiendas: **perishable** → Find Us.  
- Contenido fechado: **2026-09-04**; la app debería poder refrescar módulos.
