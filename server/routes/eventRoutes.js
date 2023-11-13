import express from 'express'
const router = express.Router()
import events from '../data/events.js'

import validation from '../validation.js'
//deprecated
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

router
    .route('/createEvent')
    .post(async(req,res) => {       //      /api/events/createEvent
        //placeholder
        try{
            let event = await events.createEvent(
                req.body.displayName_teacher,
                req.body.eventName,
                req.body.eventDate,
                req.body.startTime,
                req.body.endTime,
                req.body.skill,
                req.body.displayName_student,
                req.body.description,
                true    //picture
            )
            return res.status(200).json(event)
        }
        catch(e){
            console.log(e)
            return res.status(400).json(e)
        }
    })


export default router