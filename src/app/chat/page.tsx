'use client'

import { useState, useRef, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { getCurrentProfile, signOut } from '@/lib/supabase'
import { formatTimeAgo } from '@/lib/utils'
import Link from 'next/link'

interface Message {
  id: string
  content: string
  isUser: boolean
  timestamp: Date
}

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [userProfile, setUserProfile] = useState<any>(null)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  useEffect(() => {
    // Load user profile
    getCurrentProfile().then(profile => {
      setUserProfile(profile)
    })

    // Add welcome message
    const welcomeMessage: Message = {
      id: 'welcome',
      content: `¡Hola! Soy tu asistente especializado en el Sistema de Incidencias de la SEP. 

Puedo ayudarte con:
• Registro y seguimiento de incidencias
• Información sobre políticas educativas
• Orientación sobre procedimientos administrativos
• Consultas sobre el sistema

¿En qué puedo asistirte hoy?`,
      isUser: false,
      timestamp: new Date()
    }
    setMessages([welcomeMessage])
  }, [])

  const sendMessage = async () => {
    if (!input.trim() || loading) return

    const userMessage: Message = {
      id: Date.now().toString(),
      content: input.trim(),
      isUser: true,
      timestamp: new Date()
    }

    setMessages(prev => [...prev, userMessage])
    setInput('')
    setLoading(true)

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: input.trim() }),
      })

      if (!response.ok) {
        throw new Error('Error en la respuesta del servidor')
      }

      const data = await response.json()

      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: data.response,
        isUser: false,
        timestamp: new Date()
      }

      setMessages(prev => [...prev, aiMessage])
    } catch (error) {
      console.error('Error sending message:', error)
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: 'Lo siento, ocurrió un error al procesar tu mensaje. Por favor intenta nuevamente.',
        isUser: false,
        timestamp: new Date()
      }
      setMessages(prev => [...prev, errorMessage])
    } finally {
      setLoading(false)
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      sendMessage()
    }
  }

  const clearChat = () => {
    setMessages([{
      id: 'welcome',
      content: '¡Chat reiniciado! ¿En qué puedo ayudarte?',
      isUser: false,
      timestamp: new Date()
    }])
  }

  const handleLogout = async () => {
    await signOut()
    window.location.href = '/'
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-4 py-4">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <div className="w-10 h-10 bg-sep-red rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">SEP</span>
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">Asistente de Incidencias</h1>
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
            <Button variant="outline" onClick={handleLogout}>
              Cerrar Sesión
            </Button>
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Capacidades del Asistente</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <h4 className="font-medium text-sm">Gestión de Incidencias</h4>
                  <ul className="text-xs text-gray-600 space-y-1">
                    <li>• Crear nuevas incidencias</li>
                    <li>• Consultar estado de casos</li>
                    <li>• Escalamiento automático</li>
                  </ul>
                </div>
                <div className="space-y-2">
                  <h4 className="font-medium text-sm">Información SEP</h4>
                  <ul className="text-xs text-gray-600 space-y-1">
                    <li>• Políticas educativas</li>
                    <li>• Procedimientos administrativos</li>
                    <li>• Protocolos de seguridad</li>
                  </ul>
                </div>
                <div className="space-y-2">
                  <h4 className="font-medium text-sm">Estado del Sistema</h4>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-xs text-gray-600">Activo</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Chat Interface */}
          <div className="lg:col-span-3">
            <Card className="h-[600px] flex flex-col">
              <CardHeader className="flex-shrink-0 border-b">
                <div className="flex justify-between items-center">
                  <CardTitle>Chat con Asistente IA</CardTitle>
                  <Button variant="outline" size="sm" onClick={clearChat}>
                    Limpiar Chat
                  </Button>
                </div>
              </CardHeader>

              {/* Messages */}
              <CardContent className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-[80%] rounded-lg px-4 py-2 ${
                        message.isUser
                          ? 'bg-sep-red text-white'
                          : 'bg-gray-100 text-gray-900'
                      }`}
                    >
                      <div className="whitespace-pre-wrap">{message.content}</div>
                      <div
                        className={`text-xs mt-1 ${
                          message.isUser ? 'text-red-100' : 'text-gray-500'
                        }`}
                      >
                        {formatTimeAgo(message.timestamp)}
                      </div>
                    </div>
                  </div>
                ))}
                {loading && (
                  <div className="flex justify-start">
                    <div className="bg-gray-100 rounded-lg px-4 py-2">
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                      </div>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </CardContent>

              {/* Input */}
              <div className="flex-shrink-0 border-t p-4">
                <div className="flex space-x-2">
                  <Input
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Escribe tu pregunta sobre incidencias o procedimientos SEP..."
                    disabled={loading}
                    className="flex-1"
                  />
                  <Button 
                    onClick={sendMessage} 
                    disabled={loading || !input.trim()}
                    className="bg-sep-red hover:bg-sep-red/90"
                  >
                    {loading ? 'Enviando...' : 'Enviar'}
                  </Button>
                </div>
                <p className="text-xs text-gray-500 mt-2">
                  Presiona Enter para enviar • El asistente puede cometer errores, verifica información importante
                </p>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
} 