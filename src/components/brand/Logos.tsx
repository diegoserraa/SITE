import { cn } from "@/lib/utils";

type Tone = "dark" | "light";

/** Logotipo oficial ZDM Solutions (arquivo final da identidade visual). */
export function ZdmLogo({
  tone = "dark",
  withSolutions = true,
  on = false,
  className,
  title = "ZDM Solutions",
}: { tone?: Tone; withSolutions?: boolean; on?: boolean; className?: string; title?: string }) {
  const variante = tone === "light" ? "claro" : "escuro";
  const arquivo = withSolutions ? `zdm-logotipo-${variante}` : `zdm-marca-${variante}`;
  return (
    <img
      src={`/brand/${arquivo}.svg`}
      alt={title}
      className={cn("block h-auto w-full transition-[filter] duration-500", on && "drop-shadow-[0_0_14px_rgba(34,197,94,0.65)]", className)}
    />
  );
}

/** Logotipo MyMaq360 (arquivo final da identidade visual), com texto opcional "um produto ZDM Solutions". */
export function MyMaqLogo({
  tone = "dark",
  endorse = false,
  className,
}: { tone?: Tone; endorse?: boolean; className?: string }) {
  const variante = tone === "light" ? "claro" : "escuro";
  return (
    <span className={cn("inline-flex flex-col", className)}>
      <img src={`/brand/mymaq-logotipo-${variante}.svg`} alt="MyMaq360" className="block h-auto w-full" />
      {endorse && (
        <span className={cn("mt-1.5 font-mono text-[11px] uppercase tracking-[0.16em]", tone === "light" ? "text-slate-500" : "text-nevoa")}>
          um produto ZDM Solutions
        </span>
      )}
    </span>
  );
}
