export default function formatTime(
  timezone: number,
  time: number,
  type: string
) {
  const currentUtcTime = time
    ? time + new Date().getTimezoneOffset() * 60000
    : new Date().getTime() + new Date().getTimezoneOffset() * 60000;
  const cityOffset = currentUtcTime + 1000 * timezone;

  if (type === 'date') {
    return new Date(cityOffset).toLocaleDateString('en-GB');
  }

  return new Date(cityOffset).toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
  });
}
