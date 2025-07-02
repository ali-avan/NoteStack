import { createClient } from '@supabase/supabase-js'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData()

    const title = formData.get('title') as string
    const content = formData.get('content') as string
    const degree = formData.get('degree') as string
    const semester = parseInt(formData.get('semester') as string)
    const file = formData.get('file') as File

    console.log({ title, content, degree, semester, file })

    const token = req.headers.get('Authorization')?.split(' ')[1]
    if (!token) {
      return NextResponse.json({ error: 'Unauthorized - No token' }, { status: 401 })
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

    const userResponse = await supabase.auth.getUser()
    const user = userResponse.data.user
    const userError = userResponse.error

    if (!user || userError) {
      console.error("User fetch error:", userError)
      return NextResponse.json({ error: 'Unauthorized - Invalid token' }, { status: 401 })
    }

    console.log("Auth user response:", user)
    console.log("Uploading to bucket: notes-bucket", "userId:", user.id)

    // Upload file
    let fileUrl = ''
    if (file && file.name) {
      const fileExt = file.name.split('.').pop()
      const filePath = `${user.id}/${Date.now()}.${fileExt}`

      const { error: uploadError } = await supabase
        .storage
        .from('notes-bucket')
        .upload(filePath, file, {
          contentType: file.type,
        })

      if (uploadError) {
        console.error("Upload error:", uploadError)
        return NextResponse.json({ error: uploadError.message }, { status: 500 })
      }

      const { data: urlData } = supabase.storage.from('notes-bucket').getPublicUrl(filePath)
      fileUrl = urlData.publicUrl
    }

    // Insert into notes table
    const insertData = {
      user_id: user.id,
      title,
      content,
      degree,
      semester,
      file_url: fileUrl,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    }

    console.log("Insert data:", insertData)

    const { error } = await supabase.from('notes').insert([insertData])

    if (error) {
      console.error("DB insert error:", error)
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({ success: true })

  } catch (err: any) {
    console.error("Unexpected error:", err)
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
  }
}
