import express from 'express'
const router = express.Router()
import users from '../data/users.js'

import validation from '../validation.js'

router
    .route('/')
    .get(async(req,res) => {            //      get /api
        res.status(200).json('Hello! This was sent as a response from an express server!')
    })
    

export default router