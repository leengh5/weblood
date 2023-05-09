const contact = require('../models/contact');

// Connection URI
const uri = 'mongodb://localhost:5000';

// Database name
const dbName = 'weblood';

// Create new MongoClient instance
const client = new MongoClient(uri);

// Function to insert data into contact collection
async function insertContact(name, email, phone, message) {
  try {
    // Connect to MongoDB
    await client.connect();
    console.log('Connected successfully to server');

    // Use database
    const db = client.db(dbName);

    // Get the contacts collection
    const collection = db.collection('contact');

    // Insert a single document
    const result = await collection.insertOne({
      name: name,
      email: email,
      phone: phone,
      message: message,
    });

    console.log(`${result.insertedCount} documents were inserted into the collection`);
  } catch (err) {
    console.log(err.stack);
  } finally {
    // Close connection
    await client.close();
    console.log('Connection closed');
  }
}