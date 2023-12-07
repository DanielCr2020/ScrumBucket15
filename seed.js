import users from "./server/data/users.js";
import connection from './server/config/mongoConnection.js'

let user1, user2, user3, user4, user5, user6, user7, user8, user9, user10, user11;

try {
    console.log("Creating users")
    user1 = await users.createUser("Luke Muhnicky", "lukemoonicky", "password");
    user2 = await users.createUser("Mickey Mouse", "mickey_mouse", "password");
    user3 = await users.createUser("Muke Luhnicky", "mukeluhnicky", "password");
    user4 = await users.createUser("Minnie Mouse", "minnie_mouse_123", "password");
    user5 = await users.createUser("donald duck", "donaldduck", "password");
    user6 = await users.createUser("Pretty Goofy :D", "GoofMaster123", "password");
    user7 = await users.createUser("David Boyd", "davidboyd123", "password");
    user8 = await users.createUser("Yoozer", "weezer", "password");
    user9 = await users.createUser("Craniel Daig", "cdaig", "password");

} catch (e) {
    console.log(e);
}

console.log("Adding skills");

try {
    await users.updateSkillLevel(user1._id, "running", 7);
    await users.updateSkillLevel(user1._id, "gaming", 10);
    await users.updateSkillLevel(user1._id, "competitive eating", 4);

    await users.updateSkillLevel(user2._id, "running", 7);
    await users.updateSkillLevel(user2._id, "tomfoolery", 10);
    await users.updateSkillLevel(user2._id, "competitive eating", 1);

    await users.updateSkillLevel(user3._id, "running", 4);
    await users.updateSkillLevel(user3._id, "knitting", 2);
    await users.updateSkillLevel(user3._id, "gaming", 4);

    await users.updateSkillLevel(user4._id, "knitting", 8);
    await users.updateSkillLevel(user4._id, "knitting", 9);
    await users.updateSkillLevel(user4._id, "swimming", 3);

    await users.updateSkillLevel(user5._id, "cooking", 8);
    await users.updateSkillLevel(user5._id, "fortnite", 9);
    await users.updateSkillLevel(user5._id, "programming", 10);

} catch (e) {
    console.log(e);
}

console.log("Done seeding database");

await connection.closeConnection()