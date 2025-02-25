export default function fetchWithBasicAuth(
  method: "GET" | "POST" | "PATCH" | "DELETE",
  url: string,
  body?: Record<string, unknown>
) {
  return fetch(url, {
    method,
    headers: {
      Authorization:
        "Basic " +
        btoa(
          process.env.BASIC_AUTH_USERNAME +
            ":" +
            process.env.BASIC_AUTH_PASSWORD
        ),
      "Content-Type": "application/json",
    },
    body: body ? JSON.stringify(body) : undefined,
  });
}
