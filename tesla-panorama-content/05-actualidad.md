---
id: actualidad
title: Actualidad — timeline y cómo leer Tesla
order: 5
tags: [panorama, actualidad, noticias, timeline]
lang: es
updated: 2026-09-04
path: primary
ui_features: [news_timeline]
---

# Actualidad Tesla — timeline-ready, sin fosilizar titulares

Este módulo **no** es un feed en vivo. Da **temas + hitos verificables** para la UI de timeline, y enseña **cómo comprobar** antes de creer un titular.

**Fecha de este pack:** 2026-09-04. Si lees esto mucho después, trata los eventos como *anclas pedagógicas*; revalida en fuentes primarias.

```json
{
  "timeline": {
    "version": "2026-09-04",
    "themes": ["factories", "product_refresh", "autonomy", "energy_megapack", "europe_spain"],
    "events": [
      {
        "id": "juniper-berlin-sop",
        "theme": "product_refresh",
        "date": "2025-01-14",
        "date_precision": "day",
        "title": "Inicio producción Model Y refresh (Juniper) en Giga Berlin",
        "summary": "Reportado por prensa alemana (Handelsblatt) y confirmado después por hitos de producción en Berlin.",
        "markets": ["EU"],
        "confidence": "high",
        "verify": ["tesla.com/modely", "noticias de Giga Berlin / IR"]
      },
      {
        "id": "juniper-berlin-100k",
        "theme": "factories",
        "date": "2025-08",
        "date_precision": "month",
        "title": "Hito ~100.000 Model Y refresh en Giga Berlin",
        "summary": "Comunicación pública de manufacturing (~6 meses tras SOP).",
        "markets": ["EU"],
        "confidence": "high",
        "verify": ["cuentas oficiales Tesla Manufacturing / Giga Berlin"]
      },
      {
        "id": "fsd-spain-testing",
        "theme": "autonomy",
        "date": "2025-11",
        "date_precision": "month",
        "title": "Pruebas FSD Supervised en vías públicas ES (programa DGT)",
        "summary": "Flota de prueba bajo autorización ES-AV; conductor responsable. No implica venta al cliente en España.",
        "markets": ["ES"],
        "confidence": "high",
        "verify": ["DGT / programa ES-AV", "comunicados Tesla Europe"]
      },
      {
        "id": "fsd-nl-approval",
        "theme": "autonomy",
        "date": "2026-04-10",
        "date_precision": "day",
        "title": "RDW (Países Bajos): aprobación tipo provisional FSD Supervised",
        "summary": "Primera aprobación nacional UE reportada. Asistencia supervisada; no robotaxi. Otros países pueden reconocer o no.",
        "markets": ["NL", "EU"],
        "confidence": "high",
        "verify": ["RDW", "Tesla Europe", "Electrek / press primaria"]
      },
      {
        "id": "es-retail-expansion-2026",
        "theme": "europe_spain",
        "date": "2026-02",
        "date_precision": "month",
        "title": "Expansión retail España (aperturas reportadas)",
        "summary": "Prensa: nuevas aperturas (p. ej. A Coruña, Oiartzun, Rivas) y ~21 tiendas/centros de entrega. Cifras perishable.",
        "markets": ["ES"],
        "confidence": "medium",
        "verify": ["https://www.tesla.com/es_ES/findus"]
      },
      {
        "id": "natpower-megapack",
        "theme": "energy_megapack",
        "date": "2026-06",
        "date_precision": "month",
        "title": "Acuerdo NatPower–Tesla: >25 GWh Megapack (IT/UK)",
        "summary": "Supply/execution B2B con software de trading; no implica Powerwall retail en España.",
        "markets": ["IT", "UK", "EU"],
        "confidence": "high",
        "verify": ["comunicados NatPower / Tesla Energy", "Energy-Storage.News / Electrek"]
      },
      {
        "id": "ir-q2-2026",
        "theme": "factories",
        "date": "2026-07",
        "date_precision": "quarter",
        "title": "IR Q2 2026: capacidad plantas + Megafactory Texas en commissioning",
        "summary": "Tabla pública de capacidad instalada; record deployments energy EMEA; Cybercab producción en Texas.",
        "markets": ["global"],
        "confidence": "high",
        "verify": ["https://ir.tesla.com", "TSLA-Q2-2026-Update.pdf"]
      },
      {
        "id": "fsd-eu-pending-harmonization",
        "theme": "autonomy",
        "date": "2026-09",
        "date_precision": "month",
        "title": "FSD Supervised UE: mapa por país en movimiento",
        "summary": "Aprobaciones nacionales reportadas en varios países (p. ej. NL y otros); ES sigue en pruebas / sin clearance retail al cliente según trackers. Posible voto/coordinación UE — no fosilizar.",
        "markets": ["EU", "ES"],
        "confidence": "medium",
        "uncertain": true,
        "verify": ["autoridades nacionales", "Tesla Europe FSD dashboard", "DGT"]
      }
    ]
  }
}
```

---

## Categorías útiles de “noticia Tesla”

| Categoría | Preguntas | Lectura sana |
|-----------|-----------|--------------|
| **Producto** | ¿Lanzamiento, refresh o rumor? ¿Mi mercado? | Facelift Model Y en EU ≠ Cybertruck en ES |
| **Fábricas / capacidad** | ¿Anuncio, permiso o producción real? | Capacidad IR ≠ ritmo semanal |
| **Autonomía / software** | ¿Supervised? ¿País? ¿Tipo approval vs prueba? | Aprobación en NL ≠ Madrid mañana |
| **Energy** | ¿Residencial o utility? ¿B2B? | Megapack IT/UK ≠ Powerwall en tu bloque |
| **Finanzas** | ¿Guidance, entregas, margen? | Un trimestre no redefine la misión |
| **Personas / política** | ¿Afecta catálogo u ops en ES? | Separa ruido de cambios de producto |

---

## Temas para la timeline UI (2025–2026)

### 1. Fábricas
- Berlin: ancla EU de Model Y; refresh Juniper en producción desde ene 2025.  
- Capacidades instaladas: ver tabla en módulo Estructura (IR Q2 2026).  
- Megafactory Texas: Megapack 3 / Megablock en **commissioning** (IR).  
- México Giga: no está en tabla de producción IR — no la trates como operativa.

### 2. Product refreshes
- Model Y “Juniper” / New Model Y en Europa (Berlin).  
- Variantes y nombres de trim **cambian** en el configurador — no memorizar precios.

### 3. Autonomía (naming + regulación)
- Nombre público frecuente: **FSD (Supervised)** — asistencia; conductor responsable.  
- NL: aprobación tipo provisional **2026-04-10** (RDW).  
- ES: pruebas DGT / ES-AV; **⚠️ [Incierta]** disponibilidad retail al cliente — verificar autoridades.  
- Robotaxi / Cybercab: contexto EE.UU.; no SKU ES.

### 4. Energy / Megapack
- IR: record deployments EMEA; Megafactory Shanghai en ramp.  
- Acuerdo NatPower (~25 GWh, IT/UK, jun 2026) = B2B utility.  
- Powerwall 3P (trifásico): IR menciona disponibilidad en Alemania y expansión a otros mercados trifásicos — **⚠️ verificar ES** en web local.

### 5. Europa / España
- Retail ES en expansión (prensa 2026); lista exacta → Find Us.  
- Competencia BEV europea fuerte: precio, software, red de carga.

---

## Principios anti-desinformación

1. **Fuente primaria primero:** tesla.com, [ir.tesla.com](https://ir.tesla.com), filings SEC, autoridades (RDW, DGT, KBA…).  
2. **Mercado importa:** EE.UU. ≠ China ≠ UE ≠ España.  
3. **Palabras trampa:** “Full Self-Driving”, “robotaxi”, “unsupervised”, “approved in Europe”.  
4. **Números:** deliveries, GWh, márgenes — con fecha o no los cites.  
5. **Roadmap ≠ inventario:** Optimus en un evento ≠ producto en configurador ES.

---

## Cómo verificar en tesla.com / IR

| Qué quieres saber | Dónde mirar |
|-------------------|-------------|
| Modelos, precios, autonomía WLTP ES | [tesla.com/es_es](https://www.tesla.com/es_es) → configurador del modelo |
| Tiendas / service / Superchargers | [Find Us España](https://www.tesla.com/es_ES/findus) |
| Capacidad de plantas, outlook | [Investor Relations](https://ir.tesla.com) → Update trimestral (PDF) |
| Energy utility (Megapack) | tesla.com/megapack + press releases energy |
| FSD / asistencia por país | Página FSD local + autoridad de homologación del país |
| Earnings / deliveries | IR press release del trimestre |

### Cadencia para quien mantiene el contenido

| Cadencia | Qué refrescar |
|----------|---------------|
| Mensual | Packs software, FSD por país, SKUs Energy en ES |
| Trimestral | Tras earnings: tono entregas/energy **sin pegar tablas no verificadas** |
| Ad hoc | Lanzamientos de producto o cambios legales ES/UE |
| Versionado | `updated:` en frontmatter + eventos en el JSON `timeline` |

**Flag app:** mostrar “Contenido actualizado: AAAA-MM-DD” + CTA “Verificar en tesla.com / IR”.

---

## Ejercicio de 5 minutos

1. Categoría (producto / fábrica / autonomía / energy / finanzas / ruido).  
2. ¿Afecta a un cliente en España *esta semana*?  
3. ¿Qué fuente primaria lo confirmaría?  
4. ¿Qué frase corta y honesta pondrías en la app?

---

## Checklist

- [ ] Sé separar rumor, anuncio y hecho operativo.  
- [ ] No extrapoló EE.UU. a España.  
- [ ] Sé usar IR Update + Find Us + configurador como fuentes.  
- [ ] Entiendo que este pack necesita refresh.
