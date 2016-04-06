# react-universal-starter

There are already so many different starter kits available, but none of them fit exactly with how I like to organize and build my projects.

There is **not much included** in this repository by way of examples. The tools are all in place for you to do what you need, but you will need to add your own components, API endpoints, models, database migrations, etc. I made this repository because I wanted a minimalist skeleton that will have everything I need and no extras that I just have to delete and refactor every time I make a new project. You should be able to use this starter kit with very minimal configuration to the existing skeleton - just add your stuff and you're good to go.

Included is an express server with two apps to start out:

- Isomorphic react app
    - Routing
    - Async redux data
    - Hot reloading in development
    - Minified webpack bundle in production
    - Redux Chrome dev tools

- API
    - Knex for migrations and data seeding
    - Objection for model building and API data fetching

The code is in `src/` and it should be very easy to read. I've tried to keep things as DRY as possible, which many other starter kits do not do. For instance, you will find only one `<Provider>` for both client and server.

## Installation

Clone this repository. Edit the file `config.js` with your knex database connection information. Enter your migrations in the file `data/migrations/2016...init.js` and run `./node_modules/.bin/knex migrate latest` to migrate your database.

## Use

- `npm run dev`: Development mode. Starts a babel watcher on the `src/` directory (outputs to `lib/`) and a webpack dev server with `src/client.jsx` as the entry point (more on this below). If you are using Visual Studio Code, which I highly recommend, there is an included debug launch configuration. Simply open this folder in VS Code, set a debug breakpoint anywhere in `src/`, press F5, and your breakpoints will work out of the box. If you are not using VS Code, launch the file `lib/bin/www.js` to start the server. You must relaunch after server-side changes (i.e., adding a new API endpoint), but relaunching is not necessary for client-side changes (you will see the changes immediately in your browser).
- `npm run build`: Build the app for production.
- `npm run start`: Run the app in production mode (minified/compressed, no dev tools, etc.)

## Files

### src/

- `client.jsx`: The entry point for the webpack bundle that will ultimately be run from within the client's browser.
- `server.js`: Build and export the express app (middleware and routing)

### src/bin/

- `globals.js`: Global environment variables used for determining which mode (client/server and development/production) to run in.
- `www.js`: The entry point for the node http server. Essentially this file just loads `server.js`, creates an `httpServer` and starts the listener.

### src/helpers/

- `app.jsx`: Exports a function which loads the app starting from a redux `<Provider.../>`. The function returns the correct app for client and server mode.
- `html.jsx`: Exports a function which renders the initial HTML string to be sent down on the first call to the server. In development, this HTML document loads the webpack dev server for hot module reloading, while in production it loads the static minified client javascript file from `public/`.
- `router.js`: Exports an express route handler which provides route matching for requests to load the correct route on initial request.
- `routes.jsx`: Exports a function which returns the `react-router` `Route` tree. This is written as a function so that you may pass in the `store` and change the routes depending on, for example, whether or not a user is logged in.

### src/containers/

For all your react 'smart' container components. These should be connected to the store and pass data to their children as props.

### src/components/

For 'dumb' components.

### src/api/

For your API route handlers

### src/models/

For your objection models.

### data/

This folder contains `migrations` and `seeds` directories for database management via the knex CLI. Set the connection options in `config.js` and you'll be good to go.
