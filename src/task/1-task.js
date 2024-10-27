import { namespaceWrapper } from "@_koii/namespace-wrapper";
import { MongoClient } from 'mongodb';

const uri = 'mongodb+srv://dbUser:Pass1234@cluster0.zgfyy.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';
const client = new MongoClient(uri);

export async function task() {
  try {
      await client.connect(); // Connect to MongoDB

      const database = client.db('koii_network'); // Specify your database name
      const collection = database.collection('articles'); // Specify your collection name

      const articles = await collection.find({}).toArray(); // Fetch all articles

      // Improved logging for fetched articles
      console.log("Fetched Articles:", JSON.stringify(articles, null, 2));

      // Alternatively, log each article
      articles.forEach(article => {
          console.log("Article ID:", article._id);
          console.log("Data:", article.data); // Log the whole data array
      });

      // Process and save data for further steps
      await namespaceWrapper.storeSet("articles", JSON.stringify(articles));

  } catch (error) {
      console.error("Error fetching articles:", error);
  } finally {
      await client.close(); // Ensure the client will close when you finish/error
  }
}
