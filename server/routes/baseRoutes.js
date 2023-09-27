import express from 'express'
const router = express.Router()
import users from '../data/users.js'

import validation from '../../validation.js'

router
    .route('/')
    .get(async(req,res) => {
        res.status(200).send('Hello! This was sent as a response from an express server!')
    })

export default router