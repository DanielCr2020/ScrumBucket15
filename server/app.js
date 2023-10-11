import express, { urlencoded } from 'express';
const  app=express();
import cors from 'cors';
// import validation from './validation.js'
import configRoutes from './routes/index.js'
import connection from './config/mongoConnection.js'


async function main() {
    const db = await connection.dbConnection();
}
app.use(cors())

// app.use(function(req,res,next) {
//     res.header('Access-Control-Allow-Origin',"*")
//     res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//     next();
// })

app.use(express.json())
app.use(express.urlencoded({extended:true}))

configRoutes(app);

app.listen(4000, () => {
    console.log("Express server running on http://localhost:4000")
})

main()