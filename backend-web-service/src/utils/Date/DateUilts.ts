export const getDateFilter = (value: string) => {
  const now = new Date()
  let startDate
  let endDate
  switch (value) {
    case '30m':
      startDate = new Date(now.getTime() - 30 * 60 * 1000)
      endDate = now
      break
    case '2h':
      startDate = new Date(now.getTime() - 2 * 60 * 60 * 1000)
      endDate = now
      break
    case '24h':
      startDate = new Date(now.getTime() - 24 * 60 * 60 * 1000)
      endDate = now
      break
    case '30d':
      startDate = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000)
      endDate = now
      break
    default:
      throw new Error('Invalid value')
  }
  return { startDate, endDate }
}
