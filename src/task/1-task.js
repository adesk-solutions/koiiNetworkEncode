import { namespaceWrapper } from "@_koii/namespace-wrapper";
import axios from 'axios';

export async function task() {
    try {
        const response = await axios.get('http://localhost:5000/api/articles');
        const articles = response.data;

        // Koii task-specific logic
//        console.log("Fetched Articles:", articles);

        // Process and save data for further steps
        await namespaceWrapper.storeSet("articles", JSON.stringify(articles));

    } catch (error) {
        console.error("Error fetching articles:", error);
    }
}

//fetchData();
