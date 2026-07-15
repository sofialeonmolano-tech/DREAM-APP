# App de productividad para perfiles multi-rol (uni + tech + emprendimiento)

## Problema
Entregas urgentes de la universidad y de la capacitación tech absorben todo el tiempo. El emprendimiento no tiene deadlines externos que lo obliguen, así que se aplaza y termina abandonado.

Validado con 2 personas con perfil similar (uni + tech + proyecto propio): confirman el mismo problema. Ellos mismos mencionaron que sus roles varían, no son siempre los mismos 3.

## Contexto de la entrega
Este proyecto es una entrega de capacitación tech, con máximo 2 días de plazo. Se construye con Claude, sin equipo. Esto define el scope del MVP: hay que cortar features, no todo lo ideal cabe en el tiempo.

## Pilar central: los 3 roles
Toda tarea se clasifica en una de tres categorías:
- Universidad
- Capacitación Tech
- Emprendimiento

**Decisión de scope:** para el MVP los pilares quedan fijos (no editables por el usuario). La versión editable/configurable por roles personalizados queda como roadmap futuro, no se construye ahora — añadiría UI de configuración y lógica dinámica que no caben en 2 días.

## Sistema de metas y propósito
Ninguna tarea queda suelta. Cada tarea se conecta a una meta (corto, mediano o largo plazo) dentro de su pilar correspondiente.

## Medición de impacto y tiempo
- Cada actividad se clasifica por impacto: Alto, Medio, Bajo.
- Vista del día en bloques: Mañana, Tarde, Noche. Asignar o mover tareas entre bloques para chequear que el día sea realista en tiempo disponible.

## Diferenciador (no recortar esto)
El sistema no mide cuántas tareas se completaron, mide balance de energía entre pilares:
- Estadísticas visuales del % de tiempo invertido en cada pilar.
- Alerta preventiva de "Pérdida de Tracción" cuando el pilar de Emprendimiento llega a 0%.

Este es el argumento central frente al evaluador: no es un to-do list más, es una auditoría de balance.

## Interfaz
Llamativa, con colores específicos — pendiente de definir la paleta exacta antes de construir. Prioridad: no sacrificar el diferenciador (auditoría/alertas) por pulir el diseño visual si el tiempo aprieta.

## Riesgos identificados
1. **Validación limitada:** n=2, señal de dirección pero no de mercado.
2. **Scope vs. tiempo:** con 2 días, hacer las 4 piezas (pilares, metas, impacto, bloques, estadísticas, alertas) con buen pulido visual a la vez es el riesgo más grande. Prioridad si hay que cortar: lógica y diferenciador por encima de estética.
3. **Fijo vs. editable:** los usuarios ya pidieron flexibilidad de roles. Si se ignora por completo en el roadmap, el problema real (que varía por persona) queda sin resolver a futuro.

## Siguiente paso
Definir estructura de pantallas y flujo de usuario, luego construir el MVP con pilares fijos + sistema de metas + bloques de día + estadísticas de balance/alerta de tracción.
