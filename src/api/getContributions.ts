export async function getContributions() {
  const res = await fetch("https://dpg.gg/test/calendar.json");
  if (!res.ok)
    throw new Error(
      `При получении данных возникла ошибка. Код ошибки: ${res.status}`
    );
  const data = await res.json();
  return data;
}
