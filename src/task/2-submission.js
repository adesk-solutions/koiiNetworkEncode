import { namespaceWrapper } from "@_koii/namespace-wrapper";
import axios from 'axios';

export async function submission() {
    try {
        const response = await axios.get('http://localhost:5000/api/articles');
        const articles = response.data;

        // On-chain submission ka logic yahan par add kar sakte hain
//        console.log("Submitting articles:", articles);

        // Koii network ke submission function ka use karke submit karen
        // submitProof(articles) - hypothetical function
        return await namespaceWrapper.storeGet("articles");

    } catch (error) {
        console.error("Error submitting articles:", error);
    }
}

//submitData();
