// lib/notesApi.ts
import { supabase } from "./supabaseClient"
import axios from "./axios"

export async function fetchUserNotes() {
  const { data: { session } } = await supabase.auth.getSession()
  if (!session) throw new Error("Session expired")

  const res = await axios.get("/notes/get", {
    headers: { Authorization: `Bearer ${session.access_token}` },
  })

  return res.data
}

export async function createNote(formData: FormData) {
  const { data: { session } } = await supabase.auth.getSession()
  if (!session) throw new Error("No session")

  return axios.post("/notes/create", formData, {
    headers: {
      Authorization: `Bearer ${session.access_token}`,
      'Content-Type': 'multipart/form-data',
    },
  })
}

export async function updateNote(
  id: string,
  title: string,
  content: string,
  degree: string,
  semester: string | number,
  file?: File
) {
  const { data: { session } } = await supabase.auth.getSession()
  if (!session) throw new Error("No session")

  const formData = new FormData()
  formData.append("id", id)
  formData.append("title", title)
  formData.append("content", content)
  formData.append("degree", degree)
  formData.append("semester", semester.toString())
  if (file) {
    formData.append("file", file)
  }

  return axios.put("/notes/update", formData, {
    headers: {
      Authorization: `Bearer ${session.access_token}`,
      "Content-Type": "multipart/form-data",
    },
  })
}


export async function deleteNote(id: string) {
  const { data: { session } } = await supabase.auth.getSession()
  if (!session) throw new Error("No session")

  return axios.delete("/notes/delete", {
    data: { id },
    headers: { Authorization: `Bearer ${session.access_token}` },
  })
}
