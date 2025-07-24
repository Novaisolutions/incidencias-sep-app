#!/bin/bash

echo "🚀 Iniciando Sistema de Incidencias SEP..."
echo ""

# Check if .env.local exists
if [ ! -f .env.local ]; then
    echo "📝 Creando archivo .env.local con valores de demo..."
    cat > .env.local << EOF
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
EOF
    echo "✅ Archivo .env.local creado"
fi

# Install dependencies if node_modules doesn't exist
if [ ! -d "node_modules" ]; then
    echo "📦 Instalando dependencias..."
    npm install
fi

echo "🔧 Iniciando servidor de desarrollo..."
echo "🌐 Abre tu navegador en: http://localhost:3000"
echo ""

npm run dev 