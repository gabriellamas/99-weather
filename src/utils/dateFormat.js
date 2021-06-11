const dateFormat = (date) => {
  const dateFormat = new Date(date)
  const result = new Intl.DateTimeFormat('pt-br').format(dateFormat)
  return result
}
export default dateFormat
