# Aints&dream — Reto de Eficiencia

App de productividad multi-rol: define tus propios roles, registra tareas con impacto, audita tu balance de tiempo entre roles y recibe una recomendación de IA sobre a cuál dedicarle más atención.

Ver el diseño original y los specs en [`plataforma-de-reto-de-eficiencia/`](plataforma-de-reto-de-eficiencia) y [`OUTPUT/roadmap-app-productividad/`](OUTPUT/roadmap-app-productividad).

## Stack

- **Next.js** (App Router) + TypeScript
- **Supabase**: Auth (email/contraseña) + Postgres con RLS por usuario
- **OpenAI** para la recomendación de IA (llamada server-side, la API key nunca se expone al frontend)
- **Vercel** para el despliegue

## Desarrollo local

1. Copia `.env.example` a `.env.local` y completa `OPENAI_API_KEY` (las claves de Supabase ya vienen listas para este proyecto).
2. Instala dependencias e inicia el servidor:

```bash
npm install
npm run dev
```

3. Abre [http://localhost:3000](http://localhost:3000).

## Variables de entorno

| Variable | Dónde se usa | Dónde conseguirla |
|---|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | cliente y servidor | Supabase → Project Settings → API |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | cliente y servidor | Supabase → Project Settings → API (publishable key) |
| `OPENAI_API_KEY` | solo servidor (`/api/recommendation`) | platform.openai.com → API keys |

## Desplegar en Vercel

1. Conecta el repo de GitHub en [vercel.com/new](https://vercel.com/new).
2. En **Project Settings → Environment Variables**, agrega las tres variables de la tabla de arriba (mismos valores que en `.env.local`, o rota las keys si prefieres unas distintas para producción).
3. Vercel detecta Next.js automáticamente — no hace falta configuración adicional de build.

## Base de datos

El esquema vive en Supabase (tablas `roles`, `goals`, `tasks`, todas con Row Level Security: cada usuario solo ve y modifica sus propios datos). Los cambios de esquema se aplican como migraciones desde el MCP de Supabase — no hay carpeta local de migraciones en este repo.
