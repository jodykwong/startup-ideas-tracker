import type { APIRoute } from 'astro'
import { supabase } from '../../../lib/supabase'

export const POST: APIRoute = async ({ request }) => {
  try {
    const { error } = await supabase.auth.signOut()

    if (error) {
      return new Response(
        JSON.stringify({ 
          error: error.message,
          success: false 
        }),
        { 
          status: 400,
          headers: { 'Content-Type': 'application/json' }
        }
      )
    }

    // Clear session cookie
    const response = new Response(
      JSON.stringify({ 
        message: 'Signed out successfully',
        success: true 
      }),
      { 
        status: 200,
        headers: { 'Content-Type': 'application/json' }
      }
    )

    // Clear httpOnly cookie
    response.headers.set(
      'Set-Cookie',
      'sb-access-token=; HttpOnly; Secure; SameSite=Lax; Path=/; Max-Age=0'
    )

    return response

  } catch (error) {
    console.error('Sign out error:', error)
    return new Response(
      JSON.stringify({ 
        error: 'Internal server error',
        success: false 
      }),
      { 
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      }
    )
  }
}
