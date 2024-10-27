
# Tech News Feed

A complete setup integrating React for the frontend, an Express server with Mongodb for backend data handling, and Koii Network for decentralized task handling, proof submission, and audit management.

## Project Structure

- **React** - Frontend user interface for displaying data.
- **Express Server** - Backend API to handle requests and interact with the Mongodb database.
- **Mongodb** - Database storing fetched data and articles.
- **Koii Network** - Task template integration for distributed audits, proofs, and rewards in a decentralized setup.

## Prerequisites

- Node.js and npm/yarn installed on your machine
- Mongodb Database set up
- Koii Network Task Template (cloned from Koii Network GitHub)
- Git for version control

## Getting Started

### 1. Clone the Repository
```bash
git clone https://github.com/adesk-solutions/koiiNetworkEncode
cd koiiNetworkEncode
```

### 2. Install Dependencies

#### Backend (Express + Mongodb + Koii Network)
```bash
yarn install
```

#### Frontend (React)
```bash
cd client
yarn install
cd ..
```

### 3. Mongodb Database Setup

1. **Create Database**: Go to https://www.mongodb.com/ create free database    

2. **Create Colelction**:
    ```bash
    yarn add mongodb
    ```

3. **Insert Initial Data**: Use https://rapidapi.com/letscrape-6bRBa3QguO5/api/real-time-news-data to fetch data and save in Mongodb.

### 4. Backend Configuration (`server.js`)

Create a file `server.js` in the root folder:
```javascript
import express from 'express';
import cors from 'cors';
import { MongoClient } from 'mongodb';

// MongoDB connection URI and options
const uri = 'mongodb+srv://dbUser:<db_password>@cluster0.zgfyy.mongodb.net/?retryWrites=true&w=majority';
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

```

### 5. Run the Backend Server

```bash
node server.js
```

### 6. React Frontend

In `client/src/App.js`:
```javascript
import React, { useEffect, useState } from 'react';

function App() {
    const [articles, setArticles] = useState([]);

    useEffect(() => {
        fetch("http://localhost:5000/api/articles")
            .then((response) => response.json())
            .then((data) => setArticles(data))
            .catch((error) => console.error("Error fetching articles:", error));
    }, []);

    return (
        <div className="App">
            <h1>News Articles</h1>
            <ul>
                {articles.map((article) => (
                    <li key={article.id}>
                        <h2>{article.title}</h2>
                        <p>{article.snippet}</p>
                        <img src={article.thumbnail_url} alt="thumbnail" />
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default App;
```

### Run React Frontend

```bash
cd client
yarn start
```

### 7. Koii Network Task Template Integration

1. Clone or download the Koii Network Task Template and navigate into it.
2. Install dependencies:
    ```bash
    yarn install
    ```
3. Task Files:
   - **1-task.js**: Fetch data from the Express server and save to Koii network storage.
   - **2-submission.js**: Submit data proof to Koii.
   - **3-audit.js**: Audit by comparing records between tables.

## Usage

- **Backend Server**: http://localhost:5000
- **React Frontend**: http://localhost:3000

### Scripts

- **`yarn start`** - Run React app (frontend)
- **`node server.js`** - Run Express server (backend)
- **Koii Network Tasks**:
  - `node src/task/1-task.js` - Run task
  - `node src/task/2-submission.js` - Run submission
  - `node src/task/3-audit.js` - Run audit

## Technologies Used

- **Frontend**: React, Axios
- **Backend**: Express.js, Mongodb
- **Database**: Mongodb
- **Decentralized Network**: Koii Network (for task and proof management)
