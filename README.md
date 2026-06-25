# Nunjucks Webpack Bundler

Projeto frontend com **Webpack 5** para bundling de assets e páginas HTML com **Nunjucks**, incluindo fluxo de desenvolvimento local, build de produção, lint e testes E2E.

## Tecnologias utilizadas

- **Node.js 20+** e **npm 10+**
- **Webpack 5** + **webpack-dev-server**
- **html-bundler-webpack-plugin** com **Nunjucks**
- **Sass (SCSS)** (`sass` + `sass-loader` + `css-loader`)
- **Bootstrap 5**
- **ESLint 9** + plugins para HTML/Prettier
- **Stylelint** (config SCSS standard)
- **Prettier**
- **Cypress** (testes E2E)
- **Nodemon** (watch do `webpack.config.js`)
- **fontfacegen** (geração de arquivos de fonte)

## Pré-requisitos

1. Instalar **Node.js** na versão `20.x`.
2. Garantir **npm** na versão `10.x`.

## Configuração do projeto

1. Clone o repositório:

```bash
git clone https://github.com/TIOwilsu/nunjunks-webpack-bundler.git
cd nunjunks-webpack-bundler
```

2. Instale as dependências:

```bash
npm install
```

## Como rodar o projeto

### Ambiente de desenvolvimento

Inicia o servidor de desenvolvimento com recarga automática:

```bash
npm run start
```

> O projeto abre em `http://localhost:8080`.

### Build de produção

Gera os arquivos finais na pasta `dist/`:

```bash
npm run build
```

### Preview local da build

Executa build + servidor para visualização local:

```bash
npm run preview
```

## Qualidade de código e testes

### Lint

```bash
npm run lint
```

### Lint com correção automática

```bash
npm run lint:fix
```

### Testes E2E (Cypress)

Antes de executar os testes, deixe a aplicação rodando em `http://localhost:8080` (ex.: `npm run start`) e, em outro terminal, execute:

```bash
npm test
```

## Geração de fontes

Processa arquivos de fonte definidos em `fontfacegen/` e gera saídas em `src/assets/fonts/`:

```bash
npm run font
```

## Estrutura principal

```text
.
├── src/
│   ├── assets/
│   │   ├── styles/
│   │   ├── scripts/
│   │   ├── images/
│   │   └── fonts/
│   └── views/
│       ├── layouts/
│       ├── pages/
│       └── partials/
├── dist/
├── webpack.config.js
├── webpack.helpers.js
├── eslint.config.js
├── cypress.config.js
└── fontfacegen.config.js
```

### Como entender essa estrutura (guia rápido)

Pense no projeto em 2 blocos: **código-fonte (`src/`)** e **resultado da build (`dist/`)**.

- Tudo que você desenvolve e edita fica em `src/`.
- Tudo que o Webpack gera para publicação fica em `dist/`.

### `src/` (onde você trabalha no dia a dia)

#### `src/views/`

Contém a estrutura das páginas em HTML/Nunjucks.

- `layouts/`: moldes base das páginas (ex.: estrutura com `<head>`, header, footer, etc.).
- `pages/`: páginas finais da aplicação (ex.: `home/`, `login/`).  
  Cada pasta de página normalmente agrupa:
  - `*.html` (markup da página)
  - `*.scss` (estilos da página)
  - `*.js` (scripts da página)
- `partials/`: blocos reutilizáveis (componentes de layout), como header e footer.

#### `src/assets/`

Contém arquivos estáticos e código de front-end.

- `styles/`: base global de estilos (variáveis, mixins, utilitários, reset, vendors).
- `scripts/`: scripts JavaScript compartilhados e bootstrap de JS da aplicação.
- `images/`: imagens usadas nas páginas/componentes.
- `fonts/`: fontes geradas/consumidas pelo projeto.

### `dist/` (saída de produção)

Pasta gerada automaticamente pelos comandos de build/preview.  
Aqui ficam os arquivos finais otimizados (HTML, CSS, JS e assets com hash).  
**Não é a pasta para desenvolvimento manual.**

### Arquivos de configuração da raiz

- `webpack.config.js`: define como o projeto compila páginas, estilos, scripts e assets.
- `webpack.helpers.js`: centraliza paths e funções auxiliares usadas no Webpack/ESLint.
- `eslint.config.js`: regras de lint para JS, HTML e SCSS.
- `cypress.config.js`: configuração dos testes E2E (baseUrl e padrão de specs).
- `fontfacegen.config.js`: script para converter fontes e gerar arquivos de fonte/CSS.
