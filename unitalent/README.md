# UniTalent — MVP de orientación (RIASEC)

**One-liner:** UniTalent es un test corto de **intereses vocacionales** inspirado en el modelo **RIASEC** de Holland que te recomienda **clusters de grados universitarios** y **universidades públicas españolas de ejemplo** — con un informe detallado tras el pago.

## Base teórica

El banco de preguntas se alinea con el modelo de intereses vocacionales **RIASEC** (Realistic · Investigative · Artistic · Social · Enterprising · Conventional) propuesto por **John L. Holland**, ampliamente usado en orientación educativa y profesional como marco conceptual.

| Letra | Nombre (ES) | Foco (lenguaje sencillo) |
|-------|-------------|--------------------------|
| R | Realista | Práctico, con las manos, tangible |
| I | Investigador | Ciencia, curiosidad, análisis |
| A | Artístico | Crear, expresar, estética |
| S | Social | Ayudar, enseñar, cuidar |
| E | Emprendedor | Liderar, convencer, negocio |
| C | Convencional | Orden, números, normas |

## Lenguaje del banco (claridad)

Ítems en **español cotidiano** pensados para **16–20 años en España**: ejemplos del día a día (bici, Excel, barrio, lab…), trato de **tú**, y redacciones **neutrales de género** (sin formas forzadas tipo -@ / -o/a cuando se puede evitar). Misma estructura RIASEC y mismos `id` / tags de scoring que el esquema `questions.json` (compatible con CoS web).

## Aviso importante (disclaimer)

> **Orientación informativa, no oficial ni clínica.** UniTalent **no** está avalado por el Ministerio de Educación, las universidades ni organismos oficiales.  
> **No es** el *Self-Directed Search* (SDS) ni un inventario licenciado por Holland Company / Psychological Assessment Resources. Es una **adaptación ilustrativa MVP** (~30 ítems Likert de interés/disfrute + preferencias prácticas) para orientar grados en España.  
> **No** constituye un estudio de validación psicométrica; **no** se aportan coeficientes de fiabilidad (p. ej. alfa de Cronbach) inventados. Los resultados son una ayuda de orientación; no sustituyen el consejo de orientadores, el catálogo oficial de títulos (RUCT) ni las notas de corte/plazas. Verifica siempre en [RUCT](https://www.educacion.gob.es/ruct) y [QEDU](https://www.educacion.gob.es/notasdecorte).

Los listados de grados y universidades de este MVP son **ejemplos ilustrativos** (fecha de contenido: 2026-09-21).

## Cómo funciona el scoring

1. **Ítems RIASEC (Q01–Q30).** Cada pregunta Likert 1–5 está etiquetada con una letra (`R`/`I`/`A`/`S`/`E`/`C`), ~5 por letra.
2. **Perfil.** Media por letra → orden descendente → código de **2–3 letras** (p. ej. `IAS`, `RES`).
3. **Clusters.** Se mapean letras (y combos) a ~10 clusters de grados (`02-clusters-grados.md` / `cluster_riasec_map` en JSON).
4. **Preferencias prácticas (Q31–Q34).** Modalidad, movilidad, confort STEM y formato de aprendizaje: **no** suman al RIASEC; matizan el informe.
5. **Informe de pago.** Top letras + clusters + grados/unis de ejemplo.

## Archivos de este MVP

| Archivo | Contenido |
|---------|-----------|
| `01-guion-test.md` | Guion ~34 ítems (30 RIASEC + 4 prácticos) en español claro |
| `02-clusters-grados.md` | ~10 clusters mapeados a letras RIASEC + ejemplos de grados |
| `03-unis-ejemplo.md` | Universidades públicas de ejemplo por cluster |
| `04-informe-plantilla.md` | Estructura del informe (incluye bloque RIASEC) |
| `questions.json` | Preguntas machine-readable + tags RIASEC + notas de scoring (`mvp-0.3-clarity`) |

## Stack / siguiente paso (producto)

- Front: quiz → medias RIASEC → preview gratis (top letras + 1 cluster) → **paywall** → informe completo.
- Verificación de datos: enlazar RUCT/QEDU; no presentar rankings como oficiales.
- Si en el futuro se usa un inventario comercial (p. ej. SDS), requerirá **licencia** y validación propias — fuera del alcance de este MVP.
