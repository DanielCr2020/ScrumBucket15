# About

This project is a skill sharing website for CS 555. It is a full stack web application using SolidJS for the frontend and expressjs for the backend. It uses MongoDB as its database.

## Usage

## Installing dependencies

Run

```bash
npm install # or pnpm install or yarn install
```

in both the top level directory, as well as the `server` directory.

## Available Scripts

In the project directory, you can run:

### `npm start`

to start the entire app. This will run the client and server in one terminal concurrently.

Go to [http://localhost:3000](http://localhost:3000) in your borwser to view the app

The express server is visible at [http://localhost:4000/api](http://localhost:4000/api)
(Though you should almost never need to visit the express server directly.)

To start just the frontend, you can run:

### `npm run start-client`

or

### `npm run dev`

To start just the backend, you can run:

### `npm run start-server`

or

### `node server/app.js`

To build the project for production, run:

### `npm run build`

This builds the frontend for production to the `dist` folder.
It correctly bundles Solid in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.
Your app is ready to be deployed!

## Deployment

You can deploy the `dist` folder to any static host provider (netlify, surge, now, etc.)

### Notes on deployment/functionality

The app is deployed to vercel on [https://scrumbucket15.vercel.app](https://scrumbucket15.vercel.app)
However, express-session does not work on deployment, so logging in will not working, which blocks most of the functionality.

We hope to integrate a more robust authentication system that will work on deployment.

The server uses a MongoDB connection that depends on a `.env` file. This file, since it contains sensitive credentials, is not committed to the repo.

Node version 18.17.1 was used. The client uses the `fetch` api instead of axios, so a recent version of node should be used.
