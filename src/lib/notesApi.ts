// lib/notesApi.ts
import { supabase } from "./supabaseClient"
import axios from "./axios"

export async function fetchUserNotes() {
  const { data: { session } } = await supabase.auth.getSession()
  if (!session) throw new Error("Session expired")

  const res = await axios.get("notes/get", {
    headers: { Authorization: `Bearer ${session.access_token}` },
  })

  return res.data
}

export async function createNote(title: string, content: string) {
  const { data: { session } } = await supabase.auth.getSession()
  if (!session) throw new Error("No session")

  return axios.post("notes/create", { title, content }, {
    headers: { Authorization: `Bearer ${session.access_token}` },
  })
}

export async function updateNote(id: string, title: string, content: string) {
  const { data: { session } } = await supabase.auth.getSession()
  if (!session) throw new Error("No session")

  return axios.put("/notes/update", { id, title, content }, {
    headers: { Authorization: `Bearer ${session.access_token}` },
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
