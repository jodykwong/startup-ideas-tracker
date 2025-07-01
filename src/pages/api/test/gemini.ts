import type { APIRoute } from 'astro'
import { geminiService } from '../../../lib/gemini'

export const GET: APIRoute = async () => {
  try {
    console.log('Testing Gemini API connection...')
    
    // 检查环境变量
    const geminiApiKey = import.meta.env.GEMINI_API_KEY
    
    if (!geminiApiKey) {
      return new Response(
        JSON.stringify({
          success: false,
          error: 'Gemini API key not configured',
          details: 'Please set GEMINI_API_KEY in environment variables',
          timestamp: new Date().toISOString()
        }),
        {
          status: 500,
          headers: { 'Content-Type': 'application/json' }
        }
      )
    }

    // 测试连接
    const testResult = await geminiService.testConnection()
    
    return new Response(
      JSON.stringify({
        success: testResult.success,
        message: testResult.message,
        configured: geminiService.isConfigured(),
        timestamp: new Date().toISOString()
      }),
      {
        status: testResult.success ? 200 : 500,
        headers: { 'Content-Type': 'application/json' }
      }
    )

  } catch (error) {
    console.error('Gemini test error:', error)
    
    return new Response(
      JSON.stringify({
        success: false,
        error: 'Gemini test failed',
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
