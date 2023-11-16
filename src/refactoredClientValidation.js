// import { ObjectId } from "mongodb"
import xss from "xss"

function checkUsername(username){
    if(!username) throw "No username provided"
    if(typeof username!=='string') throw "Username must be a string"
    username=xss(username.trim())
    if(username.length<3) throw "Username must be at least 3 characters long"

    return username
}

function checkPassword(password){
    if(!password) throw "No password provided"
    if(typeof password!=='string') throw "Password must be a string"
    password=xss(password.trim())
    if(password.length<3) throw "Password must be at least 3 characters long"

    return password
}

function checkDisplayName(displayName){
    if(!displayName) throw "No displayName provided"
    if(typeof displayName!=='string') throw "displayName must be a string"
    displayName=xss(displayName.trim())
    if(displayName.length<3) throw "displayName must be at least 3 characters long"

    return displayName
}

function checkProficiency(proficiency) {
    if (!proficiency) { throw 'No proficiency provided.'; }
    /*
        Code Smell 1 - Too much redundant code for checking parameter type
    */

    if (typeof proficiency !== 'string') { throw 'Proficiency is not a string.'; }


    proficiency = xss(proficiency.trim());

    let profArray = ['No Experience', 'Beginner', 'Amateur', 'Intermediate', 'Expert', 'Master']

    if (!profArray.includes(proficiency)) { throw 'Proficiency must be a valid dropdown option'; }

    return proficiency;
}

export default {
    checkUsername,
    checkPassword,
    checkDisplayName,
    checkProficiency
}