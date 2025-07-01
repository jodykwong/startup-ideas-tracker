// Database types
export interface StartupIdea {
  id: string
  title: string
  description: string
  problem_statement: string
  target_users: string
  solution_overview: string
  user_count_score: number // 1-10 (1 = few users, 10 = many users)
  urgency_score: number // 1-10 (1 = weak need, 10 = strong need)
  category: string
  status: 'draft' | 'evaluating' | 'validated' | 'rejected'
  created_at: string
  updated_at: string
  user_id: string
  // AI增强功能相关字段
  notes?: string // JSON格式存储AI增强信息和其他备注
  solution?: string // 备用解决方案字段（用于兼容性）
  // 软删除和研究功能字段
  deleted_at?: string
  research_status?: 'not_started' | 'in_progress' | 'completed' | 'failed'
  // 新增用户体验优化字段
  tags?: string[] // 标签数组
  ai_enhanced?: boolean // 是否已AI增强
  ai_enhanced_at?: string // AI增强时间
  ai_enhancement_count?: number // AI增强次数
  priority?: number // 优先级 1-5
  is_favorite?: boolean // 是否收藏
  last_viewed_at?: string // 最后查看时间
  activity_score?: number // 活动评分
  progress_stage?: 'idea' | 'research' | 'prototype' | 'testing' | 'launch' // 进展阶段
  milestone_notes?: string // 里程碑备注
}

export interface PGEvaluation {
  id: string
  idea_id: string
  is_personal_problem: boolean
  would_use_myself: boolean
  can_build_it: boolean
  few_realize_worth_doing: boolean
  someone_needs_urgently: boolean
  has_expansion_path: boolean
  total_score: number
  notes: string
  created_at: string
  updated_at: string
}

export interface User {
  id: string
  email: string
  created_at: string
}

// API Response types
export interface ApiResponse<T> {
  data?: T
  error?: string
  success: boolean
}

export interface PaginatedResponse<T> {
  data: T[]
  count: number
  page: number
  limit: number
  totalPages: number
}

// UI Component types
export interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger'
  size?: 'sm' | 'md' | 'lg'
  disabled?: boolean
  loading?: boolean
  children: React.ReactNode
  onClick?: () => void
  type?: 'button' | 'submit' | 'reset'
  className?: string
}

export interface ModalProps {
  isOpen: boolean
  onClose: () => void
  title?: string
  children: React.ReactNode
  size?: 'sm' | 'md' | 'lg' | 'xl'
  className?: string
}

export interface CardProps {
  children: React.ReactNode
  className?: string
  interactive?: boolean
  elevated?: boolean
  gradient?: boolean
}

// Form types
export interface CreateIdeaForm {
  title: string
  description: string
  problem_statement: string
  target_users: string
  solution_overview: string
  user_count_score: number
  urgency_score: number
  category: string
}

export interface EditIdeaForm extends CreateIdeaForm {
  id: string
  status: StartupIdea['status']
}

export interface PGEvaluationForm {
  idea_id: string
  is_personal_problem: boolean
  would_use_myself: boolean
  can_build_it: boolean
  few_realize_worth_doing: boolean
  someone_needs_urgently: boolean
  has_expansion_path: boolean
  notes: string
}

// Search and Filter types
export interface SearchFilters {
  query?: string
  category?: string
  status?: StartupIdea['status']
  user_count_min?: number
  user_count_max?: number
  urgency_min?: number
  urgency_max?: number
  tags?: string[]
  date_from?: string
  date_to?: string
  sort_by?: 'created_at' | 'updated_at' | 'title' | 'user_count_score' | 'urgency_score'
  sort_order?: 'asc' | 'desc'
}

export interface SearchResult {
  ideas: StartupIdea[]
  total: number
  filters: SearchFilters
}

// AI Enhancement types
export interface AIEnhancementRequest {
  idea_id: string
  enhancement_type: 'improve_description' | 'suggest_features' | 'market_analysis' | 'competitive_analysis'
  context?: string
}

export interface AIEnhancementResponse {
  enhanced_content: string
  suggestions: string[]
  confidence_score: number
  enhancement_type: string
}

// Chart and Analytics types
export interface ChartDataPoint {
  name: string
  value: number
  color?: string
}

export interface DeepWellChartData {
  user_count_score: number
  urgency_score: number
  title: string
  id: string
  category: string
}

// Notification types
export interface Notification {
  id: string
  type: 'success' | 'error' | 'warning' | 'info'
  title: string
  message: string
  duration?: number
  action?: {
    label: string
    onClick: () => void
  }
}

// Store types (for nanostores)
export interface AppState {
  user: User | null
  ideas: StartupIdea[]
  selectedIdea: StartupIdea | null
  loading: boolean
  notifications: Notification[]
  searchFilters: SearchFilters
}

// Utility types
export type Optional<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>
export type RequiredFields<T, K extends keyof T> = T & Required<Pick<T, K>>

// Environment types
export interface EnvironmentConfig {
  SUPABASE_URL: string
  SUPABASE_ANON_KEY: string
  GEMINI_API_KEY: string
  NODE_ENV: 'development' | 'production' | 'test'
  DISABLE_AUTH?: boolean
}
