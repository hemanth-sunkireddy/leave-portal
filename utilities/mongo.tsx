const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = process.env.MONGO_URI;
// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

let response = "ERROR";
async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // const connection = await client.db("authentication").command({ ping: 1 });
    const connection = await client.db("authentication");
    // console.log(connection);
    const collection = connection.collection('users');
    // console.log(collection);
    const newUser = {
      username: 'vasu',
      email: 'vasu@example.com',
      age: 30,
      created_at: new Date()
    };
    response = "SUCCESS";
    // Insert a single document
    const result = await collection.insertOne(newUser);
    console.log(result);
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  }
  catch (error) {
    console.log(error.message); 
    response = error.message.toString();
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
export default run;
export { response };