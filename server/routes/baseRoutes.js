import express from 'express'
const router = express.Router()

import validation from '../validation.js'

router
    .route('/')
    .get((req,res) => {            //      get /
        res.status(200).json("This is get route for / on the server. You probably don't need to be here")
    })

router
    .route('/api')
    .get((req,res) => {            //      get /api
        res.status(200).json("This is get route for /api on the server. You probably don't need to be here")
    })
    

export default router