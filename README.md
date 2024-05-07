# AnotaAi

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 17.3.4.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `npm test` to execute unit tests via [Jest](https://jestjs.io/).

To run tests in watch mode, use `npm run test:watch`.

To generate test coverage reports, use `npm run test:coverage`.

## Node Version

This project uses Node.js version 20.11.0.

## Conhecendo a estrutura do projeto

- `coverage` é a pasta onde ficam armazenados os arquivos gerados ao realizar os testes unitários do projeto;
- `dist` é a pasta onde ficam armazenados os arquivos gerados ao compilar o projeto e que serão usados para a implantação do projeto após o build;
- `node_modules` é a pasta responsável por armazenar as nossas bibliotecas, quando nós adicionamos algo no nosso projeto com o comando `npm` ele modifica o arquivo `package.json` e gerencia os pacotes e as suas versões dentro desse diretório;
- `src` é a pasta principal do nosso projeto, visto que, ele é o diretório da nossa aplicação. É nesta pasta que literalmente contém tudo pertinente a criação da aplicação, como components, modules, services, directives, imagens, ícones, configuração de ambiente, etc.;
  - `src\app` contém toda estrutura de pastas para desenvolvimento da aplicação.
    - `shared` nela ficam todos os components que são compartilhaveis, ou seja, reutilizáveis em toda a aplicação.
      - `components` esta pasta contém os components que são utilizados como páginas/telas.
        - Dentro de cada componente existem os seguintes arquivos/pastas:
          - `.html`: contém o HTML para construção da tela;
          - `.scss`: é o arquivo de estilo para customização do layout da tela;
          - `.spec.ts`: arquivo de teste do componente;
          - `.ts`: é o arquivo de classe do componente, onde é feito as funções dos botões, ações e interações que a tela vai possuir.
    - `core` nela contém os components que são utilizados em todo momento na aplicação. Ex.: cabeçalho e rodapé.
    - `enums` contempla os enumeradores que são usados na aplicação. Ex.: endpoints, mensagens, etc.
    - `models` ficam armazenado todos os modelos que podem possuir seus valores como atributos, métodos.
    - `services` ficam localizados os arquivos de serviços, que são responsáveis por devolver determinadas informações, seja ela fornecida por uma API ou alguma lógica de negócio interna no front-end.
    - `utils` são arquivos que dentro possuem funções úteis e reutilizavéis dentro da aplicação.
    - `app-routes.ts` contém as rotas das telas.
    - `app.config.ts` é o modulo principal do projeto, nele ficam as importações principais para funcionamento da aplicação como rotas, configuração do NgRx, local storage, importação de módulos filhos, etc.
  - `src\assets` esta pasta permite trabalhar com arquivos extras a nossa aplicação, como imagens, ícones, fontes, etc. Esse diretório é configurado dentro do nosso arquivo `angular.json`, caso queira alterar ele para um outra pasta ou incluir mais, basta ir até arquivo `angular.json` e informar o nome do novo diretório.
  - `src\environments` nesta pasta temos dois arquivos .ts, um para o nosso ambiente de produção e um outro para o nosso ambiente de desenvolvimento. Nele nós podemos definir constantes "globais" em toda a aplicação.
  - `favicon.ico` é uma pequena imagem que fica guardada no site para visualização pelo navegador. Geralmente são utilizados como logotipos em tamanho reduzido, nos sites de empresas, entidades e marcas quaisquer. Ele é aquele icone pequeno que fica ao lado do nome da página nos Browsers.
  - `index.html` esse seria o nosso arquivo html que é exibido no Browser, dentro dele rodamos a nossa SPA (Single Page Application).
  - `main.ts` esse é o arquivo principal da nossa Solution. Ele vem definido dentro do nosso arquivo angular.json, esse seria o arquivo que chama todos os outros arquivos e faz a nossa aplicação funcionar.
  - `setup.jest.ts` é responsavel por realizar testes na aplicação.
  - `styles.css` como em todos os nossos componentes tem o seu próprio arquivo .css, nós podemos utilizar esse arquivo para criar algo global como classes css gerais para nossa aplicação.
- `.editorconfig`: são configurações expecificas da IDE que está sendo usada.
- `.gitignore`: arquivo do git para gerenciarmos os arquivos que serão ignorados no momento do nosso commit.
- `angular.json`: é onde fica armazenada todas as configurações do angular e do projeto.
- `jest.config.js`: o Jest é uma biblioteca utilizada para criação de testes unitários no Angular.
- `package-lock.json`: serve para descrever as características das dependências usadas no projeto. Versão, subdependências, links de verificação de integridade, dentre outras coisas.
- `package.json`: esse arquivo é o responsável por gerenciar as dependências do nosso projeto, quando nós executamos o comando `npm install`, ele verifica os pacotes que estão dentro desse arquivo e baixa para o nosso diretório `node_modules` conforme visto anteriormente.
- `README.md`: arquivo Markdown para documentação da nossa aplicação (este que você está lendo 😊).
- `tsconfig.app.json, tsconfig.spec.json e tsconfig.json`: são os nossos arquivos de configuração do TypeScript.
