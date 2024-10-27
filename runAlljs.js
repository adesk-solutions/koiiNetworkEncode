import { task } from './src/task/1-task.js';
import { submission } from './src/task/2-submission.js';
import { audit } from './src/task/3-audit.js';

async function runAll() {
  try {
    console.log("Running 1-task.js...");
    await task();

    console.log("Running 2-submission.js...");
    const submissionData = await submission();

    console.log("Running 3-audit.js...");
    const roundNumber = 1; // Example round number
    const submitterKey = 'example-key'; // Example submitter key
    const auditResult = await audit(submissionData, roundNumber, submitterKey);

    console.log("Audit Result:", auditResult ? "Passed" : "Failed");
  } catch (error) {
    console.error("Error running tasks:", error);
  }
}

runAll();
