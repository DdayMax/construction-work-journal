import { Log, MetaData } from "@/entites/work-log/model"
import { Button } from "@/shared/ui/button"
import { Card, CardFooter } from "@/shared/ui/card"
import { ConfirmDialog } from "@/shared/ui/confirm-dialog"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/shared/ui/table"
import { formatDate } from "date-fns"
import {
  ArrowDown,
  ArrowUp,
  ChevronLeft,
  ChevronRight,
  Edit,
  Trash2,
} from "lucide-react"
import { useState } from "react"
import { SkeletonRow } from "./SkeletonRow"

interface Props {
  logs: Log[]
  isLoading: boolean
  onEdit: (log: Log) => void
  onDelete: (id: number) => void
  meta?: MetaData
  sortDirection?: "ASC" | "DESC"
  onSortChange?: (direction: "ASC" | "DESC") => void
  onPageChange: (page: number) => void
}

export const LogTable = ({
  logs,
  isLoading,
  onEdit,
  onDelete,
  meta,
  onPageChange,
  onSortChange,
  sortDirection = "DESC",
}: Props) => {
  const handleSortClick = () => {
    const newDirection = sortDirection === "DESC" ? "ASC" : "DESC"
    onSortChange?.(newDirection)
  }

  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [selectedId, setSelectedId] = useState<number | null>(null)

  const handleDeleteClick = (id: number) => {
    setSelectedId(id)
    setDeleteDialogOpen(true)
  }

  const handleConfirmDelete = () => {
    if (selectedId) {
      onDelete(selectedId)
    }
    setDeleteDialogOpen(false)
    setSelectedId(null)
  }

  const skeleton = () => {
    return (
      <>
        {[...Array(meta?.limit || 10)].map((_, index) => (
          <SkeletonRow key={index} />
        ))}
      </>
    )
  }

  return (
    <>
      <Card className="flex h-full flex-col overflow-hidden">
        <div className="flex-1 overflow-hidden">
          <div className="h-full overflow-x-auto">
            <Table className="min-w-full table-fixed">
              <TableHeader className="sticky top-0 bg-background">
                <TableRow>
                  <TableHead className="w-[140px]">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={handleSortClick}
                      className="h-8 gap-1 px-2 font-medium"
                    >
                      Дата
                      {sortDirection === "DESC" ? (
                        <ArrowDown className="h-4 w-4" />
                      ) : (
                        <ArrowUp className="h-4 w-4" />
                      )}
                    </Button>
                  </TableHead>
                  <TableHead className="w-[320px]">Вид работ</TableHead>
                  <TableHead>Исполнитель</TableHead>
                  <TableHead className="w-[120px]">Действия</TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {isLoading ? (
                  skeleton()
                ) : logs.length === 0 ? (
                  <TableRow>
                    <TableCell
                      colSpan={4}
                      className="h-48 text-center text-muted-foreground"
                    >
                      Нет данных
                    </TableCell>
                  </TableRow>
                ) : (
                  logs.map((entry) => (
                    <TableRow key={entry.id}>
                      <TableCell>
                        {formatDate(entry.performedAt, "dd.MM.yyyy")}
                      </TableCell>

                      <TableCell>
                        <p className="truncate font-medium">
                          {`${entry.workType.name} ${entry.amount} ${entry.workType.unit}`}
                        </p>
                      </TableCell>

                      <TableCell>
                        <div className="flex flex-col">
                          <p className="truncate font-medium">
                            {entry.employee.name}
                          </p>
                          <p className="truncate text-sm text-muted-foreground">
                            {entry.employee.role}
                          </p>
                        </div>
                      </TableCell>

                      <TableCell>
                        <div className="flex gap-2">
                          <Button
                            variant="outline"
                            size="icon"
                            className="size-8 rounded-lg"
                            onClick={() => onEdit(entry)}
                          >
                            <Edit className="size-4" />
                          </Button>

                          <Button
                            onClick={() => handleDeleteClick(entry.id)}
                            variant="destructive"
                            size="icon"
                            className="size-8 rounded-lg"
                          >
                            <Trash2 className="size-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </div>

        {meta && !isLoading && (
          <CardFooter className="border-t px-6 py-4">
            <div className="flex w-full items-center justify-between">
              <div className="text-sm text-muted-foreground">
                {`Показано ${Math.min(meta.page * meta.limit, meta.total)} из ${meta.total} записей`}
              </div>

              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onPageChange(meta.page - 1)}
                  disabled={!meta.hasPreviousPage}
                >
                  <ChevronLeft className="h-4 w-4" />
                  Назад
                </Button>

                <div className="flex items-center gap-1">
                  {Array.from(
                    { length: Math.min(5, meta.totalPages) },
                    (_, i) => {
                      let pageNum: number

                      if (meta.totalPages <= 5) {
                        pageNum = i + 1
                      } else if (meta.page <= 3) {
                        pageNum = i + 1
                      } else if (meta.page >= meta.totalPages - 2) {
                        pageNum = meta.totalPages - 4 + i
                      } else {
                        pageNum = meta.page - 2 + i
                      }

                      return (
                        <Button
                          key={pageNum}
                          variant={
                            meta.page === pageNum ? "default" : "outline"
                          }
                          size="sm"
                          className="w-8"
                          onClick={() => onPageChange(pageNum)}
                        >
                          {pageNum}
                        </Button>
                      )
                    }
                  )}

                  {meta.totalPages > 5 && meta.page < meta.totalPages - 2 && (
                    <>
                      <span className="px-1">...</span>
                      <Button
                        variant="outline"
                        size="sm"
                        className="w-8"
                        onClick={() => onPageChange(meta.totalPages)}
                      >
                        {meta.totalPages}
                      </Button>
                    </>
                  )}
                </div>

                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onPageChange(meta.page + 1)}
                  disabled={!meta.hasNextPage}
                >
                  Вперед
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardFooter>
        )}
      </Card>
      <ConfirmDialog
        open={deleteDialogOpen}
        onOpenChange={setDeleteDialogOpen}
        onConfirm={handleConfirmDelete}
        title="Удаление записи"
        description={`Вы уверены, что хотите удалить запись? Это действие нельзя отменить.`}
      />
    </>
  )
}
