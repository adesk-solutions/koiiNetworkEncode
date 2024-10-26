import { namespaceWrapper } from "@_koii/namespace-wrapper";
import mysql from 'mysql';

// Setup MySQL connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root', // Apna MySQL username
    password: '', // Apna MySQL password
    database: 'koii_network'
});

export async function audit(submission, roundNumber, submitterKey) {
  try {
    // Fetch data from the first table (e.g., submitted data table)
    const fetchSubmittedData = () => {
      return new Promise((resolve, reject) => {
        db.query("SELECT id FROM articles", (err, result) => {
          if (err) return reject(err);
          resolve(result.map(item => item.id)); // Extracts only IDs
        });
      });
    };

    // Fetch data from the second table (e.g., original data table)
    const fetchOriginalData = () => {
      return new Promise((resolve, reject) => {
        db.query("SELECT id FROM articles_verify", (err, result) => {
          if (err) return reject(err);
          resolve(result.map(item => item.id)); // Extracts only IDs
        });
      });
    };

    // Get IDs from both tables
    const [submittedIDs, originalIDs] = await Promise.all([fetchSubmittedData(), fetchOriginalData()]);

    // Compare IDs - check if all IDs in submitted data match with original data
    const isDataValid = submittedIDs.every(id => originalIDs.includes(id));

    if (isDataValid) {
      console.log("Audit Successful: Data matches.");
      return true; // Audit passed
    } else {
      console.log("Audit Failed: Submitted data does not match.");
      return false; // Audit failed
    }
  } catch (error) {
    console.error("AUDIT ERROR:", error);
    return false;
  }
}
