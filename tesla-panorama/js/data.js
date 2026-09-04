window.APP_META = {
  title: "Tesla Panorama",
  subtitle: "Mapa de la compañía · España / EU",
  audience: "Panorama Tesla 2026: mapa, productos, ops, actualidad, comparador y quiz",
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



/* ——— Herramientas interactivas (mapa, comparador, timeline) ——— */

/* Synced from tesla-panorama-content JSON (estructura / actualidad / comparador) — 2026-09-04 */
/* structure_map: content schema + IR Q2’26 capacity notes on factory nodes */
window.STRUCTURE_MAP = {
  "version": "2026-09-04",
  "source_note": "Nodos públicos; capacidades de IR Q2 2026 Update (installed annual capacity ≠ ritmo actual).",
  "nodes": [
    {
      "id": "tesla",
      "label": "Tesla, Inc.",
      "type": "company",
      "parent": null
    },
    {
      "id": "auto",
      "label": "Automotive",
      "type": "segment",
      "parent": "tesla"
    },
    {
      "id": "energy",
      "label": "Energy Generation & Storage",
      "type": "segment",
      "parent": "tesla"
    },
    {
      "id": "services",
      "label": "Services & Other",
      "type": "segment",
      "parent": "tesla"
    },
    {
      "id": "ai_robotics",
      "label": "AI / Robotics (línea estratégica)",
      "type": "strategic",
      "parent": "tesla",
      "uncertain": true,
      "verify_hint": "Verificar en tesla.com / IR — línea estratégica, no organigrama fijo"
    },
    {
      "id": "mfg_fremont",
      "label": "Fremont (California)",
      "type": "factory_vehicle",
      "parent": "auto",
      "products": [
        "Model 3",
        "Model Y"
      ],
      "status": "production",
      "capacity": ">550.000 veh/año",
      "capacity_detail": "Model 3 / Model Y · IR Q2’26 installed annual"
    },
    {
      "id": "mfg_shanghai",
      "label": "Giga Shanghai",
      "type": "factory_vehicle",
      "parent": "auto",
      "products": [
        "Model 3",
        "Model Y"
      ],
      "status": "production",
      "capacity": ">950.000 veh/año",
      "capacity_detail": "Model 3 / Model Y · IR Q2’26 installed annual"
    },
    {
      "id": "mfg_berlin",
      "label": "Giga Berlin-Brandenburg",
      "type": "factory_vehicle",
      "parent": "auto",
      "products": [
        "Model Y"
      ],
      "status": "production",
      "region": "EU",
      "capacity": ">375.000 veh/año",
      "capacity_detail": "Model Y · IR Q2’26 installed annual"
    },
    {
      "id": "mfg_texas",
      "label": "Giga Texas (Austin)",
      "type": "factory_vehicle",
      "parent": "auto",
      "products": [
        "Model Y",
        "Cybertruck",
        "Cybercab"
      ],
      "status": "production",
      "capacity": "Y >250k · Cybertruck >125k · Cybercab >125k veh/año",
      "capacity_detail": "IR Q2’26 installed annual (por línea de producto)"
    },
    {
      "id": "mfg_nevada_semi",
      "label": "Giga Nevada — Semi",
      "type": "factory_vehicle",
      "parent": "auto",
      "products": [
        "Semi"
      ],
      "status": "commissioning",
      "capacity": "—",
      "capacity_detail": "Commissioning · IR Q2’26"
    },
    {
      "id": "mfg_megapack_ca",
      "label": "Megafactory California (Lathrop)",
      "type": "factory_energy",
      "parent": "energy",
      "products": [
        "Megapack"
      ],
      "status": "production",
      "capacity": "40 GWh",
      "capacity_detail": "Megapack · IR Q2’26 installed annual"
    },
    {
      "id": "mfg_megapack_sh",
      "label": "Megafactory Shanghai",
      "type": "factory_energy",
      "parent": "energy",
      "products": [
        "Megapack"
      ],
      "status": "production",
      "capacity": "20 GWh",
      "capacity_detail": "Megapack · IR Q2’26 installed annual"
    },
    {
      "id": "mfg_megapack_tx",
      "label": "Megafactory Texas",
      "type": "factory_energy",
      "parent": "energy",
      "products": [
        "Megapack 3 / Megablock"
      ],
      "status": "commissioning",
      "capacity": "—",
      "capacity_detail": "Megapack 3 / Megablock · commissioning IR Q2’26"
    },
    {
      "id": "mfg_powerwall_nv",
      "label": "Nevada — Powerwall",
      "type": "factory_energy",
      "parent": "energy",
      "products": [
        "Powerwall"
      ],
      "status": "production",
      "capacity": ">6 GWh",
      "capacity_detail": "Powerwall · IR Q2’26 installed annual"
    },
    {
      "id": "eu_retail",
      "label": "Europa — Stores / Delivery / Service",
      "type": "customer_channel",
      "parent": "auto",
      "region": "EU"
    },
    {
      "id": "es_presence",
      "label": "España — retail + servicio + Supercharger (sin fábrica de vehículos)",
      "type": "customer_channel",
      "parent": "eu_retail",
      "region": "ES"
    },
    {
      "id": "supercharger",
      "label": "Red Supercharger",
      "type": "infra",
      "parent": "services"
    }
  ]
};

window.ACTUALIDAD_TIMELINE_META = {
  "version": "2026-09-04",
  "themes": [
    "factories",
    "product_refresh",
    "autonomy",
    "energy_megapack",
    "europe_spain"
  ]
};

/* timeline.events (+ when/category/body aliases for UI) */
window.ACTUALIDAD_TIMELINE = [
  {
    "id": "juniper-berlin-sop",
    "theme": "product_refresh",
    "date": "2025-01-14",
    "date_precision": "day",
    "title": "Inicio producción Model Y refresh (Juniper) en Giga Berlin",
    "summary": "Reportado por prensa alemana (Handelsblatt) y confirmado después por hitos de producción en Berlin.",
    "markets": [
      "EU"
    ],
    "confidence": "high",
    "verify": [
      "tesla.com/modely",
      "noticias de Giga Berlin / IR"
    ],
    "when": "2025-01-14",
    "category": "product_refresh",
    "body": "Reportado por prensa alemana (Handelsblatt) y confirmado después por hitos de producción en Berlin.",
    "ask": "Verifica: tesla.com/modely · noticias de Giga Berlin / IR"
  },
  {
    "id": "juniper-berlin-100k",
    "theme": "factories",
    "date": "2025-08",
    "date_precision": "month",
    "title": "Hito ~100.000 Model Y refresh en Giga Berlin",
    "summary": "Comunicación pública de manufacturing (~6 meses tras SOP).",
    "markets": [
      "EU"
    ],
    "confidence": "high",
    "verify": [
      "cuentas oficiales Tesla Manufacturing / Giga Berlin"
    ],
    "when": "2025-08",
    "category": "factories",
    "body": "Comunicación pública de manufacturing (~6 meses tras SOP).",
    "ask": "Verifica: cuentas oficiales Tesla Manufacturing / Giga Berlin"
  },
  {
    "id": "fsd-spain-testing",
    "theme": "autonomy",
    "date": "2025-11",
    "date_precision": "month",
    "title": "Pruebas FSD Supervised en vías públicas ES (programa DGT)",
    "summary": "Flota de prueba bajo autorización ES-AV; conductor responsable. No implica venta al cliente en España.",
    "markets": [
      "ES"
    ],
    "confidence": "high",
    "verify": [
      "DGT / programa ES-AV",
      "comunicados Tesla Europe"
    ],
    "when": "2025-11",
    "category": "autonomy",
    "body": "Flota de prueba bajo autorización ES-AV; conductor responsable. No implica venta al cliente en España.",
    "ask": "Verifica: DGT / programa ES-AV · comunicados Tesla Europe"
  },
  {
    "id": "fsd-nl-approval",
    "recent": true,
    "theme": "autonomy",
    "date": "2026-04-10",
    "date_precision": "day",
    "title": "RDW (Países Bajos): aprobación tipo provisional FSD Supervised",
    "summary": "Primera aprobación nacional UE reportada. Asistencia supervisada; no robotaxi. Otros países pueden reconocer o no.",
    "markets": [
      "NL",
      "EU"
    ],
    "confidence": "high",
    "verify": [
      "RDW",
      "Tesla Europe",
      "Electrek / press primaria"
    ],
    "when": "2026-04-10",
    "category": "autonomy",
    "body": "Primera aprobación nacional UE reportada. Asistencia supervisada; no robotaxi. Otros países pueden reconocer o no.",
    "ask": "Verifica: RDW · Tesla Europe · Electrek / press primaria"
  },
  {
    "id": "es-retail-expansion-2026",
    "recent": true,
    "theme": "europe_spain",
    "date": "2026-02",
    "date_precision": "month",
    "title": "Expansión retail España (aperturas reportadas)",
    "summary": "Prensa: nuevas aperturas (p. ej. A Coruña, Oiartzun, Rivas) y ~21 tiendas/centros de entrega. Cifras perishable.",
    "markets": [
      "ES"
    ],
    "confidence": "medium",
    "verify": [
      "https://www.tesla.com/es_ES/findus"
    ],
    "when": "2026-02",
    "category": "europe_spain",
    "body": "Prensa: nuevas aperturas (p. ej. A Coruña, Oiartzun, Rivas) y ~21 tiendas/centros de entrega. Cifras perishable.",
    "ask": "Verifica: https://www.tesla.com/es_ES/findus"
  },
  {
    "id": "natpower-megapack",
    "recent": true,
    "theme": "energy_megapack",
    "date": "2026-06",
    "date_precision": "month",
    "title": "Acuerdo NatPower–Tesla: >25 GWh Megapack (IT/UK)",
    "summary": "Supply/execution B2B con software de trading; no implica Powerwall retail en España.",
    "markets": [
      "IT",
      "UK",
      "EU"
    ],
    "confidence": "high",
    "verify": [
      "comunicados NatPower / Tesla Energy",
      "Energy-Storage.News / Electrek"
    ],
    "when": "2026-06",
    "category": "energy_megapack",
    "body": "Supply/execution B2B con software de trading; no implica Powerwall retail en España.",
    "ask": "Verifica: comunicados NatPower / Tesla Energy · Energy-Storage.News / Electrek"
  },
  {
    "id": "ir-q2-2026",
    "recent": true,
    "theme": "factories",
    "date": "2026-07",
    "date_precision": "quarter",
    "title": "IR Q2 2026: capacidad plantas + Megafactory Texas en commissioning",
    "summary": "Tabla pública de capacidad instalada; record deployments energy EMEA; Cybercab producción en Texas.",
    "markets": [
      "global"
    ],
    "confidence": "high",
    "verify": [
      "https://ir.tesla.com",
      "TSLA-Q2-2026-Update.pdf"
    ],
    "when": "2026-07",
    "category": "factories",
    "body": "Tabla pública de capacidad instalada; record deployments energy EMEA; Cybercab producción en Texas.",
    "ask": "Verifica: https://ir.tesla.com · TSLA-Q2-2026-Update.pdf"
  },
  {
    "id": "fsd-eu-pending-harmonization",
    "recent": true,
    "theme": "autonomy",
    "date": "2026-09",
    "date_precision": "month",
    "title": "FSD Supervised UE: mapa por país en movimiento",
    "summary": "Aprobaciones nacionales reportadas en varios países (p. ej. NL y otros); ES sigue en pruebas / sin clearance retail al cliente según trackers. Posible voto/coordinación UE — no fosilizar.",
    "markets": [
      "EU",
      "ES"
    ],
    "confidence": "medium",
    "uncertain": true,
    "verify": [
      "autoridades nacionales",
      "Tesla Europe FSD dashboard",
      "DGT"
    ],
    "when": "2026-09",
    "category": "autonomy",
    "body": "Aprobaciones nacionales reportadas en varios países (p. ej. NL y otros); ES sigue en pruebas / sin clearance retail al cliente según trackers. Posible voto/coordinación UE — no fosilizar.",
    "ask": "Verifica: autoridades nacionales · Tesla Europe FSD dashboard · DGT",
    "verify_hint": "Incierta — verifica en tesla.com / autoridades (no fosilizar)"
  }
];

window.PRODUCT_COMPARATOR = {
  "version": "2026-09-04",
  "market_default": "ES",
  "caveats": [
    "WLTP y precios: verificar en configurador local",
    "Disponibilidad de trim/software varía por país y fecha",
    "Cybertruck / Semi / Cybercab no son compra retail práctica en ES"
  ],
  "products": [
    {
      "id": "model3",
      "name": "Model 3",
      "segment": "sedan_compact_mid",
      "body": "sedán",
      "relevance_es": "high",
      "available_es": true,
      "drivetrain_options": [
        "RWD",
        "AWD",
        "Performance"
      ],
      "range_band_wltp": "alto (verificar km en configurador)",
      "charging": [
        "Supercharger",
        "destino AC/DC según equipo"
      ],
      "space": "maletero + frunk; 5 plazas típicas",
      "compare_axes": [
        "eficiencia",
        "precio_entrada",
        "dinamica"
      ]
    },
    {
      "id": "modely",
      "name": "Model Y",
      "segment": "suv_crossover_compact",
      "body": "SUV/crossover",
      "relevance_es": "very_high",
      "available_es": true,
      "produced_in_eu": true,
      "factory_eu": "Giga Berlin",
      "drivetrain_options": [
        "RWD",
        "AWD",
        "Performance"
      ],
      "range_band_wltp": "alto (verificar km en configurador)",
      "charging": [
        "Supercharger",
        "destino AC/DC según equipo"
      ],
      "space": "más volumen de carga que Model 3; 5 plazas (variantes 7 / L: verificar mercado)",
      "compare_axes": [
        "espacio",
        "versatilidad",
        "volumen_eu"
      ]
    },
    {
      "id": "models",
      "name": "Model S",
      "segment": "sedan_premium",
      "body": "sedán premium",
      "relevance_es": "medium_low",
      "available_es": "verify",
      "drivetrain_options": [
        "AWD",
        "Plaid / Performance según mercado"
      ],
      "range_band_wltp": "muy alto (verificar)",
      "charging": [
        "Supercharger"
      ],
      "space": "premium; menor volumen de venta",
      "compare_axes": [
        "prestaciones",
        "lujo",
        "autonomia"
      ],
      "notes": "Producción S/X en Fremont reconfigurada según IR (Optimus); disponibilidad retail ES puede ser limitada — verificar web."
    },
    {
      "id": "modelx",
      "name": "Model X",
      "segment": "suv_premium",
      "body": "SUV premium",
      "relevance_es": "medium_low",
      "available_es": "verify",
      "drivetrain_options": [
        "AWD",
        "Plaid / Performance según mercado"
      ],
      "range_band_wltp": "alto (verificar)",
      "charging": [
        "Supercharger"
      ],
      "space": "SUV grande; puertas falcon (histórico)",
      "compare_axes": [
        "espacio_premium",
        "prestaciones"
      ],
      "notes": "Misma caveat de disponibilidad que Model S."
    },
    {
      "id": "cybertruck",
      "name": "Cybertruck",
      "segment": "pickup",
      "body": "pickup",
      "relevance_es": "context_only",
      "available_es": false,
      "available_eu": false,
      "drivetrain_options": [
        "AWD / variantes EE.UU."
      ],
      "charging": [
        "Supercharger NACS — contexto NA"
      ],
      "space": "caja pickup",
      "compare_axes": [
        "contraste_na_vs_eu"
      ],
      "notes": "No es opción de compra práctica en España/UE (homologación/diseño)."
    },
    {
      "id": "powerwall",
      "name": "Powerwall",
      "segment": "energy_residential",
      "body": "batería hogar",
      "relevance_es": "medium",
      "available_es": "verify",
      "charging": [
        "n/a — almacena energía hogar/solar"
      ],
      "compare_axes": [
        "autoconsumo",
        "backup"
      ],
      "notes": "Powerwall 3 / 3P (trifásico): IR cita 3P en Alemania y expansión a mercados trifásicos. ⚠️ Verificar SKU ES."
    },
    {
      "id": "megapack",
      "name": "Megapack",
      "segment": "energy_utility",
      "body": "almacenamiento red",
      "relevance_es": "b2b_only",
      "available_es": "b2b_project",
      "compare_axes": [
        "escala_red",
        "software_despacho"
      ],
      "notes": "Cliente utility/B2B; no comparador retail de coche."
    }
  ],
  "software_assistance": {
    "names": [
      "Autopilot",
      "FSD (Supervised)"
    ],
    "rule": "Asistencia; conductor supervisa. Disponibilidad y nombre exacto varían por país/versión.",
    "es_status": "⚠️ Verificar: pruebas DGT reportadas; clearance retail al cliente no asumir = NL/otros."
  }
};

/* Derived pools for compare mode (attrs from product_comparator schema) */
window.COMPARE_VEHICLES = [
  {
    "id": "model3",
    "name": "Model 3",
    "segment": "sedan_compact_mid",
    "attrs": {
      "Tipo": "sedán",
      "Relevancia ES/EU": "Alta",
      "Disponibilidad ES": "Sí",
      "Tracción": "RWD, AWD, Performance",
      "Autonomía (banda)": "alto (verificar km en configurador)",
      "Carga": "Supercharger, destino AC/DC según equipo",
      "Espacio": "maletero + frunk; 5 plazas típicas",
      "Ejes de comparación": "eficiencia, precio_entrada, dinamica"
    },
    "uncertain": false
  },
  {
    "id": "modely",
    "name": "Model Y",
    "segment": "suv_crossover_compact",
    "attrs": {
      "Tipo": "SUV/crossover",
      "Relevancia ES/EU": "Muy alta",
      "Disponibilidad ES": "Sí",
      "Tracción": "RWD, AWD, Performance",
      "Autonomía (banda)": "alto (verificar km en configurador)",
      "Carga": "Supercharger, destino AC/DC según equipo",
      "Espacio": "más volumen de carga que Model 3; 5 plazas (variantes 7 / L: verificar mercado)",
      "Producción EU": "Giga Berlin",
      "Ejes de comparación": "espacio, versatilidad, volumen_eu"
    },
    "uncertain": false
  },
  {
    "id": "models",
    "name": "Model S",
    "segment": "sedan_premium",
    "attrs": {
      "Tipo": "sedán premium",
      "Relevancia ES/EU": "Media-baja",
      "Disponibilidad ES": "⚠️ Verificar en tesla.com",
      "Tracción": "AWD, Plaid / Performance según mercado",
      "Autonomía (banda)": "muy alto (verificar)",
      "Carga": "Supercharger",
      "Espacio": "premium; menor volumen de venta",
      "Notas": "Producción S/X en Fremont reconfigurada según IR (Optimus); disponibilidad retail ES puede ser limitada — verificar web.",
      "Ejes de comparación": "prestaciones, lujo, autonomia"
    },
    "uncertain": true,
    "verify_hint": "Verificar en https://www.tesla.com/es_es"
  },
  {
    "id": "modelx",
    "name": "Model X",
    "segment": "suv_premium",
    "attrs": {
      "Tipo": "SUV premium",
      "Relevancia ES/EU": "Media-baja",
      "Disponibilidad ES": "⚠️ Verificar en tesla.com",
      "Tracción": "AWD, Plaid / Performance según mercado",
      "Autonomía (banda)": "alto (verificar)",
      "Carga": "Supercharger",
      "Espacio": "SUV grande; puertas falcon (histórico)",
      "Notas": "Misma caveat de disponibilidad que Model S.",
      "Ejes de comparación": "espacio_premium, prestaciones"
    },
    "uncertain": true,
    "verify_hint": "Verificar en https://www.tesla.com/es_es"
  },
  {
    "id": "cybertruck",
    "name": "Cybertruck",
    "segment": "pickup",
    "attrs": {
      "Tipo": "pickup",
      "Relevancia ES/EU": "Solo contexto (no compra ES)",
      "Disponibilidad ES": "No",
      "Tracción": "AWD / variantes EE.UU.",
      "Carga": "Supercharger NACS — contexto NA",
      "Espacio": "caja pickup",
      "Producción EU": "—",
      "Notas": "No es opción de compra práctica en España/UE (homologación/diseño).",
      "Ejes de comparación": "contraste_na_vs_eu"
    },
    "uncertain": false
  }
];

window.COMPARE_ENERGY = [
  {
    "id": "powerwall",
    "name": "Powerwall",
    "segment": "energy_residential",
    "attrs": {
      "Tipo": "batería hogar",
      "Relevancia ES/EU": "Media",
      "Disponibilidad ES": "⚠️ Verificar en tesla.com",
      "Carga": "n/a — almacena energía hogar/solar",
      "Notas": "Powerwall 3 / 3P (trifásico): IR cita 3P en Alemania y expansión a mercados trifásicos. ⚠️ Verificar SKU ES.",
      "Ejes de comparación": "autoconsumo, backup"
    },
    "uncertain": true,
    "verify_hint": "Verificar en https://www.tesla.com/es_es"
  },
  {
    "id": "megapack",
    "name": "Megapack",
    "segment": "energy_utility",
    "attrs": {
      "Tipo": "almacenamiento red",
      "Relevancia ES/EU": "Solo B2B / utility",
      "Disponibilidad ES": "Proyecto B2B",
      "Notas": "Cliente utility/B2B; no comparador retail de coche.",
      "Ejes de comparación": "escala_red, software_despacho"
    },
    "uncertain": false
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

/* ——— Pack meta + glosario / carga EU / ops journey (content 09–11) ——— */
window.CONTENT_PACK_META = {
  "version": "2026-09-04",
  "updated": "2026-09-04",
  "source": "tesla-panorama-content/",
  "changelog": [
    "Glosario buscable (términos públicos ES/EU)",
    "Vista Carga / Europa (capas cualitativas + Find Us)",
    "Ops día a día: stepper Sales → Delivery → Service",
    "Modo «¿Qué ha cambiado?» en timeline (uncertain / verify / recientes)",
    "Schema structure_map / product_comparator / timeline (pack New Bot)"
  ],
  "notes": "Hechos públicos; cifras perishable — verificar en tesla.com / IR. No inventar organigramas ni stalls por ciudad."
};

window.GLOSSARY = [
  {
    "id": "autopilot",
    "term": "Autopilot",
    "short": "Nombre histórico del paquete de asistencia al conductor de Tesla (mantenimiento de carril, control de crucero adaptativo, etc.). Naming en UI puede evolucionar (p. ej. Autosteer / Self-Driving en menús); no implica autonomía total.",
    "tags": [
      "software",
      "asistencia",
      "seguridad"
    ],
    "related": [
      "autosteer",
      "fsd-supervised",
      "ota"
    ]
  },
  {
    "id": "autosteer",
    "term": "Autosteer",
    "short": "Función de mantenimiento de carril / dirección asistida dentro del ecosistema de asistencia. En actualizaciones OTA 2026, Tesla ha renombrado etiquetas (p. ej. Navigate on Autopilot → Navigate on Autosteer) sin cambiar necesariamente el comportamiento.",
    "tags": [
      "software",
      "asistencia"
    ],
    "related": [
      "autopilot",
      "fsd-supervised"
    ]
  },
  {
    "id": "fsd-supervised",
    "term": "FSD (Supervised)",
    "short": "Full Self-Driving (Supervised): asistencia avanzada bajo supervisión continua del conductor. No es robotaxi ni autonomía sin conductor. Disponibilidad, precio y aprobación regulatoria dependen del país.",
    "tags": [
      "software",
      "asistencia",
      "regulacion",
      "europa"
    ],
    "related": [
      "autopilot",
      "hw3",
      "hw4",
      "ota"
    ]
  },
  {
    "id": "hw3",
    "term": "HW3 / Autopilot Hardware 3",
    "short": "Generación de hardware de visión/cómputo a bordo usada en muchos vehículos Tesla de años anteriores. Capacidades de software futuras pueden diferir respecto a HW4; verifica por VIN/app.",
    "tags": [
      "hardware",
      "asistencia"
    ],
    "related": [
      "hw4",
      "fsd-supervised",
      "ai-computer"
    ]
  },
  {
    "id": "hw4",
    "term": "HW4 / AI4",
    "short": "Generación más reciente de hardware de visión/cómputo a bordo (a veces referida como AI4 en comunidad/prensa). Presente en modelos más nuevos; no garantiza FSD Supervised en todos los mercados.",
    "tags": [
      "hardware",
      "asistencia"
    ],
    "related": [
      "hw3",
      "fsd-supervised",
      "ai-computer"
    ]
  },
  {
    "id": "ai-computer",
    "term": "AI Computer",
    "short": "Nombre de UI (OTA ~2026) para el computador de inferencia a bordo antes etiquetado como FSD Computer. Renombre de interfaz; el silicio del coche no cambia por el nombre.",
    "tags": [
      "hardware",
      "software",
      "naming"
    ],
    "related": [
      "hw3",
      "hw4",
      "fsd-supervised"
    ]
  },
  {
    "id": "ota",
    "term": "OTA (Over-The-Air)",
    "short": "Actualización de software del vehículo por red, sin visita obligatoria al taller. Puede cambiar UI, funciones, eficiencia o correcciones de seguridad.",
    "tags": [
      "software",
      "ops",
      "producto"
    ],
    "related": [
      "autopilot",
      "fsd-supervised",
      "app-tesla"
    ]
  },
  {
    "id": "supercharger",
    "term": "Supercharger",
    "short": "Red de carga rápida DC de Tesla, pensada para viajes y recargas de alto kW. En Europa usa conector CCS2. Parte de la experiencia de producto y de las ops de red.",
    "tags": [
      "carga",
      "infra",
      "viaje"
    ],
    "related": [
      "destination-charger",
      "wall-connector",
      "ccs2",
      "afir"
    ]
  },
  {
    "id": "destination-charger",
    "term": "Destination Charger",
    "short": "Cargador AC (típicamente en hoteles, restaurantes, destinos) del programa Destination Charging de Tesla. Más lento que Supercharger; pensado para cargar mientras estás aparcado en destino.",
    "tags": [
      "carga",
      "destino",
      "ac"
    ],
    "related": [
      "supercharger",
      "wall-connector"
    ]
  },
  {
    "id": "wall-connector",
    "term": "Wall Connector",
    "short": "Cargador de pared Tesla para casa o empresa (AC). Suele ser la opción principal de carga diaria si hay plaza y instalación eléctrica adecuada.",
    "tags": [
      "carga",
      "hogar",
      "ac"
    ],
    "related": [
      "mobile-connector",
      "destination-charger"
    ]
  },
  {
    "id": "mobile-connector",
    "term": "Mobile Connector",
    "short": "Cable/cargador portátil Tesla para enchufes domésticos o adaptadores; carga lenta. Recomendado como respaldo; no confundir con Mobile Service (técnico a domicilio).",
    "tags": [
      "carga",
      "accesorio"
    ],
    "related": [
      "wall-connector",
      "mobile-service"
    ]
  },
  {
    "id": "ccs2",
    "term": "CCS2",
    "short": "Combined Charging System Tipo 2: conector estándar de carga rápida en Europa. Los Superchargers europeos usan CCS2 (sin Magic Dock típico de NACS en NA).",
    "tags": [
      "carga",
      "europa",
      "estandar"
    ],
    "related": [
      "supercharger",
      "afir"
    ]
  },
  {
    "id": "afir",
    "term": "AFIR",
    "short": "Alternative Fuels Infrastructure Regulation (UE): marco que exige, entre otras cosas, acceso ad-hoc y transparencia en puntos de carga públicos. Afecta el ecosistema de carga europea, incluida la red abierta a terceros donde aplique.",
    "tags": [
      "regulacion",
      "europa",
      "carga"
    ],
    "related": [
      "supercharger",
      "ccs2"
    ]
  },
  {
    "id": "megapack",
    "term": "Megapack",
    "short": "Sistema de almacenamiento de energía a escala utility / comercial grande. Negocio B2B Energy; no es el Powerwall residencial.",
    "tags": [
      "energy",
      "utility",
      "producto"
    ],
    "related": [
      "powerwall",
      "megafactory"
    ]
  },
  {
    "id": "powerwall",
    "term": "Powerwall",
    "short": "Batería residencial/comercial pequeña de Tesla Energy para almacenar energía solar o de red. Disponibilidad de variantes (p. ej. trifásico) depende del mercado.",
    "tags": [
      "energy",
      "residencial",
      "producto"
    ],
    "related": [
      "megapack",
      "solar"
    ]
  },
  {
    "id": "megafactory",
    "term": "Megafactory",
    "short": "Planta dedicada a fabricar Megapack (p. ej. California, Shanghai; Texas en commissioning según IR). Distinta de las Giga de vehículos.",
    "tags": [
      "energy",
      "fabricacion"
    ],
    "related": [
      "megapack",
      "giga"
    ]
  },
  {
    "id": "giga",
    "term": "Giga (Gigafactory)",
    "short": "Prefijo de fábricas a gran escala de Tesla (Shanghai, Berlin-Brandenburg, Texas, Nevada…). «Giga Berlin» produce Model Y para Europa; España no tiene Giga de vehículos.",
    "tags": [
      "fabricacion",
      "estructura"
    ],
    "related": [
      "giga-berlin",
      "juniper",
      "megafactory"
    ]
  },
  {
    "id": "giga-berlin",
    "term": "Giga Berlin-Brandenburg",
    "short": "Fábrica de vehículos en Grünheide (Alemania). Ancla europea de producción de Model Y (incl. refresh). Fuente habitual de stock EU.",
    "tags": [
      "fabricacion",
      "europa"
    ],
    "related": [
      "giga",
      "juniper",
      "model-y"
    ]
  },
  {
    "id": "juniper",
    "term": "Juniper (Model Y refresh)",
    "short": "Nombre interno/prensa del facelift del Model Y (producción EU reportada desde ene 2025 en Berlin). En web de cliente suele aparecer como New Model Y / Model Y actualizado — no memorices el code name como SKU oficial.",
    "tags": [
      "producto",
      "naming",
      "europa"
    ],
    "related": [
      "highland",
      "model-y",
      "giga-berlin"
    ]
  },
  {
    "id": "highland",
    "term": "Highland (Model 3 refresh)",
    "short": "Nombre interno/prensa del facelift del Model 3 (lanzado antes que Juniper). En configurador: Model 3 actual; el code name es útil para estudiar, no para vender.",
    "tags": [
      "producto",
      "naming"
    ],
    "related": [
      "juniper",
      "model-3"
    ]
  },
  {
    "id": "model-3",
    "term": "Model 3",
    "short": "Sedán de volumen de Tesla. Muy relevante en ES/EU; precios y trims cambian en configurador.",
    "tags": [
      "producto",
      "vehiculo"
    ],
    "related": [
      "highland",
      "model-y",
      "supercharger"
    ]
  },
  {
    "id": "model-y",
    "term": "Model Y",
    "short": "SUV/crossover de mayor volumen; en Europa se produce en Giga Berlin. Suele ser el producto estrella de conversación en ES.",
    "tags": [
      "producto",
      "vehiculo",
      "europa"
    ],
    "related": [
      "juniper",
      "giga-berlin",
      "model-3"
    ]
  },
  {
    "id": "delivery-hub",
    "term": "Delivery Hub / Delivery Center",
    "short": "Centro de preparación y entrega de vehículos al cliente. Puede compartir o no emplazamiento con Store o Service. Handoff crítico Sales → Delivery.",
    "tags": [
      "ops",
      "entrega",
      "retail"
    ],
    "related": [
      "store",
      "service-center",
      "mobile-service"
    ]
  },
  {
    "id": "store",
    "term": "Store / Gallery / Tesla Center (retail)",
    "short": "Punto de contacto comercial: demos, educación, pedidos. En venta directa no es un concesionario legacy con stock negociable al estilo tradicional.",
    "tags": [
      "ops",
      "venta",
      "retail"
    ],
    "related": [
      "delivery-hub",
      "service-center"
    ]
  },
  {
    "id": "service-center",
    "term": "Service Center",
    "short": "Taller Tesla para mantenimiento y reparaciones que requieren bahía, elevador o piezas mayores. Citas vía app.",
    "tags": [
      "ops",
      "servicio"
    ],
    "related": [
      "mobile-service",
      "parts",
      "delivery-hub"
    ]
  },
  {
    "id": "mobile-service",
    "term": "Mobile Service",
    "short": "Técnico Tesla que repara en domicilio/trabajo cuando el trabajo lo permite. No es el Mobile Connector (cable). Reduce visitas al Service Center.",
    "tags": [
      "ops",
      "servicio"
    ],
    "related": [
      "service-center",
      "parts",
      "mobile-connector"
    ]
  },
  {
    "id": "parts",
    "term": "Parts / Piezas",
    "short": "Cadena de suministro de recambios para Service y Mobile Service. Cuello de botella frecuente en ops de reparación y tiempos de cita.",
    "tags": [
      "ops",
      "servicio"
    ],
    "related": [
      "service-center",
      "mobile-service"
    ]
  },
  {
    "id": "app-tesla",
    "term": "App Tesla",
    "short": "Aplicación móvil: control remoto, carga, citas de servicio, actualizaciones, localización Find Us / Superchargers. Canal principal post-venta.",
    "tags": [
      "software",
      "cliente",
      "ops"
    ],
    "related": [
      "ota",
      "supercharger",
      "mobile-service"
    ]
  },
  {
    "id": "find-us",
    "term": "Find Us",
    "short": "Mapa oficial de tiendas, delivery, service y carga en tesla.com. Fuente viva para no fosilizar conteos de Superchargers o centros.",
    "tags": [
      "infra",
      "retail",
      "fuente"
    ],
    "related": [
      "supercharger",
      "store",
      "service-center"
    ]
  },
  {
    "id": "ir-update",
    "term": "IR Update / Earnings Update",
    "short": "Informe trimestral de Investor Relations (PDF en ir.tesla.com): capacidad de plantas, entregas, energy, outlook. Fuente primaria para cifras de compañía.",
    "tags": [
      "finanzas",
      "fuente",
      "estructura"
    ],
    "related": [
      "megapack",
      "giga"
    ]
  },
  {
    "id": "wltp",
    "term": "WLTP",
    "short": "Ciclo de homologación de autonomía/consumo en Europa. Las cifras del configurador ES usan WLTP; no las compares a EPA (EE.UU.) sin contexto.",
    "tags": [
      "producto",
      "europa",
      "autonomia"
    ],
    "related": [
      "model-3",
      "model-y"
    ]
  },
  {
    "id": "venta-directa",
    "term": "Venta directa",
    "short": "Modelo comercial en el que Tesla vende al cliente sin red de dealers independientes (en mercados donde aplica, p. ej. ES). Precio más transparente online; tienda = canal de marca.",
    "tags": [
      "ops",
      "venta",
      "retail"
    ],
    "related": [
      "store",
      "delivery-hub"
    ]
  },
  {
    "id": "cybertruck",
    "term": "Cybertruck",
    "short": "Pick-up producido principalmente en Giga Texas. No es compra retail práctica típica en España; útil como contexto de producto global.",
    "tags": [
      "producto",
      "vehiculo"
    ],
    "related": [
      "giga"
    ]
  },
  {
    "id": "optimus",
    "term": "Optimus",
    "short": "Proyecto de robot humanoide en la narrativa AI/Robotics. Roadmap ≠ inventario en configurador ES; no lo trates como producto de venta local.",
    "tags": [
      "ai",
      "robotics",
      "roadmap"
    ],
    "related": [
      "fsd-supervised"
    ]
  }
];

window.CHARGING_EU = {
  "version": "2026-09-04",
  "market_default": "ES",
  "layers": [
    {
      "id": "home_ac",
      "label": "Casa / trabajo (AC)",
      "kind": "conceptual",
      "description": "Wall Connector u otro wallbox; carga diaria típica. Depende de plaza e instalación eléctrica."
    },
    {
      "id": "destination_ac",
      "label": "Destination Charging (AC)",
      "kind": "network",
      "description": "Hoteles, restaurantes y destinos del programa Destination Charging. Más lento; cargas mientras estás aparcado."
    },
    {
      "id": "supercharger_dc",
      "label": "Supercharger (DC rápido)",
      "kind": "network",
      "description": "Red rápida Tesla CCS2 en EU. Viajes y top-ups de alto kW. Mapa oficial: Find Us / app."
    },
    {
      "id": "third_party_dc",
      "label": "Otras redes DC (Ionity, etc.)",
      "kind": "ecosystem",
      "description": "Redes no Tesla en corredores EU. Complementan el viaje; no son el foco de este módulo."
    },
    {
      "id": "open_access",
      "label": "Acceso abierto a no-Tesla (selectivo)",
      "kind": "policy",
      "description": "Parte de la red Supercharger EU está abierta a otros BEV CCS2 vía app Tesla. No todas las estaciones; verificar en mapa «Charge Your Non-Tesla» / Find Us."
    }
  ],
  "notes": [
    "No fosilizar stalls por ciudad: usar Find Us.",
    "AFIR (UE) refuerza acceso ad-hoc y transparencia en carga pública; plazos de pago con tarjeta/contactless afectan a operadores en red TEN-T.",
    "En EU el conector Supercharger es CCS2 (estándar regional).",
    "Potencia por stall y apertura a terceros cambian con el tiempo — verificar en sitio."
  ],
  "spain": {
    "summary": "Red Supercharger densa en corredores principales (A-1, Mediterráneo, etc.); sin fábrica de vehículos. Carga en casa + Supercharger en viaje es el patrón típico.",
    "milestone_press": {
      "claim": "Hito ~1.000 stalls / ~96 estaciones en España (comunicado / prensa, marzo 2026).",
      "as_of": "2026-03",
      "confidence": "medium",
      "perishable": true,
      "verify": [
        "https://www.tesla.com/es_ES/findus",
        "comunicados @TeslaCharging / Tesla España",
        "https://www.expansion.com/empresas/motor/2026/03/05/69a9ade5468aeb7d318b45bb.html"
      ]
    },
    "qualitative": [
      "Corredores de larga distancia y turismo estival tensionan la capacidad — más stalls por estación ayudan a colas.",
      "Muchas estaciones reportadas a potencias altas (p. ej. V3/V4 ~250 kW por stall en comunicados) — verificar en sitio.",
      "Apertura a no-Tesla en estaciones seleccionadas; no asumir toda la red."
    ],
    "nodes_for_ui": [
      {
        "id": "es-home",
        "label": "Carga en destino/casa",
        "layer": "home_ac",
        "region": "ES"
      },
      {
        "id": "es-sc-network",
        "label": "Red Supercharger ES (mapa vivo)",
        "layer": "supercharger_dc",
        "region": "ES",
        "map_url": "https://www.tesla.com/es_ES/findus"
      },
      {
        "id": "es-destination",
        "label": "Destination Charging ES",
        "layer": "destination_ac",
        "region": "ES"
      },
      {
        "id": "eu-afir",
        "label": "Marco AFIR (UE)",
        "layer": "open_access",
        "region": "EU"
      }
    ]
  },
  "verify_links": [
    "https://www.tesla.com/es_ES/findus",
    "https://www.tesla.com/trips",
    "https://www.tesla.com/en_eu/support/charging (o soporte local ES)",
    "Reglamento (UE) 2023/1804 — AFIR"
  ]
};

window.OPS_FLOW = {
  "version": "2026-09-04",
  "market_default": "ES",
  "disclaimer": "Roles a nivel público / visible al cliente; títulos exactos y headcount no son públicos.",
  "stages": [
    {
      "id": "sale",
      "title": "Venta / educación",
      "what_happens": "Cliente explora web o Store/Gallery; prueba de conducción si aplica; configuración del vehículo; aclaración de autonomía realista, carga, asistencia y plazos.",
      "customer_sees": "Configurador, precio transparente online, asesor en tienda, demo drive, depósito/pedido.",
      "tesla_team": "Sales / Product Specialists / Advisors (educación y cierre de pedido; no dealer legacy)."
    },
    {
      "id": "order_finance",
      "title": "Pedido y financiación",
      "what_happens": "Pedido en cuenta Tesla; opciones de pago o financiación vía partners locales; posibles trade-in; seguimiento de estado del pedido en app/web.",
      "customer_sees": "Confirmación de pedido, estimaciones de entrega, documentos de financiación/seguros según mercado.",
      "tesla_team": "Sales + equipos de order support / finance partners (externos según país)."
    },
    {
      "id": "prepare",
      "title": "Preparación / logística",
      "what_happens": "Asignación de VIN/stock, transporte desde fábrica (p. ej. Berlin) o inventario regional, inspección, prep estética/técnica, scheduling de cita de entrega.",
      "customer_sees": "Actualizaciones de fecha, invitación a agendar Delivery Hub, checklist de documentos.",
      "tesla_team": "Logistics, Delivery Ops, Quality / Inventory (nombres internos varían; lo visible es ‘tu coche se prepara’)."
    },
    {
      "id": "delivery",
      "title": "Entrega",
      "what_happens": "Cita en Delivery Hub/Center: documentación, walkthrough del vehículo, emparejar app, explicación de carga y funciones básicas, handoff de llaves/cuenta.",
      "customer_sees": "Día de entrega, tour del coche, app funcionando, primera carga orientada.",
      "tesla_team": "Delivery Specialists / Delivery Advisors; handoff limpio desde Sales."
    },
    {
      "id": "ownership",
      "title": "Uso diario (post-entrega)",
      "what_happens": "Carga en casa/destino + Supercharger en viaje; OTA; soporte vía app; posibles upgrades de software según mercado.",
      "customer_sees": "App, Superchargers, actualizaciones, notificaciones.",
      "tesla_team": "Customer Support, Charging Ops (red), Software (OTA) — en contacto indirecto."
    },
    {
      "id": "service",
      "title": "Servicio / pieces / mobile",
      "what_happens": "Diagnóstico (a menudo remoto vía telemetría/app); cita Mobile Service o Service Center; piezas; reparación; cierre y feedback.",
      "customer_sees": "Solicitud de servicio en app, técnico a domicilio o taller, estimaciones, posibles loaners según política/disponibilidad.",
      "tesla_team": "Service Advisors, Technicians, Mobile Service, Parts."
    }
  ]
};

/* what_changed from 05-actualidad.md (GitHub main) */
window.WHAT_CHANGED = [
  {
    "id": "wc-juniper-eu",
    "since": "2025-01",
    "theme": "product_refresh",
    "summary": "Model Y refresh (Juniper / New Model Y) en producción en Giga Berlin y disponible como producto EU de volumen; el code name es de estudio, el configurador usa el nombre de marketing local.",
    "verify": [
      "tesla.com/modely",
      "Giga Berlin / IR"
    ]
  },
  {
    "id": "wc-fsd-eu-map",
    "since": "2025-11",
    "theme": "autonomy",
    "summary": "Mapa FSD Supervised en UE en movimiento: pruebas en ES (DGT/ES-AV), aprobaciones nacionales reportadas en algunos países (p. ej. NL 2026-04). No equivale a robotaxi ni a disponibilidad uniforme en toda la UE.",
    "verify": [
      "RDW",
      "DGT / ES-AV",
      "Tesla Europe FSD"
    ]
  },
  {
    "id": "wc-sc-open-afir",
    "since": "2021-2024",
    "theme": "charging",
    "summary": "Tema durable: Supercharger EU con CCS2 y apertura gradual a no-Tesla en estaciones seleccionadas; AFIR (desde 2024) empuja acceso ad-hoc y transparencia en carga pública.",
    "verify": [
      "Find Us / app Charge Your Non-Tesla",
      "Reglamento UE 2023/1804 AFIR"
    ]
  },
  {
    "id": "wc-energy-megapack-emea",
    "since": "2026",
    "theme": "energy_megapack",
    "summary": "Energy utility sigue creciendo en narrativa IR (deployments EMEA, Megafactories); acuerdos B2B tipo NatPower (>25 GWh IT/UK) no implican Powerwall retail automático en ES.",
    "verify": [
      "ir.tesla.com Q2 2026 Update",
      "comunicados Energy / NatPower"
    ]
  },
  {
    "id": "wc-es-retail-charging",
    "since": "2026",
    "theme": "europe_spain",
    "summary": "España: expansión retail reportada + hito de red Supercharger (~1.000 stalls / ~96 estaciones en prensa mar 2026). Conteos perishable — verificar Find Us.",
    "verify": [
      "https://www.tesla.com/es_ES/findus",
      "prensa / comunicados Tesla España"
    ]
  },
  {
    "id": "wc-naming-assistance",
    "since": "2026-02",
    "theme": "autonomy",
    "summary": "Tema durable de naming: OTA 2026 renombra etiquetas (Navigate on Autosteer, AI Computer) sin cambiar necesariamente el comportamiento; Autopilot/FSD Supervised siguen siendo asistencia con conductor responsable.",
    "verify": [
      "release notes OTA vehículo",
      "manual / soporte local"
    ]
  }
];

