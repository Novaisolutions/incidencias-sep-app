# PowerShell script para iniciar el proyecto en Windows

Write-Host "🚀 Iniciando Sistema de Incidencias SEP..." -ForegroundColor Green
Write-Host ""

# Check if .env.local exists
if (-not (Test-Path ".env.local")) {
    Write-Host "📝 Creando archivo .env.local con valores de demo..." -ForegroundColor Yellow
    
    @"
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
"@ | Out-File -FilePath ".env.local" -Encoding UTF8
    
    Write-Host "✅ Archivo .env.local creado" -ForegroundColor Green
}

# Install dependencies if node_modules doesn't exist
if (-not (Test-Path "node_modules")) {
    Write-Host "📦 Instalando dependencias..." -ForegroundColor Yellow
    npm install
}

Write-Host "🔧 Iniciando servidor de desarrollo..." -ForegroundColor Cyan
Write-Host "🌐 Abre tu navegador en: http://localhost:3000" -ForegroundColor Cyan
Write-Host ""

npm run dev 