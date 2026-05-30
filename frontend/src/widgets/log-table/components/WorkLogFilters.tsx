import { zodResolver } from "@hookform/resolvers/zod"
import { format } from "date-fns"
import { ru } from "date-fns/locale"
import { CalendarIcon, RotateCcw, X } from "lucide-react"
import { useState } from "react"
import { Controller, useForm } from "react-hook-form"
import { z } from "zod"

import { cn } from "@/shared/lib/utils"
import { Button } from "@/shared/ui/button"
import { Calendar } from "@/shared/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/shared/ui/popover"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/ui/select"

import { Employee } from "@/entites/employee/model"
import { WorkType } from "@/entites/workType/model"

const filtersSchema = z.object({
  dateFrom: z.date().optional(),
  dateTo: z.date().optional(),
  workTypeId: z.number().optional(),
  employeeId: z.number().optional(),
})

export type WorkLogFiltersValues = z.infer<typeof filtersSchema>

type Props = {
  workTypes: WorkType[]
  employees: Employee[]
  onApplyFilters: (filters: WorkLogFiltersValues) => void
  onResetFilters: () => void
  isLoading?: boolean
}

export function WorkLogFilters({
  workTypes,
  employees,
  onApplyFilters,
  onResetFilters,
  isLoading = false,
}: Props) {
  const [isDateRangeOpen, setIsDateRangeOpen] = useState(false)

  const { control, handleSubmit, reset, watch } = useForm<WorkLogFiltersValues>(
    {
      resolver: zodResolver(filtersSchema),
      defaultValues: {
        dateFrom: undefined,
        dateTo: undefined,
        workTypeId: undefined,
        employeeId: undefined,
      },
    }
  )

  const dateFrom = watch("dateFrom")
  const dateTo = watch("dateTo")
  const workTypeId = watch("workTypeId")
  const employeeId = watch("employeeId")

  const isFiltersActive = !!(dateFrom || dateTo || workTypeId || employeeId)

  const onSubmit = (data: WorkLogFiltersValues) => {
    onApplyFilters(data)
  }

  const handleReset = () => {
    reset({
      dateFrom: undefined,
      dateTo: undefined,
      workTypeId: undefined,
      employeeId: undefined,
    })
    onResetFilters()
  }

  return (
    <div className="space-y-4 rounded-lg border bg-card p-4">
      <div className="flex flex-wrap gap-4">
        <div className="min-w-[240px] flex-1">
          <label className="mb-2 block text-sm font-medium">Период</label>
          <Popover open={isDateRangeOpen} onOpenChange={setIsDateRangeOpen}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn(
                  "w-full justify-start text-left font-normal",
                  !dateFrom && !dateTo && "text-muted-foreground"
                )}
                disabled={isLoading}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {dateFrom || dateTo ? (
                  `${dateFrom ? format(dateFrom, "dd.MM.yyyy") : "..."} - ${
                    dateTo ? format(dateTo, "dd.MM.yyyy") : "..."
                  }`
                ) : (
                  <span>Выберите период</span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <div className="p-3">
                <div className="space-y-2">
                  <Controller
                    name="dateFrom"
                    control={control}
                    render={({ field }) => (
                      <div className="space-y-1">
                        <label className="text-sm">Дата от</label>
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          locale={ru}
                        />
                      </div>
                    )}
                  />
                  <Controller
                    name="dateTo"
                    control={control}
                    render={({ field }) => (
                      <div className="space-y-1">
                        <label className="text-sm">Дата до</label>
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          locale={ru}
                        />
                      </div>
                    )}
                  />
                  <Button
                    size="sm"
                    onClick={() => setIsDateRangeOpen(false)}
                    className="w-full"
                  >
                    Применить
                  </Button>
                </div>
              </div>
            </PopoverContent>
          </Popover>
        </div>

        <div className="min-w-[200px] flex-1">
          <label className="mb-2 block text-sm font-medium">Вид работ</label>
          <Controller
            name="workTypeId"
            control={control}
            render={({ field }) => (
              <Select
                value={field.value ? String(field.value) : ""}
                onValueChange={(v) => field.onChange(v ? Number(v) : undefined)}
                disabled={isLoading}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Все виды работ" />
                </SelectTrigger>
                <SelectContent>
                  {workTypes.map((type) => (
                    <SelectItem key={type.id} value={String(type.id)}>
                      {type.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          />
        </div>

        <div className="min-w-[200px] flex-1">
          <label className="mb-2 block text-sm font-medium">Исполнитель</label>
          <Controller
            name="employeeId"
            control={control}
            render={({ field }) => (
              <Select
                value={field.value ? String(field.value) : ""}
                onValueChange={(v) => field.onChange(v ? Number(v) : undefined)}
                disabled={isLoading}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Все исполнители" />
                </SelectTrigger>
                <SelectContent>
                  {employees.map((employee) => (
                    <SelectItem key={employee.id} value={String(employee.id)}>
                      {employee.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          />
        </div>

        <div className="w-[120px]">
          <div className="flex flex-col gap-2">
            <Button
              type="button"
              onClick={handleSubmit(onSubmit)}
              disabled={isLoading}
              className="w-full"
            >
              Применить
            </Button>

            <Button
              type="button"
              variant="outline"
              onClick={handleReset}
              disabled={isLoading || !isFiltersActive}
              className="w-full"
            >
              <RotateCcw className="mr-2 h-4 w-4" />
              Сбросить
            </Button>
          </div>
        </div>
      </div>

      {isFiltersActive && (
        <div className="flex flex-wrap gap-2 pt-2">
          {dateFrom && (
            <div className="flex items-center gap-1 rounded-full bg-secondary px-3 py-1 text-sm">
              <span>От: {format(dateFrom, "dd.MM.yyyy")}</span>
              <button
                onClick={() => reset({ ...watch(), dateFrom: undefined })}
                className="ml-1 hover:text-destructive"
              >
                <X className="h-3 w-3" />
              </button>
            </div>
          )}
          {dateTo && (
            <div className="flex items-center gap-1 rounded-full bg-secondary px-3 py-1 text-sm">
              <span>До: {format(dateTo, "dd.MM.yyyy")}</span>
              <button
                onClick={() => reset({ ...watch(), dateTo: undefined })}
                className="ml-1 hover:text-destructive"
              >
                <X className="h-3 w-3" />
              </button>
            </div>
          )}
          {workTypeId && (
            <div className="flex items-center gap-1 rounded-full bg-secondary px-3 py-1 text-sm">
              <span>
                Вид: {workTypes.find((w) => w.id === workTypeId)?.name}
              </span>
              <button
                onClick={() => reset({ ...watch(), workTypeId: undefined })}
                className="ml-1 hover:text-destructive"
              >
                <X className="h-3 w-3" />
              </button>
            </div>
          )}
          {employeeId && (
            <div className="flex items-center gap-1 rounded-full bg-secondary px-3 py-1 text-sm">
              <span>
                Исполнитель: {employees.find((e) => e.id === employeeId)?.name}
              </span>
              <button
                onClick={() => reset({ ...watch(), employeeId: undefined })}
                className="ml-1 hover:text-destructive"
              >
                <X className="h-3 w-3" />
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
