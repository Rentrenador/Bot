---
id: glosario
title: Glosario Tesla (buscable)
order: 9
tags: [panorama, glosario, ui, busqueda]
lang: es
updated: 2026-09-04
path: primary
ui_features: [searchable_glossary]
---

# Glosario — términos públicos para estudiar y buscar

Definiciones **cortas y honestas** a nivel cliente / ops visible. Disponibilidad y naming de software **varían por mercado**; verifica en [tesla.com/es_es](https://www.tesla.com/es_es) y en el manual del vehículo.

```json
{
  "glossary": [
    {
      "id": "autopilot",
      "term": "Autopilot",
      "short": "Nombre histórico del paquete de asistencia al conductor de Tesla (mantenimiento de carril, control de crucero adaptativo, etc.). Naming en UI puede evolucionar (p. ej. Autosteer / Self-Driving en menús); no implica autonomía total.",
      "tags": ["software", "asistencia", "seguridad"],
      "related": ["autosteer", "fsd-supervised", "ota"]
    },
    {
      "id": "autosteer",
      "term": "Autosteer",
      "short": "Función de mantenimiento de carril / dirección asistida dentro del ecosistema de asistencia. En actualizaciones OTA 2026, Tesla ha renombrado etiquetas (p. ej. Navigate on Autopilot → Navigate on Autosteer) sin cambiar necesariamente el comportamiento.",
      "tags": ["software", "asistencia"],
      "related": ["autopilot", "fsd-supervised"]
    },
    {
      "id": "fsd-supervised",
      "term": "FSD (Supervised)",
      "short": "Full Self-Driving (Supervised): asistencia avanzada bajo supervisión continua del conductor. No es robotaxi ni autonomía sin conductor. Disponibilidad, precio y aprobación regulatoria dependen del país.",
      "tags": ["software", "asistencia", "regulacion", "europa"],
      "related": ["autopilot", "hw3", "hw4", "ota"]
    },
    {
      "id": "hw3",
      "term": "HW3 / Autopilot Hardware 3",
      "short": "Generación de hardware de visión/cómputo a bordo usada en muchos vehículos Tesla de años anteriores. Capacidades de software futuras pueden diferir respecto a HW4; verifica por VIN/app.",
      "tags": ["hardware", "asistencia"],
      "related": ["hw4", "fsd-supervised", "ai-computer"]
    },
    {
      "id": "hw4",
      "term": "HW4 / AI4",
      "short": "Generación más reciente de hardware de visión/cómputo a bordo (a veces referida como AI4 en comunidad/prensa). Presente en modelos más nuevos; no garantiza FSD Supervised en todos los mercados.",
      "tags": ["hardware", "asistencia"],
      "related": ["hw3", "fsd-supervised", "ai-computer"]
    },
    {
      "id": "ai-computer",
      "term": "AI Computer",
      "short": "Nombre de UI (OTA ~2026) para el computador de inferencia a bordo antes etiquetado como FSD Computer. Renombre de interfaz; el silicio del coche no cambia por el nombre.",
      "tags": ["hardware", "software", "naming"],
      "related": ["hw3", "hw4", "fsd-supervised"]
    },
    {
      "id": "ota",
      "term": "OTA (Over-The-Air)",
      "short": "Actualización de software del vehículo por red, sin visita obligatoria al taller. Puede cambiar UI, funciones, eficiencia o correcciones de seguridad.",
      "tags": ["software", "ops", "producto"],
      "related": ["autopilot", "fsd-supervised", "app-tesla"]
    },
    {
      "id": "supercharger",
      "term": "Supercharger",
      "short": "Red de carga rápida DC de Tesla, pensada para viajes y recargas de alto kW. En Europa usa conector CCS2. Parte de la experiencia de producto y de las ops de red.",
      "tags": ["carga", "infra", "viaje"],
      "related": ["destination-charger", "wall-connector", "ccs2", "afir"]
    },
    {
      "id": "destination-charger",
      "term": "Destination Charger",
      "short": "Cargador AC (típicamente en hoteles, restaurantes, destinos) del programa Destination Charging de Tesla. Más lento que Supercharger; pensado para cargar mientras estás aparcado en destino.",
      "tags": ["carga", "destino", "ac"],
      "related": ["supercharger", "wall-connector"]
    },
    {
      "id": "wall-connector",
      "term": "Wall Connector",
      "short": "Cargador de pared Tesla para casa o empresa (AC). Suele ser la opción principal de carga diaria si hay plaza y instalación eléctrica adecuada.",
      "tags": ["carga", "hogar", "ac"],
      "related": ["mobile-connector", "destination-charger"]
    },
    {
      "id": "mobile-connector",
      "term": "Mobile Connector",
      "short": "Cable/cargador portátil Tesla para enchufes domésticos o adaptadores; carga lenta. Recomendado como respaldo; no confundir con Mobile Service (técnico a domicilio).",
      "tags": ["carga", "accesorio"],
      "related": ["wall-connector", "mobile-service"]
    },
    {
      "id": "ccs2",
      "term": "CCS2",
      "short": "Combined Charging System Tipo 2: conector estándar de carga rápida en Europa. Los Superchargers europeos usan CCS2 (sin Magic Dock típico de NACS en NA).",
      "tags": ["carga", "europa", "estandar"],
      "related": ["supercharger", "afir"]
    },
    {
      "id": "afir",
      "term": "AFIR",
      "short": "Alternative Fuels Infrastructure Regulation (UE): marco que exige, entre otras cosas, acceso ad-hoc y transparencia en puntos de carga públicos. Afecta el ecosistema de carga europea, incluida la red abierta a terceros donde aplique.",
      "tags": ["regulacion", "europa", "carga"],
      "related": ["supercharger", "ccs2"]
    },
    {
      "id": "megapack",
      "term": "Megapack",
      "short": "Sistema de almacenamiento de energía a escala utility / comercial grande. Negocio B2B Energy; no es el Powerwall residencial.",
      "tags": ["energy", "utility", "producto"],
      "related": ["powerwall", "megafactory"]
    },
    {
      "id": "powerwall",
      "term": "Powerwall",
      "short": "Batería residencial/comercial pequeña de Tesla Energy para almacenar energía solar o de red. Disponibilidad de variantes (p. ej. trifásico) depende del mercado.",
      "tags": ["energy", "residencial", "producto"],
      "related": ["megapack", "solar"]
    },
    {
      "id": "megafactory",
      "term": "Megafactory",
      "short": "Planta dedicada a fabricar Megapack (p. ej. California, Shanghai; Texas en commissioning según IR). Distinta de las Giga de vehículos.",
      "tags": ["energy", "fabricacion"],
      "related": ["megapack", "giga"]
    },
    {
      "id": "giga",
      "term": "Giga (Gigafactory)",
      "short": "Prefijo de fábricas a gran escala de Tesla (Shanghai, Berlin-Brandenburg, Texas, Nevada…). «Giga Berlin» produce Model Y para Europa; España no tiene Giga de vehículos.",
      "tags": ["fabricacion", "estructura"],
      "related": ["giga-berlin", "juniper", "megafactory"]
    },
    {
      "id": "giga-berlin",
      "term": "Giga Berlin-Brandenburg",
      "short": "Fábrica de vehículos en Grünheide (Alemania). Ancla europea de producción de Model Y (incl. refresh). Fuente habitual de stock EU.",
      "tags": ["fabricacion", "europa"],
      "related": ["giga", "juniper", "model-y"]
    },
    {
      "id": "juniper",
      "term": "Juniper (Model Y refresh)",
      "short": "Nombre interno/prensa del facelift del Model Y (producción EU reportada desde ene 2025 en Berlin). En web de cliente suele aparecer como New Model Y / Model Y actualizado — no memorices el code name como SKU oficial.",
      "tags": ["producto", "naming", "europa"],
      "related": ["highland", "model-y", "giga-berlin"]
    },
    {
      "id": "highland",
      "term": "Highland (Model 3 refresh)",
      "short": "Nombre interno/prensa del facelift del Model 3 (lanzado antes que Juniper). En configurador: Model 3 actual; el code name es útil para estudiar, no para vender.",
      "tags": ["producto", "naming"],
      "related": ["juniper", "model-3"]
    },
    {
      "id": "model-3",
      "term": "Model 3",
      "short": "Sedán de volumen de Tesla. Muy relevante en ES/EU; precios y trims cambian en configurador.",
      "tags": ["producto", "vehiculo"],
      "related": ["highland", "model-y", "supercharger"]
    },
    {
      "id": "model-y",
      "term": "Model Y",
      "short": "SUV/crossover de mayor volumen; en Europa se produce en Giga Berlin. Suele ser el producto estrella de conversación en ES.",
      "tags": ["producto", "vehiculo", "europa"],
      "related": ["juniper", "giga-berlin", "model-3"]
    },
    {
      "id": "delivery-hub",
      "term": "Delivery Hub / Delivery Center",
      "short": "Centro de preparación y entrega de vehículos al cliente. Puede compartir o no emplazamiento con Store o Service. Handoff crítico Sales → Delivery.",
      "tags": ["ops", "entrega", "retail"],
      "related": ["store", "service-center", "mobile-service"]
    },
    {
      "id": "store",
      "term": "Store / Gallery / Tesla Center (retail)",
      "short": "Punto de contacto comercial: demos, educación, pedidos. En venta directa no es un concesionario legacy con stock negociable al estilo tradicional.",
      "tags": ["ops", "venta", "retail"],
      "related": ["delivery-hub", "service-center"]
    },
    {
      "id": "service-center",
      "term": "Service Center",
      "short": "Taller Tesla para mantenimiento y reparaciones que requieren bahía, elevador o piezas mayores. Citas vía app.",
      "tags": ["ops", "servicio"],
      "related": ["mobile-service", "parts", "delivery-hub"]
    },
    {
      "id": "mobile-service",
      "term": "Mobile Service",
      "short": "Técnico Tesla que repara en domicilio/trabajo cuando el trabajo lo permite. No es el Mobile Connector (cable). Reduce visitas al Service Center.",
      "tags": ["ops", "servicio"],
      "related": ["service-center", "parts", "mobile-connector"]
    },
    {
      "id": "parts",
      "term": "Parts / Piezas",
      "short": "Cadena de suministro de recambios para Service y Mobile Service. Cuello de botella frecuente en ops de reparación y tiempos de cita.",
      "tags": ["ops", "servicio"],
      "related": ["service-center", "mobile-service"]
    },
    {
      "id": "app-tesla",
      "term": "App Tesla",
      "short": "Aplicación móvil: control remoto, carga, citas de servicio, actualizaciones, localización Find Us / Superchargers. Canal principal post-venta.",
      "tags": ["software", "cliente", "ops"],
      "related": ["ota", "supercharger", "mobile-service"]
    },
    {
      "id": "find-us",
      "term": "Find Us",
      "short": "Mapa oficial de tiendas, delivery, service y carga en tesla.com. Fuente viva para no fosilizar conteos de Superchargers o centros.",
      "tags": ["infra", "retail", "fuente"],
      "related": ["supercharger", "store", "service-center"]
    },
    {
      "id": "ir-update",
      "term": "IR Update / Earnings Update",
      "short": "Informe trimestral de Investor Relations (PDF en ir.tesla.com): capacidad de plantas, entregas, energy, outlook. Fuente primaria para cifras de compañía.",
      "tags": ["finanzas", "fuente", "estructura"],
      "related": ["megapack", "giga"]
    },
    {
      "id": "wltp",
      "term": "WLTP",
      "short": "Ciclo de homologación de autonomía/consumo en Europa. Las cifras del configurador ES usan WLTP; no las compares a EPA (EE.UU.) sin contexto.",
      "tags": ["producto", "europa", "autonomia"],
      "related": ["model-3", "model-y"]
    },
    {
      "id": "venta-directa",
      "term": "Venta directa",
      "short": "Modelo comercial en el que Tesla vende al cliente sin red de dealers independientes (en mercados donde aplica, p. ej. ES). Precio más transparente online; tienda = canal de marca.",
      "tags": ["ops", "venta", "retail"],
      "related": ["store", "delivery-hub"]
    },
    {
      "id": "cybertruck",
      "term": "Cybertruck",
      "short": "Pick-up producido principalmente en Giga Texas. No es compra retail práctica típica en España; útil como contexto de producto global.",
      "tags": ["producto", "vehiculo"],
      "related": ["giga"]
    },
    {
      "id": "optimus",
      "term": "Optimus",
      "short": "Proyecto de robot humanoide en la narrativa AI/Robotics. Roadmap ≠ inventario en configurador ES; no lo trates como producto de venta local.",
      "tags": ["ai", "robotics", "roadmap"],
      "related": ["fsd-supervised"]
    }
  ]
}
```

---

## Cómo usar este glosario en la UI

| Campo | Uso sugerido |
|-------|----------------|
| `id` | slug estable para deep-links y related |
| `term` | etiqueta visible / búsqueda |
| `short` | tooltip o tarjeta |
| `tags` | filtros (carga, software, ops…) |
| `related` | grafo “ver también” |

> ⚠️ Términos de asistencia y Energy: **mercado importa**. Un nombre en EE.UU. o en release notes globales no implica feature retail en España.

## Checklist

- [ ] Sé distinguir Supercharger vs Destination vs Wall Connector vs Mobile Connector.  
- [ ] Sé que FSD Supervised ≠ autonomía sin conductor.  
- [ ] Sé que Juniper/Highland son code names de refresh, no SKUs de venta.  
- [ ] Sé que Mobile Service ≠ Mobile Connector.
