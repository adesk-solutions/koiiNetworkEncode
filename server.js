import express from 'express';
import cors from 'cors';
import { MongoClient } from 'mongodb';

// MongoDB connection URI and options
const uri = 'mongodb+srv://dbUser:Pass1234@cluster0.zgfyy.mongodb.net/?retryWrites=true&w=majority';
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

const app = express();
app.use(cors());
app.use(express.json());

// Function to fetch articles from MongoDB
const fetchArticlesFromMongoDB = async () => {
    try {
        await client.connect(); // Connect to MongoDB
        const database = client.db('koii_network'); // Database name
        const collection = database.collection('articles'); // Collection name
        const articles = await collection.find({}).toArray(); // Fetch all articles
        return articles; // Return the articles
    } catch (error) {
        console.error("Error fetching articles from MongoDB:", error);
        throw error; // Rethrow the error to handle it in the route
    } finally {
        await client.close(); // Ensure the client is closed after use
    }
};

// GET endpoint to fetch articles
app.get('/api/articles', async (req, res) => {
    try {
        const articles = await fetchArticlesFromMongoDB();
        res.json(articles); // Send the articles as a JSON response
    } catch (err) {
        res.status(500).send("Error fetching articles from the database.");
    }
});

// Start the server
app.listen(5000, () => {
    console.log("Server running on port 5000");
});
