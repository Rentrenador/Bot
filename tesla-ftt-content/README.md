# Tesla FTT Spain — Contenido de estudio

Módulos markdown reutilizables para una app interactiva de preparación al **Future Talent Traineeship (FTT) España**. Idioma: **español**. Fecha de contenido: **2026-09-04**.

## Cómo consumir estos archivos

1. **Índice**: empieza por `00-index.md` (mapa de módulos + secciones sugeridas de la app).
2. **Lecciones**: `01`–`05` son pantallas de estudio (párrafos cortos, bullets, bloques `quiz-ready`).
3. **Evaluación**: `06-banco-examen.md` — parsea preguntas por `### Q##` (tipo, opciones, respuesta, explicación).
4. **STAR**: `07-historias-star.md` — plantillas para el candidato (no son respuestas oficiales de Tesla).

### Convención sugerida para el agent/app

| Campo frontmatter (opcional) | Uso |
|---|---|
| `id` | slug de ruta (`mision`, `productos`…) |
| `title` | título UI |
| `order` | orden en sidebar |
| `tags` | filtros (producto, cultura, ftt…) |

- Renderiza markdown estándar; los bloques `> 💡` / `> ⚠️` pueden mapearse a callouts.
- Marcas `⚠️ [Incierta / verificar]` = no afirmar como hecho oficial en quizzes duros.
- **No** inventar salariales, exercises de assessment ni “valores oficiales” inventados.

### Fuentes

Solo hechos públicos (web Tesla, ofertas FTT publicadas, SEC/10-K). No hay leaks de entrevista. Verificar precios/modelos en tesla.com/es_es antes de exámenes “live”.

### Integración típica

```
/content/*.md  →  MDX/loader  →  LessonScreen | QuizEngine | STARBuilder
```

Otro agent puede clonar esta carpeta en un repo GitHub y cablear rutas 1:1 con los `id` del índice.
