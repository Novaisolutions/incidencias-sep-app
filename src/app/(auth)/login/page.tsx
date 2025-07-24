'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { supabase } from '@/lib/supabase'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      if (error) throw error

      router.push('/dashboard')
    } catch (error: any) {
      setError(error.message || 'Error al iniciar sesión')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-sep-red via-white to-sep-green flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo SEP */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-sep-red rounded-lg flex items-center justify-center mx-auto mb-4">
            <span className="text-white font-bold text-2xl">SEP</span>
          </div>
          <h1 className="text-2xl font-bold text-gray-900">Sistema de Incidencias</h1>
          <p className="text-gray-600">Secretaría de Educación Pública</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Iniciar Sesión</CardTitle>
            <CardDescription>
              Accede a tu cuenta para gestionar incidencias escolares
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              {error && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
                  {error}
                </div>
              )}

              <div className="space-y-2">
                <Label htmlFor="email">Correo Electrónico</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="usuario@sep.gob.mx"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Contraseña</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    required
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-2 top-1/2 -translate-y-1/2 h-auto p-1"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? 'Ocultar' : 'Mostrar'}
                  </Button>
                </div>
              </div>

              <Button
                type="submit"
                className="w-full bg-sep-red hover:bg-sep-red/90"
                loading={loading}
              >
                {loading ? 'Iniciando sesión...' : 'Iniciar Sesión'}
              </Button>
            </form>

            <div className="mt-6 text-center space-y-4">
              <div className="text-sm">
                <Link href="/forgot-password" className="text-sep-red hover:underline">
                  ¿Olvidaste tu contraseña?
                </Link>
              </div>
              
              <div className="text-sm text-gray-600">
                ¿No tienes cuenta?{' '}
                <Link href="/register" className="text-sep-red hover:underline font-medium">
                  Regístrate aquí
                </Link>
              </div>
            </div>

            {/* Demo credentials */}
            <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
              <h4 className="text-sm font-medium text-blue-900 mb-2">Credenciales de prueba:</h4>
              <div className="text-xs text-blue-700 space-y-1">
                <div>Email: demo@sep.gob.mx</div>
                <div>Contraseña: demo123</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="mt-8 text-center">
          <Link href="/" className="text-sm text-gray-600 hover:text-gray-900">
            ← Volver al inicio
          </Link>
        </div>
      </div>
    </div>
  )
} 