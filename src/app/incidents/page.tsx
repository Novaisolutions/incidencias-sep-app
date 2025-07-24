'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { getCurrentProfile, signOut } from '@/lib/supabase'
import { formatTimeAgo } from '@/lib/utils'

interface MockIncident {
  id: string
  title: string
  description: string
  type: 'academic' | 'disciplinary' | 'infrastructure' | 'administrative' | 'security'
  priority: 'low' | 'medium' | 'high'
  status: 'pending' | 'in_progress' | 'resolved' | 'cancelled'
  studentName?: string
  reporterName: string
  createdAt: Date
  updatedAt: Date
}

// Mock data for demonstration
const mockIncidents: MockIncident[] = [
  {
    id: '2024-001',
    title: 'Estudiante se lastimó en el patio',
    description: 'Durante el recreo, un estudiante se cayó y se lastimó la rodilla.',
    type: 'security',
    priority: 'high',
    status: 'in_progress',
    studentName: 'Juan Pérez García',
    reporterName: 'María López',
    createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
    updatedAt: new Date(Date.now() - 1 * 60 * 60 * 1000), // 1 hour ago
  },
  {
    id: '2024-002',
    title: 'Problema con proyector del aula 201',
    description: 'El proyector del aula 201 no enciende y está afectando las clases.',
    type: 'infrastructure',
    priority: 'medium',
    status: 'pending',
    reporterName: 'Carlos Rodríguez',
    createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000), // 1 day ago
    updatedAt: new Date(Date.now() - 24 * 60 * 60 * 1000),
  },
  {
    id: '2024-003',
    title: 'Bullying reportado en 3er grado',
    description: 'Padres de familia reportan situación de acoso escolar.',
    type: 'disciplinary',
    priority: 'high',
    status: 'resolved',
    studentName: 'Ana Martínez',
    reporterName: 'Directora Sandra',
    createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000), // 3 days ago
    updatedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000), // 1 day ago
  }
]

export default function IncidentsPage() {
  const [userProfile, setUserProfile] = useState<any>(null)
  const [incidents, setIncidents] = useState<MockIncident[]>(mockIncidents)
  const [filteredIncidents, setFilteredIncidents] = useState<MockIncident[]>(mockIncidents)
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState<string>('all')
  const [priorityFilter, setPriorityFilter] = useState<string>('all')

  useEffect(() => {
    getCurrentProfile().then(profile => {
      setUserProfile(profile)
    })
  }, [])

  useEffect(() => {
    let filtered = incidents

    if (searchTerm) {
      filtered = filtered.filter(incident => 
        incident.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        incident.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        incident.studentName?.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    if (statusFilter !== 'all') {
      filtered = filtered.filter(incident => incident.status === statusFilter)
    }

    if (priorityFilter !== 'all') {
      filtered = filtered.filter(incident => incident.priority === priorityFilter)
    }

    setFilteredIncidents(filtered)
  }, [incidents, searchTerm, statusFilter, priorityFilter])

  const getTypeLabel = (type: string) => {
    const labels = {
      academic: 'Académica',
      disciplinary: 'Disciplinaria',
      infrastructure: 'Infraestructura',
      administrative: 'Administrativa',
      security: 'Seguridad'
    }
    return labels[type as keyof typeof labels] || type
  }

  const getStatusLabel = (status: string) => {
    const labels = {
      pending: 'Pendiente',
      in_progress: 'En Proceso',
      resolved: 'Resuelta',
      cancelled: 'Cancelada'
    }
    return labels[status as keyof typeof labels] || status
  }

  const getPriorityLabel = (priority: string) => {
    const labels = {
      low: 'Baja',
      medium: 'Media',
      high: 'Alta'
    }
    return labels[priority as keyof typeof labels] || priority
  }

  const handleLogout = async () => {
    await signOut()
    window.location.href = '/'
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
              <h1 className="text-xl font-bold text-gray-900">Gestión de Incidencias</h1>
              {userProfile && (
                <p className="text-sm text-gray-600">
                  {userProfile.full_name} • {userProfile.role}
                </p>
              )}
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <Link href="/dashboard">
              <Button variant="outline">Dashboard</Button>
            </Link>
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
        {/* Header Actions */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Mis Incidencias</h2>
            <p className="text-gray-600">Gestiona y da seguimiento a los casos reportados</p>
          </div>
          <Link href="/incidents/new">
            <Button className="bg-sep-red hover:bg-sep-red/90">
              + Nueva Incidencia
            </Button>
          </Link>
        </div>

        {/* Filters */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="text-lg">Filtros</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">Buscar</label>
                <Input
                  placeholder="Buscar por título, descripción..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Estado</label>
                <select 
                  className="w-full h-10 rounded-md border border-input bg-background px-3 py-2 text-sm"
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                >
                  <option value="all">Todos</option>
                  <option value="pending">Pendiente</option>
                  <option value="in_progress">En Proceso</option>
                  <option value="resolved">Resuelta</option>
                  <option value="cancelled">Cancelada</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Prioridad</label>
                <select 
                  className="w-full h-10 rounded-md border border-input bg-background px-3 py-2 text-sm"
                  value={priorityFilter}
                  onChange={(e) => setPriorityFilter(e.target.value)}
                >
                  <option value="all">Todas</option>
                  <option value="high">Alta</option>
                  <option value="medium">Media</option>
                  <option value="low">Baja</option>
                </select>
              </div>
              <div className="flex items-end">
                <Button 
                  variant="outline" 
                  onClick={() => {
                    setSearchTerm('')
                    setStatusFilter('all')
                    setPriorityFilter('all')
                  }}
                  className="w-full"
                >
                  Limpiar Filtros
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <Card>
            <CardContent className="p-4">
              <div className="text-2xl font-bold text-sep-red">
                {incidents.filter(i => i.status === 'pending').length}
              </div>
              <p className="text-sm text-gray-600">Pendientes</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="text-2xl font-bold text-blue-600">
                {incidents.filter(i => i.status === 'in_progress').length}
              </div>
              <p className="text-sm text-gray-600">En Proceso</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="text-2xl font-bold text-sep-green">
                {incidents.filter(i => i.status === 'resolved').length}
              </div>
              <p className="text-sm text-gray-600">Resueltas</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="text-2xl font-bold text-sep-gold">
                {incidents.filter(i => i.priority === 'high').length}
              </div>
              <p className="text-sm text-gray-600">Alta Prioridad</p>
            </CardContent>
          </Card>
        </div>

        {/* Incidents List */}
        <div className="space-y-4">
          {filteredIncidents.length === 0 ? (
            <Card>
              <CardContent className="p-8 text-center">
                <p className="text-gray-500">No se encontraron incidencias con los filtros aplicados.</p>
              </CardContent>
            </Card>
          ) : (
            filteredIncidents.map((incident) => (
              <Card key={incident.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="text-lg font-semibold">{incident.title}</h3>
                        <Badge variant={incident.status as any}>
                          {getStatusLabel(incident.status)}
                        </Badge>
                        <Badge variant={incident.priority as any}>
                          {getPriorityLabel(incident.priority)}
                        </Badge>
                      </div>
                      <p className="text-gray-600 mb-2">{incident.description}</p>
                      <div className="flex items-center gap-4 text-sm text-gray-500">
                        <span>ID: {incident.id}</span>
                        <span>Tipo: {getTypeLabel(incident.type)}</span>
                        {incident.studentName && <span>Estudiante: {incident.studentName}</span>}
                        <span>Reportado por: {incident.reporterName}</span>
                      </div>
                    </div>
                    <div className="flex flex-col items-end gap-2">
                      <div className="text-xs text-gray-500">
                        Creado: {formatTimeAgo(incident.createdAt)}
                      </div>
                      <div className="text-xs text-gray-500">
                        Actualizado: {formatTimeAgo(incident.updatedAt)}
                      </div>
                      <Button variant="outline" size="sm">
                        Ver Detalles
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </div>
    </div>
  )
} 