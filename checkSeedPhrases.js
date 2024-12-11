import { ethers } from 'ethers';
import readlineSync from 'readline-sync';
import dotenv from 'dotenv';
import fs from 'fs';
import chalk from 'chalk';
import { createObjectCsvWriter } from 'csv-writer';
import figlet from 'figlet'; 

dotenv.config();

const INFURA_API_KEY = process.env.INFURA_API_KEY;
const provider = new ethers.providers.JsonRpcProvider(`https://mainnet.infura.io/v3/${INFURA_API_KEY}`);


const tokens = [
  { name: 'ETH', address: null },
  { name: 'USDT', address: '0xdac17f958d2ee523a2206206994597c13d831ec7' },
  { name: 'BUSD', address: '0x4fabb145d64652a948d72533023f6e7a623c7c53' },
  { name: 'SHIB', address: '0x95aD61b0a150d79219dCF64E1E6Cc01f0B64C4cE' }
];

const csvWriter = createObjectCsvWriter({
  path: 'result.csv',
  header: [
    { id: 'phrase', title: 'Wallet Phrase' },
    { id: 'address', title: 'Wallet Address' },
    { id: 'ethBalance', title: 'ETH Balance' },
    { id: 'usdtBalance', title: 'USDT Balance' },
    { id: 'busdBalance', title: 'BUSD Balance' },
    { id: 'shibBalance', title: 'SHIB Balance' },
    { id: 'watermark', title: 'Watermark' } 
  ]
});

const watermark = "Priyanshu.Sagar@PykerX"; 


figlet.text(watermark, { font: 'Mini' }, (err, data) => {
  if (err) {
    console.log('Error generating ASCII art:', err);
    return;
  }

  console.log(chalk.green(data));
});

async function run() {
  const filePath = readlineSync.question('Please enter the path to the .txt file containing your seed phrases: ');
  const phrases = fs.readFileSync(filePath, 'utf-8').split('\n').map(phrase => phrase.trim());
  console.log(chalk.yellow(`Found ${phrases.length} seed phrases in the provided file.`));

  const results = [];

  async function checkSeedPhrase(phrase, index) {
    try {
      const wallet = ethers.Wallet.fromMnemonic(phrase);
      const address = wallet.address;

      const [ethBalance, tokenBalances] = await Promise.all([ 
        provider.getBalance(address),
        Promise.all(tokens.map(async (token) => {
          if (token.address) {
            const tokenContract = new ethers.Contract(token.address, ['function balanceOf(address) view returns (uint256)'], provider);
            const balance = await tokenContract.balanceOf(address);
            return ethers.utils.formatUnits(balance, 18); 
          }
          return null; 
        }))
      ]);

      const ethBalanceInEther = ethers.utils.formatEther(ethBalance);

      console.log(chalk.hex('#FFA500')(`Processing phrase ${index + 1}: ${phrase}`));
      console.log(chalk.blue(`Wallet Address: ${address}`));
      console.log(chalk.hex('#FF69B4')(`ETH Balance: ${ethBalanceInEther}`)); 

      tokens.forEach((token, idx) => {
        if (token.name === 'ETH') return;

        const balance = tokenBalances[idx - 1]; 
        const colorFn = token.name === 'USDT' || token.name === 'SHIB' ? chalk.green : chalk.hex('#FF69B4'); 
        console.log(colorFn(`${token.name} Balance: ${balance || '0'}`));
      });

      results.push({
        phrase,
        address,
        ethBalance: ethBalanceInEther,
        usdtBalance: tokenBalances[0] || '0',
        busdBalance: tokenBalances[1] || '0',
        shibBalance: tokenBalances[2] || '0',
        watermark 
      });

      if (parseFloat(ethBalanceInEther) > 0 || tokenBalances.some(balance => parseFloat(balance) > 0)) {
        console.log(chalk.green(`Non-zero balance detected for phrase ${index + 1}.`));
      } else {
        console.log(chalk.hex('#D3D3D3')('No balance found for this wallet.'));
      }
    } catch (error) {
      console.error(chalk.red(`Error with phrase ${index + 1}: ${phrase}`));
      console.error(chalk.red(error.message));
    }
  }

  for (let i = 0; i < phrases.length; i++) {
    console.time(`Phrase ${i + 1} processing time`);
    await checkSeedPhrase(phrases[i], i);
    console.timeEnd(`Phrase ${i + 1} processing time`);
  }

  
  const finalResults = [
    { watermark }, 
    ...results,
    { watermark }  
  ];

  try {
    await csvWriter.writeRecords(finalResults);
    console.log(chalk.hex('#87CEEB')('Saving data to result.csv...'));
  } catch (error) {
    console.error(chalk.red('Error saving results to CSV file:', error));
  }
}

run();
