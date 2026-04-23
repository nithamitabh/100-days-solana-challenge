/*
import {
  generateKeyPairSigner,
  createSolanaRpc,
  devnet,
  address
} from "@solana/web3.js";

const rpc = createSolanaRpc(devnet("https://api.devnet.solana.com"));

// comment this if you only want to check balance
// const wallet = await generateKeyPairSigner();

const targetAddress = address("5msEc6iZUVrpodebRCz5w8YPYkbUo1ace9W6ZG2xEeq4");

const { value: balance } = await rpc.getBalance(targetAddress).send();

const balanceInSol = Number(balance) / 1_000_000_000;

console.log(`Balance: ${balanceInSol} SOL`);
*/
import { generateKeyPairSigner, createSolanaRpc, devnet, } from "@solana/web3.js";

const rpc = createSolanaRpc(devnet("https://api.devnet.solana.com"));
const wallet = await generateKeyPairSigner();

console.log("Wallet address:", wallet.address);
console.log("\n— Go to https://faucet.solana.com/ and airdrop SOL to this address —");
console.log("— Then run this script again with the same address to check the balance —\n");

// To check a specific address you’ve already funded, replace the line below:
// const { value: balance } = await rpc.getBalance(address(“YOUR_ADDRESS_HERE”)).send();
const { value: balance } = await rpc.getBalance(wallet.address).send();
const balanceInSol = Number(balance) / 1_000_000_000;

console.log(`Balance: ${balanceInSol} SOL`);