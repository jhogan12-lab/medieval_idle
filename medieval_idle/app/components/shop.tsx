import type { Generator } from "~/models/generator";

type ShopProps = {
  generators: Generator[];
  gold: number;
  buyGenerator: (id: string) => void;
};

const MAX_VISIBLE_ICONS = 10;

export default function Shop({ generators, gold, buyGenerator }: ShopProps) {
  return (
    <div className="mt-10 flex flex-col items-center w-full max-w-md space-y-4">
      {generators.map((gen) => {
        const canAfford = gold >= gen.baseCost;

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
  );
}