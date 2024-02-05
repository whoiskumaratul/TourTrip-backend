const { MongoClient } = require('mongodb');
const uri = 'mongodb://127.0.0.1:27017/';
const client = new MongoClient(uri);
const dbName = 'train';


async function dbConnect()
{
    //handle promises
    let result = await client.connect();
    console.log(result)
    db = result.db(dbName);
    return db.collection("traindata")
}

async function dbConnect2() {
    let result2 = await client.connect();
    console.log(result2)
    db2 = result2.db(dbName);
    return db2.collection("pnr")
    

}

async function dbConnect3() {
    let result3 = await client.connect();
    console.log("Connected to DB server", result3);
    db3 = result3.db(dbName);
    return db3.collection("runningstatus")
}



// async function dbConnect2() {
//     let result2 = await client.connect();
//     console.log(result2)
//     db2 = result2.db(dbName);
//     //return db2.collection("pnr")
//     let collection = db2.collection('pnr')
//     let response = await collection.find({}).toArray();
//    console.log(response);

// }
// dbConnect2();

//module.exports = dbConnect2;

module.exports = {
    dbConnect,
    dbConnect2,
    dbConnect3
};