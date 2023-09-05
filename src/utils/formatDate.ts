export default function formatTime(timezone: number, time: number) {
    const currentUtcTime = time ? time + new Date().getTimezoneOffset() * 60000 : new Date().getTime() + new Date().getTimezoneOffset() * 60000;
    const cityOffset = currentUtcTime + 1000 * timezone;
    const cityTime = new Date(cityOffset).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
    return cityTime;
};