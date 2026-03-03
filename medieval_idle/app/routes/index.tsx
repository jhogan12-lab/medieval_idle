import { useEffect, useState } from "react";

type GameState = { gold: number };
type PlayerState = { playerTownName: string };

function isMobile() {
  if (typeof navigator === "undefined") return false;
  return /Mobi|Android/i.test(navigator.userAgent);
}

const townNames = [
  "Kingsport",
  "Ravenswood",
  "Dragonhold",
  "Goldhaven",
  "Ironvale",
  "Stoneford",
  "Windmere",
  "Highrock",
];

function getRandomTownName() {
  return townNames[Math.floor(Math.random() * townNames.length)];
}

export default function Index() {
  const [game, setGame] = useState<GameState>({ gold: 0 });
  const [mobile, setMobile] = useState(false);

  const [player, setPlayer] = useState<PlayerState>({
    playerTownName: getRandomTownName(),
  });

  const [editing, setEditing] = useState(false);
  const [townInput, setTownInput] = useState(player.playerTownName);

  useEffect(() => {
    setMobile(isMobile());
  }, []);

  // Click handler for collecting gold
  const collectGold = () => {
    setGame((prev) => ({ ...prev, gold: prev.gold + 1 }));
  };

  // Handle double-click to edit town name
  const handleDoubleClick = () => {
    setEditing(true);
  };

  // Save new town name on Enter or blur
  const handleTownSubmit = () => {
    if (townInput.trim() !== "") {
      setPlayer({ playerTownName: townInput.trim() });
    }
    setEditing(false);
  };

  return (
    <div className="min-h-screen bg-yellow-50 flex flex-col items-center justify-center p-4">
      {/* Title */}
      {editing ? (
        <input
          type="text"
          value={townInput}
          onChange={(e) => setTownInput(e.target.value)}
          onBlur={handleTownSubmit}
          onKeyDown={(e) => e.key === "Enter" && handleTownSubmit()}
          className="text-4xl font-bold text-yellow-800 mb-6 text-center border-b-2 border-yellow-700 focus:outline-none"
          autoFocus
        />
      ) : (
        <h1
          className="text-4xl font-bold text-yellow-800 mb-6 cursor-pointer"
          onDoubleClick={handleDoubleClick}
        >
          Welcome to {player.playerTownName}
        </h1>
      )}

      {/* Gold display */}
      <div className="text-2xl text-yellow-700 font-semibold mb-6">
        Gold: {game.gold}
      </div>

      {/* Only show click button on mobile */}
      {mobile && (
        <button
          onClick={collectGold}
          className="bg-yellow-500 text-yellow-900 font-bold py-4 px-8 rounded-full shadow-lg hover:bg-yellow-600 transition-colors text-xl"
        >
          Tap the Coin 🪙
        </button>
      )}

      {/* Message for desktop */}
      {!mobile && (
        <div className="text-gray-600 italic text-center">
          Tap the coin to collect shillings!
          <div>
            <button
              onClick={collectGold}
              className="bg-yellow-500 text-yellow-900 font-bold py-4 px-8 rounded-full shadow-lg hover:bg-yellow-600 transition-colors text-xl mt-2"
            >
              Tap the Coin 🪙
            </button>
          </div>
        </div>
      )}
    </div>
  );
}