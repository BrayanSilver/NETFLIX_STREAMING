# Netflix Clone — Interface de streaming

Clone visual da Netflix construído com **React 19** e **Vite 6**. Projeto **frontend-only** com dados mock (24 títulos), carrosséis horizontais, hero banner, Top 10 e modal de detalhes — ideal para portfólio de UI.

![Home — hero banner e Top 10 no Brasil](fotosProjeto/1.png)

## Sobre o projeto

Réplica fiel da experiência Netflix: navbar com busca, destaque em tela cheia, fileiras por categoria (Trending, Popular, Continue Watching), ranking Top 10 e previews ao passar o mouse. Posters gerados via SVG — sem backend nem autenticação.

## Funcionalidades

- Navbar estilo Netflix (Home, Séries, Filmes, Minha lista)
- Hero com título em destaque, metadados e botões Play / Mais informações
- Carrosséis horizontais por categoria
- Top 10 com numeração visual
- Hover com preview e modal de detalhes
- 24 títulos mock com posters SVG
- Layout responsivo e tema escuro

## Stack

| Camada | Tecnologias |
|--------|-------------|
| Frontend | React 19, Vite 6, Lucide React |
| Backend | — (não aplicável) |

## Como rodar

```bash
npm install
npm run dev
```

Abra [http://localhost:5174](http://localhost:5174) (porta configurada no Vite).

### Build de produção

```bash
npm run build
npm run preview
```

## Estrutura

```
Netflix clone/
├── fotosProjeto/       # Capturas de tela
├── NetflixClone.jsx    # Componente principal da UI
├── src/main.jsx        # Entry point
├── index.html
├── vite.config.js
└── dist/               # Build (após npm run build)
```

## Galeria

### Home e hero
![Página inicial com banner em destaque e Top 10](fotosProjeto/1.png)

### Carrosséis
![Fileiras horizontais de títulos por categoria](fotosProjeto/2.png)

### Navegação e busca
![Navbar e experiência de navegação](fotosProjeto/3.png)

### Hover e preview
![Preview ao passar o mouse sobre os cards](fotosProjeto/4.png)

### Modal de detalhes
![Modal com sinopse e informações do título](fotosProjeto/5.png)
