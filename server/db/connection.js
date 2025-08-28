import { MongoClient, ServerApiVersion } from "mongodb"
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.resolve(__dirname, '../config.env') });

const URI = process.env.ATLAS_URI

const client = new MongoClient(URI, {
    serverApi:{
        version:ServerApiVersion.v1,
        strict:true,
        deprecationErrors:true
    },
    tls: true,
    tlsAllowInvalidCertificates:true
});

let db;

async function initMongo(){
    try{
        await client.connect();
        await client.db("mernAdmin").command({ ping:1 });
        console.log("Connected to mongoDB and pinged successfully");
        db = client.db("students");
    } catch(err){
        console.error("Mongodb connection failed:",err);
    }
}

await initMongo();
export default db;