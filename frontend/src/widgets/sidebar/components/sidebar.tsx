import logo from "@/shared/images/logo.png"
import { ClipboardList, Settings } from "lucide-react"
import { FC } from "react"
import { NavLink } from "react-router-dom"

export const Sidebar: FC = () => {
  return (
    <aside className="hidden w-64 border-r bg-background lg:block">
      <div className="flex h-16 items-center border-b px-6">
        <NavLink to="/" className="flex items-center">
          <img src={logo} alt="Construction CRM" className="h-20 w-auto" />
        </NavLink>
      </div>

      <nav className="space-y-2 p-4">
        <NavLink to="/workLog" className={linkClass}>
          <ClipboardList size={18} />
          Журнал
        </NavLink>

        <NavLink to="/settings" className={linkClass}>
          <Settings size={18} />
          Настройки
        </NavLink>
      </nav>
    </aside>
  )
}

const linkClass = ({ isActive }: { isActive: boolean }) =>
  `flex items-center gap-2 rounded-lg px-3 py-2 transition-colors ${
    isActive ? "bg-muted font-medium" : "hover:bg-muted"
  }`
