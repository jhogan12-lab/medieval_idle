import { useEffect, useState } from "react";

type GameState = {
  gold: number;
  generators: Generator[];
};

type PlayerState = { playerTownName: string };

type Generator = {
  id: string;
  name: string;
  baseCost: number;
  goldPerSecond: number;
  owned: number;
};

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

const MAX_VISIBLE_ICONS = 10;

function getRandomTownName() {
  return townNames[Math.floor(Math.random() * townNames.length)];
}

type FloatingText = { id: number; value: string };

export default function Index() {
  const [game, setGame] = useState<GameState>({
    gold: 0,
    generators: [
      {
        id: "gold-mine",
        name: "Gold Mine",
        baseCost: 50,
        goldPerSecond: 10,
        owned: 0,
      },
      {
        id: "iron-mine",
        name: "Iron Mine",
        baseCost: 25,
        goldPerSecond: 5,
        owned: 0,
      },
    ],
  });
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
    if (townInput.trim() !== "")
      setPlayer({ playerTownName: townInput.trim() });
    setEditing(false);
  };

  const buyGenerator = (generatorId: string) => {
    setGame((prev) => {
      const updatedGenerators = prev.generators.map((gen) => {
        if (gen.id !== generatorId) return gen;

        const cost = gen.baseCost; // later you can scale this

        if (prev.gold < cost) return gen;

        return {
          ...gen,
          owned: gen.owned + 1,
        };
      });

      const generatorToBuy = prev.generators.find((g) => g.id === generatorId);
      if (!generatorToBuy || prev.gold < generatorToBuy.baseCost) {
        return prev;
      }

      return {
        ...prev,
        gold: prev.gold - generatorToBuy.baseCost,
        generators: updatedGenerators,
      };
    });
  };

  const totalGoldPerSecond = game.generators.reduce(
    (total, gen) => total + gen.goldPerSecond * gen.owned,
    0,
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setGame((prev) => {
        const total = prev.generators.reduce(
          (sum, gen) => sum + gen.goldPerSecond * gen.owned,
          0,
        );

        if (total === 0) return prev;

        return {
          ...prev,
          gold: prev.gold + total,
        };
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-yellow-50 flex flex-col items-center justify-center relative overflow-hidden">
      <h1
        className="text-4xl font-bold text-yellow-800 mb-6 cursor-pointer"
        onDoubleClick={handleDoubleClick}
      >
        Welcome to Pax Romana
      </h1>

      {/* Gold Count */}
      <div className="text-2xl text-yellow-700 font-semibold mb-2">
        Gold: {game.gold}
      </div>

      {/* Total Gold Per Second */}
      <div className="text-sm text-yellow-700 mb-6">
        {game.generators.reduce(
          (sum, gen) => sum + gen.goldPerSecond * gen.owned,
          0,
        )}{" "}
        gold per second
      </div>

      {/* Big Coin Button */}
      <div
        onClick={collectGold}
        className="w-48 h-48 rounded-full bg-yellow-400 border-8 border-yellow-600 flex items-center justify-center shadow-xl cursor-pointer hover:scale-105 transform transition-transform select-none"
      >
        <img
          src="/romancoin.png"
          alt="Roman Coin"
          className="w-32 h-32 pointer-events-none"
        />{" "}
      </div>

      {/* Floating +1s */}
      {floatingTexts.map((ft) => (
        <span
          key={ft.id}
          className="absolute text-yellow-800 font-bold animate-float pointer-events-none"
          style={{
            bottom: 220,
            left: "50%",
            transform: "translateX(-50%)",
          }}
        >
          {ft.value}
        </span>
      ))}

      {/* SHOP SECTION */}
      <div className="mt-10 flex flex-col items-center w-full max-w-md space-y-4">
        {game.generators.map((gen) => {
          const canAfford = game.gold >= gen.baseCost;

          return (
            <div
              key={gen.id}
              className="w-full bg-yellow-100 p-4 rounded-xl shadow flex flex-col items-center hover:scale-[1.02] transition-transform"
            >
              <div className="text-lg font-bold text-yellow-800 mb-1">
                {gen.name}
              </div>
              <div className="flex flex-wrap justify-center gap-1 mb-2 max-h-16 overflow-hidden">
                {Array.from({
                  length: Math.min(gen.owned, MAX_VISIBLE_ICONS),
                }).map((_, i) => (
                  <img
                    key={i}
                    src="/picaxe.png"
                    alt="Mine"
                    className="w-5 h-5"
                  />
                ))}
              </div>

              {gen.owned > MAX_VISIBLE_ICONS && (
                <div className="text-xs text-yellow-700">
                  +{gen.owned - MAX_VISIBLE_ICONS} more
                </div>
              )}

              <div className="text-sm text-yellow-700 mb-2">
                +{gen.goldPerSecond * gen.owned} gold/sec
              </div>

              <button
                onClick={() => buyGenerator(gen.id)}
                disabled={!canAfford}
                className={`px-4 py-2 rounded-lg font-semibold transition ${
                  canAfford
                    ? "bg-yellow-600 hover:bg-yellow-700 text-white"
                    : "bg-gray-300 text-gray-500 cursor-not-allowed"
                }`}
              >
                Buy ({gen.baseCost})
              </button>
            </div>
          );
        })}
      </div>

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
