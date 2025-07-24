# 🚀 Instrucciones para Ejecutar el Proyecto

## 📋 Requisitos Previos
- Node.js 18+ instalado
- npm o yarn instalado

## 🔧 Pasos para Ejecutar

### 1. Navegar al Directorio
```bash
cd "incidencias-app"
```

### 2. Crear Archivo de Variables de Entorno
Crea un archivo `.env.local` en la raíz del proyecto con este contenido:

```env
# Supabase Configuration (Demo values)
NEXT_PUBLIC_SUPABASE_URL=https://demo.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=demo-anon-key
SUPABASE_SERVICE_ROLE_KEY=demo-service-role-key

# Google Gemini AI (Demo value)
GOOGLE_GEMINI_API_KEY=demo-gemini-key

# NextAuth.js
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=my-secret-key-123-for-development

# Optional: Email Service (Demo)
RESEND_API_KEY=demo-resend-key

# Optional: SMS Service (Demo)
TWILIO_SID=demo-twilio-sid
TWILIO_TOKEN=demo-twilio-token

# Optional: Storage (Demo)
CLOUDFLARE_R2_ACCESS_KEY=demo-r2-key
CLOUDFLARE_R2_SECRET=demo-r2-secret
```

### 3. Instalar Dependencias
```bash
npm install
```

### 4. Ejecutar el Proyecto
```bash
npm run dev
```

### 5. Abrir en el Navegador
Abre tu navegador y ve a: `http://localhost:3000`

## 🎯 Credenciales de Prueba

Para probar el sistema sin configurar Supabase, usa estas credenciales:

- **Email:** `demo@sep.gob.mx`
- **Contraseña:** `demo123`

## 🔍 Solución de Problemas

### Error: "Missing script: dev"
- Asegúrate de estar en el directorio `incidencias-app`
- Verifica que `package.json` existe y tiene el script "dev"

### Error: "Module not found"
- Ejecuta `npm install` para instalar dependencias
- Verifica que `node_modules` existe

### Error: "Port 3000 already in use"
- Cambia el puerto: `npm run dev -- -p 3001`
- O mata el proceso que usa el puerto 3000

### Error: "Environment variables not found"
- Verifica que `.env.local` existe en la raíz del proyecto
- Reinicia el servidor después de crear el archivo

## 📱 Funcionalidades Disponibles

- ✅ Página de inicio
- ✅ Sistema de autenticación
- ✅ Chat con IA (demo)
- ✅ Dashboard básico
- ✅ Gestión de incidencias
- ✅ Diseño responsive

## 🎨 Características del Diseño

- Glassmorphism/Neumorphism
- Animaciones con Framer Motion
- Tema personalizable
- Componentes reutilizables

## 🔗 Enlaces Útiles

- **Documentación:** `/docs/`
- **API Routes:** `/api/`
- **Componentes:** `/src/components/`
- **Páginas:** `/src/app/`

---

**¡El proyecto está listo para usar! 🎉** 