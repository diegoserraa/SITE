import { useEffect, useState, type ReactNode } from "react";
import { Bell, BellRing, Camera, CheckCircle2, ClipboardList, FileText, Image as ImageIcon, LayoutDashboard, Monitor, Pause, QrCode, Smartphone, Thermometer, UserCheck, Wrench } from "lucide-react";
import { ScreenshotSlot } from "@/components/shared";
import { cn } from "@/lib/utils";

const reduce = () => typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

function Pill({ c, children, className }: { c: string; children: ReactNode; className?: string }) {
  return <span className={cn("inline-flex items-center gap-1 rounded-full px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider", className)} style={{ background: `${c}26`, color: c }}>{children}</span>;
}

/* ============ HERO: celular lendo QR e abrindo a ficha da máquina ============ */
export function ScanPhone() {
  const [stage, setStage] = useState<"scan" | "found">(reduce() ? "found" : "scan");
  const [tab, setTab] = useState(0);
  useEffect(() => {
    if (reduce()) return;
    const id = window.setTimeout(() => setStage("found"), 2600);
    return () => window.clearTimeout(id);
  }, []);
  const tabs = ["Ordens", "Dados", "Anexos"];
  return (
    <div className="relative mx-auto w-[300px] sm:w-[320px]">
      <div className="pointer-events-none absolute -inset-16 rounded-full bg-[radial-gradient(circle,rgba(16,163,127,0.22),transparent_65%)]" aria-hidden="true" />
      <div className="relative rounded-[46px] border-[10px] border-[#1C2740] bg-[#081124] shadow-[0_50px_100px_-40px_rgba(0,0,0,.9)]">
        <div className="relative h-[600px] overflow-hidden rounded-[36px] bg-[#0A1530]">
          <div className="absolute left-1/2 top-2.5 z-20 h-[22px] w-[92px] -translate-x-1/2 rounded-full bg-black" />
          {/* câmera */}
          <div className={cn("absolute inset-0 transition-all duration-700", stage === "found" ? "pointer-events-none -translate-y-8 opacity-0" : "opacity-100")}>
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,#22324f,#0A1530_70%)]" />
            <p className="absolute inset-x-0 top-14 text-center font-mono text-[10px] uppercase tracking-[0.18em] text-white/70">Aponte para a etiqueta</p>
            <div className="absolute left-1/2 top-[150px] grid size-[200px] -translate-x-1/2 place-items-center">
              <div className="rounded-xl bg-white p-3"><QrCode className="size-36 text-marinho" strokeWidth={1.4} /></div>
              {["left-0 top-0 border-l-4 border-t-4", "right-0 top-0 border-r-4 border-t-4", "left-0 bottom-0 border-b-4 border-l-4", "right-0 bottom-0 border-b-4 border-r-4"].map((k) => (
                <span key={k} className={cn("absolute size-8 rounded-sm border-white", k)} />
              ))}
              <span className="qr-scan absolute inset-x-1 top-1 h-[3px] rounded-full bg-mata shadow-[0_0_14px_#10A37F]" />
            </div>
            <p className="absolute inset-x-0 top-[380px] text-center text-sm text-white/80">EQ-0002</p>
          </div>
          {/* ficha */}
          <div className={cn("absolute inset-0 px-5 pt-12 text-white transition-all duration-700", stage === "found" ? "opacity-100" : "pointer-events-none translate-y-8 opacity-0")}>
            <p className="flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-wider text-mata"><CheckCircle2 className="size-3.5" />Máquina identificada</p>
            <p className="mt-2 font-grotesk text-2xl font-semibold">Compressor 02</p>
            <p className="text-xs text-nevoa">Linha 3 · Utilidades · EQ-0002</p>
            <div className="mt-3 flex gap-2"><Pill c="#10A37F">Operando</Pill><Pill c="#2563EB"><Thermometer className="size-3" />52 °C</Pill></div>
            <div className="mt-5 grid grid-cols-3 rounded-lg bg-white/5 p-1 text-center text-[12px]" role="tablist">
              {tabs.map((x, i) => (
                <button key={x} role="tab" aria-selected={tab === i} onClick={() => setTab(i)} className={cn("rounded-md py-1.5 transition-colors", tab === i ? "bg-mata text-white" : "text-nevoa hover:text-white")}>{x}</button>
              ))}
            </div>
            <div className="mt-4 grid gap-2.5" key={tab}>
              {tab === 0 && [["#1284", "Temperatura alta", "Em atendimento", "#F59E0B"], ["#1279", "Troca de filtro", "Concluída", "#10A37F"], ["#1263", "Ruído no motor", "Concluída", "#10A37F"]].map(([n, t, s, c]) => (
                <div key={n} className="flex items-center justify-between rounded-xl border border-white/[0.07] bg-white/[0.04] px-3.5 py-3">
                  <div><p className="font-mono text-[10px] text-nevoa">OS {n}</p><p className="text-[13px]">{t}</p></div><Pill c={c}>{s}</Pill>
                </div>
              ))}
              {tab === 1 && [["Fabricante", "Atlas Copco"], ["Modelo", "GA 30 VSD+"], ["Instalação", "03/2021"], ["Próxima preventiva", "em 12 dias"]].map(([k, v]) => (
                <div key={k} className="flex justify-between rounded-xl border border-white/[0.07] bg-white/[0.04] px-3.5 py-3 text-[13px]"><span className="text-nevoa">{k}</span><span>{v}</span></div>
              ))}
              {tab === 2 && [["manual-operacao.pdf", 0], ["foto-placa.jpg", 1], ["laudo-vibracao.pdf", 0]].map(([n, img]) => (
                <div key={n as string} className="flex items-center gap-3 rounded-xl border border-white/[0.07] bg-white/[0.04] px-3.5 py-3 text-[13px]">
                  {img ? <ImageIcon className="size-4 text-sensor" /> : <FileText className="size-4 text-mata" />}{n}
                </div>
              ))}
            </div>
            <button onClick={() => { setStage("scan"); setTab(0); window.setTimeout(() => setStage("found"), 2600); }} className="absolute inset-x-5 bottom-6 flex items-center justify-center gap-2 rounded-xl border border-white/10 py-3 text-[13px] text-nevoa hover:text-white">
              <Camera className="size-4" />Ler outra máquina
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ============ CICLO 360°: etapas em volta do anel ============ */
export const CICLO = [
  { icon: QrCode, t: "Identificar", d: "O técnico lê o QR code da etiqueta e o sistema abre a máquina certa." },
  { icon: FileText, t: "Consultar", d: "Ordens de serviço, dados técnicos e anexos (manuais, fotos, laudos) na tela da máquina." },
  { icon: ClipboardList, t: "Abrir OS", d: "Abertura manual pelo celular ou automática, quando o sensor passa da faixa crítica." },
  { icon: BellRing, t: "Notificar", d: "Gestor, técnico e demais envolvidos recebem aviso a cada mudança de status." },
  { icon: Wrench, t: "Atender", d: "O técnico registra o que fez, anexa fotos e atualiza o andamento da ordem." },
  { icon: CheckCircle2, t: "Fechar", d: "A OS é concluída, todos são avisados e o histórico da máquina é atualizado." },
  { icon: LayoutDashboard, t: "Analisar", d: "Dashboard e relatórios mostram falhas por máquina, desempenho de técnicos e volume de OS." },
  { icon: Bell, t: "Prevenir", d: "Preventivas programadas avisam antes do prazo, e o ciclo recomeça mais cedo." },
];

export function CycleRing() {
  const [i, setI] = useState(0);
  const [auto, setAuto] = useState(!reduce());
  useEffect(() => {
    if (!auto) return;
    const id = window.setInterval(() => setI((x) => (x + 1) % CICLO.length), 3200);
    return () => window.clearInterval(id);
  }, [auto]);
  const R = 42; const n = CICLO.length; const cur = CICLO[i];
  const pick = (k: number) => { setI(k); setAuto(false); };
  return (
    <div className="grid items-center gap-12 lg:grid-cols-[1.05fr_1fr]">
      <div className="relative mx-auto aspect-square w-full max-w-[520px]">
        <svg viewBox="0 0 100 100" className="absolute inset-0 size-full" aria-hidden="true">
          <circle cx="50" cy="50" r={R} fill="none" stroke="rgba(255,255,255,.08)" strokeWidth="0.6" />
          <circle cx="50" cy="50" r={R} fill="none" stroke="#10A37F" strokeWidth="0.9" strokeLinecap="round"
            strokeDasharray={`${(2 * Math.PI * R * (i + 1)) / n} ${2 * Math.PI * R}`} transform="rotate(-90 50 50)" className="transition-[stroke-dasharray] duration-700" />
        </svg>
        {CICLO.map((s, k) => {
          const a = (k / n) * Math.PI * 2 - Math.PI / 2;
          const on = k === i; const past = k < i;
          return (
            <button key={s.t} onClick={() => pick(k)} aria-label={`${k + 1}. ${s.t}`} aria-pressed={on}
              className="absolute -translate-x-1/2 -translate-y-1/2"
              style={{ left: `${50 + R * Math.cos(a)}%`, top: `${50 + R * Math.sin(a)}%` }}>
              <span className={cn("grid size-11 place-items-center rounded-full border transition-all duration-300 sm:size-14",
                on ? "scale-110 border-mata bg-mata text-white shadow-[0_0_30px_rgba(16,163,127,.55)]" : past ? "border-mata/60 bg-marinho-2 text-mata" : "border-hairline/20 bg-marinho-2 text-nevoa hover:text-ink")}>
                <s.icon className="size-5 sm:size-6" strokeWidth={1.7} />
              </span>
              <span className={cn("absolute left-1/2 top-full mt-1.5 -translate-x-1/2 whitespace-nowrap font-mono text-[10px] uppercase tracking-wider", on ? "text-ink" : "text-nevoa")}>{s.t}</span>
            </button>
          );
        })}
        <div className="absolute inset-[24%] grid place-items-center text-center">
          <div>
            <p className="font-mono text-[11px] text-mata">{String(i + 1).padStart(2, "0")} / {String(n).padStart(2, "0")}</p>
            <p className="mt-1 font-grotesk text-2xl font-semibold sm:text-3xl">{cur.t}</p>
          </div>
        </div>
      </div>
      <div className="space-y-6">
        <div key={i} className="min-h-[150px] animate-in fade-in slide-in-from-bottom-2 duration-500">
          <p className="eyebrow">Etapa {i + 1}</p>
          <p className="mt-3 font-grotesk text-3xl font-semibold leading-tight">{cur.t}</p>
          <p className="mt-3 max-w-md text-lg leading-relaxed text-nevoa">{cur.d}</p>
        </div>
        <ol className="grid grid-cols-2 gap-2 sm:grid-cols-4">
          {CICLO.map((s, k) => (
            <li key={s.t}>
              <button onClick={() => pick(k)} className={cn("w-full rounded-lg border px-3 py-2 text-left text-[13px] transition-colors", k === i ? "border-mata bg-mata/15 text-ink" : "border-hairline/[0.08] text-nevoa hover:text-ink")}>
                <span className="font-mono text-[10px] text-mata">{String(k + 1).padStart(2, "0")}</span> {s.t}
              </button>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}

/* ============ DASHBOARD ============ */
const STATUS = [
  { k: "Abertas", c: "#2563EB", os: [["#1288", "Prensa 01", "Vazamento de óleo"], ["#1287", "Torno CNC 03", "Erro de eixo"], ["#1285", "Esteira 04", "Correia solta"]] },
  { k: "Em atendimento", c: "#F59E0B", os: [["#1284", "Compressor 02", "Temperatura crítica"], ["#1282", "Bomba hidráulica 07", "Pressão baixa"]] },
  { k: "Aguardando peça", c: "#94A3B8", os: [["#1276", "Bomba hidráulica 07", "Troca de selo"]] },
  { k: "Concluídas", c: "#10A37F", os: [["#1283", "Caldeira 01", "Preventiva mensal"], ["#1281", "Compressor 02", "Troca de filtro"], ["#1280", "Prensa 01", "Ajuste de curso"]] },
];
const COUNTS = [7, 12, 3, 86];
const DIAS = [4, 6, 3, 7, 5, 8, 6, 9, 4, 7, 5, 6, 8, 7];
const FALHAS = [["Bomba hidráulica 07", 14], ["Compressor 02", 11], ["Prensa 01", 8], ["Torno CNC 03", 5], ["Esteira 04", 3]] as const;
const TECS = [["Técnico A", 32], ["Técnico B", 27], ["Técnico C", 19], ["Técnico D", 12]] as const;

export function DashboardLive() {
  const [st, setSt] = useState(1);
  const box = "rounded-xl border border-white/[0.07] bg-white/[0.03] p-4 sm:p-5";
  return (
    <div className="rounded-2xl border border-white/[0.08] bg-[#0E1C3A] p-3 sm:p-5">
      <div className="grid grid-cols-2 gap-2 sm:gap-3 lg:grid-cols-4" role="tablist" aria-label="Status das ordens de serviço">
        {STATUS.map((s, i) => (
          <button key={s.k} role="tab" aria-selected={st === i} onClick={() => setSt(i)}
            className={cn("rounded-xl border p-3 text-left transition-colors sm:p-4", st === i ? "border-white/25 bg-white/[0.07]" : "border-white/[0.07] bg-white/[0.02] hover:bg-white/[0.05]")}>
            <p className="flex items-center gap-2 text-[12px] text-nevoa"><span className="size-2 rounded-full" style={{ background: s.c }} />{s.k}</p>
            <p className="tabular mt-1 font-mono text-3xl" style={{ color: s.c }}>{COUNTS[i]}</p>
          </button>
        ))}
      </div>
      <div className="mt-3 grid gap-3 lg:grid-cols-[1fr_1.3fr]">
        <div className={box}>
          <p className="text-sm text-white/85">OS {STATUS[st].k.toLowerCase()}</p>
          <ul className="mt-3 grid gap-2">
            {STATUS[st].os.map(([n, m, t]) => (
              <li key={n} className="flex items-center justify-between gap-3 rounded-lg bg-white/[0.03] px-3 py-2.5 text-[13px] animate-in fade-in">
                <span><span className="font-mono text-[11px] text-nevoa">{n}</span> <span className="text-white/90">{m}</span><span className="block text-[12px] text-nevoa">{t}</span></span>
                <Pill c={STATUS[st].c}>{STATUS[st].k}</Pill>
              </li>
            ))}
          </ul>
        </div>
        <div className={box}>
          <div className="flex items-baseline justify-between"><p className="text-sm text-white/85">OS abertas por dia</p><p className="font-mono text-[10px] text-nevoa">últimos 14 dias</p></div>
          <div className="mt-4 flex h-[150px] items-end gap-1.5">
            {DIAS.map((d, k) => (
              <div key={k} className="group relative flex-1">
                <div className="rounded-t bg-sensor transition-colors group-hover:bg-azul-n" style={{ height: `${(d / 9) * 140}px` }} />
                <span className="pointer-events-none absolute -top-6 left-1/2 -translate-x-1/2 rounded bg-white px-1.5 font-mono text-[10px] text-marinho opacity-0 group-hover:opacity-100">{d}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="mt-3 grid gap-3 md:grid-cols-2">
        <div className={box}>
          <p className="text-sm text-white/85">Máquinas com mais falhas</p>
          <div className="mt-4 grid gap-3">
            {FALHAS.map(([n, v]) => (
              <div key={n} className="grid grid-cols-[minmax(0,9.5rem)_1fr_2rem] items-center gap-3 text-[13px]">
                <span className="truncate text-nevoa">{n}</span>
                <div className="h-2 rounded-full bg-white/10"><div className="h-2 rounded-full bg-[#EF4444]" style={{ width: `${(v / 14) * 100}%` }} /></div>
                <span className="tabular text-right font-mono text-white">{v}</span>
              </div>
            ))}
          </div>
        </div>
        <div className={box}>
          <p className="text-sm text-white/85">Técnicos que mais resolveram OS</p>
          <div className="mt-4 grid gap-3">
            {TECS.map(([n, v]) => (
              <div key={n} className="grid grid-cols-[minmax(0,9.5rem)_1fr_2rem] items-center gap-3 text-[13px]">
                <span className="truncate text-nevoa">{n}</span>
                <div className="h-2 rounded-full bg-white/10"><div className="h-2 rounded-full bg-mata" style={{ width: `${(v / 32) * 100}%` }} /></div>
                <span className="tabular text-right font-mono text-white">{v}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
      <p className="px-1 pt-3 font-mono text-[10px] uppercase tracking-[0.16em] text-nevoa">dados ilustrativos</p>
    </div>
  );
}

/* ============ NOTIFICAÇÕES DO CICLO DA OS ============ */
export function OsTimeline() {
  const linhas: { hora: string; status: string; texto: string; quem?: string; cor: string; Icon: typeof ClipboardList }[] = [
    { hora: "14:32", status: "Aberta", texto: "Sensor abriu a OS #1284", quem: "Gestores e técnicos", cor: "#2563EB", Icon: ClipboardList },
    { hora: "14:41", status: "Atribuída", texto: "Técnica Ana foi designada para a máquina", quem: "Técnica Ana", cor: "#F59E0B", Icon: UserCheck },
    { hora: "14:48", status: "Em atendimento", texto: "Técnica Ana chegou e iniciou o atendimento", cor: "#F59E0B", Icon: Wrench },
    { hora: "15:05", status: "Pausada", texto: "Motivo: aguardando peça (filtro de ar)", quem: "Solicitante · Gestor", cor: "#94A3B8", Icon: Pause },
    { hora: "15:50", status: "Em atendimento", texto: "Peça chegou, atendimento retomado", quem: "Solicitante · Gestor", cor: "#F59E0B", Icon: Wrench },
    { hora: "16:20", status: "Concluída", texto: "Filtro trocado, OS finalizada", quem: "Solicitante · Gestor", cor: "#10A37F", Icon: CheckCircle2 },
  ];
  return (
    <ol className="relative grid gap-7 pl-14">
      {linhas.map((l, i) => (
        <li key={l.hora} className="reveal relative" data-delay={i * 90}>
          {i < linhas.length - 1 && (
            <span className="absolute -left-[33px] top-9 h-[calc(100%+12px)] w-px bg-white/10" aria-hidden="true" />
          )}
          <span className="absolute -left-14 top-0 grid size-9 place-items-center rounded-full" style={{ background: `${l.cor}26`, color: l.cor }}>
            <l.Icon className="size-4" />
          </span>
          <div className="flex flex-wrap items-center gap-2"><span className="tabular font-mono text-xs text-nevoa">{l.hora}</span><Pill c={l.cor}>{l.status}</Pill></div>
          <p className="mt-1.5 text-ink/90">{l.texto}</p>
          {l.quem ? (
            <p className="mt-1 flex items-center gap-1.5 text-sm text-nevoa"><Bell className="size-3.5 text-mata" />Notificados: {l.quem}</p>
          ) : (
            <p className="mt-1 flex items-center gap-1.5 text-sm text-nevoa/60">Só atualiza o status, sem notificação</p>
          )}
        </li>
      ))}
    </ol>
  );
}

/* ============ APP + WEB ============ */
export function Devices({ app, web }: { app?: string; web?: string }) {
  return (
    <div className="relative grid items-end gap-8 md:grid-cols-[1fr_auto]">
      <div>
        <div className="rounded-t-2xl border border-b-0 border-white/10 bg-[#1C2740] p-2.5 pb-0">
          <div className="overflow-hidden rounded-t-lg"><ScreenshotSlot label="Sistema web" src={web} /></div>
        </div>
        <div className="mx-[-3%] h-3 rounded-b-xl bg-[#26324d]" />
        <p className="mt-4 flex items-center gap-2 text-sm text-nevoa"><Monitor className="size-4 text-mata" />Sistema web, direto no navegador</p>
      </div>
      <div className="mx-auto w-[210px]">
        <div className="rounded-[34px] border-[8px] border-[#1C2740] bg-[#081124] p-2">
          <div className="relative overflow-hidden rounded-[22px]">
            {app ? <img src={app} alt="Aplicativo MyMaq360" className="aspect-[9/19] w-full bg-[#081124] object-contain" loading="lazy" /> : (
              <div className="tech-grid grid aspect-[9/19] place-items-center bg-marinho/60 p-4 text-center">
                <div><p className="eyebrow">Captura</p><p className="mt-2 font-grotesk font-semibold">Aplicativo</p><p className="mt-1 text-xs text-nevoa">Imagem do app entra aqui</p></div>
              </div>
            )}
          </div>
        </div>
        <p className="mt-4 flex items-center justify-center gap-2 text-sm text-nevoa"><Smartphone className="size-4 text-mata" />App no celular</p>
      </div>
    </div>
  );
}

/* ============ RELATÓRIOS ============ */
export const RELATORIOS = [
  { icon: ClipboardList, t: "Ordens de serviço", d: "Por período, status, tipo e máquina." },
  { icon: UserCheck, t: "Técnicos", d: "OS resolvidas, tempo de atendimento e carga de trabalho." },
  { icon: Wrench, t: "Máquinas", d: "Falhas, defeitos recorrentes e histórico completo." },
  { icon: Bell, t: "Preventivas", d: "Programadas, realizadas e atrasadas." },
];
