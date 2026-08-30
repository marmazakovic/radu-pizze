# Radu Pizze — website

Sajt picerije **Radu Pizze** (Novi Sad, Ćirpanova 2).

## Live preview

https://marmazakovic.github.io/radu-pizze/

## Lokalni razvoj

```bash
npm install
npm run dev
```

Otvori http://localhost:5173

## Build

```bash
npm run build
npm run preview
```

## Struktura

- `src/data/menu.ts` — meni i cene (lokalne, iz Excel cenovnika)
- `src/config/site.ts` — adresa, dostava, min. porudžbina, zona
- `src/context/CartContext.tsx` — korpa (meni + porudžbina)
- `src/components/` — UI sekcije

## Deploy

Push na `main` automatski deployuje GitHub Pages (`.github/workflows/deploy.yml`).

## Šta još treba od vlasnika

- Logo (zamenjuje placeholder u hero sekciji)
- Radno vreme i telefon
- Prave fotografije jela
- Backend za porudžbine (forma trenutno spremna za API)
