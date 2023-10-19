import { ObjectId } from "mongodb"
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

function checkSkill(skill){
    if(!skill){throw 'No skill provided'}
    if(typeof skill !== 'string'){throw 'skill must be a string'}
    skill = xss(skill.trim());
    if(skill.length < 5){throw 'skill must be at least 5 characters long'}
}
function checkSkillArray(skillArray){
    if(!skillArray){throw 'No skillArray provided'}
    if(!Array.isArray(skillArray)){throw 'skillArray must be an array'}
    skillArray.forEach((skill)=>{
        checkSkill(skill);
    })
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
    if(!eventName){throw 'No eventName provided'}
    if(typeof eventName !== 'string'){throw 'eventName must be a string'}
    eventName = xss(eventName.trim());
    if(eventName.length < 5){throw 'eventName must be at least 5 characters'}

    return eventName;
}

function checkEventDate(eventDate) {
    if(!eventDate){throw 'No eventDate provided'}
    const currDate = new Date();
    const inputDate = new Date(eventDate);
    if(inputDate <= currDate){throw 'eventDate must take place in the future'}
}

function checkStartEndTime(startTime, endTime) {
    if(!startTime){throw 'No startTime provided'}
    if(!endTime){throw 'No endTime provided'}
    const timeCheck = /^(0?[1-9]|1[0-2]):[0-5][0-9](AM|PM)$/
    if(!timeCheck.test(startTime)){throw 'startTime must be in a valid 12-hour AM/PM format'}
    if(!timeCheck.test(endTime)){throw 'endTime must be in a valid 12-hour AM/PM format'}

    const startTimeCheck = new Date('01/01/2000 ${startTime}');
    const endTimeCheck = new Date('01/01/2000 ${endTime}');
    if(startTimeCheck >= endTimeCheck){throw 'startTime cannot be later than the endtime'}
    if(((endTimeCheck-startTimeCheck)/60000) < 10){throw 'endTime must be at least 10 minutes past startTime'}
}




export default {
    checkUsername,
    checkPassword,
    checkSkill,
    checkSkillArray,
    checkDisplayName,
    checkId,
    checkEventName,
    checkEventDate,
    checkStartEndTime
}