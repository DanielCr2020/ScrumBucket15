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
    /*
        request body:
        {
            username:"username",
            password:"password" (will be hashed),
            displayName:"Display Name"
        }
    */
        try{
            let username=validation.checkUsername(req.body.username)
            let password=validation.checkPassword(req.body.password)
            let email=validation.checkEmail(req.body.email)
            let displayName=validation.checkDisplayName(req.body.displayName)
            let newUser = await users.createUser(displayName,email,username,password)
            res.status(200).json(newUser)
            return
        }
        catch(e){
            console.log(e)
            res.status(e[0]).json({error:e[1]}) //e[0] is the status code, e[1] is the error message
            return
        }
    })

router
    .route('/login')            //  /api/users/login get
    .get((req,res) => {     //used for checking if the user is logged in
        if(req.session.user){
            res.status(200).json({loggedIn:true})
        }
        else{
            res.status(200).json({loggedIn:false})
        }
    })
    .post(async(req,res) => {       //      /api/users/login        submit form to log in
        let username,password,check;
        /*
            request body:
            {
                username:"username",
                password:"password"
            }
        */
        try{        //validate input, throw bad request if invalid
            username=validation.checkUsername(req.body.username)
            password=validation.checkPassword(req.body.password)
        }
        catch(e){
            console.log(e)
            res.status(e[0]).json({error:e[1]})
            return
        }
        try{
            check=await users.checkUser(username,password)
        }
        catch(e){       //input valid, but user does not exist
            console.log(e)
            res.status(404).json({error:e})
            return
        }
        if(!check.authenticatedUser){
            console.log(e)
            res.status(500).json({error:"uhhh, this isn't supposed to happen"})
            return
        }
        if(check.authenticatedUser){
            req.session.user={username:username, userId:check.userId.toString()}
        }
        res.status(200).json(req.session)
        return
    })

router
    .route('/profile')          
    .get(async(req,res) => {            //          /api/users/profile  get a user's own profile
        // console.log("GET /profile:",req.session)
        let user, userId=req.session.user?.userId;
        try{
            userId = validation.checkId(userId)
            user = await users.getUserById(userId) 
        }
        catch(e){
            console.log(e)
            res.status(e[0]).json({error:e[1]})
            return
        }
        delete user.password        //we don't send the password back for obvious reasons
        res.status(200).json(user)
        return
    })
    .delete(async(req,res) => {     //      /api/users/profile delete method
        /*
            Deletes a user by id
            request body:
            {id: userId}
        */
       let id = req?.body?.id;
       try{
           id=validation.checkId(id)
       }
       catch(e){
           console.log(e)
           return res.status(e[0]).json(e[1])
       }
       let deletedUser;
       try{
           deletedUser = await users.deleteAccount(id)
           return res.status(200).json(deletedUser)
       }
       catch(e){
           console.log(e)
           return res.status(e[0]).json(e[1])
       }
    })

router
    .route('/profile/:id')
    .get(async(req,res) => {            //      /api/users/profile/:id      get any profile by id
        let user, userId=req.params.id
        try{
            userId = validation.checkId(userId)
            user = await users.getUserById(userId) 
        }
        catch(e){
            console.log(e)
            res.status(e[0]).json({error:e[1]})
            return
        }
        delete user.password        //we don't send the password back for obvious reasons
        res.status(200).json(user)
        return
    })

router
    .route('/profile/updateSkills')
    .patch(async(req,res) => {          //          /api/users/profile/updateSkills     (frontend form will patch to this route)
        let updatedUser, newSkill, newProficiency, userId;
        //newSkill may be an existing skill they are updating the proficiency of, or a new one
        try{
            userId = validation.checkId(req.session?.user?.userId)
            newSkill = validation.checkSkill(req.body.newSkill)
            newProficiency = validation.checkProficiency(req.body.newProficiency)
        }
        catch(e){
            console.log(e)
            res.status(400).json({error:e})
            return
        }
        try{
            updatedUser = await users.updateSkillLevel(userId,newSkill,newProficiency)
        }
        catch(e){
            console.log(e)      //404 is for user not found, 500 is for internal server error
            res.status(e[0]).json({error:e[1]})
        }
        res.status(200).json(updatedUser) 
        return
    });

router
    .route('/profile/searchUserBySkillInterest')
    .patch(async (req, res) => {
        let skillInterest, usernames;
        // Check skill first
        try {
            skillInterest = validation.checkSkill(req.body.skillInterest);
        } catch (e) {
            console.log(e);
            res.status(400).json({error: e});
            return;
        }
        // Obtain users next
        try {
            usernames = await users.searchUserBySkillInterest(skillInterest);
        } catch (e) {
            console.log(e);
            res.status(e[0]).json({error: e[1]});
        }
        res.status(200).json({usernames});
        return;
    });

router
    .route('/logout')
    .get(async(req,res) => {
        if(!req.session.user){
            console.log("No session here")
            return res.redirect('/')
        } 
        req.session.destroy();
        return res.status(200).json("You've been logged out")
    })

export default router