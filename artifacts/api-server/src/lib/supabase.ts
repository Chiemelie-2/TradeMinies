import { ReplitConnectors } from "@replit/connectors-sdk";
import { logger } from "./logger";

type SupabaseReadOptions = {
  table: string;
  query?: string;
};

export async function readSupabase<T>({
  table,
  query = "select=*",
}: SupabaseReadOptions): Promise<T[] | null> {
  try {
    const connectors = new ReplitConnectors();
    const response = await connectors.proxy(
      "supabase",
      `/rest/v1/${table}?${query}`,
      { method: "GET" },
    );

    if (!response.ok) {
      logger.warn({ table, status: response.status }, "Supabase table read unavailable");
      return null;
    }

    return (await response.json()) as T[];
  } catch (error) {
    logger.warn({ table, error }, "Supabase request failed; using preview fixture");
    return null;
  }
}

export async function writeSupabase<T>(
  table: string,
  body: unknown,
  method: "POST" | "PATCH",
  query = "",
): Promise<T | null> {
  try {
    const connectors = new ReplitConnectors();
    const response = await connectors.proxy(
      "supabase",
      `/rest/v1/${table}${query ? `?${query}` : ""}`,
      {
        method,
        headers: {
          "Content-Type": "application/json",
          Prefer: "return=representation",
        },
        body: JSON.stringify(body),
      },
    );
    if (!response.ok) {
      logger.warn({ table, status: response.status }, "Supabase write unavailable");
      return null;
    }
    const rows = (await response.json()) as T[];
    return rows[0] ?? null;
  } catch (error) {
    logger.warn({ table, error }, "Supabase write failed; retaining preview state");
    return null;
  }
}