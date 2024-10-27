import { MongoClient } from 'mongodb';
import { namespaceWrapper } from "@_koii/namespace-wrapper";

// MongoDB connection URI and options
const uri = 'mongodb+srv://dbUser:Pass1234@cluster0.zgfyy.mongodb.net/?retryWrites=true&w=majority';
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

// Function to fetch stored IDs from MongoDB
const fetchStoredIDsFromMongoDB = async () => {
  try {
    await client.connect(); // Connect to MongoDB
    const database = client.db('koii_network'); // Database name
    const collection = database.collection('articles'); // Collection name

    const storedArticles = await collection.find({}).toArray(); // Fetch all articles
    console.log("Stored Articles from MongoDB:", storedArticles);

    // Extract IDs from stored articles
    return storedArticles.map(item => item.id); // Assuming each document has an `id` field
  } catch (error) {
    console.error("Error fetching articles from MongoDB:", error);
    return []; // Return an empty array on error
  } finally {
    await client.close(); // Ensure the client is closed after use
  }
};

export async function audit(submission, roundNumber, submitterKey) {
  try {
    // Get stored articles from Koii namespace
    const storedArticles = await namespaceWrapper.storeGet("articles");
    const storedIDs = JSON.parse(storedArticles).map(item => item.id);
    console.log("Stored IDs from Koii namespace:", storedIDs);

    // Fetch IDs from MongoDB
    const mongoDBIDs = await fetchStoredIDsFromMongoDB();
    console.log("Stored IDs from MongoDB:", mongoDBIDs);

    // Compare IDs - check if all IDs in stored data match with the submission
    const submissionIDs = submission.map(item => item.id); // Assuming submission has an `id` field

    const isDataValid = submissionIDs.every(id => storedIDs.includes(id)) && submissionIDs.every(id => mongoDBIDs.includes(id));

    if (isDataValid) {
      console.log("Audit Successful: All IDs match between submission, Koii, and MongoDB.");
      return true; // Audit passed
    } else {
      console.log("Audit Failed: Some IDs do not match between submission, Koii, and MongoDB.");
      return false; // Audit failed
    }
  } catch (error) {
    console.error("AUDIT ERROR:", error);
    return false; // Return false on error
  }
}
