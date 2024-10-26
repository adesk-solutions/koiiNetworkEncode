import { namespaceWrapper, app } from "@_koii/namespace-wrapper";
//const data = require('../data.json');

export function routes() {
  /**
   *
   * Define all your custom routes here
   *
   */

  // Example route
  // app.get("/value", async (_req, res) => {
  //   const value = await namespaceWrapper.storeGet("value");
  //   console.log("value", value);
  //   res.status(200).json({ value: value });
  // });
  app.get("/news-feed", async (_req, res) => {
    try {
      const value = await namespaceWrapper.storeGet("articles");
      
      // Convert the string back to a JSON object
      const newsFeedData = JSON.parse(value);

      // Log the data for debugging
      //console.log("Fetched newsFeedData from store:", newsFeedData);
      
      res.status(200).json( newsFeedData);
    } catch (error) {
      console.error("ERROR FETCHING NEWS FEED DATA:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  });

  // app.get("/getdata", async (_req, res) => {
  //   try {
  //     const data = await fetch('../data.json').then(response => response.json());
  //     res.status(200).json(data); 

  //   } catch (error) {
  //     console.error("ERROR FETCHING NEWS FEED DATA:", error);
  //     res.status(500).json({ error: "Internal Server Error" });
  //   }
  // });

  app.get('/api/data', (req, res) => {
    fetch('/data.json')
      .then(response => response.json())
      .then(data => {
        res.json(data);
      });
  });
}
