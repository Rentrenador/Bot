---
id: como-opera
title: Cómo opera Tesla (journey + ops)
order: 4
tags: [panorama, ops, journey, servicio]
lang: es
updated: 2026-09-04
path: primary
---

# Cómo opera Tesla — del pedido al día a día

Este módulo explica **ops visibles al cliente** en un mercado de venta directa (España / Europa). No es un manual interno de procedimientos.

---

## Journey del cliente (vista simple)

```
Interés → Prueba / educación en store o web
       → Configuración y pedido online
       → Producción / asignación / transporte
       → Cita de entrega (Delivery Hub)
       → Onboarding (app, carga, funciones)
       → Uso (Supercharger, OTA, app)
       → Servicio (taller o Mobile Service)
```

### 1. Descubrimiento y venta

- Tiendas (“Galleries” / Stores): tocar producto, resolver dudas, a veces demos.  
- Web: configurador, financiación (según partners locales), pedido.  
- El asesor educa sobre autonomía realista, carga en casa vs Supercharger, asistencia, plazos.

**Ops detrás:** inventario regional, prioridades de demos, calidad de la información (evitar promesas imposibles).

### 2. Pedido → entrega

- El coche puede venir de fábrica europea (p. ej. Model Y Berlin) u otras fuentes según modelo y stock.  
- Logística, inspección pre-entrega, preparación estética/técnica.  
- Día de entrega: documentación, walkthrough, emparejar app, primera carga.

**Ops detrás:** scheduling, calidad (defectos cosméticos), handoff limpio Sales ↔ Delivery, gestión de retrasos.

### 3. Vida del vehículo

- **Carga en destino** (wall connector / red doméstica) + **Supercharger** en viaje.  
- Actualizaciones OTA cambian la experiencia sin visita física.  
- Seguro, financiación residual, trade-in: varían por país y partners.

### 4. Servicio

- Cita en Service Center.  
- **Mobile Service** para ciertos trabajos.  
- Piezas, diagnóstico, posibles loaners según política y disponibilidad.

**Ops detrás:** capacidad de bahías, técnicos, piezas, priorización de seguridad vs comodidad.

---

## Supercharger — ops de red

La red Supercharger es parte del **producto** y de la **experiencia de marca**:

- Ubicación, potencia, fiabilidad, colas, plazas para terceros (según política).  
- En Europa la red es densa en corredores principales; la percepción de “viaje largo fácil” es un activo competitivo.

No memorices un número de stalls en España: usa el mapa oficial.

---

## Qué significa “ops” en el día a día

| Tema | Ejemplo concreto |
|------|------------------|
| Flujo | Que el coche correcto esté listo a la hora correcta |
| Calidad | Checklist pre-entrega; no entregar con fallo de seguridad |
| Comunicación | Avisar retrasos; no inventar fechas |
| Capacidad | Fines de semana y picos de entregas / servicio |
| Handoffs | Sales no “abandona” al cliente en Delivery; Service cierra el loop |
| Seguridad | Priorizar riesgo real sobre velocidad cosmética |

> 💡 Si la app tiene tono “divertido”, el humor puede ir sobre **colas, OTAs y “¿dónde cargo?”** — nunca sobre saltarse seguridad.

---

## Retail Tesla vs concesionario legacy (idea clave)

| Legacy típico | Tesla (mercados directos) |
|---------------|---------------------------|
| Dealer independiente negocia stock/márgenes | Precio más transparente online; tienda es canal de marca |
| Servicio a menudo en red de dealers | Service Centers propios + mobile |
| Incentivos de vendedor variables | Cultura orientada a educación / experiencia (en teoría pública) |

Hay matices por país; la idea es el **control de extremo a extremo** de la experiencia.

---

## España — matices prácticos

- Entregas pueden concentrarse en **hubs**; el cliente a veces se desplaza.  
- Incentivos (Moves, IVTM, etc.) y trámites de matriculación **no los inventa Tesla**: el equipo ayuda/orienta según el momento regulatorio.  
- Horarios retail suelen incluir **fines de semana** — es negocio de atención al público.

> ⚠️ Procesos exactos de trámites 2026: verificar con la web/app y con el equipo local; cambian con normativa.

---

---

## Tarjeta UI — flujo día a día

Para la card parseable **venta → pedido → preparación → entrega → servicio** (JSON `ops_flow`), ver el módulo dedicado:

→ **`11-ops-dia-a-dia.md`** (`ui_features: ops_flow_card`)

Este archivo 04 sigue siendo la narrativa + Supercharger ops + retail vs legacy.

## Checklist

- [ ] Puedo narrar compra → entrega → servicio en orden.  
- [ ] Sé qué es un Delivery Hub vs Service Center.  
- [ ] Entiendo Supercharger como pieza de ops + producto.  
- [ ] Relaciono “ops” con flujo, calidad y handoffs — no solo con “jefes”.
