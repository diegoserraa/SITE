import { lazy, Suspense, useEffect } from "react";
import Home from "@/pages/Home";
import { useReveal, useRoute } from "@/lib/hooks";

// A página do produto carrega só quando for aberta.
const MyMaq = lazy(() => import("@/pages/MyMaq"));
// Quadro limpo do filme (1280×720), usado para gerar o vídeo MP4.
const FilmStage = lazy(() => import("@/pages/FilmStage"));

export default function App() {
  const route = useRoute();
  useReveal(route);
  useEffect(() => {
    document.title = route === "mymaq360" ? "MyMaq360 · um produto ZDM Solutions" : "ZDM Solutions";
  }, [route]);
  if (route === "filme") return <Suspense fallback={null}><FilmStage /></Suspense>;
  return route === "mymaq360" ? (
    <Suspense fallback={<div className="min-h-screen bg-marinho" />}>
      <MyMaq />
    </Suspense>
  ) : (
    <Home />
  );
}
