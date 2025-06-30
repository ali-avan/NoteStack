'use client'
import { useEffect } from "react"
import { useQuery } from "@tanstack/react-query"
import { fetchUserNotes } from "@/lib/notesApi"
import NoteForm from "@/components/NoteForm"
import NoteItem from "@/components/NoteItem"
import LogoutButton from "@/component/LogoutButton"

export default function NotesPage() {

    useEffect(() => {
    console.log(" NotesPage mounted in the browser")
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
    <div
      className="min-h-screen bg-cover bg-center bg-no-repeat flex flex-col items-center justify-start py-10 px-4 text-center"
      style={{ backgroundImage: `url('/photos/bg.jpg')` }}
    >
      <h1 className="text-3xl font-bold mb-6 text-black bg-emerald-500 bg-opacity-60 p-2 px-4 rounded-full">
        Notes Page
      </h1>

      <NoteForm onNoteCreated={refetch} />

      {isLoading && <p className="text-center text-gray-500">Loading notes...</p>}
      {isError && <p className="text-center text-red-500">Error loading notes</p>}

      <ul className="space-y-4 w-full max-w-md">
        {notes.map((note: any) => (
          <NoteItem key={note.id} note={note} onChange={refetch} />
        ))}
      </ul>

      <div className="mt-10">
        <LogoutButton />
      </div>
    </div>
  )
}
