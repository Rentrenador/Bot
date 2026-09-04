---
id: comparador-productos
title: Comparador de productos (atributos cliente)
order: 8
tags: [panorama, productos, comparador, ui]
lang: es
updated: 2026-09-04
path: primary
ui_features: [product_comparator]
---

# Comparador — atributos a nivel cliente (ES / EU)

Precios, trims y km WLTP **cambian**. Este módulo da una **tabla de atributos** para la UI de comparador; las cifras numéricas de autonomía/precio deben leerse del configurador el día del quiz.

> ⚠️ [Incierta / verificar] Cualquier km WLTP o € concreto pegado aquí. Fuente viva: [tesla.com/es_es](https://www.tesla.com/es_es).

```json
{
  "product_comparator": {
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
        "drivetrain_options": ["RWD", "AWD", "Performance"],
        "range_band_wltp": "alto (verificar km en configurador)",
        "charging": ["Supercharger", "destino AC/DC según equipo"],
        "space": "maletero + frunk; 5 plazas típicas",
        "compare_axes": ["eficiencia", "precio_entrada", "dinamica"]
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
        "drivetrain_options": ["RWD", "AWD", "Performance"],
        "range_band_wltp": "alto (verificar km en configurador)",
        "charging": ["Supercharger", "destino AC/DC según equipo"],
        "space": "más volumen de carga que Model 3; 5 plazas (variantes 7 / L: verificar mercado)",
        "compare_axes": ["espacio", "versatilidad", "volumen_eu"]
      },
      {
        "id": "models",
        "name": "Model S",
        "segment": "sedan_premium",
        "body": "sedán premium",
        "relevance_es": "medium_low",
        "available_es": "verify",
        "drivetrain_options": ["AWD", "Plaid / Performance según mercado"],
        "range_band_wltp": "muy alto (verificar)",
        "charging": ["Supercharger"],
        "space": "premium; menor volumen de venta",
        "compare_axes": ["prestaciones", "lujo", "autonomia"],
        "notes": "Producción S/X en Fremont reconfigurada según IR (Optimus); disponibilidad retail ES puede ser limitada — verificar web."
      },
      {
        "id": "modelx",
        "name": "Model X",
        "segment": "suv_premium",
        "body": "SUV premium",
        "relevance_es": "medium_low",
        "available_es": "verify",
        "drivetrain_options": ["AWD", "Plaid / Performance según mercado"],
        "range_band_wltp": "alto (verificar)",
        "charging": ["Supercharger"],
        "space": "SUV grande; puertas falcon (histórico)",
        "compare_axes": ["espacio_premium", "prestaciones"],
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
        "drivetrain_options": ["AWD / variantes EE.UU."],
        "charging": ["Supercharger NACS — contexto NA"],
        "space": "caja pickup",
        "compare_axes": ["contraste_na_vs_eu"],
        "notes": "No es opción de compra práctica en España/UE (homologación/diseño)."
      },
      {
        "id": "powerwall",
        "name": "Powerwall",
        "segment": "energy_residential",
        "body": "batería hogar",
        "relevance_es": "medium",
        "available_es": "verify",
        "charging": ["n/a — almacena energía hogar/solar"],
        "compare_axes": ["autoconsumo", "backup"],
        "notes": "Powerwall 3 / 3P (trifásico): IR cita 3P en Alemania y expansión a mercados trifásicos. ⚠️ Verificar SKU ES."
      },
      {
        "id": "megapack",
        "name": "Megapack",
        "segment": "energy_utility",
        "body": "almacenamiento red",
        "relevance_es": "b2b_only",
        "available_es": "b2b_project",
        "compare_axes": ["escala_red", "software_despacho"],
        "notes": "Cliente utility/B2B; no comparador retail de coche."
      }
    ],
    "software_assistance": {
      "names": ["Autopilot", "FSD (Supervised)"],
      "rule": "Asistencia; conductor supervisa. Disponibilidad y nombre exacto varían por país/versión.",
      "es_status": "⚠️ Verificar: pruebas DGT reportadas; clearance retail al cliente no asumir = NL/otros."
    }
  }
}
```

---

## Tabla compacta (UI)

| Producto | Segmento | ES retail | Carga | Ejes de comparación | Caveat EU/ES |
|----------|----------|-----------|-------|---------------------|--------------|
| **Model 3** | Sedán | Sí | Supercharger + destino | Eficiencia, precio, dinámica | WLTP/precio: configurador |
| **Model Y** | SUV compacto | Sí (muy relevante; Berlin) | Supercharger + destino | Espacio, versatilidad | Variantes 7plazas/L: verificar mercado |
| **Model S** | Sedán premium | ⚠️ Verificar | Supercharger | Prestaciones, autonomía | Volumen bajo; líneas Fremont reconfiguradas (IR) |
| **Model X** | SUV premium | ⚠️ Verificar | Supercharger | Espacio premium | Idem S |
| **Cybertruck** | Pickup | No | Contexto NA | Contraste NA vs EU | No compra práctica ES/UE |
| **Powerwall** | Energy hogar | ⚠️ Verificar SKU | — | Autoconsumo / backup | 3P: IR Alemania → otros; ES no asumir |
| **Megapack** | Energy utility | B2B | — | Escala de red | No retail coche |

### Atributos que el comparador debería exponer (sin fosilizar números)

1. **Segmento / carrocería**  
2. **Disponibilidad ES/EU** (`true` / `false` / `verify`)  
3. **Tracción** (RWD / AWD / Performance)  
4. **Banda de autonomía** (texto + link a WLTP vivo)  
5. **Carga** (Supercharger + destino)  
6. **Espacio / plazas**  
7. **Origen de fabricación EU** (Model Y Berlin)  
8. **Software de asistencia** (caveat Supervised + país)

### Qué NO hardcodear en quizzes estrictos

- Precios € del mes pasado.  
- Un único km WLTP sin llanta/trim.  
- “FSD igual en toda la UE”.  
- Cybertruck como alternativa de compra en Madrid.

---

## Mini-guía de uso en la app

- Comparador por defecto: **Model 3 vs Model Y**.  
- Añadir S/X solo como “premium / verificar disponibilidad”.  
- Cybertruck como tarjeta “contexto EE.UU.”, no como rival de compra.  
- Energy en pestaña aparte (hogar vs utility).

---

## Checklist

- [ ] Sé comparar 3 vs Y sin inventar km.  
- [ ] Sé por qué Cybertruck no entra en decisión ES.  
- [ ] Sé que Powerwall ≠ Megapack.  
- [ ] Sé marcar FSD Supervised con caveat de país.
