# Site ZDM Solutions + MyMaq360

React 18 · Vite · TypeScript · Tailwind CSS · componentes shadcn/ui (Radix).

## Rodar

```bash
npm install
npm run dev       # desenvolvimento em http://localhost:5173
npm run build     # gera a pasta dist/ pronta para publicar
```

A pasta `dist/` funciona em qualquer hospedagem estática (Vercel, Netlify, Hostinger, S3).

## Páginas

- `/` → site da ZDM Solutions (`src/pages/Home.tsx`)
- `/#mymaq360` → página do produto (`src/pages/MyMaq.tsx`, carregada só quando aberta)

## Onde mexer

| O quê | Arquivo |
| --- | --- |
| Logotipos ZDM e MyMaq360 (vetores oficiais) | `src/components/brand/Logos.tsx` |
| Cabeçalho, rodapé, contato, painel ilustrativo | `src/components/shared.tsx` |
| Cores e fontes da marca | `tailwind.config.ts`, `src/index.css` |
| Componentes shadcn | `src/components/ui/` |

## Imagens do MyMaq360

1. Coloque as capturas em `public/mymaq/` (ex.: `painel.png`).
2. Em `src/pages/MyMaq.tsx`, preencha o `src` em `SCREENS`:
   `painel: { label: "Painel geral", src: "./mymaq/painel.png" }`

Enquanto não houver imagem, aparece um espaço reservado com o nome da tela.

## Antes de publicar

- Trocar os campos entre colchetes no contato (`[contato@seudominio.com.br]`, WhatsApp, cidade) em `src/components/shared.tsx`.
- Ligar o formulário a um serviço de envio (e-mail, CRM ou API). Está marcado com `TODO` em `Contact`.
- Os números do painel do MyMaq360 são ilustrativos e estão marcados assim na tela.
