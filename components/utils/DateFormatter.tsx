'use client';

export default function DateFormatter(dateString: string | Date | null | undefined): string {
  if (!dateString) return '';

  const date = new Date(dateString);

  if (isNaN(date.getTime())) {
    return 'Invalid Date'; // Handles invalid date inputs
  }

  // Format date components separately
  const formattedDate = new Intl.DateTimeFormat('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  }).format(date);

  const formattedTime = new Intl.DateTimeFormat('en-US', {
    hour: 'numeric',
    minute: 'numeric',
    hour12: true,
  }).format(date);

  // Ensure month is fully capitalized
  const monthCapitalized = formattedDate.replace(/^(\w+)/, (m) => m.toUpperCase());

  // Return final formatted string
  return `${monthCapitalized} @ ${formattedTime}`;
}