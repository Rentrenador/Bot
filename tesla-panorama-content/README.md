# Tesla Panorama — Pack de contenido

Módulos markdown en **español** para una app interactiva que enseña el **panorama actual de Tesla**: qué es la compañía hoy, cómo se organiza, productos, operaciones y cultura — de forma profesional y divertida.

**Fecha de contenido:** 2026-09-04  
**Repo destino:** `Rentrenador/Bot` → carpeta `tesla-panorama-content/`  
**No es material oficial de Tesla.**

---

## Objetivo del producto (prioridad)

| Capa | Rol en la app |
|------|----------------|
| **Primaria** | Aprender el panorama Tesla (auto + energy + software/IA a alto nivel) |
| **Secundaria (opcional)** | Future Talent Traineeship (FTT) + método STAR — carpeta `opcional-ftt/` |

> El quiz y las lecciones deben sentir **exploración de la empresa**, no “aprobar la entrevista”.

---

## Cómo consumir estos archivos

1. Empieza por `00-index.md` (mapa ruta primaria vs opcional).
2. Lecciones `01`–`06`: pantallas de estudio (párrafos cortos, bullets, callouts).
3. `07-banco-panorama.md`: quiz de panorama corporativo (parsear por `### Q##`).
4. `08-comparador-productos.md`: atributos para UI de comparador.
5. `opcional-ftt/`: solo si el usuario activa el módulo FTT.

### Convención para agent / app

| Campo | Uso |
|-------|-----|
| `id` | slug de ruta |
| `title` | título UI |
| `order` | orden en sidebar |
| `tags` | filtros (`panorama`, `productos`, `ops`, `ftt`…) |
| `path` | `primary` \| `optional-ftt` |
| `ui_features` | p. ej. `structure_map`, `news_timeline`, `product_comparator` |

- Renderiza markdown estándar; `> 💡` / `> ⚠️` → callouts.
- Marcas `⚠️ [Incierta / verificar]` = no usar como hecho duro en quizzes estrictos.
- **No** inventar cifras de resultados, organigramas secretos ni leaks de entrevista.

### Bloques machine-readable (UI avanzada)

Cada uno de estos archivos incluye un **fence JSON** (legible también por humanos):

| Feature UI | Archivo | Clave JSON |
|------------|---------|------------|
| Interactive structure map | `02-estructura.md` | `structure_map.nodes[]` (`id`, `label`, `type`, `parent`, …) |
| News / study timeline | `05-actualidad.md` | `timeline.events[]` (`id`, `theme`, `date`, `title`, `confidence`, `verify`) |
| Product comparator | `08-comparador-productos.md` | `product_comparator.products[]` (`segment`, `available_es`, `compare_axes`, …) |

`02-estructura.md` también incluye un diagrama **mermaid** opcional para renderers que lo soporten.

### Integración sugerida

```
tesla-panorama-content/
  00–08  →  LessonScreen + StructureMap + Comparator + Timeline + QuizEngine
  opcional-ftt/  →  feature flag / pestaña "Carreras / FTT"
```

### Fuentes

Hechos públicos (tesla.com, IR Updates, noticias verificables). Capacidades de planta citadas desde **Tesla Q2 2026 Update**. Verifica precios, disponibilidad por país y nombres de software en [tesla.com/es_es](https://www.tesla.com/es_es) antes de publicar quizzes “live”.

### Relación con `tesla-ftt-content/`

La carpeta histórica `tesla-ftt-content/` del repo se **conserva**. El camino recomendado nuevo es este pack; FTT vive en `opcional-ftt/` (versión slim). No borres el pack FTT antiguo sin migración explícita de la app.
