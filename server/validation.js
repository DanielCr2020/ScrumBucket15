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
    isValidDate = Date.parse(eventDate)

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


export default {
    checkUsername,
    checkPassword,
    checkDisplayName,
    checkId,
    checkEventName,
    checkEventDate,
    checkStartTime,
    checkEndTime
}