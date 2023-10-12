# Usage

Run `npm install` in both the top level directory, as well as the `server` directory.

The whole app is visible at [https://scrumbucket15.vercel.app/](https://scrumbucket15.vercel.app/)

I deployed it to vercel :)

```bash
$ npm install # or pnpm install or yarn install
```

## Available Scripts

In the project directory, you can run:

### `npm run dev` or `npm start`

to start just the frontend. Though you will need to also start the server for the app to work properly

To start just the backend, you can run:

### `node server/app.js`

or

### `npm run start-server`

in a different terminal window from the frontend.

To start both concurrently from one terminal window, you can run:

### `npm run start-all`

These will run the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.
The express server is visible at [http://localhost:4000/api](http://localhost:4000/api)

The page will reload if you make edits.<br>

### `npm run build`

Builds the app for production to the `dist` folder.<br>
It correctly bundles Solid in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

## Deployment

You can deploy the `dist` folder to any static host provider (netlify, surge, now, etc.)
