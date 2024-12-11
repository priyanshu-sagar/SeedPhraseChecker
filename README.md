
# SeedPhraseChecker

**SeedPhraseChecker** is a Node.js-based tool designed to validate cryptocurrency seed phrases and check wallet balances for specific tokens on the Ethereum blockchain. This project is ideal for blockchain enthusiasts, developers, and individuals looking to automate the process of analyzing wallet balances using seed phrases.

## Features

1. **Seed Phrase Validation**  
   The tool verifies the validity of given seed phrases and ensures they conform to the BIP-39 standard.

2. **Wallet Balance Retrieval**  
   Retrieves balances for the following tokens:
   - **ETH** (Ethereum)
   - **USDT** (Tether)
   - **BUSD** (Binance USD)
   - **SHIB** (Shiba Inu)

3. **Color-Coded Console Output**  
   - **ETH** balances are displayed in **pink**.
   - **USDT** balances are displayed in **green**.
   - **BUSD** balances are displayed in **pink**.
   - **SHIB** balances are displayed in **green**.

4. **Stop on Non-Zero Balance**  
   The program halts execution when a non-zero balance is found and outputs:
   - The seed phrase
   - Wallet address
   - Balances for each token

5. **Result Logging**  
   Results are saved to a `results.csv` file in a tabular format with headers:
   - Wallet Phrase
   - Wallet Address
   - ETH Balance
   - USDT Balance
   - BUSD Balance
   - SHIB Balance

6. **Infura API Integration**  
   Uses Infura to interact with the Ethereum blockchain. The Infura API key is securely loaded from an `.env` file to protect sensitive information.

7. **Mnemonic Phrase Generation**  
   Includes a utility script to generate random mnemonic phrases and save them for further analysis.

## Project Structure

- **`checkSeedPhrases.js`**  
   Main script for validating seed phrases and retrieving wallet balances.
- **`.env`**  
   Stores the Infura API key securely. (Excluded from version control via `.gitignore`.)
- **`mnemonicGenerator.js`**  
   Generates random mnemonic phrases and saves them to `phrase.txt`.
- **`results.csv`**  
   Stores the output results of checked seed phrases.
- **`verifyInfuraKey.js`**  
   Validates the Infura API key by connecting to the Ethereum network.
- **`package.json`** and **`package-lock.json`**  
   Manage project dependencies.

## How It Works

1. Validate seed phrases for correctness.
2. Retrieve wallet addresses and balances using the Infura API.
3. Display results in the console with color-coded output.
4. Stop execution on finding a wallet with a non-zero balance.
5. Log results into a CSV file for record-keeping.

## Prerequisites

- **Node.js**: Ensure Node.js is installed on your system.
- **Infura Account**: Generate an API key from [Infura](https://infura.io/).

## Getting Started

1. Clone the repository.
   ```bash
   git clone https://github.com/your-username/SeedPhraseChecker.git
   cd SeedPhraseChecker
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Add your Infura API key to a `.env` file:
   ```plaintext
   INFURA_API_KEY=your_api_key_here
   ```
4. Run the main script:
   ```bash
   node checkSeedPhrases.js
   ```

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Disclaimer

This project is intended for educational and research purposes only. Use responsibly.
