import { queryClient } from "@/app/queryClient"
import { EmployeeService } from "@/entites/employee/api/EmployeeService"
import { WorkLogService } from "@/entites/work-log/api/WorkLogService"
import { Log } from "@/entites/work-log/model"
import { WorkTypeService } from "@/entites/workType/api/WorkTypeService"
import { WorkLogDialog } from "@/features/work-log"
import {
  CreateWorkLogFormValues,
  UpdateWorkLogFormValues,
} from "@/features/work-log/model/schema"
import { Button } from "@/shared/ui/button"
import { normalizeDateForServer } from "@/shared/utils/converters"
import { LogTable } from "@/widgets/log-table"
import {
  WorkLogFilters,
  WorkLogFiltersValues,
} from "@/widgets/log-table/components/WorkLogFilters"
import { keepPreviousData, useMutation, useQuery } from "@tanstack/react-query"
import { Plus } from "lucide-react"
import { FC, useState } from "react"
import { toast } from "sonner"

export const WorkLogPage: FC = () => {
  const [filters, setFilters] = useState<WorkLogFiltersValues>({})
  const [dialogMode, setDialogMode] = useState<"create" | "edit" | null>(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [selectedLog, setSelectedLog] = useState<Log | null>(null)
  const [page, setPage] = useState(1)
  const [sortDirection, setSortDirection] = useState<"ASC" | "DESC">("DESC")

  const handleCreate = () => {
    setSelectedLog(null)
    setDialogMode("create")
    setIsDialogOpen(true)
  }
  const handleEdit = (log: Log) => {
    setSelectedLog(log)
    setDialogMode("edit")
    setIsDialogOpen(true)
  }

  const handleCloseDialog = () => {
    setIsDialogOpen(false)
  }

  const handleSubmit = (
    values: CreateWorkLogFormValues,
    mode: "create" | "edit",
    id?: number
  ) => {
    if (mode === "create") {
      createMutation.mutate(values)
    } else if (mode === "edit" && id) {
      updateMutation.mutate({ id, ...values })
    }
  }

  const createMutation = useMutation({
    mutationFn: (data: CreateWorkLogFormValues) =>
      WorkLogService.createWorkLog(data),
    onSuccess: () => {
      toast.success("Запись успешно создана")
      queryClient.invalidateQueries({ queryKey: ["workLogs"] })
      handleCloseDialog()
    },
    onError: (error: Error) => {
      toast.error("Ошибка при создании записи")
      console.error(error)
    },
  })

  const updateMutation = useMutation({
    mutationFn: (data: UpdateWorkLogFormValues) =>
      WorkLogService.updateWorkLog(data),
    onSuccess: () => {
      toast.success("Запись успешно обновлена")
      queryClient.invalidateQueries({ queryKey: ["workLogs"] })
      handleCloseDialog()
    },
    onError: (error: Error) => {
      toast.error("Ошибка при обновлении записи")
      console.error(error)
    },
  })

  const deleteMutation = useMutation({
    mutationFn: (id: number) => WorkLogService.deleteWorkLog(id),
    onSuccess: () => {
      toast.success("Запись успешно удалена")
      queryClient.invalidateQueries({ queryKey: ["workLogs"] })
    },
    onError: () => {
      toast.error("Ошибка при удалении записи")
    },
  })

  const { data: workLogData, isLoading: isWorkLogLoading } = useQuery({
    queryKey: ["workLogs", filters, page, sortDirection],
    queryFn: () =>
      WorkLogService.getWorkLogsList({
        dateFrom: filters.dateFrom
          ? normalizeDateForServer(filters.dateFrom)
          : undefined,
        dateTo: filters.dateTo
          ? normalizeDateForServer(filters.dateTo)
          : undefined,
        workTypeId: filters.workTypeId,
        employeeId: filters.employeeId,
        sortDirection: sortDirection,
        limit: 10,
        page,
      }),
    placeholderData: keepPreviousData,
  })
  const { data: workTypes = [] } = useQuery({
    queryKey: ["workTypes"],
    queryFn: () => WorkTypeService.getWorkTypes(),
  })
  const { data: employees = [] } = useQuery({
    queryKey: ["employees"],
    queryFn: () => EmployeeService.getEmployees(),
  })

  const handleApplyFilters = (newFilters: WorkLogFiltersValues) => {
    setFilters(newFilters)
    setPage(1)
  }

  const handleResetFilters = () => {
    setFilters({})
    setPage(1)
  }

  return (
    <div className="space-y-6">
      <WorkLogFilters
        workTypes={workTypes}
        employees={employees}
        onApplyFilters={handleApplyFilters}
        onResetFilters={handleResetFilters}
        isLoading={isWorkLogLoading}
      />
      <Button size="lg" onClick={handleCreate}>
        <Plus />
        Добавить запись
      </Button>
      <WorkLogDialog
        mode={dialogMode === "edit" ? "edit" : "create"}
        open={isDialogOpen}
        onOpenChange={(open) => {
          if (!open) {
            handleCloseDialog()
          }
        }}
        initialData={
          selectedLog
            ? {
                id: selectedLog.id,
                performedAt: selectedLog.performedAt.toString().slice(0, 10),
                workTypeId: selectedLog.workType.id,
                amount: selectedLog.amount,
                employeeId: selectedLog.employee.id,
              }
            : undefined
        }
        workTypes={workTypes}
        employees={employees}
        onSubmit={handleSubmit}
      />
      <div className="min-h-0 flex-1">
        <LogTable
          onSortChange={setSortDirection}
          sortDirection={sortDirection}
          logs={workLogData?.items || []}
          isLoading={isWorkLogLoading}
          onEdit={handleEdit}
          onDelete={(id) => deleteMutation.mutate(id)}
          meta={workLogData?.meta}
          onPageChange={setPage}
        />
      </div>
    </div>
  )
}
