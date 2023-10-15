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
app.use(cors({
    origin:true,
    credentials:true,
}))

app.use(express.json())
app.use(express.urlencoded({extended:true}))

//middleware
app.use(            //authentication middleware
    session({
        name:'AuthCookie',
        secret: "There's nothing important here",
        resave: false,
        saveUninitialized: true,
        cookie: {
            httpOnly:true,
            secure:true,
            maxAge: 1800000,
            sameSite:'none'
        }
    })
)
//All backend routes start with /api

app.use('/api/users/profile',async(req,res,next) => {
    // console.log("middleware:",req.originalUrl, req.session)
    if(!req.session.user){
        return
    }
    else{
        next()
    }
})

app.use( async (req,res,next) => {          //logging middleware, runs on every route
    //log method it is, URL, and if the user is authenticated
    let start=(new Date().toUTCString()+" "+req.method+" "+req.originalUrl)
    if(req.session.user){
        console.log(start+" (Authenticated User)")
    }
    else {
        console.log(start+" (Non authenticated user)")
    }
    next()
})

configRoutes(app);

app.listen(4000, () => {
    console.log("Express server running on http://localhost:4000")
})

main()

export default app