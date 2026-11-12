let baseUrl = "http://localhost:8080";

export function setBaseUrl(url: string) {
  baseUrl = url;
}

export async function fetcher<T>(path: string, init?: RequestInit): Promise<T> {
  const response = await fetch(baseUrl + path, init);
  if (!response.ok) {
    throw new Error(`${response.status} ${path}`);
  }
  return {
    status: response.status,
    data: response.status === 204 ? undefined : await response.json(),
    headers: response.headers,
  } as T;
}
