import users from "./server/data/users.js";
import connection from './server/config/mongoConnection.js'

let user1, user2, user3, user4, user5, user6, user7, user8, user9

try{
    console.log("Deleting all users")
    await users.deleteAllUsers()
}
catch(e){
    console.log(e)
}

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
    await users.updateSkillLevel(user4._id, "rowing", 9);
    await users.updateSkillLevel(user4._id, "swimming", 3);

    await users.updateSkillLevel(user5._id, "cooking", 8);
    await users.updateSkillLevel(user5._id, "fortnite", 9);
    await users.updateSkillLevel(user5._id, "programming", 10);

    await users.updateSkillLevel(user6._id, "programming", 8);
    await users.updateSkillLevel(user6._id, "knitting", 9);
    await users.updateSkillLevel(user6._id, "rowing", 10);

    await users.updateSkillLevel(user7._id, "programming", 8);
    await users.updateSkillLevel(user7._id, "knitting", 9);
    await users.updateSkillLevel(user7._id, "cooking", 10);

    await users.updateSkillLevel(user8._id, "fortnite", 8);
    await users.updateSkillLevel(user8._id, "knitting", 9);
    await users.updateSkillLevel(user8._id, "running", 10);

    await users.updateSkillLevel(user9._id, "running", 8);
    await users.updateSkillLevel(user9._id, "gaming", 9);
    await users.updateSkillLevel(user9._id, "competitive eating", 10);

} catch (e) {
    console.log(e);
}

console.log("Adding wanted skills")

try {
    await users.updateWantedSkill(user1._id, "rowing",false);
    await users.updateWantedSkill(user1._id, "basket weaving",false);
    await users.updateWantedSkill(user1._id, "competitive shoemaking",false);

    await users.updateWantedSkill(user2._id, "gaming",false);
    await users.updateWantedSkill(user2._id, "programming",false);
    await users.updateWantedSkill(user2._id, "ballin",false);

    await users.updateWantedSkill(user3._id, "walking",false);
    await users.updateWantedSkill(user3._id, "crocheting",false);
    await users.updateWantedSkill(user3._id, "fortnite",false);

    await users.updateWantedSkill(user4._id, "ballin",false);
    await users.updateWantedSkill(user4._id, "competitive shoemaking",false);
    await users.updateWantedSkill(user4._id, "basketball",false);

    await users.updateWantedSkill(user5._id, "rowing",false);
    await users.updateWantedSkill(user5._id, "crocheting",false);
    await users.updateWantedSkill(user5._id, "gaming",false);

    await users.updateWantedSkill(user6._id, "knitting",false);
    await users.updateWantedSkill(user6._id, "fortnite",false);
    await users.updateWantedSkill(user6._id, "cooking",false);

    await users.updateWantedSkill(user7._id, "crocheting",false);
    await users.updateWantedSkill(user7._id, "basket weaving",false);
    await users.updateWantedSkill(user7._id, "electronics repair",false);

    await users.updateWantedSkill(user8._id, "gaming",false);
    await users.updateWantedSkill(user8._id, "cooking",false);
    await users.updateWantedSkill(user8._id, "rowing",false);

    await users.updateWantedSkill(user9._id, "fortnite",false);
    await users.updateWantedSkill(user9._id, "programming",false);
    await users.updateWantedSkill(user9._id, "competitive shoemaking",false);

} catch (e) {
    console.log(e);
}

console.log("Done seeding database");

await connection.closeConnection()