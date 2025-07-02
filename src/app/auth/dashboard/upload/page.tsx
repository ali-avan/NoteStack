'use client'

import NoteForm from "@/components/NoteForm"
import { useQuery } from "@tanstack/react-query"
import { fetchUserNotes } from "@/lib/notesApi"
import DashboardLayout from "@/component/DashboardLayout"

export default function UploadPage() {
  const { refetch } = useQuery({
    queryKey: ["notes"],
    queryFn: fetchUserNotes,
  })

  return (
    <DashboardLayout>
      <div className="bg-opacity-60 backdrop-blur-lg rounded-lg shadow-xl p-6 w-full max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold text-center text-white mb-6">
          Upload a Note
        </h1>
        <NoteForm onNoteCreated={refetch} />
      </div>
    </DashboardLayout>
  )
}
