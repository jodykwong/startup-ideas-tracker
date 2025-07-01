/// <reference path="../.astro/types.d.ts" />

interface ImportMetaEnv {
  readonly PUBLIC_SUPABASE_URL: string
  readonly PUBLIC_SUPABASE_ANON_KEY: string
  readonly GEMINI_API_KEY: string
  readonly NODE_ENV: 'development' | 'production' | 'test'
  readonly DISABLE_AUTH?: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}