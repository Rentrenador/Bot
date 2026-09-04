window.APP_META = {
  title: "Tesla FTT Panorama",
  subtitle: "Preparación Future Talent Traineeship · España",
  audience: "Sales & Customer Support · Madrid / Fuenlabrada y ubicaciones ES",
  updated: "2026-09-04",
  studyHours: "3–4 h",
};

window.MODULES = [
  {
    id: "mision",
    order: 1,
    icon: "◎",
    title: "Misión Tesla",
    short: "Por qué existe la empresa: energía sostenible + abundancia.",
    tags: ["misión", "panorama"],
    summary: "Acelerar la transición del mundo hacia la energía sostenible. Transporte + generación/almacenamiento como un solo problema.",
    sections: [
      {
        type: "quote",
        title: "En una frase (público / SEC)",
        body: "Acelerar la transición del mundo hacia la energía sostenible.",
        note: "También aparece la idea de construir un mundo de abundancia asombrosa (amazing abundance)."
      },
      {
        type: "cards",
        title: "Por qué importa (transporte + energía)",
        items: [
          { title: "Consumo", body: "Vehículos eléctricos que desplazan combustibles fósiles." },
          { title: "Generación y almacenamiento", body: "Solar + baterías (Powerwall, escala de red) para energía limpia 24/7." },
          { title: "Ecosistema", body: "Venta directa, red de carga, software OTA, servicio propio." },
          { title: "Datos y software", body: "Mejoras continuas (seguridad, asistencia) vía actualizaciones." }
        ]
      },
      {
        type: "bullets",
        title: "Ideas clave (quiz-ready)",
        items: [
          "Misión oficial: transición a energía sostenible (no «vender el coche más caro»).",
          "Problema doble: cómo se genera la energía y cómo se consume.",
          "Integración vertical: diseño, fabricación, venta, servicio, carga, software.",
          "Escala: impacto real si el producto es deseable y asequible a volumen.",
          "El FTT forma talento operativo en la experiencia de cliente española."
        ]
      },
      {
        type: "callout",
        variant: "tip",
        body: "En entrevista: conecta misión → producto que el cliente toca → rol FTT (educar, entregar, operar)."
      },
      {
        type: "phrases",
        title: "Frases útiles",
        items: [
          "El coche es la puerta de entrada; el ecosistema (carga, energy, software) multiplica el impacto.",
          "Mi rol en Sales/Delivery/Ops es hacer que esa transición sea fácil y memorable para cada cliente."
        ]
      },
      {
        type: "callout",
        variant: "warn",
        body: "No inventes métricas internas ni roadmaps secretos. Usa hechos públicos y tu experiencia personal."
      }
    ]
  },
  {
    id: "productos",
    order: 2,
    icon: "▣",
    title: "Productos",
    short: "Modelos, carga, Autopilot/FSD y Energy a nivel cliente.",
    tags: ["productos", "carga", "FSD"],
    summary: "Hablar como quien asesora o entrega: Model 3/Y, casa vs Supercharger, asistencia supervisada, Powerwall.",
    sections: [
      {
        type: "callout",
        variant: "warn",
        body: "Precios y versiones cambian: verifica siempre en tesla.com/es_es."
      },
      {
        type: "table",
        title: "Vehículos (panorama España)",
        headers: ["Modelo", "Perfil", "Notas ES 2026"],
        rows: [
          ["Model 3", "Sedán compacto, eficiencia, día a día", "Núcleo de gama en ES"],
          ["Model Y", "SUV compacto, familia / espacio", "Núcleo de gama; muy popular en Europa"],
          ["Model S", "Sedán premium, prestaciones", "⚠️ Verificar disponibilidad actual"],
          ["Model X", "SUV premium, falcon wing", "⚠️ Verificar disponibilidad actual"],
          ["Cybertruck", "Pickup", "No opción práctica en Europa"]
        ]
      },
      {
        type: "cards",
        title: "Hablar con el cliente",
        items: [
          { title: "Model 3", body: "Ágil, eficiente, ideal ciudad + viajes si planificas carga." },
          { title: "Model Y", body: "Más altura, maletero, familia u ocio; mismo «idioma» de software que el 3." },
          { title: "Evita", body: "Comparar solo por 0–100. Pregunta uso real: km, parking, viajes, plazas." }
        ]
      },
      {
        type: "split",
        title: "Carga: casa vs Supercharger",
        left: {
          title: "En casa / trabajo",
          items: [
            "Wall Connector (o compatible): carga cotidiana, suele ser lo más barato €/kWh.",
            "Cable móvil / Schuko: útil pero más lento; educa expectativas.",
            "Mensaje clave: casi todos los km se cargan mientras duermes o trabajas."
          ]
        },
        right: {
          title: "Supercharger",
          items: [
            "Carga rápida en ruta (DC); ideal 10–80 % en paradas de viaje.",
            "App Tesla: localizar, precio orientativo, estado.",
            "Distingue kW (velocidad) vs kWh (energía / coste)."
          ]
        }
      },
      {
        type: "table",
        title: "Autopilot y FSD (nivel cliente)",
        headers: ["Nombre", "Qué es", "Qué NO es"],
        rows: [
          ["Autopilot", "Crucero adaptativo + mantenimiento de carril (según config.)", "No es conducción autónoma"],
          ["FSD (Supervised)", "Asistencia avanzada (navegación, maniobras… según mercado)", "Requiere supervisión activa; no es Level 4/5"]
        ]
      },
      {
        type: "callout",
        variant: "tip",
        body: "Frase segura: «Es asistencia avanzada que puede reducir carga mental, pero tú sigues al volante y atento.» Disponibilidad depende del mercado (ES/UE ≠ EE.UU.)."
      },
      {
        type: "bullets",
        title: "Energy (breve)",
        items: [
          "Powerwall: batería doméstica; solar/red; backup y autoconsumo.",
          "Megapack y escala: más B2B/red; útil para el panorama.",
          "En retail: mismo ADN de batería; coche y casa pueden formar un sistema."
        ]
      },
      {
        type: "cards",
        title: "Mini-comparador (UI)",
        items: [
          { title: "¿Maletero / familia?", body: "Sugiere Model Y." },
          { title: "¿Eficiencia y compacto?", body: "Sugiere Model 3." },
          { title: "¿Viajas mucho?", body: "Habla autonomía + Superchargers en ruta." },
          { title: "¿Garaje/plaza?", body: "Wall Connector primero." }
        ]
      }
    ]
  },
  {
    id: "viaje-cliente",
    order: 3,
    icon: "→",
    title: "Viaje del cliente",
    short: "Compra → Delivery → Service mapeado a rotaciones FTT.",
    tags: ["cliente", "rotaciones"],
    summary: "El cliente no ve silos. Sales gana confianza; Delivery la cumple; Ops la escala.",
    sections: [
      {
        type: "callout",
        variant: "quote",
        body: "Descubrimiento → Configuración/compra → Financiación / trade-in → Preparación entrega → Delivery Hub → Postventa (Service / Parts)"
      },
      {
        type: "timeline",
        title: "Etapas ↔ rotaciones FTT",
        items: [
          {
            step: "1",
            rotation: "Sales",
            title: "Compra / asesoramiento",
            body: "Educar sin presión de concesionario clásico. Escucha, producto, storytelling de misión, multitarea. Claridad y seguimiento."
          },
          {
            step: "2",
            rotation: "Sales (+ proceso)",
            title: "Financiación y trade-in",
            body: "Transparencia sobre opciones; la aprobación depende del financiador. Expediente limpio = entrega más suave."
          },
          {
            step: "3",
            rotation: "Vehicle Delivery",
            title: "Delivery Hub",
            body: "Día grande: orientación app/carga/seguridad, checklist, eye for quality. Posible commute al hub. Weekends posibles."
          },
          {
            step: "4",
            rotation: "Regional Operations",
            title: "Coordinación / fluidez",
            body: "Detrás de escena: stock, logística, priorizar, feedback loops, first principles. Cuando algo falla, Ops está detrás del telón."
          },
          {
            step: "5",
            rotation: "Elective",
            title: "Service / Parts / foco carrera",
            body: "Postventa: citas, piezas, OTA. Elective = última fase alineada con pasión / carrera post-programa."
          }
        ]
      },
      {
        type: "table",
        title: "Tabla rápida",
        headers: ["Etapa cliente", "Rotación FTT", "Palabra clave"],
        rows: [
          ["Compra / educación", "Sales", "Educar"],
          ["Finance / trade-in", "Sales (+ soporte)", "Claridad"],
          ["Recogida", "Vehicle Delivery", "Experiencia + calidad"],
          ["Coordinación", "Regional Operations", "Sistema"],
          ["Postventa / carrera", "Elective", "Ownership"]
        ]
      },
      {
        type: "phrases",
        title: "Frases journey",
        items: [
          "En Sales gano confianza; en Delivery la cumplo; en Ops la escaleo.",
          "Un cliente no ve silos: si fallamos en handoff, la marca entera falla."
        ]
      }
    ]
  },
  {
    id: "cultura",
    order: 4,
    icon: "✦",
    title: "Cultura",
    short: "First principles, ownership, safety — interview-safe.",
    tags: ["cultura", "entrevistas"],
    summary: "Temas públicos asociados a cómo Tesla habla de trabajo + comportamientos demostrables. No son «Leadership Principles» inventados.",
    sections: [
      {
        type: "cards",
        title: "Comportamientos clave",
        items: [
          { title: "First principles", body: "Descomponer a verdades básicas. Proponer mejora simple tras entender el cuello de botella." },
          { title: "Ownership", body: "Si lo tocas, lo cierras (o escalas con contexto). No «no es mi departamento» como respuesta final." },
          { title: "Speed / bias to action", body: "Ritmo alto con criterio: prioriza, decide con info incompleta razonable, comunica trade-offs." },
          { title: "Safety & quality", body: "Personas y producto primero. Paras un proceso inseguro aunque retrase el go." },
          { title: "Feedback", body: "Directo, específico, accionable. En grupo: construyes sobre ideas ajenas." },
          { title: "Aprendizaje autónomo", body: "Self-starters: mentorship existe; la iniciativa es tuya." }
        ]
      },
      {
        type: "table",
        title: "Checklist interview-safe",
        headers: ["Haz ✅", "Evita ❌"],
        rows: [
          ["Ejemplos STAR concretos", "Memorizar valores inventados como LPs oficiales"],
          ["Admitir error + aprendizaje", "Culpar al equipo sin ownership"],
          ["Preguntar por el cliente", "Prometer features/FSD imposibles"],
          ["Calma en ambigüedad", "Congelarte sin plan B"],
          ["Realismo weekends/travel", "Fingir ritmo «9–5 oficina»"]
        ]
      },
      {
        type: "bullets",
        title: "Micro-escenarios",
        items: [
          "Cliente enfadado por retraso → ownership + empatía + next step claro.",
          "Feedback duro en público → escuchar, aclarar, mejorar.",
          "Dos tareas urgentes → priorizar por impacto/seguridad y comunicar.",
          "No sabes la respuesta de producto → «no lo sé; lo verifico en fuente oficial»."
        ]
      },
      {
        type: "callout",
        variant: "quote",
        body: "Tesla premia gente que mueve la aguja con responsabilidad. Yo traigo ejemplos de ownership, aprendizaje rápido y cuidado del cliente — no un guion de valores inventados."
      }
    ]
  },
  {
    id: "programa-ftt",
    order: 5,
    icon: "◷",
    title: "Programa FTT",
    short: "12 meses, rotaciones, elegibilidad y expectativas reales.",
    tags: ["FTT", "elegibilidad"],
    summary: "In-house 12 meses en Tesla España. Potencial > solo expediente. Verifica siempre en el portal oficial.",
    sections: [
      {
        type: "cards",
        title: "Datos clave (ofertas públicas)",
        items: [
          { title: "Duración", body: "12 meses · inicio típico cohorte citada: octubre 2026." },
          { title: "Jornada", body: "Completa, 5 días/semana incluyendo fines de semana." },
          { title: "Plazas", body: "Hasta ~6 en total en España (oferta citada)." },
          { title: "Ubicaciones", body: "Barcelona, Bilbao, Madrid, Málaga, Sevilla, Valencia." }
        ]
      },
      {
        type: "timeline",
        title: "Rotaciones (orden público)",
        items: [
          { step: "1", rotation: "Sales", title: "Sales", body: "Apoyar y educar en el journey inicial de compra." },
          { step: "2", rotation: "Delivery", title: "Vehicle Delivery", body: "Experiencia de recogida en Delivery Hub (posible commute)." },
          { step: "3", rotation: "Ops", title: "Regional Operations", body: "Detrás de escena para una experiencia fluida." },
          { step: "4", rotation: "Elective", title: "Elective", body: "Rotación alineada con pasión / posible carrera post-programa." }
        ]
      },
      {
        type: "callout",
        variant: "warn",
        body: "Contrato formativo para la obtención de la práctica profesional. Debes cumplir requisitos legales. Este contenido no sustituye asesoría laboral."
      },
      {
        type: "checklist",
        title: "Checklist pre-aplicación",
        storageKey: "ftt-checklist",
        items: [
          "Título dentro de ventana temporal legal (últimos 3 años; hasta 5 con discapacidad reconocida — según oferta)",
          "Vida Laboral: sin contrato formativo previo incompatible para el mismo grado",
          "Carné UE/ES + español fluido + inglés B1+",
          "Disponibilidad weekends / travel",
          "Homologación si el título es extranjero (antes del start date)",
          "Historias STAR listas"
        ]
      },
      {
        type: "faq",
        title: "FAQ rápida",
        items: [
          { q: "¿Es un máster?", a: "No — es trabajo rotacional remunerado bajo contrato formativo (según oferta)." },
          { q: "¿Puedo elegir ciudad?", a: "Hay ubicaciones listadas; la asignación depende del proceso/oferta." },
          { q: "¿Y después?", a: "Prepara skills de entrada; el elective orienta; la continuidad no está garantizada en este texto." }
        ]
      },
      {
        type: "callout",
        variant: "tip",
        body: "Frase candidata: «Entiendo que es retail operativo, no un trainee de despacho: weekends y movilidad forman parte del aprendizaje.»"
      },
      {
        type: "bullets",
        title: "Qué NO inventar",
        items: [
          "Salarios, bonus o equity no publicados.",
          "Ejercicios exactos del assessment day.",
          "Promesas de conversión a indefinido."
        ]
      }
    ]
  },
  {
    id: "banco-examen",
    order: 6,
    icon: "?",
    title: "Banco examen",
    short: "35 preguntas parseadas · simulacro con puntuación.",
    tags: ["quiz", "examen"],
    summary: "Motor de examen interactivo. Filtra por tags, mezcla 15 o 30 preguntas, revisa explicaciones.",
    isQuiz: true,
    sections: []
  },
  {
    id: "historias-star",
    order: 7,
    icon: "★",
    title: "Historias STAR",
    short: "6 plantillas con editor y guardado local.",
    tags: ["STAR", "entrevistas"],
    summary: "Situation → Task → Action → Result. Plantillas de práctica del candidato, no respuestas oficiales de Tesla.",
    isStar: true,
    sections: []
  }
];

window.STAR_TEMPLATES = [
  {
    id: "ownership",
    title: "Ownership",
    prompt: "Cuenta una vez en la que un problema «no era tuyo» pero lo resolviste de punta a punta.",
    anchors: "accountability, cierre, handoff limpio",
    bridge: "Cómo aplica en handoff Sales→Delivery→Ops",
    fields: ["S", "T", "A", "R", "Puente FTT"]
  },
  {
    id: "info-incompleta",
    title: "Info incompleta",
    prompt: "Situación con datos insuficientes y deadline. ¿Cómo priorizaste y comunicaste el riesgo?",
    anchors: "trade-offs, hipótesis, comunicar riesgo",
    bridge: "Retail y Ops viven con cola y cambios de última hora",
    fields: ["S", "T", "A", "R", "Puente FTT"]
  },
  {
    id: "customer-recovery",
    title: "Customer recovery",
    prompt: "Cliente/usuario enfadado. Cómo pasaste de conflicto a confianza.",
    anchors: "escucha, empatía, follow-up",
    bridge: "Delivery day y postventa",
    fields: ["S", "T", "A", "R", "Puente FTT"]
  },
  {
    id: "feedback",
    title: "Feedback",
    prompt: "Momento en que el feedback cambió tu comportamiento o ayudaste a otro a mejorar.",
    anchors: "específico, respetuoso, cambio observable",
    bridge: "Assessment grupal + rotaciones con reviews",
    fields: ["S", "T", "A", "R", "Puente FTT"]
  },
  {
    id: "calidad-velocidad",
    title: "Calidad vs velocidad",
    prompt: "Presión de tiempo vs estándar de calidad/seguridad. Qué protegiste y por qué.",
    anchors: "criterios, checklist, sin retrabajo",
    bridge: "Entrega de vehículo: velocidad con checklist",
    fields: ["S", "T", "A", "R", "Puente FTT"]
  },
  {
    id: "autoaprendizaje",
    title: "Autoaprendizaje",
    prompt: "Aprendiste una skill o dominio sin curso formal, bajo presión.",
    anchors: "fuentes, práctica, evidencia",
    bridge: "Self-starter del programa",
    fields: ["S", "T", "A", "R", "Puente FTT"]
  }
];

window.STUDY_PATH = [
  "mision", "productos", "viaje-cliente", "programa-ftt", "cultura", "banco-examen", "historias-star"
];
