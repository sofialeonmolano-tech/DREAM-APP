# Spec: App de productividad multi-rol — Fase 1
Fecha: 13 de julio, 2026

## Overview
Web app de un solo usuario (Sofi) para registrar tareas clasificadas en tres pilares fijos — Universidad, Capacitación Tech, Emprendimiento — y ver en tiempo real el % de tiempo invertido en cada uno. Cuando Emprendimiento llega a 0% del tiempo registrado, la app dispara una alerta de "Pérdida de Tracción". El objetivo no es un to-do list: es una auditoría de balance que evita que el pilar sin deadlines externos se abandone.

## Usuarios objetivo
Sofi, con perfil multi-rol (universidad + capacitación tech + proyecto propio). Hoy usa listas de tareas genéricas que no distinguen entre pilares, así que no tiene visibilidad de cuánto tiempo real le dedica a cada uno — y el emprendimiento, al no tener deadlines externos, se aplaza sin que nada lo señale.

## Alcance

### La v1 SÍ hace
1. Registrar una tarea: título, pilar (Universidad / Capacitación Tech / Emprendimiento) y duración en minutos u horas.
2. Guardar las tareas de forma persistente (siguen ahí al cerrar y volver a abrir la app).
3. Mostrar una vista de balance con el % de tiempo invertido en cada uno de los tres pilares, calculado sobre el total de tiempo registrado.
4. Mostrar una alerta visible de "Pérdida de Tracción" cuando el pilar Emprendimiento llega a 0% del tiempo total registrado.

### La v1 NO hace
- Login ni cuentas de usuario (es de un solo usuario, sin registro).
- Pilares editables o personalizables (quedan fijos: Uni / Tech / Emprendimiento).
- Sistema de metas (vincular tareas a metas de corto/mediano/largo plazo).
- Clasificación de impacto (Alto/Medio/Bajo).
- Vista de bloques del día (Mañana/Tarde/Noche).
- Paleta de colores o diseño visual pulido — interfaz simple y funcional.
- App móvil instalable, notificaciones push, ni ningún tipo de gamificación.

## Comportamiento esperado
1. Sofi abre la web app y ve la vista de balance (puede estar vacía si no hay tareas todavía).
2. Sofi registra una tarea nueva: escribe el título, elige uno de los 3 pilares, e ingresa la duración.
3. Al guardar, la tarea aparece en una lista y el % de balance por pilar se recalcula al instante.
4. Sofi puede editar o eliminar una tarea ya registrada, y el balance se recalcula de inmediato.
5. Si el % de Emprendimiento llega a 0%, aparece un aviso claro y visible (tipo banner) de "Pérdida de Tracción" en la vista de balance, sin que Sofi tenga que buscarlo.
6. Al cerrar y volver a abrir la app, todas las tareas y el balance siguen exactamente igual.

## Errores y seguridad
- **Sin tareas registradas todavía:** la vista de balance muestra un estado vacío claro (ej. "Registra tu primera tarea para ver tu balance"), no un error ni una pantalla en blanco.
- **Duración inválida** (vacía, negativa o en cero): la app no guarda la tarea y le pide a Sofi corregir el dato antes de continuar.
- **Título vacío:** la app no permite guardar la tarea sin título.
- Al ser de un solo usuario sin login, no hay datos de terceros que proteger; los datos son locales a esta instancia de la app.

## Éxito
Sofi puede hacer una demo en vivo frente al evaluador: registra 2-3 tareas de distintos pilares, el % de balance cambia en tiempo real frente a sus ojos, y si deja a Emprendimiento en 0% la alerta de "Pérdida de Tracción" aparece sin que nadie la busque. Esa secuencia — registrar, ver el cambio, ver la alerta — es la prueba de que el diferenciador (auditoría de balance, no checklist) funciona.

## V2
- Sistema de metas (corto/mediano/largo plazo por pilar).
- Clasificación de impacto por tarea (Alto/Medio/Bajo).
- Vista de bloques del día (Mañana/Tarde/Noche) para planear y mover tareas.
- Paleta de colores e interfaz visual pulida.
- Pilares personalizables/editables por el usuario (pedido por los 2 usuarios validados, pero fuera del scope de 2 días).
