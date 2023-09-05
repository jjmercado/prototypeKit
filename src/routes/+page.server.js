import { MongoClient } from 'mongodb';

const client = new MongoClient("mongodb://127.0.0.1:27017/testData");

/** @type {import('./$types').PageServerLoad} */
export async function load() {

    //  let dbData = {};
    // try {
    //     // Connect to the MongoDB cluster
    //     await client.connect();
    //     console.log("Connected...");
    //     // Make the appropriate DB calls
    //     dbData = await  client.db("testData").collection("users").findOne({firstName: "Carlo"});
        
        
    // } catch (e) {
    //     console.error(e);
    // } finally {
    //     await client.close();
    // }

    // return {
    //     firstName: dbData.firstName,
    //     lastName: dbData.lastName,
    // };
        
};