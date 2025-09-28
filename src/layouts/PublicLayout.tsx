// src/layouts/PublicLayout.tsx
import FloatingNav  from "@/components/FloatingNav"
import { Outlet } from "react-router-dom"

export default function PublicLayout() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* <header className="p-4 border-b">Public Header
        
      </header> */}
      <main className="flex-1 p-4">
        <Outlet />
      </main>
      <footer className="p-4 border-t bg-background border-2">
        {/* <FloatingNav /> */}
      </footer>
    </div>
  )
}
