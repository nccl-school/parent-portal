export async function getGoogleClient() {
  const { google } = await import("googleapis");
  return {
    calendar: google.calendar("v3"),
  };
}

export type GoogleClient = Awaited<ReturnType<typeof getGoogleClient>>;
