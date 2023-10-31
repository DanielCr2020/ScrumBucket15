import express from 'express'
const router = express.Router()
import events from '../data/events.js'

import validation from '../validation.js'

router
    .route('/')
    .get(async(req,res) => {     //  /api/events
        //gets all the events
        try{
            let allEvents = await events.getAllEvents()
            return res.status(200).json(allEvents)
        }
        catch(e){
            console.log(e)
            res.status(e[0]).json(e[1])
            return
        }
    })


export default router