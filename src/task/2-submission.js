import { namespaceWrapper } from "@_koii/namespace-wrapper";
import axios from 'axios';
import fs from 'fs';

export async function submission() {
    try {
        //const response = await axios.get('http://localhost:5000/api/articles');
        //const articles = response.data;

        // On-chain submission ka logic yahan par add kar sakte hain
//        console.log("Submitting articles:", articles);

        // Koii network ke submission function ka use karke submit karen
        // submitProof(articles) - hypothetical function
        // var articles; 
        // fs.readFile('data.json', 'utf8', (err, data) => {
        //     if (err) {
        //       console.error(err);
        //     } else {
        //       articles = data;
        //       console.log(data);
        //     }
        //   });
          
        const response  = await namespaceWrapper.storeGet("articles");
        const articles = JSON.parse(response);
        console.dir(articles, { depth: null, colors: true });
        await response;

    } catch (error) {
        console.error("Error submitting articles:", error);
    }
}

//submitData();
