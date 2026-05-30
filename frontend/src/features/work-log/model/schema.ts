import { z } from "zod"

export const createWorkLogSchema = z.object({
  performedAt: z.string().min(1, "Дата обязательна"),
  workTypeId: z.number().min(1, "Выберите вид работы"),
  // amount: z.number().min(0.1, "Объем должен быть больше 0"),
  amount: z.number(),
  employeeId: z.number().min(1, "Выберите сотрудника"),
})

export type CreateWorkLogFormValues = z.infer<typeof createWorkLogSchema>

export type UpdateWorkLogFormValues = CreateWorkLogFormValues & {
  id: number
}
