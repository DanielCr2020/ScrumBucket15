import {ObjectId} from 'mongodb';
import mongoCollections from '../config/mongoCollections.js';
import validation from '../validation.js';
import bcrypt from 'bcryptjs'
const saltRounds=14;

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
        stuff:[]     //array of ObjectIDs
    }

    const insertUser = await userCollection.insertOne(newUser)
    if(!insertUser || !insertUser.insertedId) throw [500,"Could not insert user into collection"]

    return newUser    
}

export default {
    createUser
}