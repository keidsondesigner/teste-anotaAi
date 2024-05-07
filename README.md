# AnotaAi

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 17.3.4.

## Development server
Run `npm install` command for installing project dependencies.

Run `npm run dev` ou `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `npm test` to execute unit tests via [Jest](https://jestjs.io/).

To run tests in watch mode, use `npm run test:watch`.

To generate test coverage reports, use `npm run test:coverage`.

## Node Version

This project uses Node.js version 20.11.0.

## Understanding the Project Structure

- `coverage` is the folder where the files generated from running the project's unit tests are stored;
- `dist` is the folder where the files generated from compiling the project are stored and will be used for project deployment after building;
- `node_modules` is the folder responsible for storing our libraries. When we add something to our project using the `npm` command, it modifies the `package.json` file and manages the packages and their versions within this directory;
- `src` is the main folder of our project, as it is the directory of our application. It is in this folder that literally everything relevant to the creation of the application is contained, such as components, modules, services, directives, images, icons, environment configuration, etc.;
  - `src\app` contains the entire folder structure for developing the application.
    - `shared` contains all the components that are shareable, meaning they are reusable throughout the application.
      - `components` This folder contains components used as pages/screens.
        - Within each component, there are the following files/folders:
          - `.html`: contains the HTML for building the screen;
          - `.scss`: is the style file for customizing the screen layout;
          - `.spec.ts`: component test file;
          - `.ts`: is the component class file, where button functions, actions, and interactions that the screen will have are implemented.
    - `core` contains components that are used at all times in the application. For example: header and footer.
    - `enums` contains enumerators used in the application. For example: endpoints, messages, etc.
    - `models` stores all models that can have their values as attributes, methods.
    - `services` contains service files, which are responsible for returning certain information, whether provided by an API or some internal business logic on the frontend.
    - `utils` are files that contain useful and reusable functions within the application.
    - `app-routes.ts` contains the screen routes.
    - `app.config.ts` is the main module of the project, containing the main imports for the application to work, such as routes, NgRx configuration, local storage, importation of child modules, etc.
  - `src\assets` This folder allows working with extra files for our application, such as images, icons, fonts, etc. This directory is configured within our `angular.json` file. If you want to change it to another folder or add more, just go to the `angular.json` file and specify the name of the new directory.
  - `src\environments` In this folder, we have two .ts files, one for our production environment and another for our development environment. Here we can define "global" constants throughout the application.
  - `favicon.ico` is a small image stored on the website for viewing by the browser. They are usually used as logos in reduced size on the websites of companies, entities, and any brands. It's the small icon next to the page name in browsers.
  - `index.html` this would be our html file displayed in the browser, within it we run our SPA (Single Page Application).
  - `main.ts` this is the main file of our solution. It is defined within our angular.json file. This would be the file that calls all the other files and makes our application work.
  - `setup.jest.ts` is responsible for performing tests on the application.
  - `styles.css` just as each of our components has its own .css file, we can use this file to create something global like general CSS classes for our application.
- `.editorconfig`: these are specific settings of the IDE being used.
- `.gitignore`: git file to manage the files that will be ignored at the time of our commit.
- `angular.json`: this is where all angular and project settings are stored.
- `jest.config.js`: Jest is a library used for creating unit tests in Angular.
- `package-lock.json`: describes the characteristics of the dependencies used in the project. Version, sub-dependencies, integrity check links, among other things.
- `package.json`: this file is responsible for managing the dependencies of our project. When we run the `npm install` command, it checks the packages inside this file and downloads them to our `node_modules` directory as seen before.
- `README.md`: Markdown file for documentation of our application (this one you are reading 😊).
- `tsconfig.app.json`, `tsconfig.spec.json`, and `tsconfig.json`: these are our TypeScript configuration files.
