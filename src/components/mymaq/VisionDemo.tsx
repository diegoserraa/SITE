import { useEffect, useState } from "react";
import { ScanEye } from "lucide-react";
import { useLiveValue } from "@/lib/hooks";

const reduce = () => typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

type Caixa = { x: number; y: number; w: number; h: number; label: string; cor: string };

/* cena fixa (esteira + 3 caixas), só as detecções por cima mudam — demonstração
   ilustrativa do módulo de visão computacional em desenvolvimento pro MyMaq360:
   produtividade (contagem) e falha de fabricação (defeito) */
const MODOS: { legenda: string; caixas: Caixa[] }[] = [
  {
    legenda: "Produtividade: contagem de peças na esteira",
    caixas: [
      { x: 46, y: 118, w: 76, h: 56, label: "Caixa OK", cor: "#22C55E" },
      { x: 150, y: 112, w: 76, h: 62, label: "Caixa OK", cor: "#22C55E" },
      { x: 254, y: 120, w: 76, h: 54, label: "Caixa OK", cor: "#22C55E" },
    ],
  },
  {
    legenda: "Falha de fabricação: OS aberta automaticamente",
    caixas: [{ x: 150, y: 112, w: 76, h: 62, label: "Amassado", cor: "#EF4444" }],
  },
];

export function VisionDemo() {
  const [modo, setModo] = useState(0);
  const pecas = useLiveValue(128, 5, 2600);

  useEffect(() => {
    if (reduce()) return;
    const id = window.setInterval(() => setModo((m) => (m + 1) % MODOS.length), 2800);
    return () => window.clearInterval(id);
  }, []);

  const atual = MODOS[modo];

  return (
    <div className="reveal rounded-2xl border border-white/10 bg-[#0E1C3A] p-5 shadow-[0_50px_120px_-30px_rgba(37,99,235,0.3)] sm:p-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <ScanEye className="size-4 text-azul-n" />
          <span className="font-grotesk text-sm font-semibold text-white">Visão computacional</span>
        </div>
        <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-nevoa">dados ilustrativos</span>
      </div>

      <div className="relative mt-5 overflow-hidden rounded-xl border border-white/[0.07] bg-[#081124]">
        <svg viewBox="0 0 480 240" className="block w-full" role="img" aria-label={`Demonstração de visão computacional: ${atual.legenda}`}>
          <defs>
            <linearGradient id="visao-scan" x1="0" x2="0" y1="0" y2="1">
              <stop offset="0" stopColor="#3B82F6" stopOpacity="0" />
              <stop offset="0.5" stopColor="#3B82F6" stopOpacity="0.5" />
              <stop offset="1" stopColor="#3B82F6" stopOpacity="0" />
            </linearGradient>
          </defs>

          {/* grade de fundo, clima "câmera industrial" */}
          {Array.from({ length: 12 }, (_, i) => (
            <line key={`v${i}`} x1={i * 40} y1="0" x2={i * 40} y2="240" stroke="#1C2740" strokeWidth="1" />
          ))}
          {Array.from({ length: 6 }, (_, i) => (
            <line key={`h${i}`} x1="0" y1={i * 40} x2="480" y2={i * 40} stroke="#1C2740" strokeWidth="1" />
          ))}

          {/* esteira */}
          <rect x="20" y="178" width="400" height="14" rx="3" fill="#16244A" />
          <rect x="20" y="178" width="400" height="4" fill="#223158" />

          {/* 3 caixas sobre a esteira */}
          {[46, 150, 254].map((x, i) => (
            <g key={x}>
              <rect x={x} y={[118, 112, 120][i]} width="76" height={[56, 62, 54][i]} rx="4" fill="#2A3A66" stroke="#3B4C85" />
              <line x1={x + 8} y1={[118, 112, 120][i] + 14} x2={x + 68} y2={[118, 112, 120][i] + 14} stroke="#3B4C85" strokeWidth="2" />
            </g>
          ))}

          {/* linha de varredura */}
          <rect x="0" y="0" width="480" height="60" fill="url(#visao-scan)" className="vision-scan" />

          {/* caixas de detecção do modo atual */}
          {atual.caixas.map((c) => (
            <g key={c.label} style={{ transition: "opacity .4s ease" }}>
              <rect x={c.x} y={c.y} width={c.w} height={c.h} rx="6" fill="none" stroke={c.cor} strokeWidth="2" strokeDasharray="6 4" />
              <rect x={c.x} y={c.y - 22} width={c.label.length * 6.6 + 16} height="18" rx="9" fill={c.cor} fillOpacity="0.18" />
              <text x={c.x + 8} y={c.y - 9} fill={c.cor} fontFamily="IBM Plex Mono, monospace" fontSize="10" fontWeight="600">
                {c.label.toUpperCase()}
              </text>
            </g>
          ))}
        </svg>
      </div>

      <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
        <p className="text-sm text-nevoa">{atual.legenda}</p>
        <p className="flex items-baseline gap-1.5 font-mono text-sm text-azul-n">
          <span className="tabular text-lg font-semibold">{pecas.toFixed(0)}</span>
          <span className="text-nevoa">peças/h</span>
        </p>
      </div>
      <div className="mt-4 flex items-center justify-center gap-1.5">
        {MODOS.map((m, i) => (
          <span key={m.legenda} className={i === modo ? "h-1.5 w-5 rounded-full bg-azul-n transition-all" : "h-1.5 w-1.5 rounded-full bg-white/15 transition-all"} />
        ))}
      </div>
    </div>
  );
}
