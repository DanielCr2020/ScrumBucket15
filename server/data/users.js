import {ObjectId} from 'mongodb';
import mongoCollections from '../config/mongoCollections.js';
import validation from '../../validation.js';

const users = mongoCollections.users;

async function createUser(displayName,username,password){
    username=validation.checkUsername(username);
    displayName=validation.checkDisplayName(displayName);
    password=validation.checkPassword(password);

    const userCollection = await users();
    const userExists = await userCollection.findOne({username:username.toLowerCase()})
    if(userExists) throw [400,`A user named ${username} already exists`]

    let newUser = {
        _id: new ObjectId(),
        username:username.toLowerCase(),
        password:password,
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