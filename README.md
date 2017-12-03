This app is a simple Pokedex implementation intented for explorational purposes. Data is fetched from [Pokeapi](https://pokeapi.co) REST service.

This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app), so 
everything there applies here as well. Also, there probably some things created by the creator (eg. service worker) which
are currently unused.


#### Starting project

Clone repo and install packages

`$ npm install`

Start local web server

`$ npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

`$ npm run build`

Builds the app for production to the `build` folder.<br>


#### Project structure

App UI is built using React components written in TypeScript.

For collapsing sidebar project uses [react-sidebar](https://github.com/balloob/react-sidebar) which handles main layout. 
Other stylings and component layout are [Bootstrap 4](https://v4-alpha.getbootstrap.com/) or custom CSS.

Redux is used for app state management, accompanied by some helper libraries for logging, persisting, handling async calls, ...

List of selected pokemons (aka "my pokemons") is persisted in local storage using "redux-persist".

Because Pokeapi backend demands "fair use policy" and imposes some limits on number of requests, Pokeapi client uses 
simple caching service which serializes index of all pokemons and each fetched pokemon to localStorage. Caching can be 
enabled/disabled in main app config (AppConfig).
