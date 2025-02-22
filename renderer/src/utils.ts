export function debounce(fn: () => void, delay: number = 500) {
  const timeoutId = setTimeout(fn, delay);
  return () => clearTimeout(timeoutId);
}
