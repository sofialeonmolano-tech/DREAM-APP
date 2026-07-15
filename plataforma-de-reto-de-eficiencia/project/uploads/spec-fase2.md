# Spec: App de productividad multi-rol — Fase 2 (revisado para MVP Challenge Next/Makers)
Fecha: 13 de julio, 2026

## Overview
Sobre la base de la Fase 1 (autenticación, tareas por pilar, balance y alerta de tracción), la Fase 2 se reenfoca para el reto de 48h: roles totalmente editables por el usuario (en vez de los 3 fijos hardcodeados) y una recomendación real de IA que analiza las métricas de tiempo e impacto por rol y sugiere a cuál dedicarle más atención. Metas se conserva; bloques del día y colores por pilar se cortan para enfocar el tiempo de construcción en lo que sí resuelve el reto.

## Usuarios objetivo
Los mismos de Fase 1 (perfil multi-rol: universidad + capacitación tech + proyecto propio), ahora incluyendo explícitamente a cualquier persona con sus propios roles distintos a Uni/Tech/Emprendimiento — el problema real que los 2 usuarios validados ya habían señalado.

## Alcance

### La v2 SÍ hace
1. **Roles editables:** el usuario puede crear, renombrar y eliminar sus propios roles libremente, en vez de los 3 pilares fijos. Esta capa se construye en Fase 2, sin reabrir ni reescribir Spec 1.
2. **Recomendación de IA:** botón "Generar recomendación" en una sección dedicada. Toma el tiempo y el impacto de las tareas por rol y devuelve una recomendación en texto de a qué rol dedicarle más atención esta semana.
3. **Sistema de metas** (heredado del spec anterior, sin cambios): el usuario crea metas manuales por rol (nombre + plazo corto/mediano/largo) y puede vincular tareas a ellas de forma opcional.
4. **Clasificación de impacto** (Alto/Medio/Bajo) por tarea: deja de ser solo informativa — ahora también alimenta la recomendación de IA, que pondera por impacto además de por tiempo.

### La v2 NO hace
- Vista de bloques del día (Mañana/Tarde/Noche) — cortada, no aporta al reto.
- Colores distintivos por rol en la interfaz — cortado, es estética pura.
- Historial de recomendaciones de IA pasadas — solo se ve la última generada.
- Recordatorios o notificaciones automáticas.
- Roles o metas compartidos entre usuarios.
- Login social o recuperación de contraseña (sigue fuera, heredado de Fase 1).

## Comportamiento esperado
1. El usuario, con sesión iniciada, entra a una sección de "Roles" y puede crear un rol nuevo, renombrar uno existente, o eliminar uno.
2. Al registrar una tarea, elige entre los roles que él mismo definió (ya no hay una lista fija de 3).
3. Al registrar o editar una tarea, además de título, pilar y duración, el usuario le asigna un nivel de impacto (Alto/Medio/Bajo) y, opcionalmente, la vincula a una meta existente de ese rol.
4. La vista de balance calcula el % de tiempo por rol, igual que en Fase 1.
5. El usuario entra a la sección dedicada "Recomendación IA" y presiona "Generar recomendación". La app envía el tiempo e impacto acumulado por rol a un servicio de IA y muestra en pantalla una recomendación en texto (ej. "Tu rol de Emprendimiento lleva días sin tareas de alto impacto — dedícale tiempo esta semana").
6. El usuario puede volver a generar la recomendación cuando quiera; solo se muestra la más reciente.

## Errores y seguridad
- **Eliminar un rol con tareas asociadas:** la app avisa cuántas tareas quedarían afectadas y pide confirmar. Al confirmar, esas tareas quedan archivadas como "sin rol" (no se borran, pero salen del cálculo de balance).
- **No se puede eliminar el último rol restante** — siempre debe existir al menos uno para poder registrar tareas.
- **Rol sin nombre o nombre duplicado:** no se permite guardar.
- **Generar recomendación sin tareas registradas:** mensaje claro pidiendo registrar tareas primero — no se llama a la IA en vacío (evita gastar créditos sin motivo).
- **Falla la llamada a la IA** (error de red o de la API): mensaje de error claro, el resto de la app sigue funcionando normal, y el usuario puede reintentar.
- La API key de OpenAI nunca se expone en el frontend ni se sube al repositorio — vive como variable de entorno del lado del servidor.
- Roles, metas y tareas quedan asociados al usuario dueño de la sesión; nadie ve ni edita los de otro usuario.

## Éxito
El usuario puede crear/renombrar/eliminar sus propios roles desde la interfaz, registrar tareas con impacto bajo esos roles, y obtener una recomendación de IA coherente con su tiempo e impacto reales — sin tocar código ni configuración técnica. (Los criterios específicos para el video del reto se definen aparte, en el guion.)

## V2 (para después de esta fase)
- Historial de recomendaciones de IA pasadas.
- Colores distintivos por rol.
- Vista de bloques del día.
- Notificaciones automáticas de metas o roles desatendidos.
- Roles o metas compartidos entre usuarios.
