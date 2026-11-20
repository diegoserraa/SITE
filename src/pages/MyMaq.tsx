import { useState } from "react";
import { ArrowLeft, ArrowRight, Download, Droplets, Factory, Gauge, Handshake, Printer, Smartphone, Monitor, QrCode, BellRing, ShieldCheck, Thermometer, LayoutDashboard, Activity, Clock, WifiOff, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Contact, Footer, Header, ScreenshotSlot, scrollToId } from "@/components/shared";
import { FilmPlayer } from "@/components/mymaq/Film";
import { CycleRing, Devices, OsTimeline, RELATORIOS, ScanPhone } from "@/components/mymaq/Sections";
import { VisionShowcase } from "@/components/mymaq/VisionShowcase";

/**
 * Imagens do sistema: quando chegarem, coloque os arquivos em /public/mymaq/ e preencha o `src` abaixo.
 * Ex.: app: "./mymaq/app.png"
 */
const SCREENS = {
  app: "./mymaq/dashboard-mobile.png" as string | undefined,
  web: "./mymaq/web.png" as string | undefined,
};

function Head({ n, k, t, d }: { n: string; k: string; t: React.ReactNode; d?: string }) {
  return (
    <div className="reveal max-w-3xl space-y-4">
      <p className="eyebrow"><span className="text-mata">{n}</span> · {k}</p>
      <h2 className="font-grotesk text-4xl font-semibold leading-[1.04] tracking-tight md:text-[3.4rem]">{t}</h2>
      {d && <p className="max-w-2xl text-lg leading-relaxed text-nevoa">{d}</p>}
    </div>
  );
}

// a casca desta página (fundo, divisórias, texto) acompanha o tema claro/escuro
// do site, igual a Home — só os mockups do produto embutidos nela (celular,
// painéis do dashboard, em Sections.tsx/Film.tsx) ficam sempre escuros, porque
// são "captura de tela do sistema", não casca do site
export default function MyMaq() {
  const [intent, setIntent] = useState<"demo" | "orcamento">("demo");
  const irPara = (id: string, i: "demo" | "orcamento" = "demo") => {
    setIntent(i);
    scrollToId(id);
  };
  return (
    <div className="relative bg-noite">
      <Header variant="mymaq" />
      <main>
        {/* HERO */}
        <section className="grain relative overflow-hidden pb-20 pt-28 md:pb-28 md:pt-32">
          <div className="tech-grid pointer-events-none absolute inset-0 opacity-70 [mask-image:radial-gradient(ellipse_at_70%_30%,black,transparent_70%)]" />
          <div className="container relative grid items-center gap-12 lg:grid-cols-[1.05fr_1.15fr] xl:gap-16">
            <div className="space-y-8">
              <a href="#" className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.16em] text-nevoa transition-colors hover:text-ink">
                <ArrowLeft className="size-3.5" /> um produto ZDM Solutions
              </a>
              <Badge variant="live" className="bg-mata/15 text-mata">
                <Activity className="size-3.5" /> Temperatura · Vibração · Horímetro, ao vivo
              </Badge>
              <h1 className="font-grotesk text-[2.7rem] font-semibold leading-[0.98] tracking-[-0.03em] sm:text-6xl lg:text-[4.3rem]">
                Sensor que avisa.<br />Máquina que não <span className="text-mata">para.</span>
              </h1>
              <p className="max-w-xl text-lg leading-relaxed text-nevoa md:text-xl">
                Sensor em cada máquina, lendo temperatura, vibração e horímetro em tempo real, 24 horas por dia. No alerta, sua equipe é avisada na hora; no crítico, a ordem de serviço abre sozinha — antes que a parada vire prejuízo.
              </p>
              <div className="flex flex-wrap gap-3">
                <Button size="lg" className="bg-mata text-white hover:bg-mata/90" onClick={() => scrollToId("sensor")}>
                  Ver o monitoramento <ArrowRight />
                </Button>
                <Button size="lg" variant="outline" className="border-hairline/20" onClick={() => irPara("contato", "demo")}>
                  Solicitar demonstração
                </Button>
              </div>
              <ul className="grid max-w-xl grid-cols-3 gap-x-6 gap-y-3 pt-2 text-sm text-ink/85">
                {[
                  [QrCode, "QR code"],
                  [Thermometer, "Temperatura"],
                  [Activity, "Vibração"],
                  [Clock, "Horímetro"],
                  [BellRing, "Notificações"],
                  [LayoutDashboard, "Dashboard"],
                ].map(([I, l]) => {
                  const Icon = I as typeof QrCode;
                  return <li key={l as string} className="flex items-center gap-2"><Icon className="size-4 text-mata" />{l as string}</li>;
                })}
              </ul>
            </div>
            <div className="reveal" data-delay="120">
              <div className="mx-auto max-w-lg lg:max-w-none">
                <div className="rounded-2xl bg-[#0B0E13] p-3 shadow-[0_60px_140px_-40px_rgba(16,163,127,0.35)] ring-1 ring-white/10">
                  <div className="flex aspect-[1637/660] overflow-hidden rounded-lg bg-black">
                    <img
                      src="./mymaq/monitoramento-cards.png"
                      alt="Máquinas monitoradas em tempo real"
                      loading="lazy"
                      className="h-full shrink-0 basis-[77.3%] object-cover"
                    />
                    <img
                      src="./mymaq/monitoramento-alertas.png"
                      alt="Alertas: máquinas que precisam de ação"
                      loading="lazy"
                      className="h-full shrink-0 basis-[22.7%] object-cover"
                    />
                  </div>
                  <div className="mt-2.5 flex items-center justify-center gap-2 pb-0.5">
                    <span className="size-1.5 rounded-full bg-mata breathe" />
                    <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-white/25">MyMaq360 · monitoramento ao vivo</span>
                  </div>
                </div>
                <div className="mx-auto h-8 w-2.5 bg-[#0B0E13]" />
                <div className="mx-auto h-3 w-32 rounded-full bg-[#0B0E13]" />
              </div>
            </div>
          </div>
        </section>

        {/* IDENTIFICAÇÃO (QR CODE) */}
        <section id="identificacao" className="scroll-mt-16 border-t border-hairline/[0.08] py-24 md:py-28">
          <div className="container grid items-center gap-14 lg:grid-cols-[1fr_1fr]">
            <div className="reveal max-w-xl space-y-5">
              <p className="eyebrow">Identificação</p>
              <h2 className="font-grotesk text-4xl font-semibold leading-[1.04] tracking-tight md:text-[3.2rem]">
                Aponte o celular.<br />A máquina conta<br /><span className="text-mata">o resto.</span>
              </h2>
              <p className="text-lg leading-relaxed text-nevoa">
                Cada equipamento recebe uma etiqueta com QR code. Ao escanear, o técnico abre a ficha da máquina na hora: ordens de serviço em aberto, manuais, fotos, histórico de manutenção e as leituras do sensor — tudo no mesmo lugar, sem procurar planilha ou pasta física.
              </p>
              <ul className="grid gap-3 pt-2 text-sm text-ink/85 sm:grid-cols-2">
                <li className="flex items-center gap-2"><QrCode className="size-4 text-mata" />Etiqueta por máquina, sem custo de leitor</li>
                <li className="flex items-center gap-2"><Smartphone className="size-4 text-mata" />Funciona com a câmera do celular</li>
                <li className="flex items-center gap-2"><LayoutDashboard className="size-4 text-mata" />Histórico completo na leitura</li>
                <li className="flex items-center gap-2"><BellRing className="size-4 text-mata" />Abre OS direto da tela da máquina</li>
                <li className="flex items-center gap-2"><Printer className="size-4 text-mata" />Imprime todas as etiquetas de uma vez, por setor</li>
              </ul>
            </div>
            <div className="reveal" data-delay="120"><ScanPhone /></div>
          </div>
        </section>

        {/* FILME */}
        <section id="filme" className="scroll-mt-16 border-t border-hairline/[0.08] py-24 md:py-28">
          <div className="container space-y-12">
            <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
              <Head n="01" k="Fluxo funcional" t={<>Do QR code ao relatório, <span className="text-mata">em 37 segundos.</span></>} />
              <Button variant="outline" className="reveal shrink-0 border-hairline/20" asChild>
                <a href="./mymaq360-fluxo.mp4" download><Download />Baixar vídeo (MP4)</a>
              </Button>
            </div>
            <div className="reveal"><FilmPlayer /></div>
          </div>
        </section>

        {/* CICLO */}
        <section id="ciclo" className="scroll-mt-16 border-t border-hairline/[0.08] py-24 md:py-32">
          <div className="container space-y-14">
            <Head n="02" k="Ciclo 360°" t="Oito etapas, um ciclo fechado." d="Toque em cada etapa para ver o que acontece. A última alimenta a primeira: a preventiva antecipa a próxima ida à máquina." />
            <div className="reveal"><CycleRing /></div>
          </div>
        </section>

        {/* NOTIFICAÇÕES */}
        <section id="notificacoes" className="scroll-mt-16 border-t border-hairline/[0.08] bg-hairline/[0.03] py-24 md:py-32">
          <div className="container grid gap-14 lg:grid-cols-[1fr_1fr]">
            <Head n="03" k="Ordem de serviço" t={<>Ninguém fica perguntando <span className="text-mata">"e aí, resolveu?"</span></>} d="Da abertura ao fechamento, cada mudança de status avisa as partes interessadas. O problema anda mais rápido porque todo mundo sabe em que pé está." />
            <OsTimeline />
          </div>
        </section>

        {/* SENSOR */}
        <section id="sensor" className="scroll-mt-16 border-t border-hairline/[0.08] py-24 md:py-32">
          <div className="container space-y-12">
            <Head n="04" k="Monitoramento com sensor" t="Você define a faixa. O sistema age." d="Configure por máquina a temperatura e a vibração de atenção e de alarme. No alerta, a equipe é avisada; no crítico, a ordem de serviço pode abrir sozinha. Estas são as telas reais: onde você configura, e o modo vitrine pra deixar aberto no chão de fábrica." />
            <div className="grid gap-6 lg:grid-cols-[1.2fr_1fr] lg:items-start">
              <div className="reveal">
                <p className="mb-3 font-mono text-[11px] uppercase tracking-[0.16em] text-nevoa">Modo vitrine — ao vivo</p>
                <div className="rounded-t-2xl border border-b-0 border-white/10 bg-[#1C2740] p-2.5 pb-0">
                  <div className="overflow-hidden rounded-t-lg"><ScreenshotSlot label="Modo vitrine — monitoramento ao vivo" src="./mymaq/vitrine-injetora.png" /></div>
                </div>
                <div className="mx-[-1%] h-3 rounded-b-xl bg-[#26324d]" />
              </div>
              <div className="reveal" data-delay="120">
                <p className="mb-3 font-mono text-[11px] uppercase tracking-[0.16em] text-nevoa">Onde você configura</p>
                <div className="overflow-hidden rounded-2xl border border-hairline/10 shadow-[0_30px_80px_-30px_rgba(16,24,40,0.25)]">
                  <img src="./mymaq/parametros-modal.png" alt="Tela de parâmetros: faixas de atenção e alarme por máquina" loading="lazy" className="w-full" />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* DASHBOARD */}
        <section id="dashboard" className="scroll-mt-16 border-t border-hairline/[0.08] py-24 md:py-32">
          <div className="container space-y-12">
            <Head n="05" k="Dashboard" t="Onde está o problema, quem está resolvendo." d="Máquinas com mais falhas e defeitos, técnicos que mais resolveram OS, ordens abertas por dia e acesso direto a cada status — direto do sistema, sem maquete." />
            <div className="reveal">
              <div className="rounded-t-2xl border border-b-0 border-white/10 bg-[#1C2740] p-2.5 pb-0">
                <div className="overflow-hidden rounded-t-lg"><ScreenshotSlot label="Dashboard do gestor" src="./mymaq/dashboard.png" /></div>
              </div>
              <div className="mx-[-1%] h-3 rounded-b-xl bg-[#26324d]" />
            </div>
          </div>
        </section>

        {/* PREVENTIVA + RELATÓRIOS */}
        <section id="preventiva" className="scroll-mt-16 border-t border-hairline/[0.08] py-24 md:py-32">
          <div className="container grid gap-14 lg:grid-cols-[1fr_1fr]">
            <div className="space-y-10">
              <Head n="06" k="Preventiva e relatórios" t="Lembrar antes de quebrar." d="Cada fabricante define a manutenção que sua máquina exige — troca de óleo a cada 90 dias, verificação de vibração a cada 500 horas de uso, o que for. Configure esse plano uma vez no MyMaq360 e o sistema abre a ordem de serviço sozinho na hora certa: sua equipe nunca esquece, e uma manutenção simples não vira quebra grande." />
              <ul className="reveal grid gap-3 sm:grid-cols-2">
                {RELATORIOS.map((r) => (
                  <li key={r.t} className="rounded-xl border border-hairline/[0.08] bg-hairline/[0.03] p-4">
                    <r.icon className="size-5 text-mata" strokeWidth={1.7} />
                    <p className="mt-3 font-grotesk font-semibold">Relatório de {r.t.toLowerCase()}</p>
                    <p className="mt-1 text-sm text-nevoa">{r.d}</p>
                  </li>
                ))}
              </ul>
            </div>
            <div className="reveal lg:pt-10" data-delay="120">
              <p className="mb-3 font-mono text-[11px] uppercase tracking-[0.16em] text-nevoa">Tela real — edição da máquina</p>
              <div className="overflow-hidden rounded-2xl border border-hairline/10 shadow-[0_30px_80px_-30px_rgba(16,24,40,0.25)]">
                <img src="./mymaq/plano-preventiva.png" alt="Aba de plano de preventiva, com os planos cadastrados da máquina" loading="lazy" className="w-full" />
              </div>
            </div>
          </div>
        </section>

        {/* APP + WEB */}
        <section id="acesso" className="scroll-mt-16 border-t border-hairline/[0.08] py-24 md:py-32">
          <div className="container space-y-14">
            <Head n="07" k="Acesso" t={<>No bolso do técnico, <span className="text-mata">na tela do gestor.</span></>} d="Aplicativo instalado direto do navegador, sem loja de apps — funciona mesmo sem internet no chão de fábrica e avisa por notificação push mesmo com o app fechado. Sistema web para quem acompanha do escritório. Os mesmos dados, em tempo real." />
            <div className="reveal"><Devices app={SCREENS.app} web={SCREENS.web} /></div>
            <div className="reveal flex flex-wrap gap-3 text-sm text-nevoa">
              <span className="flex items-center gap-2 rounded-full border border-hairline/15 px-4 py-2"><Smartphone className="size-4 text-mata" />Aplicativo para celular</span>
              <span className="flex items-center gap-2 rounded-full border border-hairline/15 px-4 py-2"><Monitor className="size-4 text-mata" />Sistema web</span>
              <span className="flex items-center gap-2 rounded-full border border-hairline/15 px-4 py-2"><WifiOff className="size-4 text-mata" />Funciona sem internet</span>
              <span className="flex items-center gap-2 rounded-full border border-hairline/15 px-4 py-2"><BellRing className="size-4 text-mata" />Push mesmo com o app fechado</span>
            </div>
          </div>
        </section>

        {/* ORGANIZAÇÃO E CONTROLE */}
        <section id="organizacao" className="scroll-mt-16 border-t border-hairline/[0.08] py-24 md:py-32">
          <div className="container space-y-12">
            <Head
              n="08"
              k="Organização e controle"
              t="Do jeito que sua operação já funciona."
              d="Organize as máquinas por setor ou linha de produção. Terceirizou um serviço? Atribua a OS a um parceiro externo e feche com o custo dele registrado à parte. E cada usuário só vê e faz o que a função permite — dá pra ajustar isso por pessoa ou por cargo inteiro."
            />
            <div className="reveal grid gap-4 sm:grid-cols-3">
              <div className="rounded-xl border border-hairline/[0.08] bg-hairline/[0.03] p-5">
                <Factory className="size-5 text-mata" strokeWidth={1.7} />
                <p className="mt-3 font-grotesk font-semibold">Setores e linhas</p>
                <p className="mt-1 text-sm text-nevoa">Organize máquinas por setor e filtre monitoramento e relatórios por onde está o problema.</p>
              </div>
              <div className="rounded-xl border border-hairline/[0.08] bg-hairline/[0.03] p-5">
                <Handshake className="size-5 text-mata" strokeWidth={1.7} />
                <p className="mt-3 font-grotesk font-semibold">Parceiros externos</p>
                <p className="mt-1 text-sm text-nevoa">Terceirizou a manutenção? Atribua a OS a um parceiro e finalize com o custo dele à parte.</p>
              </div>
              <div className="rounded-xl border border-hairline/[0.08] bg-hairline/[0.03] p-5">
                <ShieldCheck className="size-5 text-mata" strokeWidth={1.7} />
                <p className="mt-3 font-grotesk font-semibold">Permissões por pessoa</p>
                <p className="mt-1 text-sm text-nevoa">Defina por cargo ou por usuário quem abre, atende, pausa ou finaliza uma OS — e quem só acompanha.</p>
              </div>
            </div>
          </div>
        </section>

        {/* VISÃO COMPUTACIONAL (em breve) */}
        <section id="visao" className="scroll-mt-16 border-t border-hairline/[0.08] py-24 md:py-32">
          <div className="container grid items-center gap-14 lg:grid-cols-[1fr_1.05fr]">
            <div className="reveal space-y-6">
              <Badge variant="outline" className="border-amber-400/30 bg-amber-400/10 text-amber-400">Em breve</Badge>
              <h2 className="font-grotesk text-4xl font-semibold leading-[1.04] tracking-tight md:text-[3.2rem]">
                O próximo módulo: <span className="text-mata">visão computacional.</span>
              </h2>
              <p className="max-w-md text-lg leading-relaxed text-nevoa">
                Estamos desenvolvendo um módulo de visão computacional pro MyMaq360, pra identificar falha de fabricação e medir a produtividade da máquina direto pela câmera — complementando o que o sensor já vê hoje. Ainda em desenvolvimento, sem data fechada.
              </p>
              <ul className="grid gap-3 pt-2 text-sm text-ink/85">
                <li className="flex items-center gap-3"><span className="size-1.5 rounded-full bg-amber-400" />Identificação de falha de fabricação</li>
                <li className="flex items-center gap-3"><span className="size-1.5 rounded-full bg-amber-400" />Produtividade da máquina por vídeo</li>
              </ul>
              <Button size="lg" variant="outline" className="border-hairline/20" onClick={() => scrollToId("contato")}>
                Quero ser avisado quando lançar
              </Button>
            </div>
            <div className="reveal" data-delay="120"><VisionShowcase /></div>
          </div>
        </section>

        {/* ALÉM DO PADRÃO */}
        <section id="orcamento" className="scroll-mt-16 border-t border-hairline/[0.08] py-24 md:py-32">
          <div className="container">
            <div className="reveal mx-auto max-w-2xl space-y-6 text-center">
              <p className="eyebrow justify-center"><span className="text-mata">09</span> · Além do padrão</p>
              <h2 className="font-grotesk text-4xl font-semibold leading-[1.04] tracking-tight md:text-[3.2rem]">
                Temperatura e vibração são <span className="text-mata">só o começo.</span>
              </h2>
              <p className="text-lg leading-relaxed text-nevoa">
                Se sua operação precisa acompanhar outra coisa — pressão, nível, corrente elétrica — a ZDM integra o sensor certo pro seu equipamento e mostra a leitura no mesmo painel. Conte o que você quer monitorar.
              </p>
              <ul className="flex flex-wrap items-center justify-center gap-3 pt-2 text-sm text-nevoa">
                <li className="flex items-center gap-2 rounded-full border border-hairline/15 px-4 py-2"><Gauge className="size-4 text-mata" />Pressão</li>
                <li className="flex items-center gap-2 rounded-full border border-hairline/15 px-4 py-2"><Droplets className="size-4 text-mata" />Nível</li>
                <li className="flex items-center gap-2 rounded-full border border-hairline/15 px-4 py-2"><Zap className="size-4 text-mata" />Corrente elétrica</li>
              </ul>
              <div className="pt-2">
                <Button size="lg" className="bg-mata text-white hover:bg-mata/90" onClick={() => irPara("contato", "orcamento")}>
                  Solicitar orçamento <ArrowRight />
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* FEITO PELA ZDM */}
        <section className="border-t border-hairline/[0.08] py-16">
          <div className="container flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">
              <Badge variant="live">Feito pela ZDM Solutions</Badge>
              <p className="text-nevoa">Seu problema não é sensor de máquina? A ZDM também desenvolve sistemas sob medida pra outras áreas.</p>
            </div>
            <Button variant="outline" className="border-hairline/20" asChild>
              <a href="#">Conhecer a ZDM <ArrowRight /></a>
            </Button>
          </div>
        </section>

        <Contact variant="mymaq" intent={intent} />
      </main>
      <Footer />
    </div>
  );
}
