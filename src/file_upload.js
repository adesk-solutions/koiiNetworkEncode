import fs from 'fs';
import { Keypair } from '@_koii/web3.js';
import { KoiiStorageClient } from '@_koii/storage-task-sdk';

// Initialize the Koii Storage Client
const client = new KoiiStorageClient();

// Read your staking wallet file
const walletPath = "C:/Users/adila/AppData/Roaming/KOII-Desktop-Node/wallets/AdilFirstKoii_mainSystemWallet.json"; // Replace with your wallet path
const wallet = fs.readFileSync(walletPath, "utf-8");

// Create the Keypair from the secret key
const userStaking = Keypair.fromSecretKey(Uint8Array.from(JSON.parse(wallet)));

// Specify the file path you want to upload
const filePath = "G:/xampp/htdocs/koii_network3/data.json"; // Replace with your actual file path

(async () => {
  try {
    // Upload the file
    const fileUploadResponse = await client.uploadFile(filePath, userStaking);
    const cid_returned = fileUploadResponse.cid;
    console.log("File uploaded successfully. CID:", cid_returned);
  } catch (error) {
    console.error("Error uploading file:", error.message);
    console.error("Error details:", error);
  }
})();