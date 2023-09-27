import express from 'express'
const router = express.Router()
import users from '../data/users.js'

import validation from '../../validation.js'

router
    .route('/')
    .get(async(req,res) => {
        res.status(200).send('Hello there (users)')
    })

export default router