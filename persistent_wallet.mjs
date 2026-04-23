import {
    createSolanaRpc,
    devnet,
    createKeyPairSignerFromBytes,
    createKeyPairSignerFromPrivateKeyBytes
} from "@solana/web3.js";
import { randomBytes } from "node:crypto";
import { readFile, writeFile } from "node:fs/promises";

const WalletFilePath = "./wallet.json";
const rpc = createSolanaRpc(devnet("https://api.devnet.solana.com"));

async function loadOrCreateWallet() {
    try {
       const data = JSON.parse(await readFile(WalletFilePath, "utf-8"));
       const storedBytes = Uint8Array.from(data.secretKey);
       const wallet =
           storedBytes.length === 32
               ? await createKeyPairSignerFromPrivateKeyBytes(storedBytes)
               : await createKeyPairSignerFromBytes(
                     Uint8Array.from([...storedBytes.slice(32), ...storedBytes.slice(0, 32)]),
                 );
       console.log("Loaded existing wallet" , wallet.address);
       return wallet;
    }catch(error){
        const secretKeyBytes = randomBytes(32);
        const wallet = await createKeyPairSignerFromPrivateKeyBytes(secretKeyBytes);
        await writeFile(WalletFilePath, JSON.stringify({ secretKey: Array.from(secretKeyBytes) }), "utf-8");
        console.log("Created new wallet" , wallet.address);
        return wallet;
    }
}
const wallet = await loadOrCreateWallet();
const {value : balance} = await rpc.getBalance(wallet.address).send();
const balanceInSol = Number(balance) / 1_000_000_000;
console.log(`Address: ${wallet.address}`);
console.log(`Balance: ${balanceInSol} SOL`);
if(balanceInSol === 0){
    console.log(
    `\nThis wallet has no SOL. Visit https://faucet.solana.com/ and airdrop some to:`
  );
    console.log(wallet.address);
}