import { isRouteErrorResponse, useRouteError } from "react-router-dom"
import { NotFound } from "./NotFound"

export const ErrorBoundary = () => {
  const error = useRouteError()

  if (isRouteErrorResponse(error)) {
    if (error.status === 404) {
      return <NotFound />
    }

    if (error.status === 503) {
      return <div>Looks like our API is down</div>
    }
  }

  if (error instanceof Response) {
    if (error.status === 404) return <NotFound />
    if (error.status === 503) return <div>Looks like our API is down</div>
    return <div>HTTP {error.status}</div>
  }

  return <div>Something went wrong</div>
}
