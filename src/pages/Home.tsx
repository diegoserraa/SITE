import { useState } from "react";
import { ArrowRight, ArrowUpRight, Code2, Compass, Cpu, Network, ScanEye, Sparkles, Workflow } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MyMaqLogo } from "@/components/brand/Logos";
import { Contact, Footer, Header, ScreenshotSlot, scrollToId } from "@/components/shared";
import { cn } from "@/lib/utils";
import { useLiveValue, useTheme } from "@/lib/hooks";

/* ---------- Hero: quatro fontes de dados chegam ao botão de ligar ---------- */
function PowerHub({ on, onToggle }: { on: boolean; onToggle: () => void }) {
  const cables = [
    { id: "c1", d: "M24 82 H150 C232 82 236 226 296 246", label: "ERP e sistemas", y: 82 },
    { id: "c2", d: "M24 202 H150 C232 202 236 244 296 254", label: "Sensores IoT", y: 202 },
    { id: "c3", d: "M24 322 H150 C232 322 236 262 296 270", label: "Visão computacional", y: 322 },
    { id: "c4", d: "M24 442 H150 C232 442 236 298 296 278", label: "Planilhas e pessoas", y: 442 },
  ];
  const r = 104, cx = 412, cy = 262;
  const eventos = useLiveValue(340, 35, 2200);
  const latencia = useLiveValue(180, 15, 2600);
  const a1 = (42 * Math.PI) / 180, a2 = (318 * Math.PI) / 180;
  const ring = `M${cx + r * Math.sin(a1)} ${cy - r * Math.cos(a1)} A${r} ${r} 0 1 1 ${cx + r * Math.sin(a2)} ${cy - r * Math.cos(a2)}`;
  return (
    <div className="relative mx-auto w-full max-w-[560px]">
      <svg viewBox="0 0 560 524" className="w-full overflow-visible" aria-hidden="true">
        <defs>
          <linearGradient id="cableOn" x1="0" x2="1">
            <stop offset="0" stopColor="#3B82F6" />
            <stop offset="1" stopColor="#22C55E" />
          </linearGradient>
          <radialGradient id="halo">
            <stop offset="0" stopColor="#22C55E" stopOpacity="0.32" />
            <stop offset="1" stopColor="#22C55E" stopOpacity="0" />
          </radialGradient>
        </defs>
        <circle cx={cx} cy={cy} r="230" fill="url(#halo)" className={cn("transition-opacity duration-700", on ? "opacity-100" : "opacity-0")} />
        {/* marcações do mostrador */}
        {Array.from({ length: 48 }, (_, i) => {
          const a = (i / 48) * Math.PI * 2;
          const r1 = 140, r2 = i % 4 === 0 ? 152 : 146;
          return (
            <line key={i} x1={cx + r1 * Math.sin(a)} y1={cy - r1 * Math.cos(a)} x2={cx + r2 * Math.sin(a)} y2={cy - r2 * Math.cos(a)}
              stroke={on ? "#22C55E" : "#334155"} strokeOpacity={on ? 0.55 : 0.8} strokeWidth="1.5" className="transition-[stroke] duration-700" />
          );
        })}
        {cables.map((c, i) => (
          <g key={c.id}>
            <path id={c.id} d={c.d} fill="none" stroke={on ? "url(#cableOn)" : "hsl(var(--hairline) / 0.22)"} strokeWidth="12" className="cable-draw transition-[stroke] duration-700" style={{ animationDelay: `${0.15 + i * 0.12}s` }} />
            {/* "entalhe" que faz o cabo parecer encaixado — precisa bater com o
                fundo da página pra sumir, por isso usa o token, não um hex fixo */}
            <path d={c.d} fill="none" stroke="hsl(var(--noite))" strokeWidth="3.5" />
            <circle cx="24" cy={c.y} r="13" fill={on ? "#3B82F6" : "hsl(var(--hairline) / 0.22)"} className="transition-[fill] duration-700" />
            <circle cx="24" cy={c.y} r="4.5" fill="hsl(var(--noite))" />
            <text x="24" y={c.y - 26} fill="#94A3B8" fontFamily="IBM Plex Mono, monospace" fontSize="12" letterSpacing="1.6">{c.label.toUpperCase()}</text>
            {on && (
              <circle r="5" fill="#ECFDF5">
                <animateMotion dur={`${1.6 + i * 0.35}s`} repeatCount="indefinite" begin={`${i * 0.3}s`}>
                  <mpath href={`#${c.id}`} />
                </animateMotion>
              </circle>
            )}
          </g>
        ))}
        <path d={ring} fill="none" stroke={on ? "#22C55E" : "hsl(var(--hairline) / 0.55)"} strokeWidth="20" strokeLinecap="round" className={cn("transition-[stroke,filter] duration-500", on && "power-glow")} />
        {/* ponto acima da abertura do anel — mesmo glifo do "O" de SOLUTIONS e do "0" de 360 na marca oficial */}
        <circle cx={cx} cy={cy - r - 6} r="15" fill={on ? "#3B82F6" : "hsl(var(--hairline) / 0.55)"} className="transition-[fill] duration-500" />
      </svg>
      <button
        type="button"
        onClick={onToggle}
        aria-pressed={on}
        aria-label={on ? "Desligar a demonstração" : "Ligar a operação"}
        className="absolute rounded-full focus-visible:outline-offset-8"
        style={{ left: `${((412 - 150) / 560) * 100}%`, top: `${((262 - 150) / 524) * 100}%`, width: `${(300 / 560) * 100}%`, aspectRatio: "1" }}
      />
      <div className="mt-2 flex items-center justify-end gap-3 pr-2 font-mono text-[11px] uppercase tracking-[0.16em]">
        <span className={cn("size-2 rounded-full transition-colors duration-500", on ? "bg-verde-n shadow-[0_0_12px_#22C55E]" : "bg-slate-600")} />
        <span className={on ? "text-verde-n" : "text-nevoa"}>{on ? "Operação ligada" : "Toque no botão"}</span>
      </div>
      {on && (
        <div className="mt-5 grid grid-cols-3 gap-3 animate-in fade-in slide-in-from-bottom-2 duration-700">
          {[
            ["Fontes conectadas", cables.length.toString()],
            ["Eventos / min", eventos.toFixed(0)],
            ["Latência média", `${latencia.toFixed(0)}ms`],
          ].map(([k, v]) => (
            <div key={k} className="rounded-xl border border-hairline/10 bg-hairline/[0.03] px-3 py-2.5 text-center">
              <p className="tabular font-mono text-lg font-semibold text-verde-n">{v}</p>
              <p className="mt-0.5 font-mono text-[9px] uppercase tracking-[0.12em] text-nevoa">{k}</p>
            </div>
          ))}
          <p className="col-span-3 mt-0.5 text-center font-mono text-[9px] uppercase tracking-[0.14em] text-nevoa/70">dados ilustrativos</p>
        </div>
      )}
    </div>
  );
}

const SOLUCOES = [
  { icon: Code2, t: "Software sob medida", d: "Sistemas web e mobile desenhados para o jeito que a sua empresa trabalha, não o contrário.", tag: "Web · Mobile · APIs" },
  { icon: Workflow, t: "Automação de processos", d: "Tarefas repetitivas viram fluxos automáticos: menos retrabalho, menos erro, mais tempo para o que importa.", tag: "Fluxos · Integrações · Rotinas" },
  { icon: Network, t: "Integração de sistemas", d: "ERP, planilhas, e-commerce e aplicativos conversando entre si, com um dado só e confiável.", tag: "ERP · Webhooks · Dados" },
  { icon: Sparkles, t: "Inteligência artificial", d: "Modelos que preveem demanda, classificam informações e respondem perguntas sobre os seus dados.", tag: "Previsão · Visão · Assistentes" },
  { icon: Cpu, t: "Monitoramento e IoT", d: "Sensores e leitura em tempo real: de equipamentos a estoque, fluxo de pessoas ou qualquer coisa que sua empresa precise acompanhar.", tag: "Sensores · Telemetria" },
  { icon: Compass, t: "Consultoria tecnológica", d: "Diagnóstico, arquitetura e plano de ação para decidir onde a tecnologia gera retorno primeiro.", tag: "Diagnóstico · Roadmap" },
  { icon: ScanEye, t: "Visão computacional", d: "Câmera treinada enxerga o que importa pro seu negócio — contar, inspecionar, reconhecer — e vira dado estruturado, direto no seu sistema.", tag: "Contagem · Inspeção · Reconhecimento" },
];

const PASSOS = [
  { t: "Diagnóstico", d: "Entendemos a operação, os sistemas que já existem e onde está a perda." },
  { t: "Projeto", d: "Arquitetura, escopo e prazos claros, com o resultado esperado definido antes do código." },
  { t: "Desenvolvimento", d: "Entregas curtas e testadas, com a sua equipe acompanhando cada etapa." },
  { t: "Operação", d: "Sistema ligado, monitorado e com suporte da mesma equipe que construiu." },
];

function Contours() {
  const lines = Array.from({ length: 14 }, (_, k) => {
    const pts = Array.from({ length: 61 }, (_, i) => {
      const t = i / 60;
      const y = 60 + k * 34 - 70 * Math.sin(t * Math.PI * 1.3 + k * 0.35) * (0.55 + 0.45 * Math.sin(t * 4 + k)) - 18 * Math.sin(t * 11 + k * 1.2);
      return `${(t * 1200).toFixed(1)},${y.toFixed(1)}`;
    });
    return <polyline key={k} points={pts.join(" ")} fill="none" stroke="#3B82F6" strokeOpacity={0.08 + (k % 4 === 0 ? 0.08 : 0)} strokeWidth="1.2" />;
  });
  return <svg viewBox="0 0 1200 560" preserveAspectRatio="xMidYMid slice" className="absolute inset-0 h-full w-full" aria-hidden="true">{lines}</svg>;
}

export default function Home() {
  const [on, setOn] = useState(false);
  const { theme } = useTheme();
  return (
    <div className="relative">
      <Header variant="zdm" on={on} />
      <main>
        {/* HERO */}
        <section className="grain relative overflow-hidden pb-16 pt-28 md:pb-24 md:pt-36">
          <div className="tech-grid pointer-events-none absolute inset-0 [mask-image:radial-gradient(ellipse_at_70%_40%,black,transparent_72%)]" />
          <div className="container relative grid items-center gap-12 lg:grid-cols-[1.15fr_1fr] lg:gap-6">
            <div className="space-y-8">
              <Badge variant="outline" className="border-hairline/15 text-nevoa">Software · Automação · IoT · IA</Badge>
              <h1 className="font-wide text-[2.6rem] font-extrabold leading-[0.98] tracking-[-0.02em] sm:text-6xl lg:text-[4.6rem]">
                Sistemas que{" "}
                <span className={cn("relative inline-block transition-colors duration-500", on ? "text-verde-n" : "text-ink")}>
                  ligam
                  <span className={cn("absolute -bottom-1 left-0 h-[6px] w-full origin-left rounded-full bg-verde-n transition-transform duration-700", on ? "scale-x-100" : "scale-x-0")} />
                </span>{" "}
                a sua operação.
              </h1>
              <p className="max-w-xl text-lg leading-relaxed text-nevoa md:text-xl">
                A ZDM Solutions desenvolve software, automação e inteligência para empresas que querem dados confiáveis e processos que funcionam sozinhos.
              </p>
              <div className="flex flex-wrap gap-3">
                <Button size="lg" variant="power" onClick={() => scrollToId("contato")}>
                  Falar com um especialista <ArrowRight />
                </Button>
                <Button size="lg" variant="outline" className="border-hairline/20" asChild>
                  <a href="#mymaq360">Conhecer o MyMaq360</a>
                </Button>
              </div>
            </div>
            <PowerHub on={on} onToggle={() => setOn((v) => !v)} />
          </div>
        </section>

        {/* faixa contínua */}
        <div className="overflow-hidden border-y border-hairline/[0.08] bg-noite-2 py-4" aria-hidden="true">
          <div className="flex w-max gap-12 whitespace-nowrap font-mono text-xs uppercase tracking-[0.2em] text-nevoa/80 [animation:ticker_38s_linear_infinite]">
            {Array.from({ length: 2 }).flatMap((_, j) =>
              ["Software sob medida", "Automação", "Integração de sistemas", "IoT", "Inteligência artificial", "Consultoria", "MyMaq360"].map((s) => (
                <span key={`${j}${s}`} className="flex items-center gap-12">{s}<span className="size-1.5 rounded-full bg-verde/70" /></span>
              ))
            )}
          </div>
        </div>

        {/* SOLUÇÕES (seção clara) */}
        <section id="solucoes" className="scroll-mt-16 bg-papel py-24 text-grafite md:py-32">
          <div className="container">
            <div className="reveal grid gap-6 md:grid-cols-[1fr_1fr] md:items-end">
              <div className="space-y-4">
                <p className="eyebrow !text-slate-500">O que fazemos</p>
                <h2 className="font-wide text-4xl font-extrabold leading-[1.02] tracking-tight md:text-6xl">Do problema ao sistema que resolve.</h2>
              </div>
              <p className="max-w-md text-lg leading-relaxed text-slate-600 md:justify-self-end">
                Sete frentes que se combinam, para qualquer tipo de negócio. Começamos pela que resolve o problema mais caro e ligamos as outras quando fizer sentido.
              </p>
            </div>
            <div className="mt-14 grid gap-px overflow-hidden rounded-2xl border border-slate-200 bg-slate-200 sm:grid-cols-2 lg:grid-cols-3">
              {SOLUCOES.map((s, i) => {
                const ultimo = i === SOLUCOES.length - 1;
                return (
                  <article
                    key={s.t}
                    className={cn(
                      "reveal group relative flex min-h-[280px] flex-col bg-papel p-7 transition-[background-color,box-shadow,transform] duration-300 hover:-translate-y-1 hover:bg-papel-2 hover:shadow-xl hover:shadow-slate-900/10 md:p-8",
                      ultimo && "sm:col-span-2 lg:col-span-3 lg:min-h-0 lg:flex-row lg:items-center lg:gap-10"
                    )}
                    data-delay={(i % 3) * 80}
                  >
                    <span className="absolute inset-x-0 top-0 h-[3px] origin-left scale-x-0 bg-gradient-to-r from-azul to-verde transition-transform duration-500 group-hover:scale-x-100" />
                    <s.icon className={cn("size-7 shrink-0 text-azul transition-transform duration-500 group-hover:-translate-y-0.5", ultimo && "lg:size-10")} strokeWidth={1.6} />
                    <div className={cn(ultimo && "lg:flex lg:flex-1 lg:items-center lg:justify-between lg:gap-10")}>
                      <div>
                        <h3 className={cn("font-wide text-xl font-bold tracking-tight", ultimo ? "mt-4 lg:mt-0" : "mt-8")}>{s.t}</h3>
                        <p className="mt-3 max-w-xl leading-relaxed text-slate-600">{s.d}</p>
                      </div>
                      <p className={cn("font-mono text-[11px] uppercase tracking-[0.14em] text-slate-400", ultimo ? "mt-5 lg:mt-0 lg:shrink-0" : "mt-auto pt-8")}>{s.tag}</p>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        </section>


        {/* PROCESSO */}
        <section id="processo" className="relative scroll-mt-16 overflow-hidden py-24 md:py-32">
          <div className="container">
            <div className="reveal max-w-2xl space-y-4">
              <p className="eyebrow">Como trabalhamos</p>
              <h2 className="font-wide text-4xl font-extrabold leading-[1.02] tracking-tight md:text-6xl">Do diagnóstico ao sistema ligado.</h2>
            </div>
            <ol className="relative mt-16 grid gap-10 md:grid-cols-4 md:gap-6">
              <span className="absolute left-[13px] top-3 h-[calc(100%-24px)] w-[6px] rounded-full bg-hairline/10 md:left-0 md:top-[13px] md:h-[6px] md:w-full" aria-hidden="true">
                <span className="absolute inset-[2px] rounded-full bg-noite" />
              </span>
              {PASSOS.map((p, i) => {
                const last = i === PASSOS.length - 1;
                return (
                  <li key={p.t} className="reveal relative pl-12 md:pl-0 md:pt-14" data-delay={i * 110}>
                    <span className={cn("absolute left-0 top-0 grid size-8 place-items-center rounded-full border-[6px] md:left-0", last ? "border-verde-n bg-noite power-glow" : "border-azul-n bg-noite")}>
                      <span className={cn("size-2 rounded-full", last ? "bg-verde-n" : "bg-azul-n")} />
                    </span>
                    <p className="font-mono text-xs text-nevoa">{String(i + 1).padStart(2, "0")}</p>
                    <h3 className="mt-2 font-wide text-2xl font-bold">{p.t}</h3>
                    <p className="mt-3 max-w-xs leading-relaxed text-nevoa">{p.d}</p>
                  </li>
                );
              })}
            </ol>
          </div>
        </section>

        {/* MYMAQ360 */}
        <section className="relative overflow-hidden bg-noite py-24 md:py-32">
          <div className="pointer-events-none absolute -right-40 top-1/2 size-[720px] -translate-y-1/2 rounded-full border-[48px] border-mata/[0.07]" aria-hidden="true" />
          <div className="container relative grid items-center gap-14 lg:grid-cols-[1fr_1.15fr]">
            <div className="reveal space-y-7">
              <p className="eyebrow">Nosso produto · para indústria</p>
              <MyMaqLogo tone={theme === "light" ? "light" : "dark"} endorse className="w-[240px]" />
              <h2 className="font-grotesk text-4xl font-semibold leading-[1.05] tracking-tight md:text-5xl">
                Suas máquinas, <span className="text-mata">em 360°.</span>
              </h2>
              <p className="max-w-md text-lg leading-relaxed text-nevoa">
                Leia o QR code da máquina e veja ordens de serviço, dados e anexos na hora. Configure as faixas de atenção e crítico, e o sistema cuida do resto: abre a OS sozinho e avisa toda a equipe até o fechamento.
              </p>
              <ul className="grid gap-3 text-ink/90">
                {["QR code em cada máquina", "Notificações em todo o ciclo da OS", "Faixas de temperatura e OS automática", "Dashboard, preventivas e relatórios", "Aplicativo no celular e sistema web"].map((x) => (
                  <li key={x} className="flex items-center gap-3"><span className="size-1.5 rounded-full bg-mata" />{x}</li>
                ))}
              </ul>
              <Button size="lg" className="bg-mata text-white hover:bg-mata/90" asChild>
                <a href="#mymaq360">Conhecer o MyMaq360 <ArrowUpRight /></a>
              </Button>
            </div>
            <div className="reveal min-w-0" data-delay="120">
              <div className="rounded-t-2xl border border-b-0 border-white/10 bg-[#1C2740] p-2.5 pb-0">
                <div className="overflow-hidden rounded-t-lg"><ScreenshotSlot label="Dashboard do gestor" src="./mymaq/dashboard.png" /></div>
              </div>
              <div className="mx-[-1%] h-3 rounded-b-xl bg-[#26324d]" />
            </div>
          </div>
        </section>

        {/* ORIGEM */}
        <section id="origem" className="relative scroll-mt-16 overflow-hidden py-24 md:py-36">
          <Contours />
          <div className="container relative grid gap-10 md:grid-cols-[1.1fr_1fr] md:items-end">
            <div className="reveal space-y-5">
              <p className="eyebrow">ZDM · Zona da Mata</p>
              <h2 className="font-wide text-4xl font-extrabold leading-[1.02] tracking-tight md:text-6xl">
                Nascemos entre as serras de Minas.
              </h2>
            </div>
            <div className="reveal space-y-5 text-lg leading-relaxed text-nevoa" data-delay="120">
              <p>ZDM vem de Zona da Mata, a região mineira onde a empresa começou. É de lá que atendemos indústrias e empresas de todo o Brasil.</p>
              <p className="text-ink">Equipe próxima de quem usa o sistema, com o padrão técnico de qualquer grande centro.</p>
            </div>
          </div>
        </section>

        <Contact variant="zdm" />
      </main>
      <Footer />
    </div>
  );
}
