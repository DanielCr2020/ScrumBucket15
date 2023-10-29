import {ObjectId} from 'mongodb';
import mongoCollections from '../config/mongoCollections.js';
import validation from '../validation.js';
import bcrypt from 'bcryptjs'
const saltRounds=12;

const users = mongoCollections.users;

async function createUser(displayName,username,password){
    username=validation.checkUsername(username);
    displayName=validation.checkDisplayName(displayName);
    password=validation.checkPassword(password);

    const userCollection = await users();
    let userExists = await userCollection.findOne({username:username.toLowerCase()})        //username
    if(userExists) throw [400,`A user named ${username} already exists`]
    userExists = await userCollection.findOne({displayName:displayName.toLowerCase()})        //display name
    if(userExists) throw [400,`A user with display name ${displayName} already exists`]

    const hashed_pw = await bcrypt.hash(password,saltRounds)
    let newUser = {
        _id: new ObjectId(),
        username:username.toLowerCase(),
        password:hashed_pw,
        displayName:displayName,
        description: "Default description here.",
        isMentor : true /* For now, we will leave this to be true */
    }

    const insertUser = await userCollection.insertOne(newUser)
    if(!insertUser || !insertUser.insertedId) throw [500,"Could not insert user into collection"]

    return newUser    
}

async function checkUser(username,password){
    username=validation.checkUsername(username)
    password=validation.checkPassword(password)
    const userCollection=await users();
    const user=await userCollection.findOne({username:username.toLowerCase()})
    if(!user) throw "Either the username or password is invalid"
    let user_hashed_password=user.password
    let comparison=await bcrypt.compare(password,user_hashed_password)
    if(comparison) return {authenticatedUser: true, userId:user._id}
    throw "Either the username or password is invalid"      //password invalid
}

async function getUserById(id) {
    id = validation.checkId(id);

    const userCollection = await users();
    let user = await userCollection.findOne({_id: new ObjectId(id)});

    if (user == null) { throw "User not found in database!"; }

    return user;
}


export default {
    createUser,
    checkUser,
    getUserById
}