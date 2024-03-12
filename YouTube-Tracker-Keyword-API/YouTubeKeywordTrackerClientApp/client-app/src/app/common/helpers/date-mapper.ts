export function getFormattedDate(dateString?: string | Date): string | null {
  if (!dateString) {
    return null;
  }
  console.log('hello');
  const dateObject = new Date(dateString);

  return dateObject.toLocaleDateString('en-GB', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  });
}
