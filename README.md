# 🏫 Sistema de Incidencias SEP

Sistema multi-tenant para gestión de incidencias escolares con IA conversacional usando Google Gemini 2.5 Flash.

## 🚀 Estado del Proyecto

### ✅ **COMPLETADO - LISTO PARA USAR**

- ✅ **Frontend:** Next.js 14 + TypeScript + TailwindCSS
- ✅ **Backend:** Supabase (PostgreSQL + Auth + Storage)
- ✅ **IA:** Google Gemini 2.5 Flash integrado
- ✅ **Autenticación:** Sistema completo de login/registro
- ✅ **Chat:** Interfaz conversacional con IA
- ✅ **Dashboard:** Panel de control con estadísticas
- ✅ **Incidencias:** Gestión completa de casos
- ✅ **Diseño:** Glassmorphism/Neumorphism
- ✅ **Responsive:** Funciona en móvil y desktop

## ⚡ Inicio Rápido

### 1. Navegar al proyecto
```bash
cd incidencias-app
```

### 2. Crear variables de entorno
```bash
# En macOS/Linux:
./start-dev.sh

# En Windows (PowerShell):
.\start-dev.ps1

# O manualmente:
cp env.example .env.local
```

### 3. Ejecutar
```bash
npm run dev
```

### 4. Abrir en navegador
```
http://localhost:3000
```

## 🔑 Credenciales Demo
- **Email:** `demo@sep.gob.mx`
- **Contraseña:** `demo123`

## 📋 Funcionalidades

### 🎯 **Usuarios**
- **Docente:** Documenta incidencias propias
- **Administrador:** Vista institucional completa
- **Supervisor:** Gestión regional múltiples escuelas

### 🤖 **IA Conversacional**
- Google Gemini 2.5 Flash como IA principal
- Análisis automático de urgencia
- Clasificación inteligente de incidentes
- Generación de expedientes automática

### 📊 **Dashboard**
- Estadísticas en tiempo real
- Gráficos interactivos
- Alertas automáticas
- Reportes ejecutivos

### 🔒 **Seguridad**
- Multi-tenant con RLS
- Autenticación JWT
- Encriptación de datos sensibles
- Cumplimiento normativo

## 🛠️ Stack Tecnológico

### Frontend
- **Next.js 14** - Framework React
- **TypeScript** - Tipado estático
- **TailwindCSS** - Estilos utilitarios
- **Framer Motion** - Animaciones
- **Radix UI** - Componentes accesibles

### Backend
- **Supabase** - Backend as a Service
- **PostgreSQL** - Base de datos
- **Row Level Security** - Multi-tenancy
- **Edge Functions** - Lógica de servidor

### IA & Automatización
- **Google Gemini 2.5 Flash** - IA principal
- **Claude Sonnet 4** - Backup
- **n8n** - Workflows automáticos

### Deployment
- **Vercel** - Frontend hosting
- **Supabase Cloud** - Backend hosting
- **Cloudflare R2** - Storage

## 📁 Estructura del Proyecto

```
incidencias-app/
├── src/
│   ├── app/                 # Páginas Next.js 14
│   │   ├── (auth)/         # Páginas de autenticación
│   │   ├── chat/           # Interfaz de chat
│   │   ├── dashboard/      # Panel de control
│   │   ├── incidents/      # Gestión de incidencias
│   │   └── api/            # Rutas API
│   ├── components/         # Componentes React
│   │   ├── ui/            # Componentes base
│   │   ├── chat/          # Componentes de chat
│   │   └── dashboard/     # Componentes de dashboard
│   ├── lib/               # Utilidades y configuraciones
│   ├── types/             # Definiciones TypeScript
│   └── hooks/             # Custom hooks
├── docs/                  # Documentación
├── workflows/             # Flujos n8n
└── public/               # Archivos estáticos
```

## 🎨 Sistema de Diseño

### Glassmorphism
- Efectos de cristal translúcido
- Blur y transparencias
- Bordes suaves

### Neumorphism
- Efectos 3D suaves
- Sombras internas/externas
- Interacciones táctiles

### Paleta de Colores
- **Primario:** Azul SEP (#0ea5e9)
- **Secundario:** Gris neutro
- **Acento:** Verde éxito, Rojo error

## 📊 Métricas Clave

- ⏱️ **Tiempo de documentación:** <3 min
- 🎯 **Precisión IA:** >95%
- 📱 **Disponibilidad:** >99.5%
- 😊 **Satisfacción usuario:** >90%

## 🔧 Configuración de Desarrollo

### Variables de Entorno
```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=your-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-key
SUPABASE_SERVICE_ROLE_KEY=your-service-key

# Google Gemini
GOOGLE_GEMINI_API_KEY=your-gemini-key

# NextAuth
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-secret
```

### Scripts Disponibles
```bash
npm run dev          # Desarrollo
npm run build        # Producción
npm run start        # Servidor producción
npm run lint         # Linting
npm run type-check   # Verificación tipos
```

## 📚 Documentación

- [📋 Arquitectura](./docs/arquitectura.md)
- [📅 Plan de Implementación](./docs/plan-implementacion.md)
- [⚙️ Configuración Técnica](./docs/configuracion-tecnica.md)
- [🤖 Sistema de IA](./docs/sistema-ia.md)
- [🔄 Workflows n8n](./workflows/WORKFLOWS_AUTOMATIZACION_SEP.md)

## 🚀 Deployment

### Frontend (Vercel)
```bash
npm run build
vercel --prod
```

### Backend (Supabase)
```bash
supabase db push
supabase functions deploy
```

## 🤝 Contribución

1. Fork el proyecto
2. Crea una rama feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Ver `LICENSE` para más detalles.

## 📞 Soporte

- 📧 Email: soporte@sep.gob.mx
- 📱 WhatsApp: +52 55 1234 5678
- 🌐 Web: https://incidencias.sep.gob.mx

---

**¡Sistema listo para proteger a nuestros estudiantes! 🎓🛡️** 