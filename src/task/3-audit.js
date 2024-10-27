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
    //console.log("Stored Articles from MongoDB:", storedArticles);

    // Extract IDs from the nested `data` array in each article
    const ids = storedArticles.flatMap(article => 
      article.data.map(item => item.id) // Assuming each item in `data` has an `id`
    );

    return ids; // Return a flat array of IDs
  } catch (error) {
    console.error("Error fetching articles from MongoDB:", error);
    return []; // Return an empty array on error
  } finally {
    await client.close(); // Ensure the client is closed after use
  }
};

export async function audit(submission, roundNumber, submitterKey) {
  try {
    // Fetch stored articles from Koii namespace
    const storedArticlesRaw = await namespaceWrapper.storeGet("articles");
    
    if (!storedArticlesRaw) {
      console.error("No stored articles found in Koii namespace.");
      return false;
    }

    const storedArticles = JSON.parse(storedArticlesRaw);

    // Extract IDs from Koii namespace
    const storedIDs = storedArticles.map(item => {
      if (item && item.id) return item.id; // Check if `id` exists in item
      if (item && item.data && item.data.length) return item.data.map(d => d.id); // Check if `data` field has nested ids
      return undefined; // Handle undefined cases gracefully
    }).flat(); // Flatten to get a single list of IDs

    console.log("Parsed Stored IDs from Koii namespace:", storedIDs);

    // Fetch IDs from MongoDB
    const mongoDBIDs = await fetchStoredIDsFromMongoDB();
    //console.log("Stored IDs from MongoDB:", mongoDBIDs);

    // Check if storedIDs and mongoDBIDs match
    const areIDsMatching = storedIDs.length === mongoDBIDs.length &&
      storedIDs.every(id => mongoDBIDs.includes(id));

    if (areIDsMatching) {
      console.log("Audit Successful: All IDs match between Koii namespace and MongoDB.");
      return true;
    } else {
      console.log("Audit Failed: Some IDs do not match between Koii namespace and MongoDB.");
      return false;
    }
  } catch (error) {
    console.error("AUDIT ERROR:", error);
    return false;
  }
}

