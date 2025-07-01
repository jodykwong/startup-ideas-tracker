import { createClient } from '@supabase/supabase-js'
import type { StartupIdea, PGEvaluation, User } from '../types'

// 获取环境变量
const supabaseUrl = import.meta.env.PUBLIC_SUPABASE_URL
const supabaseAnonKey = import.meta.env.PUBLIC_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables')
}

// 创建 Supabase 客户端
export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true
  }
})

// 数据库类型定义
export interface Database {
  public: {
    Tables: {
      startup_ideas: {
        Row: StartupIdea
        Insert: Omit<StartupIdea, 'id' | 'created_at' | 'updated_at'>
        Update: Partial<Omit<StartupIdea, 'id' | 'created_at'>>
      }
      pg_evaluations: {
        Row: PGEvaluation
        Insert: Omit<PGEvaluation, 'id' | 'created_at' | 'updated_at'>
        Update: Partial<Omit<PGEvaluation, 'id' | 'created_at'>>
      }
    }
  }
}

// 创建类型化的客户端
export const typedSupabase = supabase as ReturnType<typeof createClient<Database>>

// 认证相关函数
export const auth = {
  // 获取当前用户
  async getCurrentUser() {
    const { data: { user }, error } = await supabase.auth.getUser()
    return { user, error }
  },

  // 获取当前会话
  async getSession() {
    const { data: { session }, error } = await supabase.auth.getSession()
    return { session, error }
  },

  // 登录
  async signIn(email: string, password: string) {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    })
    return { data, error }
  },

  // 注册
  async signUp(email: string, password: string) {
    const { data, error } = await supabase.auth.signUp({
      email,
      password
    })
    return { data, error }
  },

  // 登出
  async signOut() {
    const { error } = await supabase.auth.signOut()
    return { error }
  },

  // 重置密码
  async resetPassword(email: string) {
    const { data, error } = await supabase.auth.resetPasswordForEmail(email)
    return { data, error }
  }
}

// 数据库操作函数
export const db = {
  // Startup Ideas 操作
  ideas: {
    // 获取所有想法
    async getAll(userId: string) {
      const { data, error } = await typedSupabase
        .from('startup_ideas')
        .select('*')
        .eq('user_id', userId)
        .is('deleted_at', null)
        .order('created_at', { ascending: false })
      
      return { data, error }
    },

    // 根据ID获取想法
    async getById(id: string, userId: string) {
      const { data, error } = await typedSupabase
        .from('startup_ideas')
        .select('*')
        .eq('id', id)
        .eq('user_id', userId)
        .is('deleted_at', null)
        .single()
      
      return { data, error }
    },

    // 创建想法
    async create(idea: Database['public']['Tables']['startup_ideas']['Insert']) {
      const { data, error } = await typedSupabase
        .from('startup_ideas')
        .insert(idea)
        .select()
        .single()
      
      return { data, error }
    },

    // 更新想法
    async update(id: string, updates: Database['public']['Tables']['startup_ideas']['Update'], userId: string) {
      const { data, error } = await typedSupabase
        .from('startup_ideas')
        .update({ ...updates, updated_at: new Date().toISOString() })
        .eq('id', id)
        .eq('user_id', userId)
        .select()
        .single()
      
      return { data, error }
    },

    // 软删除想法
    async softDelete(id: string, userId: string) {
      const { data, error } = await typedSupabase
        .from('startup_ideas')
        .update({ 
          deleted_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        })
        .eq('id', id)
        .eq('user_id', userId)
        .select()
        .single()
      
      return { data, error }
    },

    // 恢复删除的想法
    async restore(id: string, userId: string) {
      const { data, error } = await typedSupabase
        .from('startup_ideas')
        .update({ 
          deleted_at: null,
          updated_at: new Date().toISOString()
        })
        .eq('id', id)
        .eq('user_id', userId)
        .select()
        .single()
      
      return { data, error }
    },

    // 永久删除想法
    async permanentDelete(id: string, userId: string) {
      const { error } = await typedSupabase
        .from('startup_ideas')
        .delete()
        .eq('id', id)
        .eq('user_id', userId)
      
      return { error }
    },

    // 获取回收站中的想法
    async getDeleted(userId: string) {
      const { data, error } = await typedSupabase
        .from('startup_ideas')
        .select('*')
        .eq('user_id', userId)
        .not('deleted_at', 'is', null)
        .order('deleted_at', { ascending: false })
      
      return { data, error }
    },

    // 搜索想法
    async search(userId: string, query: string, filters?: any) {
      let queryBuilder = typedSupabase
        .from('startup_ideas')
        .select('*')
        .eq('user_id', userId)
        .is('deleted_at', null)

      if (query) {
        queryBuilder = queryBuilder.or(`title.ilike.%${query}%,description.ilike.%${query}%,problem_statement.ilike.%${query}%`)
      }

      if (filters?.category) {
        queryBuilder = queryBuilder.eq('category', filters.category)
      }

      if (filters?.status) {
        queryBuilder = queryBuilder.eq('status', filters.status)
      }

      const { data, error } = await queryBuilder.order('created_at', { ascending: false })
      
      return { data, error }
    }
  },

  // PG Evaluations 操作
  evaluations: {
    // 获取想法的评估
    async getByIdeaId(ideaId: string) {
      const { data, error } = await typedSupabase
        .from('pg_evaluations')
        .select('*')
        .eq('idea_id', ideaId)
        .single()
      
      return { data, error }
    },

    // 创建评估
    async create(evaluation: Database['public']['Tables']['pg_evaluations']['Insert']) {
      const { data, error } = await typedSupabase
        .from('pg_evaluations')
        .insert(evaluation)
        .select()
        .single()
      
      return { data, error }
    },

    // 更新评估
    async update(id: string, updates: Database['public']['Tables']['pg_evaluations']['Update']) {
      const { data, error } = await typedSupabase
        .from('pg_evaluations')
        .update({ ...updates, updated_at: new Date().toISOString() })
        .eq('id', id)
        .select()
        .single()
      
      return { data, error }
    },

    // 删除评估
    async delete(id: string) {
      const { error } = await typedSupabase
        .from('pg_evaluations')
        .delete()
        .eq('id', id)
      
      return { error }
    }
  }
}

// 实时订阅
export const subscriptions = {
  // 订阅想法变化
  subscribeToIdeas(userId: string, callback: (payload: any) => void) {
    return supabase
      .channel('startup_ideas_changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'startup_ideas',
          filter: `user_id=eq.${userId}`
        },
        callback
      )
      .subscribe()
  },

  // 订阅评估变化
  subscribeToEvaluations(callback: (payload: any) => void) {
    return supabase
      .channel('pg_evaluations_changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'pg_evaluations'
        },
        callback
      )
      .subscribe()
  }
}

export default supabase
