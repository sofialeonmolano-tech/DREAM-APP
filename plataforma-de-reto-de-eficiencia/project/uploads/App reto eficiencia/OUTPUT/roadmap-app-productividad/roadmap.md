# Roadmap: App de productividad multi-rol (Uni + Tech + Emprendimiento)
Fecha: 13 de julio, 2026

## La idea en una frase
App que clasifica cada tarea en uno de tres pilares fijos (Universidad, Capacitación Tech, Emprendimiento) y audita el balance de energía entre ellos, para que el pilar sin deadlines externos (Emprendimiento) no se abandone.

## La acción core
Registrar una tarea, clasificarla en su pilar, y ver de inmediato cómo eso mueve el balance de tiempo entre los tres pilares. Sin este loop no hay diferenciador: es la auditoría, no el checklist, lo que vende la idea.

## Fase 1 — Lanzamiento
| # | Feature | Por qué va primero | Depende de |
|---|---------|--------------------|------------|
| 1 | Registro de tarea con pilar fijo (Uni / Tech / Emprendimiento) | Sin esto no hay datos que auditar. Es el input mínimo de todo el sistema. | — |
| 2 | Registro de duración/tiempo por tarea | El balance se mide en tiempo invertido, no en cantidad de tareas. Sin duración, el % por pilar no se puede calcular. | #1 |
| 3 | Vista de balance: % de tiempo invertido por pilar | Es el diferenciador explícito frente a un to-do list: "no mide cuántas tareas, mide balance de energía". | #1, #2 |
| 4 | Alerta de "Pérdida de Tracción" cuando Emprendimiento llega a 0% | Es la pieza que convierte el dato en acción — el argumento central frente al evaluador. | #3 |

Con estas 4 piezas ya existe el producto completo: se registra, se audita, se alerta. Cualquier feature adicional en esta fase retrasa la fecha en que alguien lo usa de verdad.

## Fase 2 — Mejora
1. **Sistema de metas** — vincular cada tarea a una meta de corto, mediano o largo plazo dentro de su pilar. Añade el "para qué" a la tarea, pero el balance ya funciona sin esto en Fase 1.
2. **Clasificación de impacto** (Alto / Medio / Bajo) por tarea. Enriquece el análisis de balance más allá del tiempo, pero no es indispensable para la primera versión funcional.
3. **Vista de bloques del día** (Mañana / Tarde / Noche) para asignar y mover tareas y chequear que el día sea realista. Útil para planeación, pero secundario a la auditoría de balance que ya corre en Fase 1.
4. **Paleta de colores e interfaz pulida.** El doc de contexto ya advierte: no sacrificar el diferenciador por estética si el tiempo aprieta. Se define y aplica una vez el motor de balance funciona.

## Backlog
- **Pilares personalizables/editables por el usuario.** Los 2 usuarios validados ya pidieron esta flexibilidad — es un riesgo real dejarlo fuera del roadmap por completo, pero añade UI de configuración y lógica dinámica que no caben en el MVP de 2 días. Queda como la evolución natural después de Fase 2.
- Estadísticas visuales más avanzadas (gráficas de tendencia, comparativas históricas entre semanas).
- Cualquier forma de gamificación (rachas, puntos, insignias) — es feature de vanidad: no acerca al usuario a registrar y auditar, solo decora.
- Notificaciones push / recordatorios automáticos — depende de tener datos de uso real de Fase 1 y 2 antes de decidir si aportan.

## Siguiente paso
Convertir la Fase 1 en spec con /crear-specs, usando este roadmap como contexto.
