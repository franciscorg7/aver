/**
 * Gets the year from a full string date.
 *
 * @param date - a date in ISO string format
 * @returns only the year
 */
export const getYearFromDate = (date: string | null) => {
  if (!date) return null
  const parsedDate = new Date(date)
  return isNaN(parsedDate.getTime()) ? null : parsedDate.getFullYear()
}
