import {
  CreateWorkLogFormValues,
  UpdateWorkLogFormValues,
} from "@/features/work-log/model/schema"
import { $interceptedApi } from "@/shared/lib/wretchInterceptor"
import { GetWorkLogsListRes, GetWorkLogsParams } from "../model"

const WorkLogServiceRoutes = {
  getWorkLogsList: (params?: GetWorkLogsParams) => {
    const searchParams = new URLSearchParams()

    if (params?.limit) {
      searchParams.set("limit", String(params.limit))
    }

    if (params?.dateFrom) {
      searchParams.set("dateFrom", params.dateFrom)
    }

    if (params?.dateTo) {
      searchParams.set("dateTo", params.dateTo)
    }

    if (params?.workTypeId) {
      searchParams.set("workTypeId", String(params.workTypeId))
    }

    if (params?.page) {
      searchParams.set("page", String(params.page))
    }

    if (params?.employeeId) {
      searchParams.set("employeeId", String(params.employeeId))
    }

    if (params?.sortDirection) {
      searchParams.set("sortDirection", params.sortDirection)
    }

    return `/workLogs?${searchParams.toString()}`
  },
  createWorkLog: "/createWorkLog",
  updateWorkLog: "/updateWorkLog",
  deleteWorkLog: "/deleteWorkLog",
} as const

export const WorkLogService = {
  async getWorkLogsList(params?: GetWorkLogsParams) {
    return $interceptedApi("/api")
      .get(WorkLogServiceRoutes.getWorkLogsList(params))
      .json<GetWorkLogsListRes>()
  },

  async createWorkLog(body: CreateWorkLogFormValues) {
    return $interceptedApi("/api")
      .post(body, `${WorkLogServiceRoutes.createWorkLog}`)
      .json()
  },

  async updateWorkLog({ id, ...body }: UpdateWorkLogFormValues) {
    return $interceptedApi("/api")
      .patch(body, `${WorkLogServiceRoutes.updateWorkLog}/${id}`)
      .json()
  },

  async deleteWorkLog(id: number) {
    return $interceptedApi("/api")
      .delete(`${WorkLogServiceRoutes.deleteWorkLog}/${id}`)
      .json()
  },
}
