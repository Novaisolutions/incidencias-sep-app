'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { getCurrentProfile, signOut } from '@/lib/supabase'

interface IncidentForm {
  title: string
  description: string
  type: 'academic' | 'disciplinary' | 'infrastructure' | 'administrative' | 'security' | ''
  priority: 'low' | 'medium' | 'high' | ''
  studentName: string
  studentGrade: string
  studentGroup: string
  location: string
  witnesses: string
  immediateActions: string
}

export default function NewIncidentPage() {
  const [userProfile, setUserProfile] = useState<any>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)
  const router = useRouter()
  
  const [formData, setFormData] = useState<IncidentForm>({
    title: '',
    description: '',
    type: '',
    priority: '',
    studentName: '',
    studentGrade: '',
    studentGroup: '',
    location: '',
    witnesses: '',
    immediateActions: ''
  })

  useEffect(() => {
    getCurrentProfile().then(profile => {
      setUserProfile(profile)
    })
  }, [])

  const updateFormData = (field: keyof IncidentForm, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const validateForm = () => {
    if (!formData.title.trim()) {
      setError('El título es requerido')
      return false
    }
    if (!formData.description.trim()) {
      setError('La descripción es requerida')
      return false
    }
    if (!formData.type) {
      setError('El tipo de incidencia es requerido')
      return false
    }
    if (!formData.priority) {
      setError('La prioridad es requerida')
      return false
    }
    if (!formData.location.trim()) {
      setError('La ubicación es requerida')
      return false
    }
    return true
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    if (!validateForm()) {
      setLoading(false)
      return
    }

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      // Here you would normally save to database
      console.log('Incident data:', formData)
      
      setSuccess(true)
      setTimeout(() => {
        router.push('/incidents')
      }, 2000)
      
    } catch (error: any) {
      setError('Error al crear la incidencia. Por favor intenta nuevamente.')
    } finally {
      setLoading(false)
    }
  }

  const handleLogout = async () => {
    await signOut()
    window.location.href = '/'
  }

  if (success) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardContent className="p-6 text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-green-600 text-2xl">✓</span>
            </div>
            <h2 className="text-xl font-bold text-gray-900 mb-2">¡Incidencia Creada!</h2>
            <p className="text-gray-600 mb-4">
              La incidencia ha sido registrada exitosamente y se ha notificado a las autoridades correspondientes.
            </p>
            <p className="text-sm text-gray-500">Redirigiendo...</p>
          </CardContent>
        </Card>
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
              <h1 className="text-xl font-bold text-gray-900">Nueva Incidencia</h1>
              {userProfile && (
                <p className="text-sm text-gray-600">
                  {userProfile.full_name} • {userProfile.role}
                </p>
              )}
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <Link href="/incidents">
              <Button variant="outline">← Volver</Button>
            </Link>
            <Button variant="outline" onClick={handleLogout}>
              Cerrar Sesión
            </Button>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 py-6">
        <Card>
          <CardHeader>
            <CardTitle>Reportar Nueva Incidencia</CardTitle>
            <CardDescription>
              Completa los siguientes campos para registrar una nueva incidencia escolar
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {error && (
                <Alert variant="destructive">
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              {/* Basic Information */}
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Información Básica</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="title">Título de la Incidencia *</Label>
                    <Input
                      id="title"
                      value={formData.title}
                      onChange={(e) => updateFormData('title', e.target.value)}
                      placeholder="Breve descripción del incidente"
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="location">Ubicación *</Label>
                    <Input
                      id="location"
                      value={formData.location}
                      onChange={(e) => updateFormData('location', e.target.value)}
                      placeholder="Salón, patio, laboratorio, etc."
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Descripción Detallada *</Label>
                  <textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => updateFormData('description', e.target.value)}
                    placeholder="Describe lo que sucedió, cuándo y cómo..."
                    className="w-full min-h-[120px] rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                    required
                  />
                </div>
              </div>

              {/* Classification */}
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Clasificación</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="type">Tipo de Incidencia *</Label>
                    <select
                      id="type"
                      value={formData.type}
                      onChange={(e) => updateFormData('type', e.target.value)}
                      className="w-full h-10 rounded-md border border-input bg-background px-3 py-2 text-sm"
                      required
                    >
                      <option value="">Selecciona un tipo</option>
                      <option value="academic">Académica</option>
                      <option value="disciplinary">Disciplinaria</option>
                      <option value="infrastructure">Infraestructura</option>
                      <option value="administrative">Administrativa</option>
                      <option value="security">Seguridad</option>
                    </select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="priority">Prioridad *</Label>
                    <select
                      id="priority"
                      value={formData.priority}
                      onChange={(e) => updateFormData('priority', e.target.value)}
                      className="w-full h-10 rounded-md border border-input bg-background px-3 py-2 text-sm"
                      required
                    >
                      <option value="">Selecciona prioridad</option>
                      <option value="low">Baja</option>
                      <option value="medium">Media</option>
                      <option value="high">Alta</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Student Information */}
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Información del Estudiante (si aplica)</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="studentName">Nombre del Estudiante</Label>
                    <Input
                      id="studentName"
                      value={formData.studentName}
                      onChange={(e) => updateFormData('studentName', e.target.value)}
                      placeholder="Nombre completo"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="studentGrade">Grado</Label>
                    <Input
                      id="studentGrade"
                      value={formData.studentGrade}
                      onChange={(e) => updateFormData('studentGrade', e.target.value)}
                      placeholder="1°, 2°, 3°..."
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="studentGroup">Grupo</Label>
                    <Input
                      id="studentGroup"
                      value={formData.studentGroup}
                      onChange={(e) => updateFormData('studentGroup', e.target.value)}
                      placeholder="A, B, C..."
                    />
                  </div>
                </div>
              </div>

              {/* Additional Details */}
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Detalles Adicionales</h3>
                
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="witnesses">Testigos</Label>
                    <Input
                      id="witnesses"
                      value={formData.witnesses}
                      onChange={(e) => updateFormData('witnesses', e.target.value)}
                      placeholder="Nombres de personas que presenciaron el incidente"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="immediateActions">Acciones Inmediatas Tomadas</Label>
                    <textarea
                      id="immediateActions"
                      value={formData.immediateActions}
                      onChange={(e) => updateFormData('immediateActions', e.target.value)}
                      placeholder="Describe las medidas que se tomaron inmediatamente después del incidente..."
                      className="w-full min-h-[80px] rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                    />
                  </div>
                </div>
              </div>

              {/* Submit */}
              <div className="flex justify-end space-x-4 pt-6 border-t">
                <Link href="/incidents">
                  <Button variant="outline" type="button">
                    Cancelar
                  </Button>
                </Link>
                <Button 
                  type="submit" 
                  className="bg-sep-red hover:bg-sep-red/90"
                  loading={loading}
                >
                  {loading ? 'Guardando...' : 'Crear Incidencia'}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
} 