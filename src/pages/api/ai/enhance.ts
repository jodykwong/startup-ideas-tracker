import type { APIRoute } from 'astro'
import { geminiService, type EnhancementRequest } from '../../../lib/gemini'

export const POST: APIRoute = async ({ request }) => {
  try {
    console.log('AI enhance API called')
    
    // 检查环境变量
    const geminiApiKey = import.meta.env.GEMINI_API_KEY
    
    if (!geminiApiKey) {
      console.error('Missing Gemini API key')
      return new Response(
        JSON.stringify({ 
          error: 'AI服务未配置',
          success: false 
        }),
        { 
          status: 500,
          headers: { 'Content-Type': 'application/json' }
        }
      )
    }

    let enhancementRequest: EnhancementRequest
    try {
      const body = await request.json()
      enhancementRequest = body as EnhancementRequest
      console.log('Enhancement request:', enhancementRequest.mode, enhancementRequest.title)
    } catch (parseError) {
      console.error('JSON parse error:', parseError)
      return new Response(
        JSON.stringify({ 
          error: 'Invalid JSON in request body',
          success: false 
        }),
        { 
          status: 400,
          headers: { 'Content-Type': 'application/json' }
        }
      )
    }

    // 验证必需字段
    if (!enhancementRequest.mode || !enhancementRequest.title) {
      return new Response(
        JSON.stringify({ 
          error: 'Missing required fields: mode and title',
          success: false 
        }),
        { 
          status: 400,
          headers: { 'Content-Type': 'application/json' }
        }
      )
    }

    console.log('Calling Gemini service...')
    const result = await geminiService.enhanceIdea(enhancementRequest)

    if (!result.success) {
      console.error('Gemini service error:', result.error)
      return new Response(
        JSON.stringify({ 
          error: result.error || 'AI增强失败',
          success: false 
        }),
        { 
          status: 400,
          headers: { 'Content-Type': 'application/json' }
        }
      )
    }

    console.log('AI enhancement successful')
    return new Response(
      JSON.stringify(result),
      { 
        status: 200,
        headers: { 'Content-Type': 'application/json' }
      }
    )

  } catch (error) {
    console.error('AI enhance error:', error)
    return new Response(
      JSON.stringify({ 
        error: 'Internal server error',
        details: error instanceof Error ? error.message : 'Unknown error',
        success: false 
      }),
      { 
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      }
    )
  }
}
