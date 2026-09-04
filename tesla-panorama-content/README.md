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
4. `opcional-ftt/`: solo si el usuario activa el módulo FTT.

### Convención para agent / app

| Campo | Uso |
|-------|-----|
| `id` | slug de ruta |
| `title` | título UI |
| `order` | orden en sidebar |
| `tags` | filtros (`panorama`, `productos`, `ops`, `ftt`…) |
| `path` | `primary` \| `optional-ftt` |

- Renderiza markdown estándar; `> 💡` / `> ⚠️` → callouts.
- Marcas `⚠️ [Incierta / verificar]` = no usar como hecho duro en quizzes estrictos.
- **No** inventar cifras de resultados, organigramas secretos ni leaks de entrevista.

### Integración sugerida

```
tesla-panorama-content/
  00–07  →  LessonScreen + QuizEngine (ruta primaria)
  opcional-ftt/  →  feature flag / pestaña "Carreras / FTT"
```

### Fuentes

Hechos públicos (tesla.com, filings SEC, noticias verificables). Verifica precios, disponibilidad por país y nombres de software en [tesla.com/es_es](https://www.tesla.com/es_es) antes de publicar quizzes “live”.

### Relación con `tesla-ftt-content/`

La carpeta histórica `tesla-ftt-content/` del repo se **conserva**. El camino recomendado nuevo es este pack; FTT vive en `opcional-ftt/` (versión slim). No borres el pack FTT antiguo sin migración explícita de la app.
