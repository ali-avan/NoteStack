'use client'

import { useEffect } from "react"
import { useQuery } from "@tanstack/react-query"
import { fetchUserNotes } from "@/lib/notesApi"
import NoteForm from "@/components/NoteForm"
import NoteItem from "@/components/NoteItem"
import LogoutButton from "@/component/LogoutButton"
import { useRouter } from "next/navigation"

export default function NotesPage() {
  const router = useRouter()

  useEffect(() => {
    console.log("NotesPage mounted in the browser")
  }, [])

  const {
    data: notes = [],
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: ["notes"],
    queryFn: fetchUserNotes,
  })

  return (
    <div className="relative min-h-screen text-center bg-gray-100">
      {/* Background Image Layer */}
      <div
        className="absolute inset-0 bg-cover bg-center z-0"
        style={{ backgroundImage: `url('/photos/bg.jpg')` }}
      ></div>

      {/* Overlay for content */}
      <div className="relative z-10">
        {/* Fixed Top Bar */}
        <div className="fixed top-0 left-0 w-full flex justify-between items-center px-4 py-3 bg-emerald-700 bg-opacity-95 shadow-md z-50">
          <button
            onClick={() => router.back()}
            className="text-white bg-black px-4 py-2 rounded hover:bg-gray-800"
          >
            ← Back
          </button>
          <LogoutButton />
        </div>

        {/* Main Content */}
        <div className="flex flex-col items-center justify-start pt-28 px-4">
          <h1 className="text-3xl font-bold mb-6 text-black bg-emerald-500 bg-opacity-70 p-2 px-6 rounded-full">
            Notes Page
          </h1>

          <NoteForm onNoteCreated={refetch} />

          {isLoading && <p className="text-gray-600">Loading notes...</p>}
          {isError && <p className="text-red-600">Error loading notes</p>}

          <ul className="space-y-4 w-full max-w-md">
            {notes.map((note: any) => (
              <NoteItem key={note.id} note={note} onChange={refetch} />
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}
