import { createSolanaRpc, address } from '@solana/web3.js';

async function main() {
    const rpc = createSolanaRpc('https://api.devnet.solana.com');

    const addressString = (process.env.SOLANA_ADDRESS ?? 'So11111111111111111111111111111111111111112').trim();

    let myAddress;
    try {
        myAddress = address(addressString);
    } catch (error) {
        console.error(
            `Invalid SOLANA_ADDRESS: ${addressString}. It must be a base58 Solana address that decodes to 32 bytes.`,
        );
        throw error;
    }

    try {
        const { value: balance } = await rpc.getBalance(myAddress).send();
        
        // The balance is returned as a bigint in Lamports
        // 1 SOL = 1,000,000,000 Lamports
        console.log(`Address: ${addressString}`);
        console.log(`Balance: ${Number(balance) / 1_000_000_000} SOL`);
    } catch (error) {
        console.error('Error fetching balance:', error);
    }
}

main();