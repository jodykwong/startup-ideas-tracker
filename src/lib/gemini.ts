/**
 * Gemini API 配置和服务类
 *
 * 提供与Google Gemini AI模型的集成，支持：
 * - 想法增强
 * - 内容生成
 * - 智能建议
 * - 错误处理和重试机制
 *
 * 使用 REST API 直接调用 gemini-2.5-flash 模型
 *
 * 注意：此文件只能在服务器端使用，客户端请使用 API 路由
 */

/**
 * AI增强模式枚举
 */
export enum EnhancementMode {
  EXPAND_DESCRIPTION = 'expand_description',
  IMPROVE_PROBLEM_STATEMENT = 'improve_problem_statement',
  REFINE_TARGET_USERS = 'refine_target_users',
  ENHANCE_SOLUTION = 'enhance_solution',
  GENERATE_BUSINESS_MODEL = 'generate_business_model',
  MARKET_ANALYSIS = 'market_analysis',
  COMPETITIVE_ANALYSIS = 'competitive_analysis',
  RISK_ASSESSMENT = 'risk_assessment'
}

/**
 * AI增强请求接口
 */
export interface EnhancementRequest {
  mode: EnhancementMode
  title: string
  description?: string
  problemStatement?: string
  targetUsers?: string
  solutionOverview?: string
  category?: string
  userCountScore?: number
  urgencyScore?: number
}

/**
 * AI增强响应接口
 */
export interface EnhancementResponse {
  success: boolean
  enhancedContent: string
  suggestions?: string[]
  metadata?: {
    model: string
    timestamp: string
    tokensUsed?: number
  }
  error?: string
}

/**
 * Gemini API服务类 - 仅服务器端使用
 */
export class GeminiService {
  private static instance: GeminiService
  private modelName: string
  private genAI: any = null // 延迟初始化以避免客户端错误

  private constructor() {
    // 使用Gemini 2.0 Flash模型（根据用户记忆）
    this.modelName = 'gemini-2.0-flash'
  }

  /**
   * 获取单例实例
   */
  public static getInstance(): GeminiService {
    if (!GeminiService.instance) {
      GeminiService.instance = new GeminiService()
    }
    return GeminiService.instance
  }

  /**
   * 初始化 Gemini AI 客户端（使用 REST API）
   */
  private async initializeGenAI(): Promise<void> {
    if (this.genAI || typeof window !== 'undefined') {
      return // 已初始化或在客户端
    }

    // 使用 REST API 方式，避免 SDK 兼容性问题
    this.genAI = {
      apiKey: import.meta.env.GEMINI_API_KEY!,
      baseUrl: 'https://generativelanguage.googleapis.com/v1beta'
    }
  }

  /**
   * 检查API密钥是否配置
   */
  public isConfigured(): boolean {
    return !!(import.meta.env.GEMINI_API_KEY && import.meta.env.GEMINI_API_KEY !== 'your_gemini_api_key_here')
  }

  /**
   * 调用 Gemini REST API
   */
  private async callGeminiAPI(prompt: string): Promise<{ text: string; usageMetadata?: any }> {
    if (!this.genAI) {
      throw new Error('Gemini API 未初始化')
    }

    const url = `${this.genAI.baseUrl}/models/${this.modelName}:generateContent`

    const requestBody = {
      contents: [
        {
          parts: [
            {
              text: prompt
            }
          ]
        }
      ]
    }

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-goog-api-key': this.genAI.apiKey
      },
      body: JSON.stringify(requestBody)
    })

    if (!response.ok) {
      const errorText = await response.text()
      throw new Error(`Gemini API 调用失败: ${response.status} ${response.statusText} - ${errorText}`)
    }

    const data = await response.json()

    if (!data.candidates || !data.candidates[0] || !data.candidates[0].content) {
      throw new Error('Gemini API 返回格式异常')
    }

    const text = data.candidates[0].content.parts[0].text || ''
    const usageMetadata = data.usageMetadata

    return { text, usageMetadata }
  }

  /**
   * 增强创业想法
   */
  public async enhanceIdea(request: EnhancementRequest): Promise<EnhancementResponse> {
    if (!this.isConfigured()) {
      return {
        success: false,
        enhancedContent: '',
        error: 'Gemini API密钥未配置，请在环境变量中设置GEMINI_API_KEY'
      }
    }

    try {
      await this.initializeGenAI()

      if (!this.genAI) {
        throw new Error('Gemini AI 客户端未初始化')
      }

      const prompt = this.buildPrompt(request)
      const response = await this.callGeminiAPI(prompt)

      // 尝试解析JSON响应
      let enhancedContent: any
      try {
        enhancedContent = JSON.parse(response.text.trim())
      } catch (parseError) {
        // 如果不是JSON，则作为普通文本处理
        console.warn('Gemini response is not JSON, treating as plain text:', parseError)
        enhancedContent = { content: response.text.trim() }
      }

      return {
        success: true,
        enhancedContent,
        metadata: {
          model: this.modelName,
          timestamp: new Date().toISOString(),
          tokensUsed: response.usageMetadata?.totalTokenCount
        }
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : '未知错误'
      console.error('Gemini API error:', errorMessage)

      // 处理常见错误
      let userFriendlyMessage = '增强失败，请重试'
      if (errorMessage.includes('API_KEY_INVALID')) {
        userFriendlyMessage = 'API密钥无效，请检查配置'
      } else if (errorMessage.includes('QUOTA_EXCEEDED')) {
        userFriendlyMessage = 'API配额已用完，请稍后重试'
      } else if (errorMessage.includes('RATE_LIMIT_EXCEEDED')) {
        userFriendlyMessage = '请求过于频繁，请稍后重试'
      } else if (errorMessage.includes('browser')) {
        userFriendlyMessage = '请通过API路由调用此功能'
      }

      return {
        success: false,
        enhancedContent: '',
        error: userFriendlyMessage
      }
    }
  }

  /**
   * 构建增强提示词
   */
  private buildPrompt(request: EnhancementRequest): string {
    const baseContext = `
创业想法信息：
- 标题：${request.title}
- 描述：${request.description || '暂无'}
- 问题陈述：${request.problemStatement || '暂无'}
- 目标用户：${request.targetUsers || '暂无'}
- 解决方案：${request.solutionOverview || '暂无'}
- 分类：${request.category || '通用'}
- 用户数量评分：${request.userCountScore || 5}/10
- 需求迫切程度：${request.urgencyScore || 5}/10
`

    const modePrompts = {
      [EnhancementMode.EXPAND_DESCRIPTION]: `
请基于以上信息，扩展和完善这个创业想法。要求：
1. 保持原有核心概念不变
2. 增加更多细节和具体场景
3. 使描述更加生动和有说服力
4. 使用中文回复

请以JSON格式回复，包含以下字段：
{
  "enhanced_title": "增强后的标题",
  "enhanced_problem": "具体问题描述",
  "enhanced_solution": "详细解决方案",
  "key_features": ["功能1", "功能2", "功能3"],
  "implementation_steps": ["步骤1", "步骤2", "步骤3"],
  "success_metrics": ["指标1", "指标2", "指标3"]
}

只返回JSON，不要包含其他说明文字。`,

      [EnhancementMode.IMPROVE_PROBLEM_STATEMENT]: `
请基于以上信息，改进和完善问题陈述。要求：
1. 明确指出要解决的核心问题
2. 描述问题的严重性和普遍性
3. 解释为什么这个问题值得解决
4. 使用数据或具体例子支撑
5. 使用中文回复

请以JSON格式回复，包含以下字段：
{
  "enhanced_problem": "改进后的问题陈述",
  "root_causes": ["根本原因1", "根本原因2"],
  "impact_analysis": "影响分析",
  "urgency_factors": ["紧迫因素1", "紧迫因素2"],
  "problem_validation": "问题验证方法"
}

只返回JSON，不要包含其他说明文字。`,

      [EnhancementMode.REFINE_TARGET_USERS]: `
请基于以上信息，细化和明确目标用户群体。要求：
1. 具体描述用户画像（年龄、职业、收入等）
2. 分析用户的痛点和需求
3. 说明为什么选择这些用户群体
4. 估算潜在用户规模
5. 字数控制在150-200字
6. 使用中文回复

请直接输出细化后的目标用户描述，不要包含其他说明文字。`,

      [EnhancementMode.ENHANCE_SOLUTION]: `
请基于以上信息，优化和完善解决方案。要求：
1. 详细描述解决方案的核心功能
2. 说明技术实现方式
3. 分析竞争优势
4. 考虑可行性和成本
5. 使用中文回复

请以JSON格式回复，包含以下字段：
{
  "enhanced_solution": "优化后的解决方案",
  "tech_stack": {
    "frontend": ["技术1", "技术2"],
    "backend": ["技术1", "技术2"],
    "database": "数据库技术"
  },
  "architecture": "架构描述",
  "development_phases": ["阶段1", "阶段2", "阶段3"],
  "technical_challenges": ["挑战1", "挑战2"],
  "solutions": ["解决方案1", "解决方案2"]
}

只返回JSON，不要包含其他说明文字。`
    }

    return baseContext + (modePrompts[request.mode] || modePrompts[EnhancementMode.EXPAND_DESCRIPTION])
  }

  /**
   * 测试API连接
   */
  public async testConnection(): Promise<{ success: boolean; message: string }> {
    if (!this.isConfigured()) {
      return {
        success: false,
        message: 'API密钥未配置'
      }
    }

    try {
      await this.initializeGenAI()

      if (!this.genAI) {
        throw new Error('Gemini AI 客户端未初始化')
      }

      console.log('Testing Gemini API connection with model:', this.modelName)
      console.log('API Key configured:', !!import.meta.env.GEMINI_API_KEY)

      // 使用简单的英文提示进行测试
      const result = await this.callGeminiAPI('Hello, please respond with "Connection successful"')
      const text = result.text

      return {
        success: true,
        message: `连接成功，响应：${text.trim()}`
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : '未知错误'
      console.error('Gemini API connection test failed:', error)

      // 提供更详细的错误信息
      let userMessage = `连接失败：${errorMessage}`
      if (errorMessage.includes('fetch failed')) {
        userMessage += ' (可能是网络连接问题或API密钥无效)'
      } else if (errorMessage.includes('API_KEY_INVALID')) {
        userMessage = 'API密钥无效，请检查 GEMINI_API_KEY 环境变量'
      } else if (errorMessage.includes('PERMISSION_DENIED')) {
        userMessage = 'API访问被拒绝，请检查API密钥权限'
      }

      return {
        success: false,
        message: userMessage
      }
    }
  }
}

// 导出单例实例
export const geminiService = GeminiService.getInstance()
