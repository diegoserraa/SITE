import { useEffect, useState } from "react";
import { ArrowUpRight, Check, Instagram, Menu, Moon, Sun, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { MyMaqLogo, ZdmLogo } from "@/components/brand/Logos";
import { cn } from "@/lib/utils";
import { useTheme } from "@/lib/hooks";

export function scrollToId(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
}

/* ---------------- Botão de tema ---------------- */
export function ThemeToggle({ className }: { className?: string }) {
  const { theme, toggle } = useTheme();
  const dark = theme === "dark";
  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={dark ? "Mudar para o tema claro" : "Mudar para o tema escuro"}
      title={dark ? "Tema claro" : "Tema escuro"}
      className={cn(
        "grid size-9 shrink-0 place-items-center rounded-full border border-hairline/15 text-nevoa transition-colors hover:border-hairline/30 hover:text-ink",
        className
      )}
    >
      {dark ? <Sun className="size-4" /> : <Moon className="size-4" />}
    </button>
  );
}

/* ---------------- Cabeçalho ---------------- */
export function Header({ variant, on }: { variant: "zdm" | "mymaq"; on?: boolean }) {
  const { theme } = useTheme();
  const tone = theme === "light" ? "light" : "dark";
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const f = () => setScrolled(window.scrollY > 12);
    f();
    window.addEventListener("scroll", f, { passive: true });
    return () => window.removeEventListener("scroll", f);
  }, []);
  const links =
    variant === "zdm"
      ? [
          { l: "Soluções", id: "solucoes" },
          { l: "Como trabalhamos", id: "processo" },
          { l: "MyMaq360", href: "#mymaq360" },
          { l: "Sobre", id: "origem" },
        ]
      : [
          { l: "Recursos", id: "ciclo" },
          { l: "Como funciona", id: "filme" },
          { l: "Monitoramento", id: "sensor" },
          { l: "ZDM Solutions", href: "#" },
        ];
  const go = (it: { id?: string; href?: string }) => {
    setOpen(false);
    if (it.id) scrollToId(it.id);
  };
  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-[background-color,border-color,backdrop-filter] duration-300",
        "pt-[env(safe-area-inset-top)]",
        scrolled || open ? "border-b border-hairline/[0.08] bg-noite/80 backdrop-blur-xl" : "border-b border-transparent"
      )}
    >
      <div className="container flex h-16 items-center justify-between gap-6 md:h-[72px]">
        <a href="#" aria-label={variant === "zdm" ? "ZDM Solutions, início" : "Voltar para ZDM Solutions"} className="shrink-0">
          {variant === "zdm" ? <ZdmLogo tone={tone} on={on} className="w-[104px] md:w-[118px]" /> : <MyMaqLogo tone={tone} className="w-[150px] md:w-[170px]" />}
        </a>
        <nav className="hidden items-center gap-9 text-[15px] text-nevoa lg:flex" aria-label="Principal">
          {links.map((it) =>
            it.href ? (
              <a key={it.l} href={it.href} className="link-line transition-colors hover:text-ink">{it.l}</a>
            ) : (
              <button key={it.l} onClick={() => go(it)} className="link-line transition-colors hover:text-ink">{it.l}</button>
            )
          )}
        </nav>
        <div className="flex items-center gap-2">
          <ThemeToggle className="hidden sm:grid" />
          <Button size="sm" variant={variant === "zdm" ? "power" : "default"} className={cn("hidden sm:inline-flex", variant === "mymaq" && "bg-mata text-white hover:bg-mata/90")} onClick={() => scrollToId("contato")}>
            {variant === "zdm" ? "Falar com a ZDM" : "Solicitar demonstração"}
          </Button>
          <Button variant="ghost" size="icon" className="lg:hidden" aria-label={open ? "Fechar menu" : "Abrir menu"} aria-expanded={open} onClick={() => setOpen((v) => !v)}>
            {open ? <X /> : <Menu />}
          </Button>
        </div>
      </div>
      {open && (
        <nav className="container grid gap-1 pb-6 lg:hidden" aria-label="Menu">
          {links.map((it) =>
            it.href ? (
              <a key={it.l} href={it.href} onClick={() => setOpen(false)} className="rounded-md px-2 py-3 text-lg text-ink/90 hover:bg-hairline/5">{it.l}</a>
            ) : (
              <button key={it.l} onClick={() => go(it)} className="rounded-md px-2 py-3 text-left text-lg text-ink/90 hover:bg-hairline/5">{it.l}</button>
            )
          )}
          <div className="mt-2 flex items-center gap-2">
            <Button variant="power" className="flex-1" onClick={() => go({ id: "contato" })}>
              {variant === "zdm" ? "Falar com a ZDM" : "Solicitar demonstração"}
            </Button>
            <ThemeToggle />
          </div>
        </nav>
      )}
    </header>
  );
}

/* ---------------- Rodapé ---------------- */
export function Footer() {
  const { theme } = useTheme();
  const tone = theme === "light" ? "light" : "dark";
  return (
    <footer className="border-t border-hairline/[0.08] bg-noite pb-[max(2.5rem,env(safe-area-inset-bottom))] pt-16">
      <div className="container grid gap-12 md:grid-cols-[1.4fr_1fr_1fr]">
        <div className="max-w-sm space-y-5">
          <ZdmLogo tone={tone} className="w-[150px]" />
          <p className="text-sm leading-relaxed text-nevoa">
            Software, automação, IoT e inteligência artificial para empresas. Nascida na Zona da Mata mineira, atendendo todo o Brasil.
          </p>
          <a
            href="https://instagram.com/zdm.solutions"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="ZDM Solutions no Instagram"
            className="inline-flex items-center gap-2 text-sm text-nevoa transition-colors hover:text-ink"
          >
            <Instagram className="size-4" /> @zdm.solutions
          </a>
        </div>
        <div className="space-y-4">
          <p className="eyebrow">Navegação</p>
          <ul className="space-y-2.5 text-sm text-ink/80">
            <li><a className="link-line" href="#">ZDM Solutions</a></li>
            <li><a className="link-line" href="#mymaq360">MyMaq360</a></li>
            <li><button className="link-line" onClick={() => scrollToId("contato")}>Contato</button></li>
          </ul>
        </div>
        <div className="space-y-4">
          <p className="eyebrow">Produto</p>
          <a href="#mymaq360" className="inline-block opacity-90 transition-opacity hover:opacity-100">
            <MyMaqLogo tone={tone} endorse className="w-[170px]" />
          </a>
        </div>
      </div>
      <div className="container mt-14">
        <Separator className="bg-hairline/[0.08]" />
        <div className="flex flex-col justify-between gap-3 pt-6 font-mono text-[11px] uppercase tracking-[0.14em] text-nevoa/80 sm:flex-row">
          <span>© {new Date().getFullYear()} ZDM Solutions</span>
          <span>Zona da Mata · Minas Gerais · Brasil</span>
        </div>
      </div>
    </footer>
  );
}

// URL do backend do MyMaq360 — o mesmo backend guarda os contatos do site.
// Sem VITE_API_URL definida no build (ex.: deploy sem configurar a env),
// cai pro backend de produção em vez de tentar falar com localhost.
const API_URL = import.meta.env.VITE_API_URL || "https://backend-gestao-maquinas-1.onrender.com";

/* ---------------- Contato ---------------- */
export function Contact({ variant, intent = "demo" }: { variant: "zdm" | "mymaq"; intent?: "demo" | "orcamento" }) {
  const [sent, setSent] = useState(false);
  const [enviando, setEnviando] = useState(false);
  const [erro, setErro] = useState<string | null>(null);
  const accent = variant === "zdm" ? "text-verde-n" : "text-mata";
  const orcamento = variant === "mymaq" && intent === "orcamento";
  return (
    <section id="contato" className="relative scroll-mt-20 overflow-hidden border-t border-hairline/[0.08] py-24 md:py-32">
      <div className="container relative grid gap-14 lg:grid-cols-[1fr_1.1fr] lg:gap-20">
        <div className="reveal space-y-6">
          <p className="eyebrow">{variant === "zdm" ? "Contato" : orcamento ? "Orçamento" : "Demonstração"}</p>
          <h2 className={cn("text-4xl leading-[1.02] tracking-tight md:text-6xl", variant === "zdm" ? "font-wide font-extrabold" : "font-grotesk font-semibold")}>
            {variant === "zdm" ? (
              <>Vamos ligar o <span className={accent}>próximo sistema</span> da sua empresa.</>
            ) : orcamento ? (
              <>Vamos ver o que mais dá pra <span className={accent}>monitorar.</span></>
            ) : (
              <>Veja suas máquinas <span className={accent}>em 360°</span>.</>
            )}
          </h2>
          <p className="max-w-md text-lg leading-relaxed text-nevoa">
            {variant === "zdm"
              ? "Conte o problema. Respondemos com um diagnóstico e o próximo passo, sem compromisso."
              : orcamento
              ? "Conte que tipo de leitura sua operação precisa — a gente retorna com o sensor certo e uma proposta."
              : "Mostramos o MyMaq360 com os equipamentos da sua operação e montamos o plano de implantação."}
          </p>
          <dl className="grid gap-4 pt-4 font-mono text-sm">
            <div className="flex gap-4">
              <dt className="w-24 text-nevoa">E-mail</dt>
              <dd className="text-ink"><a href="mailto:atendimento@zdmsolutions.com.br" className="select-all link-line hover:text-mata">atendimento@zdmsolutions.com.br</a></dd>
            </div>
            <div className="flex gap-4">
              <dt className="w-24 text-nevoa">WhatsApp</dt>
              <dd className="text-ink"><a href="https://wa.me/5532987103206" target="_blank" rel="noopener noreferrer" className="select-all link-line hover:text-mata">(32) 98710-3206</a></dd>
            </div>
            <div className="flex gap-4">
              <dt className="w-24 text-nevoa">Instagram</dt>
              <dd className="text-ink"><a href="https://instagram.com/zdm.solutions" target="_blank" rel="noopener noreferrer" className="select-all link-line hover:text-mata">@zdm.solutions</a></dd>
            </div>
            <div className="flex gap-4"><dt className="w-24 text-nevoa">Base</dt><dd className="text-ink">Zona da Mata · MG</dd></div>
          </dl>
        </div>
        <form
          className="reveal relative rounded-2xl border border-hairline/[0.1] bg-noite-2/80 p-6 shadow-[0_40px_120px_-40px_rgba(31,107,255,0.25)] backdrop-blur md:p-8"
          data-delay="120"
          onSubmit={async (e) => {
            e.preventDefault();
            if (enviando) return;
            const dados = new FormData(e.currentTarget);
            const nome = String(dados.get("nome") ?? "").trim();
            const empresa = String(dados.get("empresa") ?? "").trim();
            const emailVisitante = String(dados.get("email") ?? "").trim();
            const mensagem = String(dados.get("mensagem") ?? "").trim();

            setEnviando(true);
            setErro(null);
            try {
              const res = await fetch(`${API_URL}/contato-site`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                  origem: variant,
                  intent: variant === "mymaq" ? (orcamento ? "orcamento" : "demo") : undefined,
                  nome,
                  empresa: empresa || undefined,
                  email: emailVisitante,
                  mensagem,
                }),
              });
              if (!res.ok) {
                const corpo = await res.json().catch(() => null);
                throw new Error(corpo?.message ?? "Não foi possível enviar sua mensagem. Tente novamente.");
              }
              setSent(true);
            } catch (err) {
              setErro(
                err instanceof Error && err.message !== "Failed to fetch"
                  ? err.message
                  : "Não foi possível enviar sua mensagem agora. Verifique sua conexão e tente novamente."
              );
            } finally {
              setEnviando(false);
            }
          }}
        >
          {sent ? (
            <div className="flex min-h-[360px] flex-col items-start justify-center gap-4" role="status">
              <span className="grid size-12 place-items-center rounded-full bg-verde/15 text-verde-n"><Check /></span>
              <p className="font-wide text-2xl font-bold">Mensagem enviada com sucesso.</p>
              <p className="max-w-sm text-nevoa">
                Recebemos seu contato e vamos responder em breve pelo e-mail informado. Se preferir, escreva direto
                para{" "}
                <a href="mailto:atendimento@zdmsolutions.com.br" className="link-line text-ink hover:text-mata">
                  atendimento@zdmsolutions.com.br
                </a>
                .
              </p>
              <Button variant="outline" onClick={() => setSent(false)} type="button">Escrever outra</Button>
            </div>
          ) : (
            <div className="grid gap-5">
              <div className="grid gap-5 sm:grid-cols-2">
                <div className="grid gap-2"><Label htmlFor={`${variant}-nome`}>Nome</Label><Input id={`${variant}-nome`} name="nome" required autoComplete="name" /></div>
                <div className="grid gap-2"><Label htmlFor={`${variant}-empresa`}>Empresa</Label><Input id={`${variant}-empresa`} name="empresa" autoComplete="organization" /></div>
              </div>
              <div className="grid gap-2"><Label htmlFor={`${variant}-email`}>E-mail</Label><Input id={`${variant}-email`} name="email" type="email" required autoComplete="email" /></div>
              <div className="grid gap-2">
                <Label htmlFor={`${variant}-msg`}>{variant === "zdm" ? "O que você precisa resolver?" : orcamento ? "O que você quer monitorar?" : "Quantas máquinas você quer acompanhar?"}</Label>
                <Textarea id={`${variant}-msg`} name="mensagem" required />
              </div>
              {erro && (
                <p role="alert" className="text-sm text-red-500">
                  {erro}
                </p>
              )}
              <Button
                type="submit"
                size="lg"
                variant={variant === "zdm" ? "power" : "default"}
                disabled={enviando}
                className={cn("mt-2 w-full sm:w-auto sm:justify-self-start", variant === "mymaq" && "bg-mata text-white hover:bg-mata/90")}
              >
                {enviando ? "Enviando..." : <>Enviar <ArrowUpRight /></>}
              </Button>
            </div>
          )}
        </form>
      </div>
    </section>
  );
}

/* ---------------- Espaço para capturas de tela do sistema ---------------- */
export function ScreenshotSlot({ label, src }: { label: string; src?: string }) {
  if (src) return <img src={src} alt={label} loading="lazy" className="w-full rounded-xl border border-white/10" />;
  return (
    <div className="tech-grid relative grid aspect-[16/10] w-full max-w-full place-items-center overflow-hidden rounded-xl border border-dashed border-white/15 bg-marinho/60">
      <div className="text-center">
        <p className="eyebrow">Captura de tela</p>
        <p className="mt-2 font-grotesk text-lg font-semibold text-white/90">{label}</p>
        <p className="mt-1 text-sm text-nevoa">Imagem do sistema entra aqui</p>
      </div>
    </div>
  );
}
