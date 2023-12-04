import { Connection, Keypair, LAMPORTS_PER_SOL, PublicKey, SystemProgram, Transaction, sendAndConfirmTransaction } from "@solana/web3.js";
import { airdrop } from "../airdrop";
import { getBalance } from "../show-balance";

export const transferSol = async(from: Keypair, to: PublicKey, amount: number) => {
  const conn = new Connection("http://localhost:8899", "confirmed");
  const transaction = new Transaction();

  const instruction = SystemProgram.transfer({
    fromPubkey: from.publicKey,
    toPubkey: to,
    lamports: amount*LAMPORTS_PER_SOL
  });

  transaction.add(instruction);
  await sendAndConfirmTransaction(conn, transaction, [from]);
  console.log("Done");
}

const secret = Uint8Array.from([92,173,87,29,39,191,232,155,227,215,191,83,134,55,56,13,32,106,200,209,126,110,48,55,86,171,175,134,109,96,48,87,45,107,198,5,73,97,223,210,142,107,57,126,202,17,91,170,67,133,89,138,65,246,80,190,35,114,159,211,39,153,62,206]);
const fromKeyPair = Keypair.fromSecretKey(secret);
const toPublicKey = new PublicKey("EkRYQtTLtKnoBwvJyLGAvzCawt33QWWbemKgjXx2iFpK");

(async() => {
  await airdrop(fromKeyPair.publicKey, 4);
  const initBalance = await getBalance(fromKeyPair.publicKey);
  console.log(`Initial balance of from wallet ${initBalance}`);
  const initBalanceTo = await getBalance(toPublicKey);
  console.log(`Initial balance of to wallet ${initBalanceTo}`);

  await transferSol(fromKeyPair, toPublicKey, 2);

  const initBalance2 = await getBalance(fromKeyPair.publicKey);
  console.log(`Post balance of from wallet ${initBalance2}`);
  const initBalanceTo2 = await getBalance(toPublicKey);
  console.log(`Post balance of to wallet ${initBalanceTo2}`);



})()

