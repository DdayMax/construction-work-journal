import { $interceptedApi } from "@/shared/lib/wretchInterceptor"
import { WorkType } from "../model"

const WorkTypeServiceRoutes = {
  getWorkTypes: "/workTypes",
} as const

export const WorkTypeService = {
  async getWorkTypes() {
    return await $interceptedApi("/api")
      .get(WorkTypeServiceRoutes.getWorkTypes)
      .json<WorkType[]>()
  },
}
