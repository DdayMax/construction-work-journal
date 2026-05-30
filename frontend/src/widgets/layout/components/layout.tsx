import { Header } from "@/widgets/header"
import { Sidebar } from "@/widgets/sidebar"
import { Outlet } from "react-router-dom"

export const Layout = () => {
  return (
    <div className="flex min-h-screen bg-muted/40">
      <Sidebar />

      <div className="flex flex-1 flex-col">
        <Header />

        <main className="flex-1 p-6">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
