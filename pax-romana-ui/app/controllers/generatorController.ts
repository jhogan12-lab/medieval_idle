import type { Generator } from "~/models/generator";
import { ApiConfig as api } from "~/ApiConfig";

/**
 * Retrieves player data by ID
 * @returns Promise<Generator[]>
 */
export async function getGenerators(): Promise<Generator[]> {
  try {
    const url = `${api.generator}`;
    console.log(`Fetching generators from: ${url}`);

    const response = await fetch(`${api.generator}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      const text = await response.text();
      console.error("API FAILED:", text);
      throw new Error(`API error ${response.status}: ${text}`);
    }

    const data: Generator[] = await response.json();
    if (data.length > 0) {
      console.log(`Successfully retrieved ${data.length} generators`)
    }
    return data;
  } catch (err) {
    console.error("FULL FETCH ERROR:", err);

    if (err instanceof Error) {
      console.error("MESSAGE:", err.message);
      console.error("STACK:", err.stack);
    }

    throw err;
  }
}
