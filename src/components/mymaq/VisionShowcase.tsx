import { useState } from "react";
import { cn } from "@/lib/utils";
import { VisionDemo } from "./VisionDemo";
import { VisionPipeline } from "./VisionPipeline";

const ABAS = [
  { id: "deteccao", label: "Detecção em cena", Comp: VisionDemo },
  { id: "dado", label: "Virando dado", Comp: VisionPipeline },
] as const;

export function VisionShowcase() {
  const [aba, setAba] = useState<(typeof ABAS)[number]["id"]>("deteccao");
  const Atual = ABAS.find((a) => a.id === aba)!.Comp;
  return (
    <div className="space-y-3">
      <div className="inline-flex rounded-xl border border-white/10 bg-white/5 p-0.5 shadow-sm backdrop-blur">
        {ABAS.map((a) => (
          <button
            key={a.id}
            type="button"
            onClick={() => setAba(a.id)}
            className={cn(
              "rounded-lg px-3 py-1.5 text-[12px] font-medium transition-colors",
              aba === a.id ? "bg-azul-n/20 text-azul-n" : "text-nevoa hover:text-ink"
            )}
          >
            {a.label}
          </button>
        ))}
      </div>
      <Atual />
    </div>
  );
}
