import express, { urlencoded } from 'express';
const  app=express();
import cors from 'cors';
// import validation from './validation.js'
import configRoutes from './routes/index.js'
import connection from './config/mongoConnection.js'
import session from 'express-session'

async function main() {
    const db = await connection.dbConnection();
}
app.use(cors())

app.use(express.json())
app.use(express.urlencoded({extended:true}))

//middleware
app.use(            //authentication middleware
    session({
        name:'AuthCookie',
        secret: "There's nothing important here",
        resave: false,
        saveUninitialized: true,
        cookie: {maxAge: 1800000}
    })
)

configRoutes(app);

app.listen(4000, () => {
    console.log("Express server running on http://localhost:4000")
})

main()

export default app