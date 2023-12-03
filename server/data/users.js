import {ObjectId} from 'mongodb';
import mongoCollections from '../config/mongoCollections.js';
import validation from '../validation.js';
import bcrypt from 'bcryptjs'
const saltRounds=12;

const users = mongoCollections.users;

async function createUser(displayName, username,password){
    username=validation.checkUsername(username);
    displayName=validation.checkDisplayName(displayName);
    password=validation.checkPassword(password);

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
        contactInfo: '',
        displayName:displayName,
        description: "Default description here.",
        skills: [],
        wantedSkills: []
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


async function updateWantedSkill(id, skill, remove) {
    id = validation.checkId(id);
    skill = validation.checkSkill(skill);
    if (typeof remove !== "boolean") { throw [400,"Error: Remove must be a boolean!"]; }
    const userCollection = await users();
    let updatedUser = true; // temp placeholder
    const skillRegex = new RegExp(skill,'i')    //used to match for any case
    /* Add a skill */
    if (remove === false) { 
        let updatedUser = await userCollection.findOneAndUpdate(    
            {_id:new ObjectId(id)},
            {$addToSet:{wantedSkills: skillRegex}},
        )
        if (!updatedUser) { throw [500, 'Could not add wanted skill successfully']; }
    } 
    /* Remove is set to true, so remove a skill */
    else {
        let removedWantedSkill = await userCollection.updateOne(
            {_id:new ObjectId(id)},
            {$pull: {wantedSkills: skillRegex}}
        );
        if(!removedWantedSkill.acknowledged || !removedWantedSkill.matchedCount){
            throw [500, "Unable to remove wanted skill"]
        }
    }

    return updatedUser;
}

async function updateSkillLevel(id, skill, proficiency) {       //skills are an array of objects
    // let user = await getUserById(id);
    id=validation.checkId(id);
    skill = validation.checkSkill(skill);
    proficiency = validation.checkProficiency(proficiency);
    const userCollection = await users();
    const skillRegex = new RegExp(skill,'i')        //used to match any case for skill
    if(proficiency===0){
        let removedSkill = await userCollection.updateOne(
            {_id:new ObjectId(id)},
            {$pull: {"skills":{skillName:skillRegex}}}
        )
        if(!removedSkill.acknowledged || !removedSkill.matchedCount){
            throw [500, "Unable to remove skill"]
        }
    }
    let updatedUser=true;
    if(proficiency!==0){
        let changeExistingSkill = await userCollection.updateOne(       //if the skill is already present, modify it
            {_id: new ObjectId(id)},
            {$set:{"skills.$[skill]": {skillName:skill,proficiency:proficiency}}},
            {arrayFilters:[{"skill.skillName":skillRegex}]}
        )
        let updatedUser=true
        if(changeExistingSkill.modifiedCount===0){
            updatedUser = await userCollection.findOneAndUpdate(            //used for returnDocument
                {_id:new ObjectId(id)},
                {$addToSet:{"skills":{skillName:skill,proficiency:proficiency}}},
                {returnDocument:'after'}
            )
        }
        // let updatedUser = await userCollection.findOneAndUpdate({_id: new ObjectId(id)}, {$set: user}, {returnDocument: 'after'});
        if (!updatedUser || !changeExistingSkill) { throw [500, 'Could not update user skill level successfully']; }
    }
    return updatedUser;
}

async function updateContactInfo(id,newContactInfo){
    id=validation.checkId(id)
    newContactInfo=validation.checkContactInfo(newContactInfo)
    const userCollection=await users();
    const updatedUser=await userCollection.findOneAndUpdate(
        {_id: new ObjectId(id)},
        {$set: {contactInfo:newContactInfo}},
        {returnDocument:'after'}
    )
    // console.log(newContactInfo,updatedUser)
    if(!updatedUser) throw [500, "Could not update contact information"]
    return updatedUser
}

async function searchSkills(skillArray,mustHaveAll) {
    //mustHaveAll: true if all the skills in the skills array must be found in a user
    // skillArray=validation.checkSkills(skillArray)       dont check skills here, since checkSkills modifies the result
    const userCollection = await users()
    let usersWithSkills;
    if(JSON.stringify(skillArray)=='[]'){       //no filters, so just get all the users
        usersWithSkills = await userCollection.find({}).toArray()
    }

    usersWithSkills = await userCollection.find(
        {"skills.skillName": {[mustHaveAll ? '$all' : '$in']: skillArray}}
    ).toArray()

    if(!usersWithSkills) throw [500, "Unable to search users"]
    return usersWithSkills
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
    deleteAccount,
    updateWantedSkill,
    searchSkills,
    updateContactInfo
}