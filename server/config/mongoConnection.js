import {MongoClient} from 'mongodb';
// import dotenv from 'dotenv';
// dotenv.config({path:'.env'});
// const uri = process.env.DB_URL

const settings = {
  "mongoConfig": {
    "serverUrl": "mongodb://localhost:27017/",
    "database": "CS555"
  }
}

let _connection = undefined;
let _db = undefined;

export default {
  dbConnection: async () => {
    if (!_connection) {
      _connection = await MongoClient.connect(settings.mongoConfig.serverUrl);
      _db = await _connection.db(settings.mongoConfig.database);
    }

    return _db;
  },
  closeConnection: () => {
    _connection.close();
  },
};