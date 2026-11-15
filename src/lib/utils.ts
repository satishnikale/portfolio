export function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(' ');
}

const monthFormatter = new Intl.DateTimeFormat('en-US', { month: 'short', year: 'numeric', timeZone: 'UTC' });

/** Formats a `YYYY-MM` string (or `present`) for display. */
export function formatMonth(value: string) {
  if (value === 'present') return 'Present';
  const [year, month] = value.split('-').map(Number);
  return monthFormatter.format(new Date(Date.UTC(year, month - 1, 1)));
}
