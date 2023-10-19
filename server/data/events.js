import {Binary, ObjectId} from 'mongodb';
import mongoCollections from '../config/mongoCollections.js';
import validation from '../validation.js';

const events = mongoCollections.events;

async function createEvent(displayName_teacher, eventName, eventDate, startTime, endTime, displayName_student, description, picture){
    displayName_teacher = validation.checkDisplayName(displayName_teacher)
    displayName_student = validation.checkDisplayName(displayName_student)

    eventName = validation.checkEventName(eventName)
    eventDate = validation.checkEventDate(eventDate)
    startTime = validation.checkStartTime(startTime)
    endTime = validation.checkEndTime(endTime)
    description = validation.checkDescription(description);
    description = description.trim();

    picture = await validation.checkPicture(picture); /* async method */
    if (picture === null) { throw "Error processing picture"; }
    picture = new Binary(picture); /* Convert to BSON format! */

    let newEvent = {
        _id: new ObjectId(),
        displayName_teacher: displayName_teacher,
        skill: skill,
        eventName: eventName,
        eventDate: eventDate,
        startTime: startTime,
        endTime: endTime,
        displayName_student: displayName_student,
        description: description,
        picture: picture
    }



    const eventCollection = await events()
    const insertEvent = await eventCollection.insertOne(newEvent)
    if(!insertEvent.acknowledged || !insertInfo.insertedId)
        throw [500,"Could not insert user into collection"]

    return newEvent
}

async function filterEventBySkill(skillArray){
    skill = validation.checkSkillArray(skillArray);
    const eventCollection = await events();
    let filteredEvents = await eventCollection.find({skill:{$in:skillArray}})
    if(!filteredEvents){throw 404, `No events found for ${skillArray}`}
    return filteredEvents;
}

export default {
    createEvent,
    filterEventBySkill
}