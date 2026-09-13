export function formatPrice(value: number): string {
  const grouped = Math.round(value)
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, '.')
  return `${grouped} MT`
}
