import {ObjectId} from 'mongodb';
import mongoCollections from '../config/mongoCollections.js';

async function getSkillsToLearn(username) {
    try {
        const userCollection=await users();
        const user=await userCollection.findOne({username:username.toLowerCase()})
        return user

    } catch (err) {
        return res.json({message: err});
    }
}
