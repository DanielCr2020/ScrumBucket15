import { ObjectId } from "mongodb"
import FileType from 'file-type';
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

function checkId(id){
    if(!id) throw "No ObjectId given"
    if(!ObjectId.isValid(id)) throw `${id} is not a valid ObjectId`
    return id
}




function checkEventName(eventName) {

}

function checkEventDate(eventDate) {

}

function checkStartTime(startTime) {

}

function checkEndTime(endTime) {

}

function checkDescription(description) {
    if(!description) throw "No description provided"
    if(typeof description !== 'string')  throw "Description must be a string"
    description = xss(description.trim())
    if(description.length < 20 || description.length > 2000) throw "The description length must be between 20 and 2000 characters long."

    return displayName
}

async function checkPicture(picture) {
    if (!picture) throw "No picture provided"
    try {
        const fileType = await FileType.fromBuffer(picture);

        if (fileType) { return picture; }
        else { throw "Invalid file type" }

    } catch (error) {
        throw 'Error detecting file type:';
    }
}


export default {
    checkUsername,
    checkPassword,
    checkDisplayName,
    checkId,
    checkEventName,
    checkEventDate,
    checkStartTime,
    checkEndTime,
    checkDescription,
    checkPicture
}