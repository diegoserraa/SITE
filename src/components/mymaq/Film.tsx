import { useEffect, useLayoutEffect, useRef, useState, type ReactNode } from "react";
import { Bell, Camera, Check, CheckCircle2, CircleDot, FileText, Image as ImageIcon, Monitor, Pause, Play, RotateCcw, Smartphone, Volume2, VolumeX, Wrench, Zap } from "lucide-react";
import { MyMaqLogo } from "@/components/brand/Logos";
import { cn } from "@/lib/utils";

/* Filme do fluxo do MyMaq360: tudo é função do tempo, então o mesmo componente
   toca no site (relógio real) e gera o vídeo quadro a quadro (tempo controlado). */

export const SCENE = 4.6; // segundos por cena
const cl = (x: number) => Math.min(1, Math.max(0, x));
const seg = (p: number, a: number, b: number) => cl((p - a) / (b - a));
const ease = (x: number) => 1 - Math.pow(1 - x, 3);
const fadeIn = (p: number, a = 0, b = 0.18) => ease(seg(p, a, b));

const C = { mata: "#10A37F", sensor: "#2563EB", amber: "#F59E0B", red: "#EF4444", nevoa: "#94A3B8", marinho: "#0B1730", m2: "#16244A", card: "#0E1C3A" };

/* ---------- peças ---------- */
function Phone({ children, x, y, s = 1, o = 1 }: { children: ReactNode; x: number; y: number; s?: number; o?: number }) {
  return (
    <div className="absolute" style={{ left: x, top: y, width: 300, height: 620, transform: `scale(${s})`, transformOrigin: "top left", opacity: o }}>
      <div className="h-full w-full rounded-[46px] border-[10px] border-[#1C2740] bg-[#081124] p-0 shadow-[0_40px_80px_-30px_rgba(0,0,0,.8)]">
        <div className="relative h-full w-full overflow-hidden rounded-[36px] bg-[#0A1530]">
          <div className="absolute left-1/2 top-2.5 z-20 h-[22px] w-[92px] -translate-x-1/2 rounded-full bg-black" />
          {children}
        </div>
      </div>
    </div>
  );
}

function Panel({ children, x, y, w, h, o = 1, title }: { children: ReactNode; x: number; y: number; w: number; h: number; o?: number; title?: string }) {
  return (
    <div className="absolute overflow-hidden rounded-2xl border border-white/10 shadow-[0_40px_80px_-30px_rgba(0,0,0,.7)]" style={{ left: x, top: y, width: w, height: h, opacity: o, background: C.card }}>
      {title && (
        <div className="flex items-center gap-2 border-b border-white/[0.07] px-5 py-3">
          <span className="size-2.5 rounded-full bg-white/15" /><span className="size-2.5 rounded-full bg-white/15" /><span className="size-2.5 rounded-full bg-white/15" />
          <span className="ml-3 font-grotesk text-[13px] font-semibold text-white/90">{title}</span>
          <span className="ml-auto font-mono text-[10px] uppercase tracking-[0.16em] text-nevoa">sistema web</span>
        </div>
      )}
      {children}
    </div>
  );
}

function Chip({ c, children }: { c: string; children: ReactNode }) {
  return <span className="inline-flex items-center gap-1 rounded-full px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider" style={{ background: `${c}26`, color: c }}>{children}</span>;
}

function Qr({ size = 168 }: { size?: number }) {
  const n = 21; const u = size / n; let seed = 11;
  const rnd = () => ((seed = (seed * 1103515245 + 12345) % 2147483648) / 2147483648);
  const finder = (r: number, c: number) => {
    for (const [r0, c0] of [[0, 0], [0, 14], [14, 0]]) {
      const y = r - r0, x = c - c0;
      if (y >= 0 && x >= 0 && y < 7 && x < 7) return y === 0 || y === 6 || x === 0 || x === 6 || (y > 1 && y < 5 && x > 1 && x < 5);
      if (y >= -1 && x >= -1 && y < 8 && x < 8) return false;
    }
    return null;
  };
  const cells: ReactNode[] = [];
  for (let r = 0; r < n; r++) for (let c = 0; c < n; c++) {
    const f = finder(r, c); const on = f === null ? rnd() > 0.5 : f;
    if (on) cells.push(<rect key={`${r}-${c}`} x={c * u} y={r * u} width={u + 0.3} height={u + 0.3} fill="#0B1730" />);
  }
  return <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>{cells}</svg>;
}

/* ---------- cenas ---------- */
type Scene = { t: string; d: string; icon: typeof Camera; render: (p: number) => ReactNode };

const SCENES: Scene[] = [
  {
    t: "O técnico aponta o celular para o QR code da máquina",
    d: "Cada equipamento tem uma etiqueta. A leitura abre a máquina certa, sem procurar em lista.",
    icon: Camera,
    render: (p) => {
      const scan = seg(p, 0.08, 0.55); const found = ease(seg(p, 0.58, 0.78));
      return (
        <>
          <Phone x={720} y={50}>
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,#22324f,#0A1530_70%)]" />
            <p className="absolute inset-x-0 top-12 text-center font-mono text-[10px] uppercase tracking-[0.18em] text-white/70">Ler QR code</p>
            <div className="absolute left-1/2 top-[150px] -translate-x-1/2 rounded-xl bg-white p-4">
              <Qr size={150} />
              <p className="mt-2 text-center font-mono text-[9px] text-slate-600">ZDM · EQ-0002</p>
            </div>
            <div className="absolute left-1/2 top-[132px] h-[226px] w-[218px] -translate-x-1/2">
              {["left-0 top-0 border-l-4 border-t-4", "right-0 top-0 border-r-4 border-t-4", "left-0 bottom-0 border-b-4 border-l-4", "right-0 bottom-0 border-b-4 border-r-4"].map((k) => (
                <span key={k} className={cn("absolute size-9 rounded-sm", k)} style={{ borderColor: found > 0.1 ? C.mata : "#fff" }} />
              ))}
              {found < 0.1 && <span className="absolute inset-x-2 h-[3px] rounded-full bg-mata shadow-[0_0_14px_#10A37F]" style={{ top: `${8 + scan * 200}px` }} />}
            </div>
            <div className="absolute inset-x-4 bottom-6 rounded-2xl bg-white p-4 text-[#0B1730]" style={{ transform: `translateY(${(1 - found) * 140}px)`, opacity: found }}>
              <p className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-wider text-mata"><CheckCircle2 className="size-3.5" />Máquina identificada</p>
              <p className="mt-1.5 font-grotesk text-lg font-semibold">Compressor 02</p>
              <p className="text-xs text-slate-500">Linha 3 · Setor de utilidades</p>
            </div>
          </Phone>
        </>
      );
    },
  },
  {
    t: "Tudo da máquina em uma tela: ordens, dados e anexos",
    d: "Histórico de OS, ficha técnica e documentos como manuais, fotos e laudos, no celular do técnico.",
    icon: FileText,
    render: (p) => {
      const tab = p < 0.36 ? 0 : p < 0.68 ? 1 : 2;
      const tp = tab === 0 ? seg(p, 0, 0.3) : tab === 1 ? seg(p, 0.36, 0.62) : seg(p, 0.68, 0.95);
      const lists = [
        [["#1279", "Troca de filtro", "Concluída", C.mata], ["#1263", "Ruído no motor", "Concluída", C.mata], ["#1240", "Preventiva mensal", "Concluída", C.mata]],
        [["Fabricante", "Atlas Copco"], ["Modelo", "GA 30 VSD+"], ["Instalação", "03/2021"], ["Última preventiva", "12/09"]],
        [["manual-operacao.pdf", "PDF"], ["foto-placa.jpg", "Foto"], ["laudo-vibracao.pdf", "PDF"]],
      ];
      return (
        <Phone x={720} y={50}>
          <div className="px-5 pt-14 text-white">
            <p className="font-mono text-[10px] uppercase tracking-wider text-nevoa">EQ-0002</p>
            <p className="font-grotesk text-xl font-semibold">Compressor 02</p>
            <div className="mt-2"><Chip c={C.mata}>Operando</Chip></div>
            <div className="mt-5 grid grid-cols-3 rounded-lg bg-white/5 p-1 text-center text-[12px]">
              {["Ordens", "Dados", "Anexos"].map((x, i) => (
                <span key={x} className={cn("rounded-md py-1.5", i === tab ? "bg-mata text-white" : "text-nevoa")}>{x}</span>
              ))}
            </div>
            <div className="mt-4 grid gap-2.5">
              {lists[tab].map((row, i) => (
                <div key={i} className="rounded-xl border border-white/[0.07] bg-white/[0.04] px-3.5 py-3" style={{ opacity: ease(seg(tp, i * 0.18, i * 0.18 + 0.35)), transform: `translateY(${(1 - ease(seg(tp, i * 0.18, i * 0.18 + 0.35))) * 12}px)` }}>
                  {tab === 0 && <div className="flex items-center justify-between"><div><p className="font-mono text-[10px] text-nevoa">{row[0]}</p><p className="text-[13px]">{row[1]}</p></div><Chip c={row[3] as string}>{row[2]}</Chip></div>}
                  {tab === 1 && <div className="flex justify-between text-[13px]"><span className="text-nevoa">{row[0]}</span><span>{row[1]}</span></div>}
                  {tab === 2 && <div className="flex items-center gap-3 text-[13px]">{row[1] === "Foto" ? <ImageIcon className="size-4 text-sensor" /> : <FileText className="size-4 text-mata" />}<span>{row[0]}</span></div>}
                </div>
              ))}
            </div>
          </div>
        </Phone>
      );
    },
  },
  {
    t: "O sensor lê a temperatura dentro das faixas que o gestor definiu",
    d: "Faixa de alerta e faixa crítica configuráveis por máquina. Passou do limite, o sistema age.",
    icon: Zap,
    render: (p) => {
      const W = 600, H = 300, n = 60; const k = seg(p, 0.05, 0.9);
      const val = (i: number) => { const t = i / (n - 1); return 48 + 6 * Math.sin(t * 9) + (t > 0.55 ? Math.pow((t - 0.55) / 0.45, 1.6) * 34 : 0); };
      const y = (v: number) => H - ((v - 30) / 60) * H;
      const shown = Math.max(2, Math.round(k * n));
      const d = Array.from({ length: shown }, (_, i) => `${i ? "L" : "M"}${((i / (n - 1)) * W).toFixed(1)} ${y(val(i)).toFixed(1)}`).join(" ");
      const cur = val(shown - 1);
      const state = cur >= 75 ? ["Crítico", C.red] : cur >= 60 ? ["Alerta", C.amber] : ["Normal", C.mata];
      return (
        <Panel x={520} y={60} w={700} h={520} title="Monitoramento · Compressor 02">
          <div className="flex items-end justify-between px-6 pt-5">
            <div><p className="text-xs text-nevoa">Temperatura</p><p className="tabular font-mono text-4xl text-white">{cur.toFixed(1).replace(".", ",")} °C</p></div>
            <Chip c={state[1]}>{state[0]}</Chip>
          </div>
          <svg viewBox={`0 0 ${W} ${H}`} className="mx-6 mt-4" width={W} height={H}>
            <rect x="0" y={y(90)} width={W} height={y(75) - y(90)} fill={C.red} opacity=".10" />
            <rect x="0" y={y(75)} width={W} height={y(60) - y(75)} fill={C.amber} opacity=".10" />
            <line x1="0" x2={W} y1={y(75)} y2={y(75)} stroke={C.red} strokeDasharray="5 5" />
            <line x1="0" x2={W} y1={y(60)} y2={y(60)} stroke={C.amber} strokeDasharray="5 5" />
            <text x={W - 4} y={y(75) - 6} textAnchor="end" fill={C.red} fontSize="11" fontFamily="IBM Plex Mono">CRÍTICO 75 °C</text>
            <text x={W - 4} y={y(60) - 6} textAnchor="end" fill={C.amber} fontSize="11" fontFamily="IBM Plex Mono">ALERTA 60 °C</text>
            <path d={d} fill="none" stroke="#fff" strokeWidth="2.5" strokeLinejoin="round" />
            <circle cx={((shown - 1) / (n - 1)) * W} cy={y(cur)} r="5" fill={state[1]} />
          </svg>
          <p className="px-6 pt-2 font-mono text-[10px] uppercase tracking-[0.16em] text-nevoa">dados ilustrativos</p>
        </Panel>
      );
    },
  },
  {
    t: "A ordem de serviço é aberta automaticamente",
    d: "Se o gestor preferir, a OS nasce sozinha quando a leitura fica crítica, já com máquina, origem e prioridade.",
    icon: Wrench,
    render: (p) => {
      const a = ease(seg(p, 0.05, 0.3));
      const fields = [["Máquina", "Compressor 02"], ["Tipo", "Corretiva"], ["Origem", "Sensor · temperatura crítica"], ["Prioridade", "Alta"], ["Aberta em", "Hoje, 14:32"]];
      return (
        <Panel x={560} y={90} w={620} h={460} o={a} title="Nova ordem de serviço">
          <div className="p-7" style={{ transform: `translateY(${(1 - a) * 20}px)` }}>
            <div className="flex items-center justify-between">
              <p className="font-grotesk text-3xl font-semibold text-white">OS #1284</p>
              <Chip c={C.sensor}><Zap className="size-3" />Aberta automaticamente</Chip>
            </div>
            <div className="mt-7 grid gap-3">
              {fields.map(([k, v], i) => {
                const f = ease(seg(p, 0.3 + i * 0.1, 0.42 + i * 0.1));
                return (
                  <div key={k} className="flex items-center justify-between rounded-lg border border-white/[0.07] bg-white/[0.03] px-4 py-3 text-[15px]">
                    <span className="text-nevoa">{k}</span>
                    <span className="text-white" style={{ opacity: f }}>{v}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </Panel>
      );
    },
  },
  {
    t: "Todos os envolvidos são avisados na hora",
    d: "Gestor, técnico e supervisor recebem a notificação e cada um sabe o que fazer.",
    icon: Bell,
    render: (p) => {
      const ns = [["Gestor de manutenção", "Nova OS #1284 · Compressor 02 em estado crítico"], ["Técnico responsável", "Você foi designado para a OS #1284"], ["Supervisor da linha", "Compressor 02 pode parar: OS #1284 aberta"]];
      return (
        <Phone x={720} y={50}>
          <div className="absolute inset-0 bg-[linear-gradient(160deg,#16244A,#0A1530_60%)]" />
          <p className="absolute inset-x-0 top-16 text-center font-grotesk text-6xl font-semibold text-white/90">14:32</p>
          <div className="absolute inset-x-3 top-[190px] grid gap-2.5">
            {ns.map(([who, msg], i) => {
              const a = ease(seg(p, 0.1 + i * 0.2, 0.28 + i * 0.2));
              return (
                <div key={who} className="rounded-2xl bg-white/90 px-3.5 py-3 text-[#0B1730] backdrop-blur" style={{ opacity: a, transform: `translateY(${(1 - a) * -18}px) scale(${0.96 + a * 0.04})` }}>
                  <div className="flex items-center gap-2"><span className="grid size-5 place-items-center rounded-md bg-marinho"><CircleDot className="size-3 text-mata" /></span><span className="text-[11px] font-semibold">MyMaq360</span><span className="ml-auto text-[10px] text-slate-500">agora</span></div>
                  <p className="mt-1.5 text-[12px] font-semibold">{who}</p>
                  <p className="text-[12px] leading-snug text-slate-600">{msg}</p>
                </div>
              );
            })}
          </div>
        </Phone>
      );
    },
  },
  {
    t: "Do atendimento ao fechamento, cada etapa notifica quem precisa saber",
    d: "O técnico registra o que fez, anexa fotos e fecha a OS. O ciclo inteiro fica no histórico da máquina.",
    icon: CheckCircle2,
    render: (p) => {
      const steps = ["Aberta", "Em atendimento", "Aguardando peça", "Concluída"];
      const k = seg(p, 0.05, 0.85) * (steps.length - 1);
      const checks = ["Medir temperatura do cabeçote", "Limpar trocador de calor", "Trocar filtro de ar", "Anexar foto do reparo"];
      return (
        <Panel x={520} y={70} w={700} h={500} title="OS #1284 · Compressor 02">
          <div className="px-7 pt-7">
            <div className="relative flex justify-between">
              <span className="absolute left-3 right-3 top-3 h-1 rounded-full bg-white/10" />
              <span className="absolute left-3 top-3 h-1 rounded-full bg-mata" style={{ width: `calc((100% - 24px) * ${k / (steps.length - 1)})` }} />
              {steps.map((s, i) => {
                const done = k >= i - 0.02;
                const pulse = done && k - i < 0.35;
                return (
                  <div key={s} className="relative z-10 flex w-28 flex-col items-center gap-2 text-center">
                    <span className={cn("grid size-7 place-items-center rounded-full border-2", done ? "border-mata bg-mata" : "border-white/20 bg-[#0E1C3A]")}>{done && <Check className="size-4 text-white" />}</span>
                    <span className={cn("text-[12px]", done ? "text-white" : "text-nevoa")}>{s}</span>
                    <span className="flex items-center gap-1 font-mono text-[9px] uppercase text-mata" style={{ opacity: pulse ? 1 : 0 }}><Bell className="size-3" />notificados</span>
                  </div>
                );
              })}
            </div>
            <div className="mt-9 grid gap-2.5">
              {checks.map((c, i) => {
                const on = seg(p, 0.15 + i * 0.16, 0.2 + i * 0.16) > 0.5;
                return (
                  <div key={c} className="flex items-center gap-3 rounded-lg border border-white/[0.07] bg-white/[0.03] px-4 py-3 text-[14px] text-white/90">
                    <span className={cn("grid size-5 place-items-center rounded border", on ? "border-mata bg-mata" : "border-white/25")}>{on && <Check className="size-3.5 text-white" />}</span>
                    {c}
                    {i === 3 && on && <span className="ml-auto flex items-center gap-1 text-[12px] text-sensor"><ImageIcon className="size-4" />reparo.jpg</span>}
                  </div>
                );
              })}
            </div>
          </div>
        </Panel>
      );
    },
  },
  {
    t: "O dashboard mostra onde está o problema",
    d: "Máquinas com mais falhas, técnicos que mais resolveram, OS abertas por dia e o status de todas as ordens.",
    icon: Monitor,
    render: (p) => {
      const g = ease(seg(p, 0.05, 0.6));
      const days = [4, 6, 3, 7, 5, 8, 6, 9, 4, 7, 5, 6, 8, 7];
      const maqs = [["Bomba hidráulica 07", 14], ["Compressor 02", 11], ["Prensa 01", 8], ["Torno CNC 03", 5]] as const;
      const tecs = [["Técnico A", 32], ["Técnico B", 27], ["Técnico C", 19]] as const;
      const status = [["Abertas", 7, C.sensor], ["Em atendimento", 12, C.amber], ["Aguardando peça", 3, C.nevoa], ["Concluídas no mês", 86, C.mata]] as const;
      return (
        <Panel x={500} y={50} w={740} h={560} title="Dashboard">
          <div className="grid grid-cols-4 gap-3 p-5">
            {status.map(([k, v, c]) => (
              <div key={k} className="rounded-lg border border-white/[0.07] bg-white/[0.03] px-3 py-2.5">
                <p className="text-[10px] text-nevoa">{k}</p>
                <p className="tabular font-mono text-2xl" style={{ color: c }}>{Math.round(v * g)}</p>
              </div>
            ))}
          </div>
          <div className="grid grid-cols-[1.25fr_1fr] gap-3 px-5">
            <div className="rounded-lg border border-white/[0.07] bg-white/[0.03] p-4">
              <p className="text-[11px] text-white/80">OS abertas por dia</p>
              <div className="mt-3 flex h-[150px] items-end gap-1.5">
                {days.map((d, i) => <span key={i} className="flex-1 rounded-t bg-sensor" style={{ height: `${(d / 9) * 100 * ease(seg(p, 0.1 + i * 0.025, 0.4 + i * 0.025))}%` }} />)}
              </div>
            </div>
            <div className="rounded-lg border border-white/[0.07] bg-white/[0.03] p-4">
              <p className="text-[11px] text-white/80">Técnicos que mais resolveram OS</p>
              <div className="mt-3 grid gap-3">
                {tecs.map(([n, v]) => (
                  <div key={n}><div className="flex justify-between text-[11px]"><span className="text-nevoa">{n}</span><span className="tabular font-mono text-white">{Math.round(v * g)}</span></div>
                    <div className="mt-1 h-1.5 rounded-full bg-white/10"><div className="h-1.5 rounded-full bg-mata" style={{ width: `${(v / 32) * 100 * g}%` }} /></div></div>
                ))}
              </div>
            </div>
          </div>
          <div className="mx-5 mt-3 rounded-lg border border-white/[0.07] bg-white/[0.03] p-4">
            <p className="text-[11px] text-white/80">Máquinas com mais falhas</p>
            <div className="mt-3 grid grid-cols-2 gap-x-6 gap-y-2.5">
              {maqs.map(([n, v]) => (
                <div key={n} className="flex items-center gap-3 text-[11px]"><span className="w-32 truncate text-nevoa">{n}</span>
                  <div className="h-1.5 flex-1 rounded-full bg-white/10"><div className="h-1.5 rounded-full" style={{ width: `${(v / 14) * 100 * g}%`, background: C.red }} /></div>
                  <span className="tabular w-5 font-mono text-white">{Math.round(v * g)}</span></div>
              ))}
            </div>
          </div>
          <p className="px-5 pt-2 font-mono text-[9px] uppercase tracking-[0.16em] text-nevoa">dados ilustrativos</p>
        </Panel>
      );
    },
  },
  {
    t: "Preventivas avisam antes, no celular e no computador",
    d: "Lembretes de manutenção preventiva configuráveis, relatórios de OS e técnicos, pelo aplicativo ou pelo sistema web.",
    icon: Smartphone,
    render: (p) => {
      const a = ease(seg(p, 0.05, 0.3)); const b = ease(seg(p, 0.3, 0.55)); const end = ease(seg(p, 0.72, 0.95));
      return (
        <>
          <Panel x={500} y={110} w={460} h={360} o={a * (1 - end)} title="Relatórios">
            <div className="grid gap-2.5 p-5">
              {["Ordens de serviço por período", "Desempenho por técnico", "Falhas por máquina", "Preventivas realizadas"].map((r, i) => (
                <div key={r} className="flex items-center gap-3 rounded-lg border border-white/[0.07] bg-white/[0.03] px-4 py-3 text-[13px] text-white/90" style={{ opacity: ease(seg(p, 0.1 + i * 0.07, 0.25 + i * 0.07)) }}>
                  <FileText className="size-4 text-mata" />{r}
                </div>
              ))}
            </div>
          </Panel>
          <Phone x={1000} y={70} s={0.88} o={b * (1 - end)}>
            <div className="px-4 pt-14 text-white">
              <p className="font-mono text-[10px] uppercase tracking-wider text-nevoa">Preventiva</p>
              <div className="mt-3 rounded-2xl bg-white p-4 text-[#0B1730]">
                <p className="flex items-center gap-2 text-[11px] font-semibold text-mata"><Bell className="size-3.5" />Lembrete</p>
                <p className="mt-1 font-grotesk text-lg font-semibold">Torno CNC 03</p>
                <p className="text-[12px] text-slate-600">Preventiva a cada 30 dias. Próxima em 3 dias.</p>
              </div>
            </div>
          </Phone>
          <div className="absolute left-[520px] top-[200px] flex flex-col items-start gap-6" style={{ opacity: end }}>
            <MyMaqLogo endorse className="w-[440px]" />
            <p className="flex items-center gap-4 font-mono text-sm uppercase tracking-[0.16em] text-nevoa"><Smartphone className="size-5 text-mata" />Aplicativo<span className="text-white/20">·</span><Monitor className="size-5 text-mata" />Sistema web</p>
          </div>
        </>
      );
    },
  },
];

export const FILM_LENGTH = SCENES.length * SCENE;

/** Quadro do filme num instante t (segundos). 1280×720. */
export function FilmFrame({ t }: { t: number }) {
  const i = Math.min(SCENES.length - 1, Math.floor(t / SCENE));
  const p = (t - i * SCENE) / SCENE;
  const sc = SCENES[i];
  const inA = fadeIn(p, 0, 0.12);
  const out = i < SCENES.length - 1 ? 1 - ease(seg(p, 0.93, 1)) : 1;
  return (
    <div className="relative h-[720px] w-[1280px] overflow-hidden bg-marinho font-sans text-white">
      <div className="tech-grid absolute inset-0 opacity-50" />
      <div className="absolute -left-40 -top-40 size-[620px] rounded-full border-[40px] border-mata/[0.06]" />
      <div className="absolute left-16 top-16 flex items-center gap-3 font-mono text-[12px] uppercase tracking-[0.18em] text-nevoa">
        <span className="text-mata">{String(i + 1).padStart(2, "0")}</span><span className="text-white/20">/</span><span>{String(SCENES.length).padStart(2, "0")}</span>
      </div>
      <div className="absolute left-16 top-[180px] w-[400px]" style={{ opacity: inA * out, transform: `translateY(${(1 - inA) * 14}px)` }}>
        <sc.icon className="size-9 text-mata" strokeWidth={1.6} />
        <h3 className="mt-6 font-grotesk text-[34px] font-semibold leading-[1.08] tracking-tight">{sc.t}</h3>
        <p className="mt-5 text-[17px] leading-relaxed text-nevoa">{sc.d}</p>
      </div>
      <div className="absolute inset-0" style={{ opacity: inA * out }}>{sc.render(p)}</div>
      <div className="absolute bottom-10 left-16 flex gap-1.5">
        {SCENES.map((_, k) => (
          <span key={k} className="h-1 w-9 overflow-hidden rounded-full bg-white/10">
            <span className="block h-full bg-mata" style={{ width: `${k < i ? 100 : k === i ? p * 100 : 0}%` }} />
          </span>
        ))}
      </div>
      <div className="absolute bottom-9 right-16"><MyMaqLogo className="w-[130px] opacity-80" /></div>
    </div>
  );
}

/** Player do filme no site: toca quando aparece na tela, com pausa e navegação por cena. */
export function FilmPlayer() {
  const wrap = useRef<HTMLDivElement>(null);
  const [k, setK] = useState(0.5);
  const [t, setT] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [seen, setSeen] = useState(false);
  const [sound, setSound] = useState(false);
  const audio = useRef<HTMLAudioElement>(null);
  const tRef = useRef(0);
  tRef.current = t;
  const reduce = typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  useLayoutEffect(() => {
    const el = wrap.current; if (!el) return;
    const ro = new ResizeObserver(() => setK(el.clientWidth / 1280));
    ro.observe(el);
    return () => ro.disconnect();
  }, []);
  useEffect(() => {
    const el = wrap.current; if (!el || reduce) return;
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting && !seen) { setSeen(true); setPlaying(true); }
      if (!e.isIntersecting) setPlaying(false);
    }, { threshold: 0.45 });
    io.observe(el);
    return () => io.disconnect();
  }, [seen, reduce]);
  useEffect(() => {
    if (!playing) return;
    let raf = 0; let last = performance.now();
    const loop = (now: number) => {
      const dt = (now - last) / 1000; last = now;
      setT((x) => {
        const nx = x + dt;
        if (nx >= FILM_LENGTH) { setPlaying(false); return FILM_LENGTH - 0.001; }
        return nx;
      });
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, [playing]);

  // trilha sincronizada: o relógio do filme manda, o áudio acompanha
  useEffect(() => {
    const a = audio.current; if (!a) return;
    if (playing && sound) {
      a.currentTime = tRef.current;
      a.play().catch(() => setSound(false));
      const id = window.setInterval(() => { if (Math.abs(a.currentTime - tRef.current) > 0.2) a.currentTime = tRef.current; }, 500);
      return () => { window.clearInterval(id); a.pause(); };
    }
    a.pause();
  }, [playing, sound]);
  const seek = (x: number) => { setT(x); if (audio.current) audio.current.currentTime = x; };

  const idx = Math.min(SCENES.length - 1, Math.floor(t / SCENE));
  const ended = t >= FILM_LENGTH - 0.01;
  return (
    <div className="space-y-4">
      <div ref={wrap} className="relative w-full overflow-hidden rounded-2xl border border-white/10 shadow-[0_60px_140px_-50px_rgba(16,163,127,0.45)]" style={{ height: 720 * k }}>
        <div className="absolute left-0 top-0 origin-top-left" style={{ transform: `scale(${k})` }}>
          <FilmFrame t={reduce && !playing && t === 0 ? SCENE * 0.7 : t} />
        </div>
        <button
          type="button"
          onClick={() => { if (ended) { seek(0); setPlaying(true); } else setPlaying((v) => !v); }}
          className="absolute inset-0 grid place-items-center bg-transparent transition-colors hover:bg-black/10"
          aria-label={playing ? "Pausar filme" : ended ? "Assistir de novo" : "Reproduzir filme"}
        >
          {!playing && (
            <span className="grid size-20 place-items-center rounded-full bg-mata text-white shadow-[0_0_40px_rgba(16,163,127,0.6)]">
              {ended ? <RotateCcw className="size-8" /> : <Play className="ml-1 size-8" />}
            </span>
          )}
        </button>
      </div>
      <div className="flex flex-wrap items-center gap-2">
        <button type="button" onClick={() => setPlaying((v) => !v)} className="grid size-9 place-items-center rounded-md border border-white/15 text-white hover:bg-white/5" aria-label={playing ? "Pausar" : "Reproduzir"}>
          {playing ? <Pause className="size-4" /> : <Play className="size-4" />}
        </button>
        <button type="button" onClick={() => { setSound((v) => !v); if (!playing) setPlaying(true); }} className={cn("flex h-9 items-center gap-2 rounded-md border px-3 text-sm transition-colors", sound ? "border-mata bg-mata/15 text-white" : "border-white/15 text-nevoa hover:text-white")} aria-pressed={sound} aria-label={sound ? "Desligar som" : "Ligar som"}>
          {sound ? <Volume2 className="size-4" /> : <VolumeX className="size-4" />}{sound ? "Som ligado" : "Ligar som"}
        </button>
        <audio ref={audio} src="./mymaq360-trilha.mp3" preload="none" />
        {SCENES.map((s, i) => (
          <button key={i} type="button" onClick={() => { seek(i * SCENE + 0.01); setPlaying(true); }}
            className={cn("rounded-full border px-3 py-1.5 font-mono text-[11px] transition-colors", i === idx ? "border-mata bg-mata/15 text-white" : "border-white/10 text-nevoa hover:text-white")}
            aria-label={`Ir para a cena ${i + 1}: ${s.t}`}>
            {String(i + 1).padStart(2, "0")}
          </button>
        ))}
        <span className="ml-auto hidden text-sm text-nevoa md:block">{SCENES[idx].t}</span>
      </div>
    </div>
  );
}
