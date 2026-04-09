import type { Player } from "~/models/player";
import { ApiConfig as api } from "~/ApiConfig";

/**
 * Retrieves player data by ID
 * @param playerId number
 * @returns Promise<Player>
 */
export async function getPlayerById(playerId: number): Promise<Player> {
  if (!playerId || playerId === 0) {
    throw new Error(`Invalid playerId: ${playerId}`);
  }

  try {
    const response = await fetch(`${api.player}/${playerId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Error fetching player: ${errorText}`);
    }

    const data: Player = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching player data:", error);
    throw error;
  }
}