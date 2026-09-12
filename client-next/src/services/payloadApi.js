const PAYLOAD_URL = process.env.NEXT_PUBLIC_PAYLOAD_URL;

// Lightweight client-side memo to avoid duplicate fetches
// within a short window (e.g. categories fetched by multiple components).
const MEMO_TTL = 60000; // 60s client-side memo to avoid duplicate fetches
const memoStore = new Map();

const canUseMemo = (options) => {
  if (typeof window === "undefined") return false;
  const method = (options && options.method) || "GET";
  return method.toUpperCase() === "GET";
};

const payloadFetch = async (path, options = {}) => {
  if (!PAYLOAD_URL) return { ok: false, status: 0 };

  const cacheKey = `GET ${path}`;
  const useMemo = canUseMemo(options);

  if (useMemo) {
    const cached = memoStore.get(cacheKey);
    if (cached && cached.expires > Date.now()) {
      return cached.value;
    }
  }

  try {
    // On the server (Next.js SSR/SSG) apply cache revalidation so repeated
    // page renders don't all hit Payload. On the client, the memoStore handles it.
    const isServer = typeof window === 'undefined';
    const serverCacheOptions = isServer
      ? { next: { revalidate: 60 } }
      : {};

    const res = await fetch(`${PAYLOAD_URL}${path}`, {
      ...options,
      ...serverCacheOptions,
      headers: {
        "Content-Type": "application/json",
        ...options.headers,
      },
    });

    if (!res.ok) {
      return { ok: false, status: res.status };
    }

    const result = { ok: true, status: res.status, data: await res.json() };

    if (useMemo) {
      memoStore.set(cacheKey, { value: result, expires: Date.now() + MEMO_TTL });
    }

    return result;
  } catch {
    return { ok: false, status: 0 };
  }
};

export const getPayloadCollection = async (collection, params = {}, fetchOptions = {}) => {
  const query = new URLSearchParams();

  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== "") {
      query.set(key, value);
    }
  });

  const queryString = query.toString();
  const path = `/api/${collection}${queryString ? `?${queryString}` : ""}`;

  const result = await payloadFetch(path, fetchOptions);

  if (!result.ok) {
    throw new Error(`Payload API error (${result.status})`);
  }

  if (!result.data || !Array.isArray(result.data.docs)) {
    throw new Error("Payload API returned an invalid response");
  }

  return result.data;
};

export default getPayloadCollection;
