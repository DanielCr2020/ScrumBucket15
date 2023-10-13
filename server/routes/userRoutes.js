import express from 'express'
const router = express.Router()
import users from '../data/users.js'

import validation from '../validation.js'

router
    .route('/')
    .get(async(req,res) => {        //      /api/users
        res.status(200).json('Hello there (users)')
    })

router
    .route('/signup')
    .get((req,res) => {
        res.status(200).json("get /api/users/signup")
    })
    .post(async(req,res) => {       //      /api/users/signup
        let username,password,displayName;
        try{
            username=validation.checkUsername(req.body.username)
            password=validation.checkPassword(req.body.password)
            displayName=validation.checkDisplayName(req.body.displayName)
        }
        catch(e){
            console.log(e)
            res.status(400).json({error:e})
            return
        }
        let newUser;
        try{
            newUser = await users.createUser(displayName,username,password)
        }
        catch(e){
            console.log(e)
            res.status(e[0]).json({error:e[1]})     //[0] is the status code, [1] is the message
            return
        }
        res.status(200).json(newUser)
    })

router
    .route('/login')
    .get((req,res) => {
        res.status(200).json("get /api/users/login")
    })
    .post(async(req,res) => {       //      /api/users/login
        let username,password,check;
        console.log(req.body)
        try{
            username=validation.checkUsername(req.body.username)
            password=validation.checkPassword(req.body.password)
            check=await users.checkUser(username,password)
        }
        catch(e){
            console.log(e)
            res.status(400).json({error:e})
            return
        }
        if(!check.authenticatedUser){
            console.log(e)
            res.status(500).json({error:"uhhh, this isn't supposed to happen"})
            return
        }
        if(check.authenticatedUser===true){
            req.session.user={username:username, userId:check.userId}
        }
        res.status(200).json(req.session.user)
        return
    })

export default router