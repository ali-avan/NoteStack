'use client'

import { useState } from "react"
import { useQuery } from "@tanstack/react-query"
import { fetchUserNotes } from "@/lib/notesApi"
import NoteItem from "@/components/NoteItem"
import DashboardLayout from "@/component/DashboardLayout"

export default function MyContentPage() {
  const [searchTerm, setSearchTerm] = useState("")

  const {
    data: notes = [],
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: ["notes"],
    queryFn: fetchUserNotes,
  })

  const filteredNotes = notes.filter((note: any) =>
    [note.title, note.content, note.degree, note.semester]
      .join(" ")
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  )

  return (
    <DashboardLayout>
      <div className="bg-opacity-60 backdrop-blur-lg rounded-lg shadow-xl p-6 w-full max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold text-center text-white mb-6">
          My Notes
        </h1>

        {/* Search Bar */}
        <div className="mb-6">
          <input
            type="text"
            placeholder="Search notes..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-emerald-600 transition text-black"
          />
        </div>

        {isLoading && <p className="text-center text-gray-300">Loading notes...</p>}
        {isError && <p className="text-center text-red-400">Error loading notes</p>}

        {filteredNotes.length === 0 ? (
          <p className="text-center text-gray-100">No notes found.</p>
        ) : (
          <ul className="space-y-4">
            {filteredNotes.map((note: any) => (
              <NoteItem key={note.id} note={note} onChange={refetch} />
            ))}
          </ul>
        )}
      </div>
    </DashboardLayout>
  )
}
