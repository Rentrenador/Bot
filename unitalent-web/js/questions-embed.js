/**
 * UniTalent — embedded questions + scoring meta (RIASEC).
 * Generated from unitalent/questions.json so CDN/mobile works without fetch.
 * Do not edit by hand; regenerate from the JSON source.
 */
window.UNITALENT_QUESTIONS = {
  "product": "UniTalent",
  "version": "mvp-0.2-riasec",
  "locale": "es-ES",
  "content_date": "2026-09-21",
  "theoretical_base": {
    "model": "Holland RIASEC",
    "letters": [
      "R",
      "I",
      "A",
      "S",
      "E",
      "C"
    ],
    "letter_labels_es": {
      "R": "Realista (práctico / técnico)",
      "I": "Investigador (científico / analítico)",
      "A": "Artístico (creativo / expresivo)",
      "S": "Social (ayudar / enseñar / cuidar)",
      "E": "Emprendedor (liderazgo / persuasión)",
      "C": "Convencional (orden / datos / procedimientos)"
    },
    "note": "Adaptación ilustrativa MVP inspirada en el modelo RIASEC de John L. Holland. No es el Self-Directed Search (SDS) ni un inventario licenciado. No constituye validación psicométrica."
  },
  "disclaimer": "Orientación informativa, no oficial ni clínica. UniTalent no está avalado por el Ministerio de Educación ni por Holland Company / SDS. Datos ilustrativos de MVP. Verificar títulos en RUCT y acceso en QEDU. No se aportan coeficientes de fiabilidad inventados.",
  "scoring": {
    "method": "Para cada letra RIASEC, media aritmética de sus ítems Likert (1–5). Ordenar letras de mayor a menor → código de 2–3 letras. Mapear a clusters vía primary_riasec / secondary_riasec.",
    "riasec_item_weight": 1,
    "scale_min": 1,
    "scale_max": 5,
    "scale_labels": {
      "1": "Nada / no me gusta",
      "2": "Poco",
      "3": "Regular / indiferente",
      "4": "Bastante",
      "5": "Mucho / me encanta"
    },
    "practical_items_score_riasec": false,
    "top_letters_for_report": 3,
    "clusters": [
      "ingenieria",
      "ambiente",
      "stem",
      "arte",
      "idiomas",
      "salud",
      "educacion",
      "social",
      "empresa",
      "derecho"
    ],
    "cluster_riasec_map": {
      "ingenieria": {
        "primary": [
          "R"
        ],
        "secondary": [
          "I"
        ]
      },
      "ambiente": {
        "primary": [
          "R"
        ],
        "secondary": [
          "I"
        ]
      },
      "stem": {
        "primary": [
          "I"
        ],
        "secondary": []
      },
      "arte": {
        "primary": [
          "A"
        ],
        "secondary": []
      },
      "idiomas": {
        "primary": [
          "A"
        ],
        "secondary": [
          "S"
        ]
      },
      "salud": {
        "primary": [
          "S"
        ],
        "secondary": [
          "I"
        ]
      },
      "educacion": {
        "primary": [
          "S"
        ],
        "secondary": []
      },
      "social": {
        "primary": [
          "S"
        ],
        "secondary": [
          "E"
        ]
      },
      "empresa": {
        "primary": [
          "E"
        ],
        "secondary": [
          "C"
        ]
      },
      "derecho": {
        "primary": [
          "E",
          "C"
        ],
        "secondary": []
      }
    },
    "cluster_score_hint": "Afinidad_cluster ≈ suma(medias de letras primary) + 0.5 × suma(medias de letras secondary). Recomendar top 3–5 clusters."
  },
  "questions": [
    {
      "id": "q01_r_herramientas",
      "order": 1,
      "block": "riasec",
      "riasec": "R",
      "text": "¿Cuánto te gusta trabajar con herramientas, maquinaria o hacer reparaciones?",
      "type": "scale",
      "scale_min": 1,
      "scale_max": 5
    },
    {
      "id": "q02_r_aire_libre",
      "order": 2,
      "block": "riasec",
      "riasec": "R",
      "text": "¿Cuánto disfrutas actividades al aire libre, en el campo, taller o entorno físico (frente a solo pantalla)?",
      "type": "scale",
      "scale_min": 1,
      "scale_max": 5
    },
    {
      "id": "q03_r_construir",
      "order": 3,
      "block": "riasec",
      "riasec": "R",
      "text": "¿Cuánto te gusta construir, montar, fabricar o arreglar cosas con las manos?",
      "type": "scale",
      "scale_min": 1,
      "scale_max": 5
    },
    {
      "id": "q04_r_equipos",
      "order": 4,
      "block": "riasec",
      "riasec": "R",
      "text": "¿Cuánto te interesa manejar vehículos, equipos técnicos, instalaciones o sistemas físicos?",
      "type": "scale",
      "scale_min": 1,
      "scale_max": 5
    },
    {
      "id": "q05_r_problemas_practicos",
      "order": 5,
      "block": "riasec",
      "riasec": "R",
      "text": "¿Cuánto disfrutas resolver problemas prácticos de forma tangible (que se vea un resultado físico)?",
      "type": "scale",
      "scale_min": 1,
      "scale_max": 5
    },
    {
      "id": "q06_i_como_funcionan",
      "order": 6,
      "block": "riasec",
      "riasec": "I",
      "text": "¿Cuánto te gusta investigar o entender a fondo cómo funcionan las cosas?",
      "type": "scale",
      "scale_min": 1,
      "scale_max": 5
    },
    {
      "id": "q07_i_laboratorio_datos",
      "order": 7,
      "block": "riasec",
      "riasec": "I",
      "text": "¿Cuánto disfrutas experimentar (laboratorio, prototipos, código) o trabajar con datos?",
      "type": "scale",
      "scale_min": 1,
      "scale_max": 5
    },
    {
      "id": "q08_i_problemas_abstractos",
      "order": 8,
      "block": "riasec",
      "riasec": "I",
      "text": "¿Cuánto te gusta resolver problemas abstractos, lógicos o científicos?",
      "type": "scale",
      "scale_min": 1,
      "scale_max": 5
    },
    {
      "id": "q09_i_ciencia_tecnologia",
      "order": 9,
      "block": "riasec",
      "riasec": "I",
      "text": "¿Cuánto disfrutas leer o ver contenido sobre ciencia, tecnología o descubrimientos?",
      "type": "scale",
      "scale_min": 1,
      "scale_max": 5
    },
    {
      "id": "q10_i_analizar",
      "order": 10,
      "block": "riasec",
      "riasec": "I",
      "text": "¿Cuánto te gusta analizar información para sacar conclusiones o hipótesis?",
      "type": "scale",
      "scale_min": 1,
      "scale_max": 5
    },
    {
      "id": "q11_a_visual",
      "order": 11,
      "block": "riasec",
      "riasec": "A",
      "text": "¿Cuánto te gusta dibujar, diseñar o crear contenido visual?",
      "type": "scale",
      "scale_min": 1,
      "scale_max": 5
    },
    {
      "id": "q12_a_escribir",
      "order": 12,
      "block": "riasec",
      "riasec": "A",
      "text": "¿Cuánto disfrutas escribir, contar historias o crear textos con estilo propio?",
      "type": "scale",
      "scale_min": 1,
      "scale_max": 5
    },
    {
      "id": "q13_a_artes_escenicas",
      "order": 13,
      "block": "riasec",
      "riasec": "A",
      "text": "¿Cuánto te interesa la música, el teatro, el cine o la expresión artística?",
      "type": "scale",
      "scale_min": 1,
      "scale_max": 5
    },
    {
      "id": "q14_a_diseno_experiencias",
      "order": 14,
      "block": "riasec",
      "riasec": "A",
      "text": "¿Cuánto te gusta diseñar espacios, productos, marcas o experiencias con criterio estético?",
      "type": "scale",
      "scale_min": 1,
      "scale_max": 5
    },
    {
      "id": "q15_a_libertad_creativa",
      "order": 15,
      "block": "riasec",
      "riasec": "A",
      "text": "¿Cuánto prefieres entornos con libertad creativa frente a rutinas muy rígidas?",
      "type": "scale",
      "scale_min": 1,
      "scale_max": 5
    },
    {
      "id": "q16_s_ayudar",
      "order": 16,
      "block": "riasec",
      "riasec": "S",
      "text": "¿Cuánto te gusta ayudar a personas con dificultades o necesidades?",
      "type": "scale",
      "scale_min": 1,
      "scale_max": 5
    },
    {
      "id": "q17_s_ensenar",
      "order": 17,
      "block": "riasec",
      "riasec": "S",
      "text": "¿Cuánto disfrutas enseñar, explicar o acompañar el aprendizaje de otros?",
      "type": "scale",
      "scale_min": 1,
      "scale_max": 5
    },
    {
      "id": "q18_s_cuidar",
      "order": 18,
      "block": "riasec",
      "riasec": "S",
      "text": "¿Cuánto te interesa cuidar o promover el bienestar físico o emocional de otras personas?",
      "type": "scale",
      "scale_min": 1,
      "scale_max": 5
    },
    {
      "id": "q19_s_equipo_personas",
      "order": 19,
      "block": "riasec",
      "riasec": "S",
      "text": "¿Cuánto disfrutas trabajar en equipo con foco en las personas (clima, apoyo, mediación)?",
      "type": "scale",
      "scale_min": 1,
      "scale_max": 5
    },
    {
      "id": "q20_s_comunidad",
      "order": 20,
      "block": "riasec",
      "riasec": "S",
      "text": "¿Cuánto te motiva el voluntariado, la intervención comunitaria o el impacto social?",
      "type": "scale",
      "scale_min": 1,
      "scale_max": 5
    },
    {
      "id": "q21_e_liderar",
      "order": 21,
      "block": "riasec",
      "riasec": "E",
      "text": "¿Cuánto te gusta liderar proyectos, equipos o tomar la iniciativa?",
      "type": "scale",
      "scale_min": 1,
      "scale_max": 5
    },
    {
      "id": "q22_e_persuadir",
      "order": 22,
      "block": "riasec",
      "riasec": "E",
      "text": "¿Cuánto disfrutas persuadir, negociar o vender ideas / productos?",
      "type": "scale",
      "scale_min": 1,
      "scale_max": 5
    },
    {
      "id": "q23_e_emprender",
      "order": 23,
      "block": "riasec",
      "riasec": "E",
      "text": "¿Cuánto te atrae emprender, crear un negocio o generar oportunidades económicas?",
      "type": "scale",
      "scale_min": 1,
      "scale_max": 5
    },
    {
      "id": "q24_e_influir",
      "order": 24,
      "block": "riasec",
      "riasec": "E",
      "text": "¿Cuánto te gusta hablar en público o influir en decisiones de un grupo?",
      "type": "scale",
      "scale_min": 1,
      "scale_max": 5
    },
    {
      "id": "q25_e_metas",
      "order": 25,
      "block": "riasec",
      "riasec": "E",
      "text": "¿Cuánto disfrutas competir, asumir riesgo calculado y perseguir metas ambiciosas?",
      "type": "scale",
      "scale_min": 1,
      "scale_max": 5
    },
    {
      "id": "q26_c_organizar",
      "order": 26,
      "block": "riasec",
      "riasec": "C",
      "text": "¿Cuánto te gusta organizar archivos, datos, inventarios o procesos administrativos?",
      "type": "scale",
      "scale_min": 1,
      "scale_max": 5
    },
    {
      "id": "q27_c_procedimientos",
      "order": 27,
      "block": "riasec",
      "riasec": "C",
      "text": "¿Cuánto disfrutas seguir procedimientos claros, normas y criterios bien definidos?",
      "type": "scale",
      "scale_min": 1,
      "scale_max": 5
    },
    {
      "id": "q28_c_numeros",
      "order": 28,
      "block": "riasec",
      "riasec": "C",
      "text": "¿Cuánto te gusta trabajar con números, contabilidad, tablas o hojas de cálculo?",
      "type": "scale",
      "scale_min": 1,
      "scale_max": 5
    },
    {
      "id": "q29_c_planificar",
      "order": 29,
      "block": "riasec",
      "riasec": "C",
      "text": "¿Cuánto disfrutas planificar agendas, cumplir plazos y mantener el orden en el detalle?",
      "type": "scale",
      "scale_min": 1,
      "scale_max": 5
    },
    {
      "id": "q30_c_estructurado",
      "order": 30,
      "block": "riasec",
      "riasec": "C",
      "text": "¿Cuánto prefieres entornos de trabajo estructurados y predecibles frente a la improvisación constante?",
      "type": "scale",
      "scale_min": 1,
      "scale_max": 5
    },
    {
      "id": "q31_modalidad_estudio",
      "order": 31,
      "block": "practico",
      "riasec": null,
      "text": "¿Qué modalidad de estudios universitarios prefieres?",
      "type": "single",
      "scoring_note": "No puntúa RIASEC. Preferencia de contexto para filtrar modalidad / unis.",
      "options": [
        {
          "id": "q31_a",
          "label": "Presencial / en campus",
          "tags": [
            "pref_presencial"
          ]
        },
        {
          "id": "q31_b",
          "label": "Híbrida (parte online, parte presencial)",
          "tags": [
            "pref_hibrida"
          ]
        },
        {
          "id": "q31_c",
          "label": "Remota / a distancia",
          "tags": [
            "pref_remota"
          ]
        },
        {
          "id": "q31_d",
          "label": "Me da igual / aún no lo sé",
          "tags": [
            "pref_indiferente"
          ]
        }
      ]
    },
    {
      "id": "q32_movilidad",
      "order": 32,
      "block": "practico",
      "riasec": null,
      "text": "¿Estarías dispuesto/a a mudarte de ciudad o comunidad autónoma para estudiar el grado que te interese?",
      "type": "single",
      "scoring_note": "No puntúa RIASEC. Matiza sugerencias geográficas de universidades.",
      "options": [
        {
          "id": "q32_a",
          "label": "Sí, sin problema",
          "tags": [
            "mov_alta"
          ]
        },
        {
          "id": "q32_b",
          "label": "Sí, si el grado lo merece",
          "tags": [
            "mov_media"
          ]
        },
        {
          "id": "q32_c",
          "label": "Solo dentro de mi provincia / CCAA",
          "tags": [
            "mov_baja"
          ]
        },
        {
          "id": "q32_d",
          "label": "Prefiero no mudarme",
          "tags": [
            "mov_nula"
          ]
        }
      ]
    },
    {
      "id": "q33_confort_stem",
      "order": 33,
      "block": "practico",
      "riasec": null,
      "text": "¿Cómo de cómodo/a te sientes con matemáticas, física, química o materias STEM intensivas?",
      "type": "scale",
      "scale_min": 1,
      "scale_max": 5,
      "scale_labels_override": {
        "1": "Muy incómodo/a",
        "5": "Muy cómodo/a"
      },
      "context_tag": "confort_stem",
      "scoring_note": "No puntúa RIASEC. Si bajo (1–2), matizar clusters stem/ingenieria (aviso de refuerzo); si alto (4–5), reforzar confianza en vías I/R."
    },
    {
      "id": "q34_formato_aprendizaje",
      "order": 34,
      "block": "practico",
      "riasec": null,
      "text": "¿Qué formato de aprendizaje te atrae más en la universidad?",
      "type": "single",
      "scoring_note": "No puntúa RIASEC. Matiza tono del informe (práctico vs teórico vs creativo).",
      "options": [
        {
          "id": "q34_a",
          "label": "Mucha práctica, laboratorio, taller o clínicas",
          "tags": [
            "fmt_practico"
          ]
        },
        {
          "id": "q34_b",
          "label": "Equilibrio teoría + práctica",
          "tags": [
            "fmt_mixto"
          ]
        },
        {
          "id": "q34_c",
          "label": "Sobre todo teoría, lectura y análisis",
          "tags": [
            "fmt_teorico"
          ]
        },
        {
          "id": "q34_d",
          "label": "Proyectos creativos / portfolio",
          "tags": [
            "fmt_creativo"
          ]
        }
      ]
    }
  ]
};
