import { ethers } from "ethers";
import dotenv from "dotenv";

dotenv.config();

const infuraKey = process.env.INFURA_API_KEY;

if (!infuraKey) {
  console.error("Error: INFURA_API_KEY is not defined in the .env file.");
  process.exit(1); 
}

const provider = new ethers.providers.JsonRpcProvider(
  `https://mainnet.infura.io/v3/${infuraKey}`
);

(async () => {
  try {
    const network = await provider.getNetwork();
    console.log("Successfully connected to network:", network.name);
    console.log("Network details:", network);
  } catch (error) {
    console.error("Error connecting to the network:", error.message);
    if (error.code === "NETWORK_ERROR") {
      console.log("Please check your internet connection or Infura API key.");
    } else {
      console.log("An unexpected error occurred:", error);
    }
  }
})();
