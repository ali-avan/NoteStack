'use client'

import { useState } from "react"
import { createNote } from "@/lib/notesApi"

export default function NoteForm({ onNoteCreated }: { onNoteCreated: () => void }) {
  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")
  const [degree, setDegree] = useState("")
  const [semester, setSemester] = useState("1")
  const [file, setFile] = useState<File | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const formData = new FormData()
    formData.append("title", title)
    formData.append("content", content)
    formData.append("degree", degree)
    formData.append("semester", semester)
    if (file) formData.append("file", file)

    try {
      await createNote(formData)
      setTitle("")
      setContent("")
      setDegree("")
      setSemester("1")
      setFile(null)
      onNoteCreated()
    } catch (err: any) {
      console.error(err.message)
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-gray-800 bg-opacity-90 text-white p-6 rounded-lg shadow-md w-full max-w-2xl space-y-4"
    >
      <h2 className="text-2xl font-semibold text-center mb-4">Create a New Note</h2>

      <input
        type="text"
        placeholder="Title..."
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
        className="w-full p-2 border border-gray-300 rounded text-black"
      />

      <textarea
        placeholder="Enter your note here..."
        value={content}
        onChange={(e) => setContent(e.target.value)}
        required
        rows={4}
        className="w-full p-2 border border-gray-300 rounded resize-none text-black"
      />

      <input
        type="text"
        placeholder="Degree Program (e.g. BSCS)"
        value={degree}
        onChange={(e) => setDegree(e.target.value)}
        required
        className="w-full p-2 border border-gray-300 rounded text-black"
      />

      <select
        value={semester}
        onChange={(e) => setSemester(e.target.value)}
        className="w-full p-2 border border-gray-300 rounded text-white"
      >
        {Array.from({ length: 8 }, (_, i) => (
          <option key={i + 1} value={i + 1}>
            Semester {i + 1}
          </option>
        ))}
      </select>

      <input
        type="file"
        accept="image/*,application/pdf,audio/*"
        onChange={(e) => setFile(e.target.files?.[0] || null)}
        className="text-white"
      />

      <button
        type="submit"
        className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded w-full"
      >
        Upload Note
      </button>
    </form>
  )
}
