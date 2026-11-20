import { Aperture } from "lucide-react";
import { useLiveValue } from "@/lib/hooks";

/* segunda animação de visão: em vez de uma cena com caixas detectadas, mostra
   o conceito "câmera vira dado" — pulso saindo da lente, três métricas
   estruturadas chegando do outro lado. Mesmo motivo visual de partículas do
   PowerHub do hero, pra ficar reconhecível como "jeito ZDM de desenhar fluxo de dado". */

const METRICAS: { label: string; base: number; amp: number; cor: string; y: number; sufixo?: string }[] = [
  { label: "Peças contadas", base: 842, amp: 14, cor: "#22C55E", y: 48 },
  { label: "Defeitos flagrados", base: 3, amp: 1.4, cor: "#F59E0B", y: 120 },
  { label: "OS automáticas", base: 2, amp: 0.8, cor: "#3B82F6", y: 192 },
];

const cx = 110, cy = 120;

export function VisionPipeline() {
  const v0 = useLiveValue(METRICAS[0].base, METRICAS[0].amp, 2600);
  const v1 = useLiveValue(METRICAS[1].base, METRICAS[1].amp, 3100);
  const v2 = useLiveValue(METRICAS[2].base, METRICAS[2].amp, 3400);
  const valores = [v0, v1, v2];

  return (
    <div className="reveal rounded-2xl border border-white/10 bg-[#0E1C3A] p-5 shadow-[0_50px_120px_-30px_rgba(37,99,235,0.3)] sm:p-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <Aperture className="size-4 text-azul-n" />
          <span className="font-grotesk text-sm font-semibold text-white">Visão computacional vira dado</span>
        </div>
        <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-nevoa">dados ilustrativos</span>
      </div>

      <div className="relative mt-5 overflow-hidden rounded-xl border border-white/[0.07] bg-[#081124] px-4 py-6">
        <svg viewBox="0 0 440 240" className="block w-full" role="img" aria-label="Fluxo: leitura de imagem virando três métricas estruturadas em tempo real">
          <defs>
            <radialGradient id="lente-halo">
              <stop offset="0" stopColor="#3B82F6" stopOpacity="0.35" />
              <stop offset="1" stopColor="#3B82F6" stopOpacity="0" />
            </radialGradient>
          </defs>

          <circle cx={cx} cy={cy} r="78" fill="url(#lente-halo)" className="breathe" />

          {/* trilhas até cada métrica */}
          {METRICAS.map((m, i) => {
            const d = `M${cx + 46} ${cy} C${cx + 110} ${cy} ${cx + 130} ${m.y + 9} ${300} ${m.y + 9}`;
            return (
              <g key={m.label}>
                <path id={`trilha-${i}`} d={d} fill="none" stroke="#1C2740" strokeWidth="2" />
                <circle r="3.5" fill={m.cor}>
                  <animateMotion dur={`${2.2 + i * 0.4}s`} repeatCount="indefinite" begin={`${i * 0.35}s`}>
                    <mpath href={`#trilha-${i}`} />
                  </animateMotion>
                </circle>
              </g>
            );
          })}

          {/* lente da câmera */}
          <circle cx={cx} cy={cy} r="46" fill="#16244A" stroke="#2A3A66" strokeWidth="2" />
          <circle cx={cx} cy={cy} r="30" fill="#0B1730" stroke="#2A3A66" />
          <circle cx={cx} cy={cy} r="16" fill="#1C2740" />
          <circle cx={cx - 5} cy={cy - 5} r="5" fill="#3B82F6" opacity="0.8" />
          <circle cx={cx} cy={cy} r="46" fill="none" stroke="#3B82F6" strokeOpacity="0.45" strokeWidth="2" className="scan" style={{ transformOrigin: `${cx}px ${cy}px` }} />

          {/* cards de métrica */}
          {METRICAS.map((m, i) => (
            <g key={m.label}>
              <rect x="300" y={m.y} width="128" height="48" rx="8" fill="#16244A" stroke="#2A3A66" />
              <text x="314" y={m.y + 19} fill="#94A3B8" fontFamily="IBM Plex Mono, monospace" fontSize="9" letterSpacing="0.6">
                {m.label.toUpperCase()}
              </text>
              <text x="314" y={m.y + 36} fill={m.cor} fontFamily="IBM Plex Mono, monospace" fontSize="15" fontWeight="700">
                {valores[i].toFixed(m.sufixo ? 1 : 0)}
                {m.sufixo ?? ""}
              </text>
            </g>
          ))}
        </svg>
      </div>

      <p className="mt-4 text-sm text-nevoa">
        A mesma leitura de imagem alimenta contagem de produtividade e detecção de falha de fabricação — com a OS abrindo sozinha quando flagra defeito.
      </p>
    </div>
  );
}
