import express from 'express'
const router = express.Router()
import users from '../data/users.js'

import validation from '../validation.js'

router
    .route('/')
    .get(async(req,res) => {    //      /api/skills get route.      Get all users (no skill filter)
        try{
            let usersWithSkills = await users.searchSkills('',false)
            return res.status(200).json(usersWithSkills)
        }
        catch(e){
            console.log(e)
            return res.status(e[0]).json({error:e[1]})
        }
    })
router 
    .route('/searchBySkills')
    .post(async(req,res) => {  //       /api/skills/searchBySkills post route
        /*
            req body:
            {
                skills: "foo, bar, baz",         (a string from a search box)
                mustHaveAll: true OR false       (a radio button with all or any)
            }
        */
        try{
            let skillsSearch = validation.checkSkills(req.body.skills)
            if(req.body.mustHaveAll==="true" || req.body.mustHaveAll===true) req.body.mustHaveAll=1
            else if(req.body.mustHaveAll==="false" || req.body.mustHaveAll===false) req.body.mustHaveAll=0
            let usersWithSkills = await users.searchSkills(skillsSearch,!!req.body.mustHaveAll)     //!! changes truthy values to true and falsy values to false
            return res.status(200).json(usersWithSkills)
        }
        catch(e){
            console.log(e)
            return res.status(e[0]).json({error:e[1]})
        }
    })

    router 
    .route('/searchBySkillInterests')
    .post(async(req,res) => {  //       /api/skills/searchBySkillInterests post route
        /*
            req body:
            {
                skills: "foo, bar, baz",         (a string from a search box)
                mustHaveAll: true OR false       (a radio button with all or any)
            }
        */
        try{
            let skillsSearch = validation.checkSkills(req.body.skills)
            if(req.body.mustHaveAll==="true" || req.body.mustHaveAll===true) req.body.mustHaveAll=1
            else if(req.body.mustHaveAll==="false" || req.body.mustHaveAll===false) req.body.mustHaveAll=0
            let usersWithSkills = await users.searchSkillInterests(skillsSearch,!!req.body.mustHaveAll)     //!! changes truthy values to true and falsy values to false
            return res.status(200).json(usersWithSkills)
        }
        catch(e){
            console.log(e)
            return res.status(e[0]).json({error:e[1]})
        }
    })

export default router