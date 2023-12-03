import { ObjectId } from "mongodb"
import {fileTypeFromFile} from 'file-type';
import xss from "xss"

function checkUsername(username){
    if(!username) throw [400, "No username provided"]
    if(typeof username!=='string') throw [400, "Username must be a string"]
    username=xss(username.trim()).replace(/(\s+)/g," ")
    if(username.length<3) throw [400, "Username must be at least 3 characters long"]

    return username
}

function checkPassword(password){
    if(!password) throw [400, "No password provided"]
    if(typeof password!=='string') throw [400, "Password must be a string"]
    password=xss(password.trim()).replace(/(\s+)/g," ")
    if(password.length<3) throw [400, "Password must be at least 3 characters long"]

    return password
}

function checkDisplayName(displayName){
    if(!displayName) throw [400, "No displayName provided"]
    if(typeof displayName!=='string') throw [400, "displayName must be a string"]
    displayName=xss(displayName.trim())
    if(displayName.length<3) throw [400, "displayName must be at least 3 characters long"]

    return displayName
}

// function checkEmail(emailAddress){
//     if(!emailAddress) throw [400,'No emailAddress provided']
//     if(typeof emailAddress !== 'string') throw [400,'emailAddress must be a string']
//     emailAddress=xss(emailAddress.trim())
//     const emailCheck = /[\w-_.]+[\w]+\@[\w+-]+\.[\w]+[\w]+/g
//     let emailmatch = emailAddress.match(emailCheck)
//     if (emailmatch == null)
//         throw [400,"invalid email"]
//     // console.log(emailAddress)
//     return emailAddress;
// }


/* We incorporated checkSkill such that it is a JS object
and not a string for efficiency purposes! */

// function checkSkill(skill){
//     if(!skill){throw 'No skill provided'}
//     if(typeof skill !== 'string'){throw 'skill must be a string'}
//     skill = xss(skill.trim());
//     if(skill.length < 5){throw 'skill must be at least 5 characters long'}
// }
// function checkSkillArray(skillArray){
//     if(!skillArray){throw 'No skillArray provided'}
//     if(!Array.isArray(skillArray)){throw 'skillArray must be an array'}
//     skillArray.forEach((skill)=>{
//         checkSkill(skill);
//     })
// }


function checkId(id){
    if(!id) throw [400,"No ObjectId given"]
    if(!ObjectId.isValid(id)) throw [400, `${id} is not a valid ObjectId`]
    return id
}

function checkEventName(eventName) {

    if (!eventName) throw "No eventName given"
    if (typeof eventName != 'string') throw "eventName must be a string"
    
    eventName = xss(eventName.trim())
    if(eventName.length < 3) throw "eventName must be at least 3 characters"

    return eventName
}

function checkEventDate(eventDate) {
    //eventDate must be in format mm/dd/YYYY
    if (!eventDate) throw "No eventDate given"
    if (typeof eventDate != 'string') throw "eventDate must be a string"
    
    eventDate = xss(eventDate.trim())
    let isValidDate = Date.parse(eventDate)

    if (isNaN(isValidDate))
        throw "invalid eventDate"

    return eventDate
}

function checkStartTime(startTime) {
    //start time must be in format 0:00AM
    if (!startTime) throw "No startTime given"
    if (typeof startTime != 'string') throw "startTime must be a string"

    startTime = xss(startTime.trim())
    let timepattern = /[0|1]?[0-9]\:[0-5][0-9][A|P][M]/g
    let match_time = startTime.match(timepattern)
    if (match_time == null)
    throw "invalid start time"
    else
    {
        if (parseInt(startTime[0]) == 1 && startTime[1] != ":")
            if (!("012".includes(startTime[1])))
                throw "Invalid start time"
    }

    return startTime
}

function checkEndTime(endTime) {
    if (!endTime) throw "No endTime given"
    if (typeof endTime != 'string') throw "endTIme must be a string"

    endTime = xss(endTime.trim())
    let timepattern = /[0|1]?[0-9]\:[0-5][0-9][A|P][M]/g
    let match_time = endTime.match(timepattern)
    if (match_time == null)
    throw "invalid end time"
    else
    {
        if (parseInt(endTime[0]) == 1 && endTime[1] != ":")
            if (!("012".includes(endTime[1])))
                throw "Invalid end time"
    }

    return endTime
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

function checkDescription(description) {
    if(!description) throw [400,"No description provided"]
    if(typeof description !== 'string')  throw [400,"Description must be a string"]
    description = xss(description.trim())
    if(description.length < 20 || description.length > 2000) throw [400,"The description length must be between 20 and 2000 characters long."]

    return description;
}

async function checkPicture(picture) {
    if (!picture) throw "No picture provided"
    return picture;
    try {
        const fileType = await fileTypeFromFile.fromBuffer(picture);

        if (fileType) { return picture; }
        else { throw "Invalid file type" }

    } catch (error) {
        throw 'Error detecting file type:';
    }
}

function checkSkill(skill) {
    if (!skill) { throw [400,'No skill provided.']; }
    if (typeof skill !== 'string') { throw [400,'Skill is not a string']; }

    skill = xss(skill.trim()).replace(/(\s+)/g," ")     //removes multiple successive spaces

    if (skill.length < 3 || skill.length > 30) { throw [400,'Skill must be between 3 and 30 characters inclusive.'] }

    if (!/[A-Za-z]+/.test(skill)) { throw [400,'Skill must have at least one alphabetic character'] }

    return skill;
}

function checkProficiency(proficiency) {
    if (proficiency!==0 && !proficiency) { throw [400,'No proficiency provided']; }
    // if (typeof proficiency !== 'string') { throw 'Proficiency is not a string'; }

    // proficiency = xss(proficiency.trim());
    proficiency = Number.parseInt(proficiency)
    
    if(proficiency<0 || proficiency>10) throw [400,"Proficiency must be a number between 0 and 10"]
    return proficiency;
}

function checkSkills(skills){
    //skills will be a string with each skill separated by a comma. Returns an array of skills to search
    if(!skills || skills==='') return []
    if(typeof skills!=='string') throw [400,"Search skills must be a string"]
    skills=xss(skills.trim())
        //Filter out spicy characters
        .replace(/\s\s+|\\/g,"")      //multiple successive spaces and backslashes -> space
        .replace(/,\s+/g,",")         //comma + space -> comma
        .replace(/(,+)/g,",")      //multiple successive commas or space+comma -> comma
    skills=skills.split(',')
    skills=skills.map((skill) => new RegExp(skill,'i'))     //puts each skill in a regex that ignores case.
    console.log(skills)
    return skills
}

function checkContactInfo(info){
    if(!info) return ""
    info=xss(info.trim())
    return info
}


export default {
    checkUsername,
    checkPassword,
    // checkSkill,
    // checkSkillArray,
    checkDisplayName,
    checkId,
    checkEventName,
    checkEventDate,
    checkStartEndTime,
    checkDescription,
    checkPicture,
    checkStartTime,
    checkEndTime,
    checkSkill,
    checkProficiency,
    // checkEmail,
    checkSkills,
    checkContactInfo
}