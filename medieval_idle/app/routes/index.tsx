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

type FloatingText = { id: number; value: string };

export default function Index() {
  const [game, setGame] = useState<GameState>({ gold: 0 });
  const [mobile, setMobile] = useState(false);
  const [player, setPlayer] = useState<PlayerState>({
    playerTownName: getRandomTownName(),
  });

  const [editing, setEditing] = useState(false);
  const [townInput, setTownInput] = useState(player.playerTownName);
  const [floatingTexts, setFloatingTexts] = useState<FloatingText[]>([]);

  useEffect(() => setMobile(isMobile()), []);

  const collectGold = () => {
    setGame((prev) => ({ ...prev, gold: prev.gold + 1 }));

    // Spawn floating +1
    const id = Date.now();
    setFloatingTexts((prev) => [...prev, { id, value: "+1" }]);
    setTimeout(() => {
      setFloatingTexts((prev) => prev.filter((t) => t.id !== id));
    }, 1000);
  };

  const handleDoubleClick = () => setEditing(true);
  const handleTownSubmit = () => {
    if (townInput.trim() !== "") setPlayer({ playerTownName: townInput.trim() });
    setEditing(false);
  };

  return (
    <div className="min-h-screen bg-yellow-50 flex flex-col items-center justify-center relative overflow-hidden">
      {/* Town Name */}
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

      {/* Gold Count */}
      <div className="text-2xl text-yellow-700 font-semibold mb-6">
        Gold: {game.gold}
      </div>

      {/* Big Coin Button */}
      <div
        onClick={collectGold}
        className="w-48 h-48 rounded-full bg-yellow-400 border-8 border-yellow-600 flex items-center justify-center shadow-xl cursor-pointer hover:scale-105 transform transition-transform select-none"
      >
        <span className="text-6xl">🪙</span>
      </div>

      {/* Floating +1s */}
      {floatingTexts.map((ft) => (
        <span
          key={ft.id}
          className="absolute text-yellow-800 font-bold animate-float pointer-events-none"
          style={{
            bottom: 220, // adjust relative to coin
            left: "50%",
            transform: "translateX(-50%)",
          }}
        >
          {ft.value}
        </span>
      ))}

      {/* Floating animation */}
      <style>{`
        @keyframes float {
          0% { opacity: 1; transform: translateX(-50%) translateY(0); }
          100% { opacity: 0; transform: translateX(-50%) translateY(-50px); }
        }
        .animate-float {
          animation: float 1s ease-out forwards;
        }
      `}</style>
    </div>
  );
}