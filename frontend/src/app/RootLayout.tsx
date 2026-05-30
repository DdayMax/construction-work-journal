import { QueryClientProvider } from "@tanstack/react-query"
import { ReactQueryDevtools } from "@tanstack/react-query-devtools"
import { FC } from "react"
import { RouterProvider } from "react-router-dom"
import { Toaster } from "sonner"
import { queryClient } from "./queryClient"
import { router } from "./routes/routes"

// eslint-disable-next-line react/no-multi-comp
export const RootLayout: FC = () => (
  <QueryClientProvider client={queryClient}>
    <RouterProvider router={router} />
    <ReactQueryDevtools initialIsOpen={false} />
    <Toaster position="top-right" richColors />
  </QueryClientProvider>
)
