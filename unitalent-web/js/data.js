/**
 * UniTalent MVP — clusters, degrees, universities + RIASEC metadata.
 * Illustrative data only — not official rankings. Verify RUCT / QEDU.
 * Orientation inspired by Holland/RIASEC; not licensed SDS nor clinical test.
 */
window.UNITALENT_DATA = {
  priceEur: 9,
  bizumPlaceholder: "[tu Bizum]",
  contentDate: "2026-09-21",
  version: "mvp-0.2-riasec",
  disclaimer:
    "Orientación inspirada en el modelo Holland/RIASEC; no es SDS licenciado ni test clínico validado. UniTalent no está avalado por el Ministerio de Educación, las universidades ni Holland Company. Los resultados son una ayuda ilustrativa; no sustituyen el consejo de orientadores ni el catálogo oficial. Verifica siempre en RUCT y QEDU.",
  disclaimerShort:
    "Orientación inspirada en el modelo Holland/RIASEC; no es SDS licenciado ni test clínico validado. Verifica títulos en RUCT y acceso en QEDU.",
  letterLabels: {
    R: "Realista (práctico / técnico)",
    I: "Investigador (científico / analítico)",
    A: "Artístico (creativo / expresivo)",
    S: "Social (ayudar / enseñar / cuidar)",
    E: "Emprendedor (liderazgo / persuasión)",
    C: "Convencional (orden / datos / procedimientos)",
  },
  letterKeywords: {
    R: "práctico",
    I: "analítico",
    A: "creativo",
    S: "cercano",
    E: "emprendedor",
    C: "ordenado",
  },
  links: {
    ruct: "https://www.educacion.gob.es/ruct",
    qedu: "https://www.educacion.gob.es/notasdecorte",
  },
  /** primary letters full weight; secondary at 0.5 — from questions.json cluster_riasec_map */
  clusterRiasecMap: {
    ingenieria: { primary: ["R"], secondary: ["I"] },
    ambiente: { primary: ["R"], secondary: ["I"] },
    stem: { primary: ["I"], secondary: [] },
    arte: { primary: ["A"], secondary: [] },
    idiomas: { primary: ["A"], secondary: ["S"] },
    salud: { primary: ["S"], secondary: ["I"] },
    educacion: { primary: ["S"], secondary: [] },
    social: { primary: ["S"], secondary: ["E"] },
    empresa: { primary: ["E"], secondary: ["C"] },
    derecho: { primary: ["E", "C"], secondary: [] },
  },
  clusters: {
    salud: {
      id: "salud",
      name: "Salud y deporte",
      shortName: "Salud",
      description:
        "Cuidado de personas, ciencias de la salud, actividad física y bienestar.",
      keywords: ["cuidado", "bienestar", "personas"],
      degrees: [
        "Grado en Medicina",
        "Grado en Enfermería",
        "Grado en Fisioterapia",
        "Grado en Psicología",
        "Grado en Ciencias de la Actividad Física y del Deporte (CAFYD)",
        "Grado en Nutrición Humana y Dietética",
        "Grado en Odontología",
        "Grado en Farmacia",
      ],
      salidas:
        "Ámbitos habituales: hospitales y clínicas, centros deportivos, farmacia comunitaria, investigación biomédica, consultorios y salud pública (orientativo, sin garantía de empleo).",
      nuance:
        "Muchos grados de salud tienen notas de corte altas y plazas limitadas. Si el confort STEM es bajo, valora refuerzo o vías alternativas (p. ej. Enfermería, Fisioterapia, CAFYD).",
      unis: [
        {
          name: "Universidad Complutense de Madrid (UCM)",
          note: "Amplia oferta en Ciencias de la Salud",
        },
        {
          name: "Universidad Autónoma de Madrid (UAM)",
          note: "Medicina y áreas afines (verificar campus/facultad)",
        },
        {
          name: "Universidad de Alcalá (UAH)",
          note: "Ciencias de la Salud / Farmacia y áreas relacionadas (verificar RUCT)",
        },
        {
          name: "Universidad de Barcelona (UB)",
          note: "Oferta consolidada en salud",
        },
        {
          name: "Universidad de Granada (UGR)",
          note: "Salud y ciencias del deporte (ejemplos frecuentes)",
        },
      ],
    },
    stem: {
      id: "stem",
      name: "STEM (ciencias básicas y datos)",
      shortName: "STEM",
      description:
        "Matemáticas, física, química, biología, estadística e informática científica.",
      keywords: ["analítico", "científico", "datos"],
      degrees: [
        "Grado en Matemáticas",
        "Grado en Física",
        "Grado en Química",
        "Grado en Biología",
        "Grado en Biotecnología",
        "Grado en Estadística / Ciencia de Datos",
        "Grado en Informática / Ingeniería Informática",
      ],
      salidas:
        "Ámbitos habituales: investigación, análisis de datos, laboratorios, docencia universitaria, consultoría tecnológica y transferencia científica (orientativo).",
      nuance:
        "Si el confort STEM es bajo, considera refuerzo o grados con más componente aplicado (p. ej. Informática, Biotecnología).",
      unis: [
        {
          name: "Universidad Autónoma de Madrid (UAM)",
          note: "Ciencias (Matemáticas, Física, Química, Biología…)",
        },
        {
          name: "Universidad Complutense de Madrid (UCM)",
          note: "Facultades de Ciencias",
        },
        {
          name: "Universidad de Alcalá (UAH)",
          note: "Ciencias e Informática (verificar denominaciones)",
        },
        { name: "Universidad de Valencia (UV)", note: "Ciencias básicas" },
        {
          name: "Universidad de Zaragoza (UNIZAR)",
          note: "Ciencias e investigación",
        },
      ],
    },
    ingenieria: {
      id: "ingenieria",
      name: "Ingeniería y tecnología",
      shortName: "Ingeniería",
      description:
        "Diseño de sistemas, industria, TIC y tecnologías aplicadas.",
      keywords: ["técnico", "sistemas", "innovación"],
      degrees: [
        "Grado en Ingeniería Informática",
        "Grado en Ingeniería de Telecomunicación / Tecnologías de Telecomunicación",
        "Grado en Ingeniería Industrial / Ingeniería en Tecnologías Industriales",
        "Grado en Ingeniería Mecánica",
        "Grado en Ingeniería Civil",
        "Grado en Ingeniería Biomédica",
        "Grado en Ingeniería Aeroespacial",
        "Grado en Ingeniería Química",
      ],
      salidas:
        "Ámbitos habituales: desarrollo software, industria, telecomunicaciones, consultoría tecnológica, I+D y gestión de proyectos (orientativo).",
      nuance:
        "Solapa con STEM e informática. Comprueba denominaciones exactas y menciones en RUCT; cada escuela tiene planes distintos.",
      unis: [
        {
          name: "Universidad Politécnica de Madrid (UPM)",
          note: "Referencia en ingenierías",
        },
        {
          name: "Universitat Politècnica de Catalunya (UPC)",
          note: "Ingenierías y TIC",
        },
        {
          name: "Universidad de Alcalá (UAH)",
          note: "Escuela Politécnica — Informática y afines (verificar)",
        },
        {
          name: "Universidad Carlos III de Madrid (UC3M)",
          note: "Ingenierías y tecnología",
        },
        {
          name: "Universitat Politècnica de València (UPV)",
          note: "Amplia oferta tecnológica",
        },
      ],
    },
    empresa: {
      id: "empresa",
      name: "Empresa, economía y management",
      shortName: "Empresa",
      description: "Negocios, finanzas, marketing y organización.",
      keywords: ["organización", "negocio", "impacto"],
      degrees: [
        "Grado en Administración y Dirección de Empresas (ADE)",
        "Grado en Economía",
        "Grado en Finanzas y Contabilidad",
        "Grado en Marketing e Investigación de Mercados",
        "Grado en International Business / Comercio Internacional",
        "Dobles grados ADE + Derecho / ADE + Informática",
      ],
      salidas:
        "Ámbitos habituales: consultoría, banca, marketing, startups, administración pública económica y emprendeduría (orientativo).",
      nuance:
        "ADE+Derecho es una vía frecuente. Revisa ponderaciones de Bachillerato para cada universidad.",
      unis: [
        {
          name: "Universidad Carlos III de Madrid (UC3M)",
          note: "Economía y empresa",
        },
        {
          name: "Universidad Autónoma de Madrid (UAM)",
          note: "Económicas y Empresariales",
        },
        {
          name: "Universidad de Alcalá (UAH)",
          note: "Económicas, Empresariales y Turismo (verificar)",
        },
        {
          name: "Universidad de Valencia (UV)",
          note: "ADE, Economía, etc.",
        },
        {
          name: "Universidad de Sevilla (US)",
          note: "Economía y empresa",
        },
      ],
    },
    educacion: {
      id: "educacion",
      name: "Educación y pedagogía",
      shortName: "Educación",
      description: "Formación de docentes y educación social/pedagógica.",
      keywords: ["enseñanza", "acompañamiento", "formación"],
      degrees: [
        "Grado en Educación Infantil",
        "Grado en Educación Primaria",
        "Grado en Pedagogía",
        "Grado en Educación Social",
      ],
      salidas:
        "Ámbitos habituales: colegios e institutos (tras máster de profesorado si aplica), pedagogía, educación social y recursos educativos (orientativo).",
      nuance:
        "Para docencia en secundaria suele hacer falta máster. Educación Social solapa con el cluster social.",
      unis: [
        {
          name: "Universidad Complutense de Madrid (UCM)",
          note: "Educación / Magisterio (verificar facultades)",
        },
        {
          name: "Universidad Autónoma de Madrid (UAM)",
          note: "Formación de profesorado",
        },
        {
          name: "Universidad de Alcalá (UAH)",
          note: "Educación (Campus externos / facultades — verificar RUCT)",
        },
        { name: "Universidad de Granada (UGR)", note: "Educación" },
        {
          name: "Universidad de Salamanca (USAL)",
          note: "Tradición en educación y humanidades",
        },
      ],
    },
    social: {
      id: "social",
      name: "Ciencias sociales y trabajo social",
      shortName: "Social",
      description:
        "Intervención social, comunidad, análisis de la sociedad.",
      keywords: ["empatía", "comunidad", "justicia"],
      degrees: [
        "Grado en Trabajo Social",
        "Grado en Sociología",
        "Grado en Antropología Social y Cultural",
        "Grado en Criminología",
      ],
      salidas:
        "Ámbitos habituales: servicios sociales, ONGs, administración, investigación social y mediación comunitaria (orientativo).",
      nuance:
        "Criminología solapa con derecho. Comprueba planes y prácticas en cada centro.",
      unis: [
        {
          name: "Universidad Complutense de Madrid (UCM)",
          note: "Sociología, Trabajo Social, etc.",
        },
        {
          name: "Universidad de Granada (UGR)",
          note: "Ciencias sociales",
        },
        {
          name: "Universidad de Alcalá (UAH)",
          note: "Áreas sociales / Trabajo Social según oferta vigente",
        },
        {
          name: "Universidad de Valencia (UV)",
          note: "Ciencias sociales",
        },
        {
          name: "Universidad del País Vasco / Euskal Herriko Unibertsitatea (UPV/EHU)",
          note: "Oferta social amplia",
        },
      ],
    },
    arte: {
      id: "arte",
      name: "Arte, diseño y comunicación creativa",
      shortName: "Arte",
      description:
        "Creación artística, diseño, audiovisuales y comunicación.",
      keywords: ["creativo", "expresión", "diseño"],
      degrees: [
        "Grado en Bellas Artes",
        "Grado en Diseño",
        "Grado en Comunicación Audiovisual",
        "Grado en Publicidad y Relaciones Públicas",
        "Grado en Periodismo",
        "Grado en Conservación y Restauración de Bienes Culturales",
        "Grado en Arquitectura",
      ],
      salidas:
        "Ámbitos habituales: estudios creativos, agencias, producción audiovisual, patrimonio cultural y freelance (orientativo).",
      nuance:
        "Muchos grados de Diseño se imparten en centros superiores artísticos; comprueba tipología de centro en RUCT. Arquitectura solapa con ingeniería.",
      unis: [
        {
          name: "Universidad Complutense de Madrid (UCM)",
          note: "Bellas Artes, Comunicación",
        },
        {
          name: "Universitat de Barcelona (UB)",
          note: "Bellas Artes y afines",
        },
        {
          name: "Universidad de Salamanca (USAL)",
          note: "Bellas Artes / patrimonio (verificar)",
        },
        {
          name: "Universidad Politécnica de Madrid (UPM)",
          note: "Arquitectura y diseño (según centros)",
        },
        {
          name: "Universidad de Castilla-La Mancha (UCLM)",
          note: "Bellas Artes (ej. Cuenca) — verificar",
        },
      ],
    },
    derecho: {
      id: "derecho",
      name: "Derecho, políticas y administración",
      shortName: "Derecho",
      description:
        "Normas, instituciones, políticas públicas y gestión.",
      keywords: ["normas", "argumentación", "instituciones"],
      degrees: [
        "Grado en Derecho",
        "Grado en Ciencias Políticas y de la Administración",
        "Grado en Relaciones Internacionales",
        "Grado en Gestión y Administración Pública",
        "Doble Grado en Derecho + ADE / Derecho + Relaciones Internacionales",
      ],
      salidas:
        "Ámbitos habituales: abogacía (vía máster de acceso), administración pública, consultoría legal, organismos internacionales y política (orientativo).",
      nuance:
        "Para ejercer como abogado/a en España hace falta el máster de acceso. Dobles grados alargan la carrera pero abren más puertas.",
      unis: [
        {
          name: "Universidad Complutense de Madrid (UCM)",
          note: "Derecho y Políticas",
        },
        { name: "Universidad Autónoma de Madrid (UAM)", note: "Derecho" },
        {
          name: "Universidad de Alcalá (UAH)",
          note: "Derecho (oferta consolidada — verificar)",
        },
        {
          name: "Universidad de Valencia (UV)",
          note: "Derecho y Ciencias Políticas",
        },
        { name: "Universidad de Sevilla (US)", note: "Derecho" },
      ],
    },
    idiomas: {
      id: "idiomas",
      name: "Idiomas, humanidades, turismo y cultura",
      shortName: "Idiomas",
      description:
        "Lenguas, traducción, turismo y patrimonio cultural.",
      keywords: ["culturas", "comunicación", "apertura"],
      degrees: [
        "Grado en Traducción e Interpretación",
        "Grado en Lenguas Modernas / Estudios Ingleses / Filología",
        "Grado en Turismo",
        "Grado en Humanidades",
        "Grado en Historia / Historia del Arte",
      ],
      salidas:
        "Ámbitos habituales: traducción, turismo, enseñanza de idiomas, gestión cultural e internacionalización de empresas (orientativo).",
      nuance:
        "Turismo solapa con empresa. Valora combinar idiomas con otra especialidad (dobles, minors o máster).",
      unis: [
        {
          name: "Universidad de Salamanca (USAL)",
          note: "Lenguas, Filología, fuerte tradición",
        },
        {
          name: "Universidad de Alcalá (UAH)",
          note: "Humanidades, Filología, Turismo (verificar)",
        },
        {
          name: "Universidad Complutense de Madrid (UCM)",
          note: "Filologías, Traducción según centros",
        },
        {
          name: "Universidad de Granada (UGR)",
          note: "Traducción, Turismo, lenguas",
        },
        {
          name: "Universidad de las Islas Baleares (UIB)",
          note: "Turismo y lenguas (ejemplo geográfico)",
        },
      ],
    },
    ambiente: {
      id: "ambiente",
      name: "Medio ambiente, agronomía y sostenibilidad",
      shortName: "Ambiente",
      description:
        "Territorio, recursos naturales, agroalimentación y sostenibilidad.",
      keywords: ["sostenibilidad", "territorio", "ecología"],
      degrees: [
        "Grado en Ciencias Ambientales",
        "Grado en Ingeniería Forestal / Ingeniería del Medio Natural",
        "Grado en Ingeniería Agrícola / Ingeniería Agroalimentaria",
        "Grado en Geología / Ciencias del Mar",
        "Grado en Geografía y Ordenación del Territorio",
      ],
      salidas:
        "Ámbitos habituales: consultoría ambiental, administración del territorio, agroalimentación, energías renovables e investigación (orientativo).",
      nuance:
        "Solapa con STEM e ingeniería. Comprueba menciones y prácticas de campo en cada plan de estudios.",
      unis: [
        {
          name: "Universidad Politécnica de Madrid (UPM)",
          note: "Ingenierías agroforestales / ambientales (centros)",
        },
        {
          name: "Universidad de Alcalá (UAH)",
          note: "Ciencias Ambientales (ejemplo frecuente en UAH — verificar RUCT)",
        },
        {
          name: "Universidad de Granada (UGR)",
          note: "Ciencias Ambientales / afines",
        },
        {
          name: "Universidad de Valencia (UV)",
          note: "Ambientales / Geografía",
        },
        {
          name: "Universidad de Santiago de Compostela (USC)",
          note: "Ambientales, forestales, etc.",
        },
      ],
    },
  },
  checklist: [
    "Revisar Bachillerato / modalidad y ponderaciones de la universidad objetivo",
    "Consultar notas de corte orientativas del último curso (QEDU) — cambian cada año",
    "Leer planes de estudio (créditos, prácticas, menciones)",
    "Asistir a jornadas de puertas abiertas / ferias",
    "Hablar con orientador/a del centro y, si puedes, con estudiantes del grado",
    "Valorar dobles grados, FP superior como vía alternativa, o año de refuerzo",
  ],
};
