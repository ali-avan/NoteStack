'use client'

import { useState } from "react"
import { updateNote, deleteNote } from "@/lib/notesApi"

export default function NoteItem({ note, onChange }: { note: any; onChange: () => void }) {
  const [isEditing, setIsEditing] = useState(false)
  const [editTitle, setEditTitle] = useState(note.title)
  const [editContent, setEditContent] = useState(note.content)
  const [editsemester, seteditsemester] = useState(note.semester)
  const [editdegree, seteditdegree] = useState(note.degree)
  const [newFile, setNewFile] = useState<File | null>(null)

  const handleUpdate = async () => {
    await updateNote(
      note.id,
      editTitle,
      editContent,
      editdegree,
      editsemester,
      newFile ?? undefined
    )
    setIsEditing(false)
    onChange()
  }

  const handleDelete = async () => {
    await deleteNote(note.id)
    onChange()
  }

  return (
    <li className="bg-black p-4 rounded shadow text-left">
      {isEditing ? (
        <>
          <input
            value={editTitle}
            onChange={(e) => setEditTitle(e.target.value)}
            className="w-full mb-2 p-2 border rounded text-black"
            placeholder="Enter title..."
          />
          <textarea
            value={editContent}
            onChange={(e) => setEditContent(e.target.value)}
            className="w-full mb-2 p-2 border rounded resize-none text-black"
            rows={3}
            placeholder="Enter content..."
          />
          <input
            value={editdegree}
            onChange={(e) => seteditdegree(e.target.value)}
            className="w-full mb-2 p-2 border rounded text-black"
            placeholder="Enter degree..."
          />
          <input
            value={editsemester}
            onChange={(e) => seteditsemester(e.target.value)}
            className="w-full mb-2 p-2 border rounded text-black"
            placeholder="Enter semester..."
          />

          {/* File input */}
          <input
            type="file"
            accept="image/*,.pdf,.doc,.docx"
            onChange={(e) => setNewFile(e.target.files?.[0] || null)}
            className="w-full mb-4 p-2 border rounded bg-white text-black"
          />

          {/* Image preview if new image selected */}
          {newFile && newFile.type.startsWith("image") && (
            <img
              src={URL.createObjectURL(newFile)}
              alt="Preview"
              className="mt-2 max-h-64 rounded object-contain"
            />
          )}

          <div className="flex space-x-2">
            <button onClick={handleUpdate} className="bg-green-500 text-white px-3 py-1 rounded">
              Save
            </button>
            <button
              onClick={() => setIsEditing(false)}
              className="bg-gray-400 text-white px-3 py-1 rounded"
            >
              Cancel
            </button>
          </div>
        </>
      ) : (
        <>
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold text-white">{note.title}</h2>
            <p className="text-white text-sm">Semester: {note.semester}</p>
          </div>

          <p className="text-sm text-white">Degree: {note.degree}</p>
          <p className="text-white mt-2">{note.content}</p>

          {note.file_url && note.file_url.match(/\.(jpeg|jpg|png|gif)$/i) && (
            <img
              src={note.file_url}
              alt="Note Attachment"
              className="mt-4 rounded w-full max-h-96 object-contain"
            />
          )}

          {note.file_url && !note.file_url.match(/\.(jpeg|jpg|png|gif)$/i) && (
            <a
              href={note.file_url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 underline block mt-4"
            >
              View Attachment
            </a>
          )}

          <p className="text-sm text-white mt-1">
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
