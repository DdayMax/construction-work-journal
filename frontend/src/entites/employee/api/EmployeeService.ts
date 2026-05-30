import { $interceptedApi } from "@/shared/lib/wretchInterceptor"
import { Employee } from "../model"

const EmployeeRoutes = {
  getAllEmployees: "/employees",
} as const

export const EmployeeService = {
  async getEmployees() {
    return await $interceptedApi("/api")
      .get(EmployeeRoutes.getAllEmployees)
      .json<Employee[]>()
  },
}
