import type { APIRoute } from 'astro'
import { supabase } from '../../../lib/supabase'

export const GET: APIRoute = async () => {
  try {
    // Test basic connection
    const { data: connectionTest, error: connectionError } = await supabase
      .from('startup_ideas')
      .select('count', { count: 'exact', head: true })

    if (connectionError) {
      return new Response(
        JSON.stringify({
          success: false,
          error: 'Database connection failed',
          details: connectionError.message,
          timestamp: new Date().toISOString()
        }),
        {
          status: 500,
          headers: { 'Content-Type': 'application/json' }
        }
      )
    }

    // Test auth
    const { data: { user }, error: authError } = await supabase.auth.getUser()

    // Get environment info
    const envInfo = {
      supabaseUrl: import.meta.env.PUBLIC_SUPABASE_URL ? 'Set' : 'Missing',
      supabaseKey: import.meta.env.PUBLIC_SUPABASE_ANON_KEY ? 'Set' : 'Missing',
      geminiKey: import.meta.env.GEMINI_API_KEY ? 'Set' : 'Missing',
      nodeEnv: import.meta.env.NODE_ENV || 'development'
    }

    return new Response(
      JSON.stringify({
        success: true,
        message: 'Database connection successful',
        data: {
          connectionStatus: 'Connected',
          tableExists: true,
          recordCount: connectionTest?.count || 0,
          authStatus: authError ? 'Error' : (user ? 'Authenticated' : 'Not authenticated'),
          user: user ? { id: user.id, email: user.email } : null,
          environment: envInfo
        },
        timestamp: new Date().toISOString()
      }),
      {
        status: 200,
        headers: { 'Content-Type': 'application/json' }
      }
    )

  } catch (error) {
    console.error('Database test error:', error)
    
    return new Response(
      JSON.stringify({
        success: false,
        error: 'Database test failed',
        details: error instanceof Error ? error.message : 'Unknown error',
        timestamp: new Date().toISOString()
      }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      }
    )
  }
}
