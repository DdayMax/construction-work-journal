import { zodResolver } from "@hookform/resolvers/zod"
import { useEffect, useMemo } from "react"
import { Controller, useForm } from "react-hook-form"

import { Button } from "@/shared/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/shared/ui/dialog"
import { Input } from "@/shared/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/ui/select"

import { Employee } from "@/entites/employee/model"
import { WorkType } from "@/entites/workType/model"
import {
  CreateWorkLogFormValues,
  createWorkLogSchema,
  UpdateWorkLogFormValues,
} from "../model/schema"

type Mode = "create" | "edit"

type Props = {
  open: boolean
  onOpenChange: (v: boolean) => void
  mode: Mode
  initialData?: UpdateWorkLogFormValues
  workTypes: WorkType[]
  employees: Employee[]
  onSubmit: (values: CreateWorkLogFormValues, mode: Mode, id?: number) => void
}

export function WorkLogDialog({
  open,
  onOpenChange,
  mode,
  initialData,
  workTypes,
  employees,
  onSubmit,
}: Props) {
  const form = useForm<CreateWorkLogFormValues>({
    resolver: zodResolver(createWorkLogSchema),
    mode: "onChange",
    defaultValues: {
      performedAt: "",
      workTypeId: 0,
      amount: 0,
      employeeId: 0,
    },
  })

  useEffect(() => {
    if (mode === "edit" && initialData) {
      form.reset({
        performedAt: initialData.performedAt,
        workTypeId: initialData.workTypeId,
        amount: initialData.amount,
        employeeId: initialData.employeeId,
      })
    }

    if (mode === "create") {
      form.reset({
        performedAt: new Date().toISOString().slice(0, 10),
        workTypeId: 0,
        amount: 0,
        employeeId: 0,
      })
    }
  }, [mode, initialData, form, open])

  const watchWorkTypeId = form.watch("workTypeId")
  const selectedWorkType = useMemo(
    () => workTypes.find((w) => w.id === watchWorkTypeId),
    [workTypes, watchWorkTypeId]
  )

  const handleSubmit = (values: CreateWorkLogFormValues) => {
    onSubmit(values, mode, initialData?.id)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="w-full max-w-md">
        <DialogHeader>
          <DialogTitle>
            {mode === "create" ? "Создать запись" : "Редактировать запись"}
          </DialogTitle>
        </DialogHeader>

        <form
          onSubmit={form.handleSubmit(handleSubmit)}
          className="w-full space-y-4"
        >
          <Controller
            name="performedAt"
            control={form.control}
            render={({ field, fieldState }) => (
              <div className="w-full space-y-2">
                <label className="text-sm font-medium">Дата</label>
                <Input type="date" className={fieldClass} {...field} />
                {fieldState.error && (
                  <p className="text-sm text-red-500">
                    {fieldState.error.message}
                  </p>
                )}
              </div>
            )}
          />

          <Controller
            name="workTypeId"
            control={form.control}
            render={({ field, fieldState }) => (
              <div className="w-full space-y-2">
                <label className="text-sm font-medium">Вид работы</label>
                <Select
                  value={field.value ? String(field.value) : ""}
                  onValueChange={(v) => field.onChange(Number(v))}
                >
                  <SelectTrigger className={fieldClass}>
                    <SelectValue placeholder="Выберите выполненную работу" />
                  </SelectTrigger>
                  <SelectContent>
                    {workTypes.map((w) => (
                      <SelectItem key={w.id} value={String(w.id)}>
                        {w.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {fieldState.error && (
                  <p className="text-sm text-red-500">
                    {fieldState.error.message}
                  </p>
                )}
              </div>
            )}
          />

          <Controller
            name="amount"
            control={form.control}
            render={({ field, fieldState }) => (
              <div className="w-full space-y-2">
                <label className="text-sm font-medium">Объём</label>
                <div className="flex w-full items-center gap-2">
                  <Input
                    type="number"
                    className={fieldClass}
                    value={field.value === undefined ? "" : field.value}
                    onChange={(e) => {
                      const value = e.target.value
                      if (value === "") {
                        field.onChange(0)
                      } else {
                        const num = Number(value)
                        if (!isNaN(num)) {
                          field.onChange(num)
                        }
                      }
                    }}
                  />
                  <span className="w-10 text-sm text-muted-foreground">
                    {selectedWorkType?.unit ?? ""}
                  </span>
                </div>
                {fieldState.error && (
                  <p className="text-sm text-red-500">
                    {fieldState.error.message}
                  </p>
                )}
              </div>
            )}
          />

          <Controller
            name="employeeId"
            control={form.control}
            render={({ field, fieldState }) => (
              <div className="w-full space-y-2">
                <label className="text-sm font-medium">Исполнитель</label>
                <Select
                  value={field.value ? String(field.value) : ""}
                  onValueChange={(v) => field.onChange(Number(v))}
                >
                  <SelectTrigger className={fieldClass}>
                    <SelectValue placeholder="Выберите исполнителя" />
                  </SelectTrigger>
                  <SelectContent>
                    {employees.map((e) => (
                      <SelectItem key={e.id} value={String(e.id)}>
                        {e.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {fieldState.error && (
                  <p className="text-sm text-red-500">
                    {fieldState.error.message}
                  </p>
                )}
              </div>
            )}
          />

          <div className="flex justify-end gap-2 pt-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
            >
              Отмена
            </Button>
            <Button type="submit">
              {mode === "create" ? "Создать" : "Сохранить"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}

const fieldClass = "w-full h-10 text-sm"
