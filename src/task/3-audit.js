import { namespaceWrapper } from "@_koii/namespace-wrapper";
import axios from 'axios';

// Helper function to fetch IDs from API endpoint
const fetchIDsFromAPI = async () => {
  try {
    const response = await axios.get('http://localhost:5000/api/articles');
    return response.data.map(item => item.id); // Extracts only IDs
  } catch (error) {
    console.error("Error fetching data from API:", error);
    return [];
  }
};

export async function audit(submission, roundNumber, submitterKey) {
  try {
    // Fetch IDs from API
    const apiIDs = await fetchIDsFromAPI();

    // Extract IDs from submission data
    const submittedIDs = submission.map(item => item.id);

    // Compare IDs - check if all IDs in submitted data match with API data
    const isDataValid = submittedIDs.every(id => apiIDs.includes(id));

    if (isDataValid) {
      console.log("Audit Successful: Submission data matches API data.");
      return true; // Audit passed
    } else {
      console.log("Audit Failed: Submission data does not match API data.");
      return false; // Audit failed
    }
  } catch (error) {
    console.error("AUDIT ERROR:", error);
    return false;
  }
}
