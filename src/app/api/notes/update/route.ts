import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

export async function PUT(req: NextRequest) {
  const authHeader = req.headers.get('Authorization')
  const token = authHeader?.split(' ')[1]

  if (!token) {
    return NextResponse.json({ error: 'No token provided' }, { status: 401 })
  }

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      global: {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    }
  )

  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser()

  if (userError || !user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const formData = await req.formData()

  const id = formData.get('id') as string
  const title = formData.get('title') as string
  const content = formData.get('content') as string
  const degree = formData.get('degree') as string
  const semester = formData.get('semester') as string
  const file = formData.get('file') as File | null

  let fileUrl: string | undefined = undefined

  // If a new file is provided, upload it
  if (file && typeof file !== 'string') {
    const ext = file.name.split('.').pop()
    const filePath = `${user.id}/${Date.now()}.${ext}`

    const { error: uploadError } = await supabase.storage
      .from('notes-bucket')
      .upload(filePath, file, { contentType: file.type })

    if (uploadError) {
      console.error("File upload error:", uploadError.message)
      return NextResponse.json({ error: uploadError.message }, { status: 500 })
    }

    const { data: publicUrlData } = supabase.storage
      .from('notes-bucket')
      .getPublicUrl(filePath)

    fileUrl = publicUrlData.publicUrl
  }

  const updateFields: any = {
    title,
    content,
    degree,
    semester,
    updated_at: new Date().toISOString(),
  }

  if (fileUrl) updateFields.file_url = fileUrl

  const { error } = await supabase
    .from('notes')
    .update(updateFields)
    .eq('id', id)
    .eq('user_id', user.id)

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json({ success: true })
}
