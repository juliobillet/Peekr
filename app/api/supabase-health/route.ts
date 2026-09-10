import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export async function GET() {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from('languages')
    .select('code, name')
    .order('code')

  if (error) {
    return NextResponse.json(
      {
        ok: false,
        error: error.message,
      },
      { status: 500 }
    )
  }

  return NextResponse.json({
    ok: true,
    message: 'Conexão com o Supabase e RLS funcionando.',
    languages: data,
  })
}