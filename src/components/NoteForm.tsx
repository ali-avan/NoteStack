'use client'

import { useState } from "react"
import { createNote } from "@/lib/notesApi"
export default function NoteForm({ onNoteCreated }: { onNoteCreated: () => void }) {
  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      await createNote(title, content)
      setTitle("")
      setContent("")
      onNoteCreated()
    } catch (err: any) {
      console.error(err.message)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow mb-8 w-full max-w-md">
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
        className="w-full mb-3 p-2 border border-gray-300 rounded resize-none"
      />
      <button
        type="submit"
        className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded w-full"
      >
        Create Note
      </button>
    </form>
  )
}
