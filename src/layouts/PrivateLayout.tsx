// src/layouts/PrivateLayout.tsx
import { Outlet } from "react-router-dom"

export default function PrivateLayout() {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="p-4 border-b">Private Header</header>
      <main className="flex-1 p-4">
        <Outlet />
      </main>
      <footer className="p-4 border-t">Private Footer</footer>
    </div>
  )
}

