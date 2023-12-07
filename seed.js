
// import { dbConnection } from './server/config/mongoConnection'
import users from "./server/data/users.js";
// import bcrypt from 'bcryptjs'
// const saltRounds = 12;

// const db = await dbConnection();
// await db.dropDatabase();

// const hashedPassword1 = await bcrypt.hash("abcdef", saltRounds);
// const hashedPassword2 = await bcrypt.hash("fedcba", saltRounds);
// const hashedPassword3 = await bcrypt.hash("password", saltRounds);
// const hashedPassword4 = await bcrypt.hash("wordpass", saltRounds);
// const hashedPassword5 = await bcrypt.hash("ohyeahkachow", saltRounds);
// const hashedPassword6 = await bcrypt.hash("password6", saltRounds);
// const hashedPassword7 = await bcrypt.hash("password7", saltRounds);
// const hashedPassword8 = await bcrypt.hash("password8", saltRounds);
// const hashedPassword9 = await bcrypt.hash("password9", saltRounds);
// const hashedPassword10 = await bcrypt.hash("password10", saltRounds);

// console.log("Made it to here!");

let user1, user2, user3, user4, user5, user6;

try {
    user1 = await users.createUser("Luke Muhnicky", "lukemoonicky", "password");
    console.log("User 1 created");
} catch (e) {
    console.log("User 1 already created");
}

try {
    user2 = await users.createUser("Muke Luhnicky", "mukeluhnicky", "password");
    console.log("User 2 created");
} catch (e) {
    console.log("User 2 already created");
}

try {
    user3 = await users.createUser("Mickey Mouse", "mickey_mouse  ", "password");
    console.log("User 3 created");
} catch (e) {
    console.log("User 3 already created");
}

try {
    user4 = await users.createUser("Minnie Mouse", " minnie_mouse_123", "password");
    console.log("User 4 created");
} catch (e) {
    console.log("User 4 already created");
}

try {
    user5 = await users.createUser(" donald duck ", "donaldduck", "password");
    console.log("User 5 created");
} catch (e) {
    console.log("User 5 already created");
}

try {
    user6 = await users.createUser(" Pretty Goofy :D", "GoofMaster123", "password");
    console.log("User 6 created");
} catch (e) {
    console.log("User 6 already created");
}

console.log("\n\n---ADDING SKILLS---\n\n");


try {
    let skill1 = await users.updateSkillLevel(user1._id, "running", 7);
    let skill2 = await users.updateSkillLevel(user1._id, "gaming", 10);
    let skill3 = await users.updateSkillLevel(user1._id, "competitive eating", 4);
} catch (e) {
    console.log(e);
}

try {
    let skill4 = await users.updateSkillLevel(user2._id, "running", 7);
    let skill5 = await users.updateSkillLevel(user2._id, "tomfoolery", 10);
    let skill6 = await users.updateSkillLevel(user2._id, "competitive eating", 1);
} catch (e) {
    console.log(e);
}

try {
    let skill7 = await users.updateSkillLevel(user3._id, "running", 4);
    let skill8 = await users.updateSkillLevel(user3._id, "knitting", 2);
    let skill9 = await users.updateSkillLevel(user3._id, "gaming", 4);
} catch (e) {
    console.log(e);
}

try {
    let skill10 = await users.updateSkillLevel(user4._id, "knitting", 8);
    let skill11 = await users.updateSkillLevel(user4._id, "knitting", 9);
    let skill12  = await users.updateSkillLevel(user4._id, "swimming", 3);
} catch (e) {
    console.log(e);
}

console.log("\n\n\n---PRINTING OUT USERS---\n\n\n");

try {
    const userList = await users.getAllUsers();
    console.log(userList);
} catch (e) {
    console.log(e);
}

console.log("\n\n\n---SEARCHING FOR SKILLS---\n\n\n");

try {
    const knittingUsers = await users.searchSkills(["knitting"], false);
    console.log(knittingUsers);
} catch (e) {
    console.log(e);
}

try {
    const multipleSkills = await users.searchSkills(["knitting", "running"], true);
    console.log(knittingUsers)
} catch (e) {
    console.log(e);
}

try {
    const eitherOr = await users.searchSkills(["knitting", "running"], false)
    console.log(eitherOr);
} catch (e) {
    console.log(e);
}

console.log("\n\n-----SEED PROCESS COMPLETE-----\n\n");


// await closeConnection();