import { useEffect, useState, useSyncExternalStore } from "react";

export type Theme = "dark" | "light";

function readTheme(): Theme {
  if (typeof document === "undefined") return "dark";
  return document.documentElement.dataset.theme === "light" ? "light" : "dark";
}

// Store compartilhada de verdade — não é "useState por componente".
// Com useState isolado, cada Header/Footer/botão que chamasse useTheme()
// tinha sua PRÓPRIA cópia do tema, sem se avisar quando outro mudava: o
// fundo (CSS puro, lê a variável direto) trocava na hora, mas o logo (que
// decide a cor em JS) ficava preso no valor de quando aquele componente
// montou — por isso "às vezes" não acompanhava. Com useSyncExternalStore,
// todo mundo que usa useTheme() re-renderiza junto, sempre.
let currentTheme: Theme = readTheme();
const listeners = new Set<() => void>();

function applyTheme(theme: Theme) {
  currentTheme = theme;
  document.documentElement.dataset.theme = theme;
  try {
    localStorage.setItem("zdm-theme", theme);
  } catch {
    // armazenamento bloqueado (navegação privada): tema só não persiste
  }
  listeners.forEach((l) => l());
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

/** Tema claro/escuro da casca do site, sincronizado entre todos os
 * componentes que o usam ao mesmo tempo. Persiste a escolha e evita piscar
 * o tema errado no carregamento (ver o script inline em index.html). */
export function useTheme() {
  const theme = useSyncExternalStore(subscribe, () => currentTheme);
  const toggle = () => applyTheme(currentTheme === "dark" ? "light" : "dark");
  return { theme, toggle };
}

export type Route = "home" | "mymaq360" | "filme";

function readRoute(): Route {
  const h = window.location.hash.replace("#", "");
  return h === "mymaq360" ? "mymaq360" : h === "filme" ? "filme" : "home";
}

/** Rota por hash: "#mymaq360" abre a página do produto. Funciona em qualquer hospedagem estática. */
export function useRoute() {
  const [route, setRoute] = useState<Route>(readRoute);
  useEffect(() => {
    const on = () => {
      setRoute(readRoute());
      window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
    };
    window.addEventListener("hashchange", on);
    return () => window.removeEventListener("hashchange", on);
  }, []);
  return route;
}

/**
 * Revela elementos com .reveal ao rolar. O estado de repouso é visível:
 * só o que está abaixo da dobra recebe .is-pending, e volta ao normal quando entra na tela.
 */
export function useReveal(dep: unknown) {
  useEffect(() => {
    const els = Array.from(document.querySelectorAll<HTMLElement>(".reveal"));
    if (!("IntersectionObserver" in window) || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const vh = window.innerHeight;
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => {
        if (e.isIntersecting) {
          const el = e.target as HTMLElement;
          el.style.transitionDelay = `${el.dataset.delay ?? 0}ms`;
          el.classList.remove("is-pending");
          io.unobserve(el);
        }
      }),
      { rootMargin: "0px 0px -8% 0px", threshold: 0.08 }
    );
    els.forEach((el) => {
      if (el.getBoundingClientRect().top > vh * 0.92) {
        el.classList.add("is-pending");
        io.observe(el);
      }
    });
    return () => io.disconnect();
  }, [dep]);
}

/** Valor que oscila suavemente: leituras ilustrativas de sensor. */
export function useLiveValue(base: number, amp: number, period = 2400) {
  const [v, setV] = useState(base);
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let t = 0;
    const id = window.setInterval(() => {
      t += 1;
      setV(base + amp * Math.sin(t / 3) + (amp / 3) * Math.sin(t / 1.7));
    }, period / 3);
    return () => window.clearInterval(id);
  }, [base, amp, period]);
  return v;
}
