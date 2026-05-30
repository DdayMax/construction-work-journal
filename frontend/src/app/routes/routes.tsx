import { SettingsPage } from "@/pages/settings"
import { WorkLogPage } from "@/pages/work-log"
import { ErrorBoundary } from "@/widgets/error-boundary"
import { Layout } from "@/widgets/layout"
import { createBrowserRouter, Navigate } from "react-router-dom"
import { RoutesList } from "./types"

const routes = [
  {
    path: RoutesList.RootPage,
    element: <Layout />,
    errorElement: <ErrorBoundary />,
    children: [
      {
        index: true,
        element: <Navigate to={RoutesList.WorkLog} replace />,
      },
      {
        path: RoutesList.WorkLog,
        element: <WorkLogPage />,
      },
      {
        path: RoutesList.Settings,
        element: <SettingsPage />,
      },
    ],
  },
]

export const router = createBrowserRouter(routes)
