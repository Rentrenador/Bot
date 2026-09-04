# Tesla FTT Panorama

App web interactiva (SPA) para preparar el **Future Talent Traineeship (FTT) España** — Sales & Customer Support (Madrid/Fuenlabrada y otras ubicaciones).

Tema visual Tesla (negro / blanco / rojo). UI en **español (España)**. Contenido basado en hechos públicos; no es material oficial de Tesla.

## Cómo ejecutar

No hace falta build ni Node. Abre la carpeta con cualquier servidor estático:

```bash
# Python 3
cd tesla-panorama
python3 -m http.server 5173

# Luego abre http://localhost:5173
```

O con VS Code / Cursor: «Open with Live Server» sobre `index.html`.

También puedes abrir `index.html` directamente en el navegador; algunas restricciones `file://` pueden limitar poco, pero la app es vanilla JS sin bundler.

## Qué incluye (MVP)

| Vista | Descripción |
|---|---|
| **Inicio** | Dashboard, progreso global (localStorage), mapa de módulos |
| **Misión** | Cards + frases entrevista |
| **Productos** | Modelos, carga, FSD, Energy, comparador |
| **Viaje cliente** | Timeline Sales → Delivery → Ops → Elective |
| **Cultura** | First principles, ownership, checklist interview-safe |
| **Programa FTT** | Datos clave, rotaciones, FAQ, checklist elegibilidad |
| **Examen** | 35 preguntas del banco; simulacro 15/30; puntuación + repaso |
| **STAR** | 6 plantillas con editor y guardado local |

## Progreso

Se guarda en `localStorage` bajo la clave `tesla-ftt-panorama-v1` (módulos, checklist FTT, historias STAR, historial de exámenes).

## Estructura

```
tesla-panorama/
  index.html
  css/app.css
  js/data.js          # módulos estructurados
  js/quiz-data.js     # banco de examen
  js/app.js           # SPA (router, quiz, STAR)
  README.md
```

## Contenido fuente

Los markdown originales viven en `tesla-ftt-content/` del mismo repo. Esta app los convierte a datos estructurados para UI de cards/timeline/quiz.

## Aviso

No inventa salarios, ejercicios secretos de assessment ni roadmaps internos. Verifica precios/modelos en [tesla.com/es_es](https://www.tesla.com/es_es) y requisitos en el portal de empleo Tesla.
