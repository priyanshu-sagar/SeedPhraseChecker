import { ethers } from 'ethers';
import readlineSync from 'readline-sync';
import fs from 'fs';


function generateMnemonics() {
  
  const count = readlineSync.questionInt('How many mnemonics would you like to generate? ');

  
  if (count <= 0) {
    console.log('Please enter a valid number greater than 0.');
    return;
  }

  const mnemonics = [];

  
  for (let i = 0; i < count; i++) {
    const wallet = ethers.Wallet.createRandom();
    mnemonics.push(wallet.mnemonic.phrase);
  }

 
  console.log(`Generated ${count} mnemonic phrases:`);
  mnemonics.forEach((mnemonic, index) => {
    console.log(`${index + 1}: ${mnemonic}`);
  });

  
  fs.writeFileSync('phrase.txt', mnemonics.join('\n'), 'utf8');
  console.log('Mnemonics saved to phrase.txt');
}


generateMnemonics();
