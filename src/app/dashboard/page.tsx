'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { getCurrentProfile, signOut } from '@/lib/supabase'

export default function DashboardPage() {
  const [userProfile, setUserProfile] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadUserProfile()
  }, [])

  const loadUserProfile = async () => {
    try {
      const profile = await getCurrentProfile()
      setUserProfile(profile)
    } catch (error) {
      console.error('Error loading profile:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleLogout = async () => {
    await signOut()
    window.location.href = '/'
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-10 h-10 bg-sep-red rounded-lg flex items-center justify-center mx-auto mb-4">
            <span className="text-white font-bold text-lg">SEP</span>
          </div>
          <p>Cargando dashboard...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-4 py-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <div className="w-10 h-10 bg-sep-red rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">SEP</span>
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">Dashboard de Incidencias</h1>
              {userProfile && (
                <p className="text-sm text-gray-600">
                  Bienvenido, {userProfile.full_name} • {userProfile.role}
                </p>
              )}
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <Link href="/chat">
              <Button variant="outline">Asistente IA</Button>
            </Link>
            <Button variant="outline" onClick={handleLogout}>
              Cerrar Sesión
            </Button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* Welcome Section */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Panel de Control de Incidencias
          </h2>
          <p className="text-gray-600">
            Gestiona y da seguimiento a las incidencias de tu institución educativa
          </p>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Link href="/incidents/new">
            <Card className="hover:shadow-md transition-shadow cursor-pointer">
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-sep-red rounded-lg flex items-center justify-center mx-auto mb-3">
                  <span className="text-white font-bold">+</span>
                </div>
                <h3 className="font-medium">Nueva Incidencia</h3>
                <p className="text-sm text-gray-600">Reportar un nuevo caso</p>
              </CardContent>
            </Card>
          </Link>

          <Link href="/chat">
            <Card className="hover:shadow-md transition-shadow cursor-pointer">
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-sep-green rounded-lg flex items-center justify-center mx-auto mb-3">
                  <span className="text-white font-bold">AI</span>
                </div>
                <h3 className="font-medium">Asistente IA</h3>
                <p className="text-sm text-gray-600">Obtener ayuda inteligente</p>
              </CardContent>
            </Card>
          </Link>

          <Link href="/incidents">
            <Card className="hover:shadow-md transition-shadow cursor-pointer">
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-sep-gold rounded-lg flex items-center justify-center mx-auto mb-3">
                  <span className="text-white font-bold">📋</span>
                </div>
                <h3 className="font-medium">Mis Incidencias</h3>
                <p className="text-sm text-gray-600">Ver casos reportados</p>
              </CardContent>
            </Card>
          </Link>

          <Link href="/reports">
            <Card className="hover:shadow-md transition-shadow cursor-pointer">
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <span className="text-white font-bold">📊</span>
                </div>
                <h3 className="font-medium">Reportes</h3>
                <p className="text-sm text-gray-600">Estadísticas y análisis</p>
              </CardContent>
            </Card>
          </Link>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Incidencias Activas</CardTitle>
              <CardDescription>Casos pendientes de resolución</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-sep-red mb-2">12</div>
              <p className="text-sm text-gray-600">
                <span className="text-green-600">↓ 2</span> desde la semana pasada
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Casos Resueltos</CardTitle>
              <CardDescription>Este mes</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-sep-green mb-2">45</div>
              <p className="text-sm text-gray-600">
                <span className="text-green-600">↑ 8</span> desde el mes pasado
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Tiempo Promedio</CardTitle>
              <CardDescription>Resolución de casos</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-sep-gold mb-2">2.3</div>
              <p className="text-sm text-gray-600">días promedio</p>
            </CardContent>
          </Card>
        </div>

        {/* Recent Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Incidencias Recientes</CardTitle>
              <CardDescription>Últimos casos reportados</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[1, 2, 3].map((item) => (
                  <div key={item} className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
                    <div className="w-2 h-2 bg-yellow-500 rounded-full mt-2"></div>
                    <div className="flex-1">
                      <h4 className="font-medium text-sm">Incidencia en patio escolar</h4>
                      <p className="text-xs text-gray-600">Estudiante se lastimó durante el recreo</p>
                      <p className="text-xs text-gray-500 mt-1">Hace 2 horas</p>
                    </div>
                    <span className="text-xs px-2 py-1 bg-yellow-100 text-yellow-800 rounded-full">
                      Pendiente
                    </span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Notificaciones</CardTitle>
              <CardDescription>Alertas y recordatorios</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-start space-x-3 p-3 bg-blue-50 rounded-lg">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                  <div className="flex-1">
                    <h4 className="font-medium text-sm">Recordatorio de seguimiento</h4>
                    <p className="text-xs text-gray-600">
                      Caso #2024-001 requiere actualización de estatus
                    </p>
                    <p className="text-xs text-gray-500 mt-1">Vence hoy</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3 p-3 bg-green-50 rounded-lg">
                  <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                  <div className="flex-1">
                    <h4 className="font-medium text-sm">Caso resuelto exitosamente</h4>
                    <p className="text-xs text-gray-600">
                      Incidencia de infraestructura ha sido solucionada
                    </p>
                    <p className="text-xs text-gray-500 mt-1">Hace 1 día</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3 p-3 bg-yellow-50 rounded-lg">
                  <div className="w-2 h-2 bg-yellow-500 rounded-full mt-2"></div>
                  <div className="flex-1">
                    <h4 className="font-medium text-sm">Actualización del sistema</h4>
                    <p className="text-xs text-gray-600">
                      Nueva funcionalidad de reportes automáticos disponible
                    </p>
                    <p className="text-xs text-gray-500 mt-1">Hace 3 días</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
} 