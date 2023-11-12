import {ObjectId} from 'mongodb';
import mongoCollections from '../config/mongoCollections.js';
import validation from '../validation.js';
import bcrypt from 'bcryptjs'
const saltRounds=12;

const users = mongoCollections.users;

async function createUser(displayName,emailAddress, username,password){
    username=validation.checkUsername(username);
    displayName=validation.checkDisplayName(displayName);
    password=validation.checkPassword(password);
    emailAddress = validation.checkEmail(emailAddress);

    const userCollection = await users();
    let userExists = await userCollection.findOne({username:username.toLowerCase()})        //username
    if(userExists) throw [400,`A user named ${username} already exists`]
    const displayNameRegex = new RegExp(displayName,'i')
    userExists = await userCollection.findOne({displayName:displayNameRegex})        //display name
    if(userExists) throw [400,`A user with display name ${displayName} already exists`]

    const hashed_pw = await bcrypt.hash(password,saltRounds)
    let newUser = {
        _id: new ObjectId(),
        username:username.toLowerCase(),
        password:hashed_pw,
        emailAddress: emailAddress,
        displayName:displayName,
        description: "Default description here.",
        isMentor : false, //placeholder
        skills: {},
        hostedEvents: [],       //Contains an array of ObjectIDs of events they have hosted
        attendedEvents: []      //Contains an array of ObjectIDs of events they have been to
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

    if (user == null) { throw [404, "User not found in database!"]; }

    return user;
}

async function updateSkillLevel(id, skill, proficiency) {
    let user = await getUserById(id);

    skill = validation.checkSkill(skill);
    proficiency = validation.checkProficiency(proficiency);

    const userCollection = await users();
    user.skills[skill] = proficiency;

    let updatedUser = await userCollection.findOneAndUpdate({_id: new ObjectId(id)}, {$set: user}, {returnDocument: 'after'});

    if (updatedUser.lastErrorObject?.n === 0) { throw [500,'Could not update user skill level successfully']; }

    return updatedUser;
}

async function deleteAccount(id){       //probably only used for unit testing
    id=validation.checkId(id)
    const userCollection = await users();
    let deletedUser = await userCollection.deleteOne({_id: new ObjectId(id)})
    if(!deletedUser || deletedUser?.deletedCount<1){
        throw [500, "Could not delete that user"]
    }
    return deletedUser
}

export default {
    createUser,
    checkUser,
    getUserById,
    updateSkillLevel,
    deleteAccount
}