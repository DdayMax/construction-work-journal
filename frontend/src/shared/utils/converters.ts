import { format, parseISO } from "date-fns"

export const formatDate = (date: string) => {
  return format(parseISO(date), "dd.MM.yyyy")
}

export const normalizeDateForServer = (date: Date): string => {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`
}
