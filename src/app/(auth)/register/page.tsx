'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { supabase } from '@/lib/supabase'

interface FormData {
  email: string
  password: string
  confirmPassword: string
  fullName: string
  role: 'teacher' | 'coordinator' | 'director' | 'supervisor'
  schoolCCT: string
  schoolName: string
}

export default function RegisterPage() {
  const [step, setStep] = useState(1)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [formData, setFormData] = useState<FormData>({
    email: '',
    password: '',
    confirmPassword: '',
    fullName: '',
    role: 'teacher',
    schoolCCT: '',
    schoolName: ''
  })
  const router = useRouter()

  const updateFormData = (field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const validateStep1 = () => {
    if (!formData.fullName || !formData.email) {
      setError('Por favor completa todos los campos')
      return false
    }
    if (!formData.email.endsWith('@sep.gob.mx')) {
      setError('Debes usar un correo oficial de la SEP (@sep.gob.mx)')
      return false
    }
    setError('')
    return true
  }

  const validateStep2 = () => {
    if (!formData.password || !formData.confirmPassword) {
      setError('Por favor completa todos los campos')
      return false
    }
    if (formData.password.length < 8) {
      setError('La contraseña debe tener al menos 8 caracteres')
      return false
    }
    if (formData.password !== formData.confirmPassword) {
      setError('Las contraseñas no coinciden')
      return false
    }
    setError('')
    return true
  }

  const handleNext = () => {
    if (step === 1 && validateStep1()) {
      setStep(2)
    } else if (step === 2 && validateStep2()) {
      setStep(3)
    }
  }

  const handleSubmit = async () => {
    if (!formData.schoolCCT || !formData.schoolName) {
      setError('Por favor completa todos los campos')
      return
    }

    setLoading(true)
    setError('')

    try {
      const { error } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
        options: {
          data: {
            full_name: formData.fullName,
            role: formData.role,
            school_cct: formData.schoolCCT,
            school_name: formData.schoolName
          }
        }
      })

      if (error) throw error

      router.push('/login?message=Cuenta creada exitosamente. Revisa tu correo para verificar tu cuenta.')
    } catch (error: any) {
      setError(error.message || 'Error al crear la cuenta')
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
          <h1 className="text-2xl font-bold text-gray-900">Registro de Usuario</h1>
          <p className="text-gray-600">Paso {step} de 3</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>
              {step === 1 && 'Información Personal'}
              {step === 2 && 'Configuración de Acceso'}
              {step === 3 && 'Información Institucional'}
            </CardTitle>
            <CardDescription>
              {step === 1 && 'Ingresa tus datos personales y correo oficial'}
              {step === 2 && 'Crea una contraseña segura para tu cuenta'}
              {step === 3 && 'Completa la información de tu institución'}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-4">
                {error}
              </div>
            )}

            {/* Step 1: Personal Information */}
            {step === 1 && (
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="fullName">Nombre Completo</Label>
                  <Input
                    id="fullName"
                    value={formData.fullName}
                    onChange={(e) => updateFormData('fullName', e.target.value)}
                    placeholder="Nombre completo"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Correo Electrónico Oficial</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => updateFormData('email', e.target.value)}
                    placeholder="usuario@sep.gob.mx"
                    required
                  />
                  <p className="text-xs text-gray-500">
                    Debe ser un correo oficial de la SEP
                  </p>
                </div>

                <Button onClick={handleNext} className="w-full bg-sep-red hover:bg-sep-red/90">
                  Continuar
                </Button>
              </div>
            )}

            {/* Step 2: Password Setup */}
            {step === 2 && (
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="password">Contraseña</Label>
                  <Input
                    id="password"
                    type="password"
                    value={formData.password}
                    onChange={(e) => updateFormData('password', e.target.value)}
                    placeholder="Mínimo 8 caracteres"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Confirmar Contraseña</Label>
                  <Input
                    id="confirmPassword"
                    type="password"
                    value={formData.confirmPassword}
                    onChange={(e) => updateFormData('confirmPassword', e.target.value)}
                    placeholder="Confirma tu contraseña"
                    required
                  />
                </div>

                <div className="flex space-x-2">
                  <Button 
                    variant="outline" 
                    onClick={() => setStep(1)}
                    className="flex-1"
                  >
                    Atrás
                  </Button>
                  <Button 
                    onClick={handleNext} 
                    className="flex-1 bg-sep-red hover:bg-sep-red/90"
                  >
                    Continuar
                  </Button>
                </div>
              </div>
            )}

            {/* Step 3: Institutional Information */}
            {step === 3 && (
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="role">Rol en el Sistema</Label>
                  <select
                    id="role"
                    value={formData.role}
                    onChange={(e) => updateFormData('role', e.target.value as FormData['role'])}
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                  >
                    <option value="teacher">Docente</option>
                    <option value="coordinator">Coordinador</option>
                    <option value="director">Director</option>
                    <option value="supervisor">Supervisor</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="schoolCCT">CCT de la Escuela</Label>
                  <Input
                    id="schoolCCT"
                    value={formData.schoolCCT}
                    onChange={(e) => updateFormData('schoolCCT', e.target.value)}
                    placeholder="15DPR0001X"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="schoolName">Nombre de la Escuela</Label>
                  <Input
                    id="schoolName"
                    value={formData.schoolName}
                    onChange={(e) => updateFormData('schoolName', e.target.value)}
                    placeholder="Nombre completo de la institución"
                    required
                  />
                </div>

                <div className="flex space-x-2">
                  <Button 
                    variant="outline" 
                    onClick={() => setStep(2)}
                    className="flex-1"
                  >
                    Atrás
                  </Button>
                  <Button 
                    onClick={handleSubmit} 
                    className="flex-1 bg-sep-red hover:bg-sep-red/90"
                    loading={loading}
                  >
                    {loading ? 'Creando cuenta...' : 'Crear Cuenta'}
                  </Button>
                </div>
              </div>
            )}

            <div className="mt-6 text-center">
              <div className="text-sm text-gray-600">
                ¿Ya tienes cuenta?{' '}
                <Link href="/login" className="text-sep-red hover:underline font-medium">
                  Inicia sesión
                </Link>
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