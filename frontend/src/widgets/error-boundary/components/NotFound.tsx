import { Button } from "@/shared/ui/button"
import { ArrowLeft } from "lucide-react"
import { FC } from "react"
import { useNavigate } from "react-router-dom"

export const NotFound: FC = () => {
  const navigate = useNavigate()

  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center px-4 text-center">
      <div className="space-y-3">
        <h1 className="text-7xl font-bold tracking-tight">404</h1>

        <h2 className="text-2xl font-semibold">Страница не найдена</h2>

        <p className="max-w-md text-muted-foreground">
          Страница, к которой вы пытаетесь получить доступ, не существует или,
          возможно, была перемещена.
        </p>
      </div>

      <Button className="mt-8" onClick={() => navigate(-1)}>
        <ArrowLeft />
        Назад
      </Button>
    </div>
  )
}
