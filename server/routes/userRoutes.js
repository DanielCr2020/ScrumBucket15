import express from 'express'
const router = express.Router()
import users from '../data/users.js'

import validation from '../../validation.js'

router
    .route('/')
    .get(async(req,res) => {        //      /api/users
        res.status(200).send('Hello there (users)')
    })

router
    .route('/signup')
    .post(async(req,res) => {       //      /api/users/signup
        let username,password,displayName;
        try{
            username=validation.checkUsername(req.body.username)
            password=validation.checkPassword(req.body.password)
            displayName=validation.checkDisplayName(req.body.displayName)
        }
        catch(e){
            res.status(400).json({error:e})
            console.log(e)
            return
        }
        let newUser;
        try{
            newUser = await users.createUser(displayName,username,password)
        }
        catch(e){
            console.log(e)
            res.status(e[0]).json({error:e[1]})
            return
        }
        res.status(200).json({"/api/users/signup":newUser})
    })

router
    .route('/login')
    .post(async(req,res) => {       //      /api/users/login
        let username,password;
        try{
            username=validation.checkUsername(req.body.username)
            password=validation.checkPassword(req.body.password)
        }
        catch(e){
            res.status(400).json({error:e})
            return
        }
        res.status(200).json({"/api/users/login":req.body})
    })

export default router