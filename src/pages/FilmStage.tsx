import { useEffect, useState } from "react";
import { FilmFrame, FILM_LENGTH } from "@/components/mymaq/Film";

declare global { interface Window { __setT?: (t: number) => void; __filmLength?: number } }

/** Palco do vídeo: o tempo é controlado de fora (window.__setT) para gerar quadro a quadro. */
export default function FilmStage() {
  const [t, setT] = useState(0);
  useEffect(() => { window.__setT = setT; window.__filmLength = FILM_LENGTH; }, []);
  return <div className="fixed left-0 top-0 origin-top-left" style={{ transform: `scale(${window.innerWidth / 1280})` }}><FilmFrame t={t} /></div>;
}
