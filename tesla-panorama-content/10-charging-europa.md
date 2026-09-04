---
id: charging-europa
title: Carga en Europa y España
order: 10
tags: [panorama, carga, supercharger, europa, espana, mapa]
lang: es
updated: 2026-09-04
path: primary
ui_features: [charging_map]
---

# Carga — Supercharger y paisaje europeo (nivel público)

Objetivo: entender **cómo se carga** y qué es la red Tesla en Europa/España **sin inventar conteos de ciudad**. Para números vivos: [Find Us](https://www.tesla.com/es_ES/findus) y el planificador de viajes en la app.

```json
{
  "charging_map": {
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
        {"id": "es-home", "label": "Carga en destino/casa", "layer": "home_ac", "region": "ES"},
        {"id": "es-sc-network", "label": "Red Supercharger ES (mapa vivo)", "layer": "supercharger_dc", "region": "ES", "map_url": "https://www.tesla.com/es_ES/findus"},
        {"id": "es-destination", "label": "Destination Charging ES", "layer": "destination_ac", "region": "ES"},
        {"id": "eu-afir", "label": "Marco AFIR (UE)", "layer": "open_access", "region": "EU"}
      ]
    },
    "verify_links": [
      "https://www.tesla.com/es_ES/findus",
      "https://www.tesla.com/trips",
      "https://www.tesla.com/en_eu/support/charging (o soporte local ES)",
      "Reglamento (UE) 2023/1804 — AFIR"
    ]
  }
}
```

---

## Tres modos de carga (cliente)

| Modo | Qué es | Cuándo |
|------|--------|--------|
| **Casa / trabajo** | Wall Connector u otro AC | Día a día; el 80–90% de los km de muchos conductores |
| **Destination** | AC en hoteles/destinos del programa | Llegas, aparcas, cargas despacio |
| **Supercharger** | DC rápido en red Tesla | Viaje, top-up, sin carga en casa |

> 💡 Humor sano de estudio: “el Supercharger no es tu nevera” — la carga diaria ideal suele ser en destino/casa.

## Supercharger vs resto (Europa)

- **Conector:** CCS2 en EU (diferente del debate NACS en Norteamérica).  
- **App / cuenta:** sesión iniciada con cuenta Tesla; no-Tesla usan flujo “Charge Your Non-Tesla” donde la estación esté abierta.  
- **Open access:** Tesla abrió gran parte de la red europea a terceros de forma gradual desde ~2021; **no todas** las ubicaciones.  
- **AFIR:** desde 2024 el marco UE empuja acceso ad-hoc, precios transparentes y, en plazos posteriores, medios de pago más universales en puntos públicos (incl. retrofit en corredores TEN-T hacia 2027). Detalle legal → texto AFIR / Q&A Comisión — no simplifiques en un quiz estricto.

> ⚠️ [Incierta / verificar] Qué % exacto de stalls ES está abierto a no-Tesla *hoy* — solo el mapa oficial.

## España — lectura de alto nivel

1. **Sin Giga de vehículos** en ES: la red de carga y el retail son la huella local.  
2. **Hito 2026 (prensa):** Tesla comunicó superar ~**1.000** puntos Supercharger en ~**96** estaciones (mar 2026, p. ej. estación Villagonzalo Pedernales / Burgos). **Cifra perishable** — no la uses como hecho eterno en quizzes; enlaza Find Us.  
3. **Patrón de viaje:** península grande + corredores turísticos → densidad en autopistas importa más que “un poste en cada pueblo”.  
4. **Otras redes:** existen y se usan; este módulo prioriza el paisaje Tesla.

## Ops de red (lo que ve el cliente)

| Tema | Por qué importa |
|------|-----------------|
| Fiabilidad / stalls caídos | Confianza en viaje largo |
| Colas en punta | Turismo, puentes, agosto |
| Potencia real vs cartel | Temperatura, SoC, sharing entre stalls |
| Apertura a terceros | Más uso → más presión de capacidad |
| Señalización / lounge | Experiencia de marca en estaciones grandes |

## Checklist

- [ ] Puedo explicar casa vs Destination vs Supercharger.  
- [ ] Sé que en EU el Supercharger es CCS2.  
- [ ] Sé que open-access existe pero es por estación.  
- [ ] No invento stalls por ciudad; sé dónde verificar (Find Us).
