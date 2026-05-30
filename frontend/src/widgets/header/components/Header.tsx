import { useMemo } from "react"
import { useLocation } from "react-router-dom"

const routeTitles: Record<string, string> = {
  "/workLog": "Журнал работ",
  "/settings": "Настройки",
}

const defaultTitle = "Страница не найдена"

export const Header = () => {
  const { pathname } = useLocation()

  const title = useMemo(() => {
    if (routeTitles[pathname]) return routeTitles[pathname]

    return defaultTitle
  }, [pathname])
  return (
    <header className="flex h-16 items-center justify-between border-b bg-background px-6">
      <div>
        <h1 className="text-lg font-semibold">{title}</h1>
      </div>
    </header>
  )
}
