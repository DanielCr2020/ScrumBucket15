import express from 'express';
const app=express();
import cors from 'cors';
import validation from '../validation.js'
import session from 'express-session'
import configRoutes from './routes/index.js'
import connection from './config/mongoConnection.js'

configRoutes(app);

async function main() {
    // const db = await connection.dbConnection();
}

app.listen(4000, () => {
    console.log("Express server running on http://localhost:4000")
})

main()