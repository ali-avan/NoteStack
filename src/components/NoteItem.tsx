'use client'

import { useState } from "react"
import { updateNote, deleteNote } from "@/lib/notesApi"

export default function NoteItem({ note, onChange }: { note: any; onChange: () => void }) {
  const [isEditing, setIsEditing] = useState(false)
  const [editTitle, setEditTitle] = useState(note.title)
  const [editContent, setEditContent] = useState(note.content)

  const handleUpdate = async () => {
    await updateNote(note.id, editTitle, editContent)
    setIsEditing(false)
    onChange()
  }

  const handleDelete = async () => {
    await deleteNote(note.id)
    onChange()
  }

  return (
    <li className="bg-white p-4 rounded shadow text-left">
      {isEditing ? (
        <>
          <input
            value={editTitle}
            onChange={(e) => setEditTitle(e.target.value)}
            className="w-full mb-2 p-2 border rounded"
          />
          <textarea
            value={editContent}
            onChange={(e) => setEditContent(e.target.value)}
            className="w-full mb-2 p-2 border rounded"
            rows={3}
          />
          <div className="flex space-x-2">
            <button onClick={handleUpdate} className="bg-green-500 text-white px-3 py-1 rounded">
              Save
            </button>
            <button onClick={() => setIsEditing(false)} className="bg-gray-400 text-white px-3 py-1 rounded">
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
            <button onClick={() => setIsEditing(true)} className="bg-yellow-400 text-white px-3 py-1 rounded">
              Edit
            </button>
            <button onClick={handleDelete} className="bg-red-500 text-white px-3 py-1 rounded">
              Delete
            </button>
          </div>
        </>
      )}
    </li>
  )
}
