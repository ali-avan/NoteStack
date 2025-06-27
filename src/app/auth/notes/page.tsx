'use client'

import React, { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import LogoutButton from "@/component/LogoutButton"
import { useQuery } from "@tanstack/react-query"
import axios from "@/lib/axios"
import { supabase } from "@/lib/supabaseClient"

const fetchUserNotes = async () => {
  const {
    data: { session },
  } = await supabase.auth.getSession()

  if (!session) throw new Error("Session expired")

  const res = await axios.get("notes/get", {
    headers: {
      Authorization: `Bearer ${session.access_token}`,
    },
  })

  return res.data
}

export default function Notes() {
  const router = useRouter()
  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")
  const [notesState, setNotes] = useState<any[]>([])

  const { data: notes = [], isLoading, isError, refetch } = useQuery({
    queryKey: ["notes"],
    queryFn: fetchUserNotes,
  })

  useEffect(() => {
  const hydratedNotes = notes.map((n: any) => ({ ...n, isEditing: false }))
  const isDifferent =
    notesState.length !== hydratedNotes.length ||
    notesState.some((n, i) => n.id !== hydratedNotes[i]?.id)

  if (isDifferent) {
    setNotes(hydratedNotes)
  }
}, [notes])


  const handleCreateNote = async (e: React.FormEvent) => {
  e.preventDefault()

  const {
    data: { session },
  } = await supabase.auth.getSession()

  if (!session) {
    console.error("No session found")
    return
  }

  try {
    await axios.post(
      "notes/create",
      { title, content },
      {
        headers: {
          Authorization: `Bearer ${session.access_token}`,
        },
      }
    )

    setTitle("")
    setContent("")
    await refetch()
  } catch (err: any) {
    console.error(err.response?.data?.message || err.message)
  }
}


  const handleUpdateNote = async (id: string) => {
  const note = notesState.find((n) => n.id === id)
  if (!note) return

  const {
    data: { session },
  } = await supabase.auth.getSession()

  if (!session) {
    console.error("No session found")
    return
  }

  try {
     await axios.put(
      "/notes/update",
      {
        id,
        title: note.editTitle,
        content: note.editContent,
      },
      {
        headers: {
          Authorization: `Bearer ${session.access_token}`,
        },
      }
    )

    // Turn off editing mode for the updated note
    setNotes((prev) =>
      prev.map((n) =>
        n.id === id
          ? {
              ...n,
              title: note.editTitle,
              content: note.editContent,
              isEditing: false,
            }
          : n
      )
    )

    await refetch()
  } catch (err) {
    console.error("Update failed:", err)
  }
}


  const handleDeleteNote = async (id: string) => {
  const {
    data: { session },
  } = await supabase.auth.getSession()

  if (!session) {
    console.error("No session found")
    return
  }

  try {
    await axios.delete("/notes/delete", {
      data: { id },
      headers: {
        Authorization: `Bearer ${session.access_token}`,
      },
    })
    await refetch()
  } catch (err) {
    console.error("Delete failed:", err)
  }
}


  const toggleEdit = (id: string, isEditing: boolean) => {
    setNotes((prev) =>
      prev.map((note) =>
        note.id === id
          ? {
              ...note,
              isEditing,
              editTitle: note.title,
              editContent: note.content,
            }
          : { ...note, isEditing: false }
      )
    )
  }

  if (isLoading) return <div className="text-center mt-10">Loading notes...</div>
  if (isError) return <div className="text-center mt-10 text-red-500">Error fetching notes.</div>

  return (
    <div
      className="min-h-screen bg-cover bg-center bg-no-repeat flex flex-col items-center justify-start py-10 px-4 text-center"
      style={{ backgroundImage: `url('/photos/bg.jpg')` }}
    >
      <h1 className="text-3xl font-bold mb-6 text-black bg-emerald-500 bg-opacity-60 p-2 px-4 rounded-full">
        Notes Page
      </h1>

      <form
        onSubmit={handleCreateNote}
        className="bg-white p-6 rounded shadow mb-8 w-full max-w-md"
      >
        <h2 className="text-xl font-semibold mb-4">Create a New Note</h2>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          className="w-full mb-3 p-2 border border-gray-300 rounded"
        />
        <textarea
          placeholder="Content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
          rows={4}
          className="w-full mb-3 p-2 border border-gray-300 rounded"
        />
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded w-full"
        >
          Create Note
        </button>
      </form>

      {notesState.length === 0 ? (
        <p className="text-gray-600">No notes found.</p>
      ) : (
        <ul className="space-y-4 w-full max-w-md">
          {notesState.map((note) => (
            <li key={note.id} className="bg-white p-4 rounded shadow text-left">
              {note.isEditing ? (
                <>
                  <input
                    type="text"
                    value={note.editTitle}
                    onChange={(e) =>
                      setNotes((prev) =>
                        prev.map((n) =>
                          n.id === note.id ? { ...n, editTitle: e.target.value } : n
                        )
                      )
                    }
                    className="w-full mb-2 p-2 border rounded"
                  />
                  <textarea
                    value={note.editContent}
                    onChange={(e) =>
                      setNotes((prev) =>
                        prev.map((n) =>
                          n.id === note.id ? { ...n, editContent: e.target.value } : n
                        )
                      )
                    }
                    className="w-full mb-2 p-2 border rounded"
                    rows={3}
                  />
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleUpdateNote(note.id)}
                      className="bg-green-500 text-white px-3 py-1 rounded"
                    >
                      Save
                    </button>
                    <button
                      onClick={() => toggleEdit(note.id, false)}
                      className="bg-gray-400 text-white px-3 py-1 rounded"
                    >
                      Cancel
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <h2 className="text-xl font-semibold">{note.title}</h2>
                  <p className="text-gray-700 mt-2">{note.content}</p>
                  <p className="text-sm text-gray-400 mt-1">
                    Created at: {new Date(note.created_at).toLocaleString()}
                  </p>
                  <div className="flex space-x-2 mt-2">
                    <button
                      onClick={() => toggleEdit(note.id, true)}
                      className="bg-yellow-400 text-white px-3 py-1 rounded"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeleteNote(note.id)}
                      className="bg-red-500 text-white px-3 py-1 rounded"
                    >
                      Delete
                    </button>
                  </div>
                </>
              )}
            </li>
          ))}
        </ul>
      )}

      <div className="mt-10">
        <LogoutButton />
      </div>
    </div>
  )
}
