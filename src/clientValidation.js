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

function checkSkillname(skillname){
    if(!skillname) throw "No skill name provided"
    if(typeof skillname!=='string') throw "Skill name must be a string"
    skillname=xss(skillname.trim())
    if(skillname.length<3 || skillname.length>30) throw "Skill name must be at least 3 characters long and no more than 30"
    if (!/[A-Za-z]+/.test(skillname)) { throw 'Skill must have at least one alphabetic character' }

    return skillname
}

function checkSkilllevel(skilllevel){
    if(!skilllevel) throw "No skill level provided"
    if(typeof skilllevel!=='string') throw "Skill level must be a string"
    skilllevel=xss(skilllevel.trim())
    skilllevel=Number.parseInt(skilllevel)
    if(skilllevel<0 || skilllevel>10) throw "Skill level must be a number ranging from 0-10"
    
    return skilllevel
}

function checkEmail(email) {
    if(!email) throw "No email provided"
    if (typeof email !== 'string') throw "email must be a string"
    email = xss(email.trim())
    if (email.length < 3) throw "email must be at least 3 characters long"

    return email
}

function checkDesc(description) {
    if(!description) throw "No description provided"
    if (typeof description !== 'string') throw "description must be a string"
    description = xss(description.trim())
    if (description.length > 50) throw "description must be less than 50 characters long"

    return description
}

export default {
    checkUsername,
    checkPassword,
    checkDisplayName,
    checkSkillname,
    checkSkilllevel,
    checkEmail,
    checkDesc
};