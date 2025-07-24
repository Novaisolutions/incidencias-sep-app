# 🚀 Despliegue en Netlify - Sistema de Incidencias SEP

## 📋 Información del Proyecto

- **Repositorio:** https://github.com/Novaisolutions/incidencias-sep-app
- **Framework:** Next.js 14 + TypeScript
- **Base de Datos:** Supabase (PostgreSQL)
- **IA:** Google Gemini 2.5 Flash
- **Estilos:** TailwindCSS + Glassmorphism/Neumorphism

## 🔧 Configuración para Netlify

### Variables de Entorno Requeridas

Configura estas variables en Netlify Dashboard > Site settings > Environment variables:

```bash
# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://nhxwyrkhsjybndwksmwi.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5oeHd5cmtoc2p5Ym5kd2tzbXdpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzcwNTQ5NjgsImV4cCI6MjA1MjYzMDk2OH0.xLCHdGFYdCYlh6Ye9p7UG1nP8XhUJFzV38RZDqpKH1k

# Google Gemini AI
NEXT_PUBLIC_GEMINI_API_KEY=tu_api_key_de_gemini

# Supabase Service Role (para operaciones admin)
SUPABASE_SERVICE_ROLE_KEY=tu_service_role_key
```

### Configuración de Build

- **Build command:** `npm run build`
- **Publish directory:** `.next`
- **Node version:** 18.x o superior

### Plugin Requerido

El proyecto incluye `@netlify/plugin-nextjs` en `netlify.toml` para compatibilidad total con Next.js.

## 🎯 Funcionalidades Principales

- ✅ **Autenticación** con Supabase Auth
- ✅ **Chat con IA** usando Google Gemini
- ✅ **Dashboard** con estadísticas y gráficos
- ✅ **Gestión de incidencias** con formularios
- ✅ **Diseño responsive** con glassmorphism
- ✅ **Multi-tenant** con RLS de Supabase

## 🔗 Enlaces Importantes

- **Repositorio:** https://github.com/Novaisolutions/incidencias-sep-app
- **Documentación:** Ver README.md principal
- **Supabase Dashboard:** https://app.supabase.com/project/nhxwyrkhsjybndwksmwi

## 🚨 Notas Importantes

1. **API Keys:** Asegúrate de configurar todas las variables de entorno en Netlify
2. **Base de Datos:** Las tablas deben estar creadas en Supabase con el sufijo `_sep`
3. **Dominio:** Considera configurar un dominio personalizado
4. **SSL:** Netlify proporciona SSL automático

## 📞 Soporte

Para problemas técnicos, revisa:
- Logs de build en Netlify Dashboard
- Console del navegador para errores frontend
- Supabase Dashboard para errores de base de datos 