import fetchWithBasicAuth from "./auth_fetch";

export const updateDoseSchedule = async (id: string, taken: boolean) => {
  const res = await fetchWithBasicAuth(
    "PATCH",
    `${process.env.API_URL}/dose_schedules/${id}`,
    {
      taken,
    }
  );
  if (!res.ok) {
    throw new Error(res.statusText);
  }
  return res.json();
};
