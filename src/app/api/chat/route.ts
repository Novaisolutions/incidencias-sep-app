import { NextRequest, NextResponse } from 'next/server'
import { generateResponse } from '@/lib/gemini'
import { supabase } from '@/lib/supabase'

export async function POST(request: NextRequest) {
  try {
    const { message } = await request.json()
    
    if (!message || typeof message !== 'string') {
      return NextResponse.json(
        { error: 'Mensaje requerido' },
        { status: 400 }
      )
    }

    // Get user info from middleware headers
    const userId = request.headers.get('x-user-id')
    const userEmail = request.headers.get('x-user-email')

    let userContext = {}

    // If user is authenticated, fetch their context
    if (userId) {
      try {
        // Get user profile
        const { data: profile } = await supabase
          .from('profiles')
          .select('full_name, role, school_id')
          .eq('id', userId)
          .single()

        // Get recent incidents for context
        const { data: recentIncidents } = await supabase
          .from('incidents')
          .select('id, title, type, status, created_at')
          .eq('reporter_id', userId)
          .order('created_at', { ascending: false })
          .limit(5)

        userContext = {
          userRole: profile?.role,
          schoolInfo: profile?.school_id,
          recentIncidents: recentIncidents || []
        }
      } catch (error) {
        console.error('Error fetching user context:', error)
        // Continue without context if there's an error
      }
    }

    // Generate AI response with context
    const aiResponse = await generateResponse(message, userContext)

    return NextResponse.json({ 
      response: aiResponse,
      timestamp: new Date().toISOString()
    })

  } catch (error) {
    console.error('Error in chat API:', error)
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    )
  }
}

export async function GET() {
  return NextResponse.json({ 
    status: 'Chat API funcionando',
    timestamp: new Date().toISOString()
  })
} 