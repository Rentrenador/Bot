window.APP_META = {
  title: "Tesla Panorama",
  subtitle: "Mapa de la compañía · España / EU",
  audience: "Panorama Tesla 2026: qué es, estructura, productos, ops, actualidad y cultura",
  updated: "2026-09-04",
  studyHours: "2–3 h",
  contentSource: "tesla-panorama-content/",
};

window.MODULES = [
  {
    id: "que-es-tesla",
    order: 1,
    icon: "◎",
    title: "¿Qué es Tesla hoy?",
    short: "Misión, pilares auto + energy + software/IA, mitos útiles.",
    tags: ["panorama", "misión"],
    path: "primary",
    summary: "Tesla combina vehículos eléctricos, energy, software e IA/robótica con la misión de acelerar la transición a energía sostenible. Ecosistema, no solo OEM.",
    sections: [
      {
        type: "quote",
        title: "En una frase",
        body: "Tesla es una compañía pública que combina vehículos eléctricos, almacenamiento y energía, software (asistencia a la conducción) y apuestas de IA/robótica — con la misión de acelerar la transición del mundo hacia la energía sostenible.",
        note: "No es «solo coches» ni «solo robots». El panorama útil es ecosistema: producto + red + software + operaciones."
      },
      {
        type: "quote",
        title: "Misión (formulación pública)",
        body: "Acelerar la transición del mundo hacia la energía sostenible."
      },
      {
        type: "bullets",
        title: "Implicación práctica",
        items: [
          "Transporte (BEV) = cómo se consume energía en movilidad.",
          "Energy (Powerwall, Megapack, solar donde aplique) = cómo se genera/almacena energía limpia.",
          "Software y redes (OTA, Supercharger, apps) = cómo se opera el ecosistema a escala."
        ]
      },
      {
        type: "table",
        title: "Tres pilares visibles",
        headers: ["Pilar", "Qué ve el público", "Notas"],
        rows: [
          ["Automoción", "Model 3, Y, S, X; Cybertruck (NA); Semi", "En ES/UE el volumen real es sobre todo 3 y Y"],
          ["Energy", "Powerwall, Megapack / red", "B2B y residencial; no confundir con retail eléctrico en todos los países"],
          ["Software / IA", "OTA, Autopilot / FSD Supervised, Autobidder", "Nombres y legalidad cambian por país"]
        ]
      },
      {
        type: "callout",
        variant: "tip",
        body: "Optimus y robotaxi: roadmap público e incierto — no producto de consumo diario en España en 2026."
      },
      {
        type: "bullets",
        title: "Qué NO es Tesla (mitos útiles)",
        items: [
          "No es un concesionario tradicional: en muchos mercados vende directo (tienda + online).",
          "No es solo «lujo»: 3/Y empujaron volumen; mezcla aspiracional + masa.",
          "No garantiza autonomía total en todos los mercados: la asistencia sigue supervisada donde está permitida.",
          "No publiques organigramas internos inventados."
        ]
      },
      {
        type: "cards",
        title: "Tesla en España / Europa",
        items: [
          { title: "Giga Berlin", body: "Fabricación europea principal (Model Y; planes de celdas en evolución)." },
          { title: "España", body: "Presencia comercial y de servicio (tiendas, hubs, talleres, Superchargers) — sin fábrica de vehículos propia." },
          { title: "Competencia", body: "BEV intensa en UE: Tesla es referente de software + red de carga, no el único jugador." }
        ]
      },
      {
        type: "checklist",
        title: "Mini-checklist de comprensión",
        storageKey: "check-que-es",
        items: [
          "Puedo explicar la misión en una frase",
          "Distingo auto / energy / software sin mezclarlos",
          "Sé que Cybertruck y FSD no se describen igual en ES que en EE.UU.",
          "Entiendo «ecosistema» vs «solo OEM»"
        ]
      },
      {
        type: "callout",
        variant: "warn",
        body: "⚠️ Cuotas de mercado y deliveries cambian cada trimestre. No memorices un titular como verdad eterna — ve al módulo Actualidad."
      }
    ]
  },
  {
    id: "estructura",
    order: 2,
    icon: "▦",
    title: "Estructura y huella",
    short: "Negocios públicos, nodos retail/servicio, Giga Berlin, roles de tierra.",
    tags: ["panorama", "estructura", "Europa"],
    path: "primary",
    summary: "Áreas de negocio y huella operativa visibles — no jerarquías secretas. España = retail/servicio; Giga europea = Berlín.",
    sections: [
      {
        type: "callout",
        variant: "warn",
        body: "Tesla no publica un organigrama interno detallado de Sales España. Aquí: áreas de negocio y nodos visibles, no jerarquías inventadas."
      },
      {
        type: "table",
        title: "Negocios / productos",
        headers: ["Área", "Rol"],
        rows: [
          ["Automotive", "Diseño, fabricación, venta y entrega de vehículos"],
          ["Energy Generation & Storage", "Baterías residenciales y a escala de red; software de energía"],
          ["Services & Other", "Servicio, piezas, seguros (donde exista), merchandising…"]
        ]
      },
      {
        type: "bullets",
        title: "Canales al cliente (Europa / España)",
        items: [
          "Online — configuración y pedido en tesla.com",
          "Stores / Galleries — experiencia, educación, cierre",
          "Delivery Centers / Hubs — preparación y entrega",
          "Service Centers + Mobile Service — postventa",
          "Supercharger — red de carga rápida"
        ]
      },
      {
        type: "table",
        title: "Manufactura (footprint público)",
        headers: ["Planta", "Región", "Notas"],
        rows: [
          ["Fremont", "California, EE.UU.", "Histórica; varios modelos"],
          ["Giga Nevada", "EE.UU.", "Baterías / energy"],
          ["Giga Shanghai", "China", "Volumen Asia / export"],
          ["Giga Berlin-Brandenburg", "Alemania", "Primera Giga en Europa; Model Y"],
          ["Giga Texas (Austin)", "EE.UU.", "Cybertruck; HQ asociado"]
        ]
      },
      {
        type: "callout",
        variant: "tip",
        body: "España: candidata histórica en debates de ubicación, pero la Giga europea operativa es Berlín. En ES: retail + servicio + carga."
      },
      {
        type: "cards",
        title: "Roles «de tierra»",
        items: [
          { title: "Sales / Experience", body: "Educa, prueba, configura, cierra pedido." },
          { title: "Delivery", body: "Prepara coche, cita, handoff, onboarding." },
          { title: "Service", body: "Diagnóstico, reparaciones, Mobile Service." },
          { title: "Ops / logística", body: "Inventario, citas, flujo entre nodos." },
          { title: "Energy / Supercharger", body: "Powerwall según mercado; disponibilidad de red." }
        ]
      },
      {
        type: "checklist",
        title: "Checklist",
        storageKey: "check-estructura",
        items: [
          "Distingo negocio auto vs energy vs servicios",
          "Sé nombrar Giga Berlin como ancla europea",
          "Sé que España = retail/servicio, no fábrica de coches",
          "Evito inventar organigramas"
        ]
      }
    ]
  },
  {
    id: "productos",
    order: 3,
    icon: "▣",
    title: "Productos",
    short: "Gama ES/EU, Energy, FSD Supervised con caveats de mercado.",
    tags: ["panorama", "productos", "energy"],
    path: "primary",
    summary: "Vista de cliente: 3/Y núcleo, S/X premium, Cybertruck no práctico en ES. Powerwall vs Megapack. Asistencia siempre supervisada.",
    sections: [
      {
        type: "callout",
        variant: "warn",
        body: "Precios, versiones y nombres de packs cambian. Verifica en tesla.com/es_es antes de un quiz «live»."
      },
      {
        type: "table",
        title: "Vehículos — mapa mental ES/EU 2026",
        headers: ["Modelo", "Tipo", "Relevancia ES/EU"],
        rows: [
          ["Model 3", "Sedán", "Volumen / uso diario; eficiente"],
          ["Model Y", "SUV/crossover compacto", "Muy relevante; producido en Giga Berlin"],
          ["Model S", "Sedán premium", "Gama alta; menor volumen"],
          ["Model X", "SUV premium", "Gama alta; menor volumen"],
          ["Cybertruck", "Pickup", "No es compra práctica en España/UE"],
          ["Semi", "Camión", "Selectivo / flotas; no retail ES"]
        ]
      },
      {
        type: "callout",
        variant: "tip",
        body: "En conversación ES: empieza por 3 y Y; S/X como premium; Cybertruck como contraste EE.UU. vs Europa."
      },
      {
        type: "bullets",
        title: "Atributos que el cliente compara",
        items: [
          "Autonomía (WLTP en Europa) — no memorices un km de un PDF antiguo",
          "Potencia / tracción (RWD vs Dual Motor)",
          "Espacio / maletero / asientos",
          "Seguridad activa y asistencia",
          "Red Supercharger + carga en destino",
          "Coste total (compra, energía, mantenimiento, impuestos/incentivos)"
        ]
      },
      {
        type: "table",
        title: "Energy",
        headers: ["Producto", "Para quién", "Idea clave"],
        rows: [
          ["Powerwall", "Hogar / pequeño comercial", "Almacenamiento residencial; solar según mercado"],
          ["Megapack", "Utilities / grandes proyectos", "Escala de red; a menudo con software de despacho"],
          ["Solar", "Según país y partners", "Disponibilidad no idéntica en todos los mercados"]
        ]
      },
      {
        type: "callout",
        variant: "warn",
        body: "Energy ≠ «Tesla vende la luz en todas partes». En España no asumas un modelo UK-style de suministro eléctrico al hogar sin verificar."
      },
      {
        type: "table",
        title: "Software de asistencia — regla de oro ES/EU",
        headers: ["Afirmación", "¿OK?"],
        rows: [
          ["«Es asistencia; el conductor debe supervisar»", "✅"],
          ["«FSD Supervised = igual en todos los países UE»", "❌"],
          ["«Ya es robotaxi legal en Madrid»", "❌"]
        ]
      },
      {
        type: "bullets",
        title: "Otras capas de software",
        items: [
          "OTA: mejoras sin pasar por el taller para muchas funciones",
          "App Tesla: control remoto, carga, citas de servicio",
          "Energy software (trading/despacho): más B2B que consumidor"
        ]
      },
      {
        type: "phrases",
        title: "Mini-ejercicio (60 s)",
        items: [
          "Diferencia Model 3 vs Y.",
          "Por qué Cybertruck no entra en la decisión de compra en Madrid.",
          "Qué es Powerwall en una frase.",
          "Por qué FSD Supervised no se cuenta igual que en California."
        ]
      }
    ]
  },
  {
    id: "como-opera",
    order: 4,
    icon: "→",
    title: "Cómo opera",
    short: "Journey compra→entrega→servicio, Supercharger y ops del día a día.",
    tags: ["panorama", "ops", "journey"],
    path: "primary",
    summary: "Ops visibles al cliente en venta directa (ES/EU): flujo, calidad, handoffs y Supercharger como producto + experiencia.",
    sections: [
      {
        type: "callout",
        variant: "quote",
        body: "Interés → Prueba/educación → Pedido online → Producción/asignación → Delivery Hub → Onboarding → Uso (Supercharger, OTA) → Servicio"
      },
      {
        type: "timeline",
        title: "Journey del cliente",
        items: [
          { step: "1", rotation: "Sales", title: "Descubrimiento y venta", body: "Tiendas y web: educar sobre autonomía realista, carga, asistencia y plazos. Ops: inventario, demos, calidad de la información." },
          { step: "2", rotation: "Delivery", title: "Pedido → entrega", body: "Coche de fábrica europea (p. ej. Y Berlin) u otras fuentes. Inspección, cita, walkthrough, app, primera carga." },
          { step: "3", rotation: "Uso", title: "Vida del vehículo", body: "Carga en destino + Supercharger; OTA; seguro/financiación según partners locales." },
          { step: "4", rotation: "Service", title: "Postventa", body: "Service Center, Mobile Service, piezas. Ops: bahías, técnicos, priorizar seguridad vs comodidad." }
        ]
      },
      {
        type: "table",
        title: "Qué significa «ops» día a día",
        headers: ["Tema", "Ejemplo"],
        rows: [
          ["Flujo", "Coche correcto listo a la hora correcta"],
          ["Calidad", "Checklist pre-entrega; no entregar con fallo de seguridad"],
          ["Comunicación", "Avisar retrasos; no inventar fechas"],
          ["Handoffs", "Sales no abandona en Delivery; Service cierra el loop"],
          ["Seguridad", "Priorizar riesgo real sobre velocidad cosmética"]
        ]
      },
      {
        type: "split",
        title: "Retail Tesla vs concesionario legacy",
        left: {
          title: "Legacy típico",
          items: [
            "Dealer independiente negocia stock/márgenes",
            "Servicio a menudo en red de dealers",
            "Incentivos de vendedor variables"
          ]
        },
        right: {
          title: "Tesla (mercados directos)",
          items: [
            "Precio más transparente online; tienda = canal de marca",
            "Service Centers propios + mobile",
            "Cultura orientada a educación / experiencia"
          ]
        }
      },
      {
        type: "cards",
        title: "España — matices",
        items: [
          { title: "Hubs", body: "Entregas pueden concentrarse; el cliente a veces se desplaza." },
          { title: "Trámites", body: "Incentivos (Moves, IVTM…) no los inventa Tesla; el equipo orienta según normativa." },
          { title: "Horarios", body: "Retail suele incluir fines de semana — atención al público." }
        ]
      },
      {
        type: "checklist",
        title: "Checklist",
        storageKey: "check-ops",
        items: [
          "Puedo narrar compra → entrega → servicio en orden",
          "Sé qué es un Delivery Hub vs Service Center",
          "Entiendo Supercharger como pieza de ops + producto",
          "Relaciono ops con flujo, calidad y handoffs"
        ]
      }
    ]
  },
  {
    id: "actualidad",
    order: 5,
    icon: "◉",
    title: "Actualidad",
    short: "Cómo leer noticias Tesla sin fosilizar titulares; fuentes primarias.",
    tags: ["panorama", "actualidad"],
    path: "primary",
    summary: "No es un feed en vivo: enseña a pensar producto, fábricas, autonomía, energy y finanzas con matiz de mercado. Pack fechado 2026-09-04.",
    sections: [
      {
        type: "callout",
        variant: "tip",
        body: "Contenido actualizado: 2026-09-04. Si lees esto mucho después, trata los ejemplos como ilustraciones. Verifica en tesla.com."
      },
      {
        type: "table",
        title: "Categorías de noticia",
        headers: ["Categoría", "Pregúntate", "Lectura sana"],
        rows: [
          ["Producto", "¿Lanzamiento, refresh o rumor? ¿Mi mercado?", "Facelift Y en EU ≠ Cybertruck en ES"],
          ["Fábricas", "¿Anuncio, permiso o producción real?", "Planes de celdas ≠ capacidad al máximo"],
          ["Autonomía", "¿Supervised? ¿País? ¿Provisional vs UE-wide?", "Aprobación en NL ≠ Madrid mañana"],
          ["Energy", "¿Residencial o utility?", "Megapack deal ≠ Powerwall en tu bloque"],
          ["Finanzas", "¿Guidance, entregas, margen?", "Un trimestre no redefine la misión"]
        ]
      },
      {
        type: "bullets",
        title: "Principios anti-desinformación",
        items: [
          "Fuente primaria primero: tesla.com, IR, filings SEC, autoridades.",
          "Mercado importa: EE.UU. ≠ China ≠ UE ≠ España.",
          "Palabras trampa: Full Self-Driving, robotaxi, unsupervised, «approved in Europe».",
          "Números: cítalos con fecha o no los cites.",
          "Roadmap ≠ inventario: Optimus en un evento ≠ SKU en configurador ES."
        ]
      },
      {
        type: "cards",
        title: "Instantánea pedagógica (sep 2026) — revalidar",
        items: [
          { title: "Giga Berlin", body: "Ancla manufacturero en Europa (Model Y; evolución de celdas en prensa)." },
          { title: "FSD Supervised UE", body: "Primeras aprobaciones nacionales reportadas; mapa por país en movimiento." },
          { title: "Energy", body: "Crece en narrativa corporativa; deals europeos en prensa especializada." },
          { title: "Competencia BEV", body: "Tesla no es el único actor; precio, software y red de carga importan." }
        ]
      },
      {
        type: "bullets",
        title: "Cómo mantenerse al día",
        items: [
          "tesla.com/es_es — productos, carga, tiendas",
          "Investor Relations / press releases",
          "Autoridades de homologación cuando hablemos de asistencia",
          "Un medio serio + contraste con fuente primaria",
          "Mapa Supercharger oficial"
        ]
      },
      {
        type: "checklist",
        title: "Checklist",
        storageKey: "check-actualidad",
        items: [
          "Sé separar rumor, anuncio y hecho operativo",
          "No extrapolo EE.UU. a España",
          "Entiendo que este pack necesita refresh",
          "Tengo 3 fuentes primarias en mente"
        ]
      }
    ]
  },
  {
    id: "cultura",
    order: 6,
    icon: "✦",
    title: "Cultura",
    short: "First principles, ownership, velocidad con juicio, seguridad/calidad.",
    tags: ["panorama", "cultura"],
    path: "primary",
    summary: "Temas culturales públicos recurrentes — sin fingir una lista oficial de Leadership Principles.",
    sections: [
      {
        type: "callout",
        variant: "warn",
        body: "Si alguien pide «los 10 valores oficiales de Tesla», di la verdad: hay temas recurrentes y cultura intensa, pero no copies una lista inventada."
      },
      {
        type: "cards",
        title: "Temas recurrentes (públicos)",
        items: [
          { title: "First principles", body: "Romper el problema a hechos base, no copiar «así se hace en la industria»." },
          { title: "Ownership E2E", body: "Quedarse hasta el resultado, incluidos handoffs Sales→Delivery→Service." },
          { title: "Velocidad con juicio", body: "Iterar e ir rápido — sin saltarse seguridad o calidad crítica." },
          { title: "Ingeniería > teatro", body: "Menos PowerPoint eterno; más prototipo, métrica, software en producción." },
          { title: "Feedback / alta barra", body: "Cultura exigente y directa. Estándares altos, no club social." },
          { title: "Misión como brújula", body: "Sostenibilidad energética como narrativa unificadora — no excusa vacía." }
        ]
      },
      {
        type: "table",
        title: "Seguridad y calidad",
        headers: ["Prioriza", "Evita"],
        rows: [
          ["Seguridad del conductor y técnicos", "Bromas que trivialicen fallos críticos"],
          ["Checklist de entrega", "«Ship it» sin matices en contexto vehículo"],
          ["Cumplir regulación local", "Inventar que «en Tesla las normas no aplican»"]
        ]
      },
      {
        type: "table",
        title: "Frases útiles vs tóxicas",
        headers: ["Útil", "Problemática"],
        rows: [
          ["First principles: ¿qué es necesario para entregar seguro?", "«Rompe todas las reglas»"],
          ["Ownership hasta que el cliente carga en casa", "«El cliente siempre miente»"],
          ["Rápido, pero el freno no es vanity KPI", "«Da igual la calidad, ya lo arregla el OTA»"]
        ]
      },
      {
        type: "callout",
        variant: "tip",
        body: "Puente suave a FTT (si activas Modo Future Talent): estos temas alimentan historias STAR. No conviertas toda la app en prep de entrevista."
      },
      {
        type: "checklist",
        title: "Checklist",
        storageKey: "check-cultura",
        items: [
          "Puedo explicar first principles con un ejemplo ops",
          "Relaciono ownership con handoffs",
          "No invento una lista oficial de LPs",
          "Mantengo seguridad/calidad en el centro del discurso de velocidad"
        ]
      }
    ]
  },
  {
    id: "banco-panorama",
    order: 7,
    icon: "?",
    title: "Quiz panorama",
    short: "32 preguntas sobre la compañía — aprendizaje > ranking.",
    tags: ["quiz", "panorama"],
    path: "primary",
    summary: "Banco de panorama corporativo. Simulacro 15/30, filtro por tag, respuestas cortas con autoevaluación.",
    isQuiz: true,
    sections: []
  },
  {
    id: "programa-ftt",
    order: 90,
    icon: "◷",
    title: "Programa FTT",
    short: "Traineeship España 12 meses — capa opcional carreras.",
    tags: ["ftt", "opcional"],
    path: "optional-ftt",
    summary: "Capa secundaria. Completa primero el panorama 01–07. Verifica siempre en el portal oficial de empleo Tesla.",
    sections: [
      {
        type: "callout",
        variant: "warn",
        body: "Módulo secundario. La app principal enseña el panorama Tesla. Activa FTT solo si exploras carreras / traineeship."
      },
      {
        type: "cards",
        title: "Datos clave (ofertas públicas — verificar)",
        items: [
          { title: "Duración", body: "12 meses · cohorte citada: inicio octubre 2026." },
          { title: "Jornada", body: "Completa, 5 días/semana incluyendo fines de semana." },
          { title: "Plazas", body: "Hasta ~6 en España (oferta citada)." },
          { title: "Ubicaciones", body: "Barcelona, Bilbao, Madrid, Málaga, Sevilla, Valencia." }
        ]
      },
      {
        type: "timeline",
        title: "Rotaciones (orden público)",
        items: [
          { step: "1", rotation: "Sales", title: "Sales", body: "Journey inicial de compra." },
          { step: "2", rotation: "Delivery", title: "Vehicle Delivery", body: "Recogida en Delivery Hub." },
          { step: "3", rotation: "Ops", title: "Regional Operations", body: "Detrás de escena." },
          { step: "4", rotation: "Elective", title: "Elective", body: "Alineado con pasión / posible carrera." }
        ]
      },
      {
        type: "checklist",
        title: "Checklist pre-aplicación",
        storageKey: "ftt-checklist",
        items: [
          "Elegibilidad legal revisada (ventana de título, Vida Laboral)",
          "Carné UE/ES + español fluido + inglés B1+",
          "Disponibilidad weekends / travel",
          "Homologación si título extranjero (antes del start)",
          "Historias STAR listas",
          "Panorama 01–07 repasados"
        ]
      },
      {
        type: "faq",
        title: "FAQ",
        items: [
          { q: "¿Es un máster?", a: "No — trabajo rotacional bajo contrato formativo (según oferta)." },
          { q: "¿Garantiza indefinido?", a: "No inventamos garantías de conversión." },
          { q: "¿Salarios / assessment day?", a: "No están en este pack; verifica portal de empleo / proceso real." }
        ]
      },
      {
        type: "callout",
        variant: "tip",
        body: "Un trainee útil conoce la compañía (productos, ops, cultura) antes de memorizar tips de entrevista."
      }
    ]
  },
  {
    id: "historias-star",
    order: 92,
    icon: "★",
    title: "Historias STAR",
    short: "6 plantillas de práctica — solo con Modo Future Talent.",
    tags: ["star", "opcional"],
    path: "optional-ftt",
    summary: "Situation → Task → Action → Result. Plantillas del candidato, no respuestas oficiales de Tesla.",
    isStar: true,
    sections: []
  }
];

window.STAR_TEMPLATES = [
  {
    id: "ownership",
    title: "Ownership",
    prompt: "Problema «no era tuyo» pero lo cerraste de punta a punta.",
    anchors: "accountability, cierre, handoff limpio",
    bridge: "Handoff Sales→Delivery→Ops",
    fields: ["S", "T", "A", "R", "Puente"]
  },
  {
    id: "info-incompleta",
    title: "Info incompleta",
    prompt: "Datos insuficientes + deadline. ¿Cómo priorizaste y comunicaste el riesgo?",
    anchors: "trade-offs, hipótesis, comunicar riesgo",
    bridge: "Retail y Ops viven con cola y cambios de última hora",
    fields: ["S", "T", "A", "R", "Puente"]
  },
  {
    id: "customer-recovery",
    title: "Customer recovery",
    prompt: "Persona frustrada → de conflicto a confianza (sin prometer lo imposible).",
    anchors: "escucha, empatía, follow-up",
    bridge: "Delivery day y postventa",
    fields: ["S", "T", "A", "R", "Puente"]
  },
  {
    id: "feedback",
    title: "Feedback",
    prompt: "Pediste, recibiste o diste feedback que cambió un comportamiento.",
    anchors: "específico, respetuoso, cambio observable",
    bridge: "Reviews en rotaciones",
    fields: ["S", "T", "A", "R", "Puente"]
  },
  {
    id: "calidad-velocidad",
    title: "Calidad vs velocidad",
    prompt: "Presión de tiempo vs seguridad/calidad. Qué protegiste.",
    anchors: "criterios, checklist, sin retrabajo",
    bridge: "Entrega de vehículo: velocidad con checklist",
    fields: ["S", "T", "A", "R", "Puente"]
  },
  {
    id: "autoaprendizaje",
    title: "Autoaprendizaje",
    prompt: "Aprendiste algo difícil sin curso formal, bajo presión.",
    anchors: "fuentes, práctica, evidencia",
    bridge: "Self-starter",
    fields: ["S", "T", "A", "R", "Puente"]
  }
];

window.STUDY_PATH = [
  "que-es-tesla", "estructura", "productos", "como-opera", "actualidad", "cultura", "banco-panorama"
];

window.STUDY_PATH_FTT = [
  "programa-ftt", "historias-star"
];
