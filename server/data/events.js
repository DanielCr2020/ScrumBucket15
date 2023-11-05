import {Binary, ObjectId} from 'mongodb';
import mongoCollections from '../config/mongoCollections.js';
import validation from '../validation.js';

const events = mongoCollections.events;

async function createEvent(displayName_teacher, eventName, eventDate, startTime, endTime, skill, displayName_student, description, picture, maxAttendees){
    displayName_teacher = validation.checkDisplayName(displayName_teacher)
    displayName_student = validation.checkDisplayName(displayName_student)

    eventName = validation.checkEventName(eventName)
    eventDate = validation.checkEventDate(eventDate)
    startTime = validation.checkStartTime(startTime)
    endTime = validation.checkEndTime(endTime)
    description = validation.checkDescription(description);

    picture = await validation.checkPicture(picture); /* async method */
    if (picture === null) { throw "Error processing picture"; }
    // picture = new Binary(picture); /* Convert to BSON format! */

    let newEvent = {
        _id: new ObjectId(),
        displayName_teacher: displayName_teacher,
        skill: skill,
        eventName: eventName,
        eventDate: eventDate,
        startTime: startTime,
        endTime: endTime,
        displayName_student: displayName_student,
        maxAttendees: maxAttendees,
        attendees: [],      //an array of objectIds of attendees
        description: description,
        picture: picture
    }

    const eventCollection = await events()
    const insertEvent = await eventCollection.insertOne(newEvent)
    if(!insertEvent.acknowledged || !insertEvent.insertedId)
        throw [500,"Could not insert event into collection"]

    return newEvent
}

async function getEventById(id) {
    id = validation.checkId(id);

    const eventCollection = await events();
    let event = await eventCollection.findOne({_id: new ObjectId(id)});

    if (event == null) { throw [404, "Event not found in database!"]; }

    return event;
}

async function reviseDescription(id, newDescription) {
    let event = getEventById(id);
    newDescription = validation.checkDescription(newDescription);

    const eventCollection = await events();
    event.description = newDescription;
    let updatedEvent = await eventCollection.findOneAndUpdate({_id: new ObjectId(id)}, {$set: event}, {returnDocument: 'after'});
    if (updatedEvent.lastErrorObject?.n === 0) { { throw [500, 'Could not update event description successfully']; } }

    return updatedEvent;
}


async function filterEventBySkill(skillArray){
    skillArray = validation.checkSkillArray(skillArray);
    const eventCollection = await events();
    let filteredEvents = await eventCollection.find({skill:{$in:skillArray}})
    if(!filteredEvents){throw 404, `No events found for ${skillArray}`}
    return filteredEvents;
}

async function getAllEvents(){
    const eventCollection=await events();
    let allEvents = await eventCollection.find({}).toArray()
    if(!allEvents) throw [500, 'Unable to get all events']
    return allEvents
}

export default {
    createEvent,
    getAllEvents,
    getEventById,
    reviseDescription,
    filterEventBySkill,
}