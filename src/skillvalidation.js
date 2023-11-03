// import { ObjectId } from "mongodb"
import xss from "xss"

function checkSkillname(skillname){
    if(!skillname) throw "No skill name provided"
    if(typeof skillname!=='string') throw "Skill name must be a string"
    skillname=xss(skillname.trim())
    if(skillname.length<3) throw "Skill name must be at least 3 characters long"

    return skillname
}

function checkSkilllevel(skilllevel){
    if(!skilllevel) throw "No skill level provided"
    if(typeof skilllevel!=='string') throw "Skill level must be a string"
    skilllevel=xss(skilllevel.trim())

    return skilllevel
}

export default {
    checkSkillname,
    checkSkilllevel
}