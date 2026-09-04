---
id: ops-dia-a-dia
title: Ops día a día — venta a servicio
order: 11
tags: [panorama, ops, journey, venta, entrega, servicio, ui]
lang: es
updated: 2026-09-04
path: primary
ui_features: [ops_flow_card]
---

# Ops día a día — tarjeta venta → entrega → servicio

Vista **pública** del flujo en un mercado de venta directa (España / Europa). No es un manual interno ni describe organigramas secretos. Complementa `04-como-opera.md`.

```json
{
  "ops_flow": {
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
  }
}
```

---

## Diagrama rápido

```
Venta/educación → Pedido/financiación → Preparación/logística
        → Entrega (Delivery Hub) → Uso (OTA + carga)
        → Servicio (Mobile o Service Center + Parts)
```

## Roles públicos (sin organigrama inventado)

| Momento | Quién ve el cliente | Éxito se mide en… |
|---------|---------------------|-------------------|
| Venta | Advisor / Store | Educación clara, pedido honesto (plazos reales) |
| Pedido | Order / app | Estado comprensible, docs correctos |
| Prep | (poco contacto) | Coche correcto, fecha creíble |
| Entrega | Delivery | Walkthrough + app + cero sorpresas de seguridad |
| Servicio | Advisor + Technician / Mobile | Diagnóstico rápido, piezas, comunicación |

> ⚠️ Títulos exactos y reporting lines **no** están en este pack. Habla de **funciones**, no de jefes inventados.

## Handoffs que rompen (o salvan) la experiencia

1. **Sales → Delivery:** el cliente no debe “empezar de cero” el día de entrega.
2. **Delivery → Ownership:** carga en casa explicada = menos frustración semana 1.
3. **Ownership → Service:** síntomas claros en app + fotos = menos visitas inútiles.
4. **Service → Parts:** sin pieza no hay milagro de bahía.

## España — matices

- Entregas a menudo en **hubs**; el cliente puede desplazarse.
- Trámites (matriculación, ayudas tipo Moves, IVTM): el equipo **orienta**; la normativa la marca la administración — verificar año en curso.
- Retail y servicio suelen operar también **fines de semana** (negocio de atención al público).
- Lista viva de centros: [Find Us ES](https://www.tesla.com/es_ES/findus).

## Relación con otros módulos

| Módulo | Qué aporta |
|--------|------------|
| `04-como-opera.md` | Narrativa + Supercharger ops + retail vs legacy |
| `10-charging-europa.md` | Capas de carga EU/ES |
| `09-glosario.md` | Delivery Hub, Mobile Service, OTA… |

## Checklist

- [ ] Puedo contar las 6 etapas en orden.
- [ ] Sé qué ve el cliente vs qué hace el equipo en cada una.
- [ ] Distingo Mobile Service (técnico) de Mobile Connector (cable).
- [ ] No invento un organigrama de Tesla España.
