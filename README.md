
# Tech News Feed

A complete setup integrating React for the frontend, an Express server with MySQL for backend data handling, and Koii Network for decentralized task handling, proof submission, and audit management.

## Project Structure

- **React** - Frontend user interface for displaying data.
- **Express Server** - Backend API to handle requests and interact with the MySQL database.
- **MySQL** - Database storing fetched data and articles.
- **Koii Network** - Task template integration for distributed audits, proofs, and rewards in a decentralized setup.

## Prerequisites

- Node.js and npm/yarn installed on your machine
- MySQL Database set up
- Koii Network Task Template (cloned from Koii Network GitHub)
- Git for version control

## Getting Started

### 1. Clone the Repository
```bash
git clone https://github.com/your-username/your-repo-name.git
cd your-repo-name
```

### 2. Install Dependencies

#### Backend (Express + MySQL + Koii Network)
```bash
yarn install
```

#### Frontend (React)
```bash
cd client
yarn install
cd ..
```

### 3. MySQL Database Setup

1. **Create Database**: Open your MySQL CLI or Workbench and create a new database.
    ```sql
    CREATE DATABASE your_database_name;
    ```

2. **Create Table**:
    ```sql
    CREATE TABLE articles (
        id INT AUTO_INCREMENT PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        link VARCHAR(255) NOT NULL,
        snippet TEXT,
        photo_url VARCHAR(255),
        thumbnail_url VARCHAR(255),
        published_datetime_utc DATETIME NOT NULL,
        source_url VARCHAR(255),
        source_name VARCHAR(255),
        source_logo_url VARCHAR(255),
        source_favicon_url VARCHAR(255),
        source_publication_id VARCHAR(255),
        related_topics JSON,
        story_id VARCHAR(255)
    );
    ```

3. **Insert Initial Data**: If you have a `data.json` file, use a script to load data or import via SQL.

### 4. Backend Configuration (`server.js`)

Create a file `server.js` in the root folder:
```javascript
import express from 'express';
import mysql from 'mysql';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root', // Replace with your MySQL username
    password: 'password', // Replace with your MySQL password
    database: 'your_database_name'
});

// API Route to fetch data
app.get('/api/articles', (req, res) => {
    const query = "SELECT * FROM articles";
    db.query(query, (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(result);
    });
});

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
- **Backend**: Express.js, MySQL
- **Database**: MySQL
- **Decentralized Network**: Koii Network (for task and proof management)
