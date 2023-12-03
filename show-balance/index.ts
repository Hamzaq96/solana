import { Connection, LAMPORTS_PER_SOL, PublicKey } from "@solana/web3.js";

export const getBalance = async(publicKey: PublicKey) => {
  const conn = new Connection("http://localhost:8899", "confirmed");
  const res = await conn.getAccountInfo(publicKey);
  return res.lamports/LAMPORTS_PER_SOL;
}

(async() => {
  const publicKey = "EkRYQtTLtKnoBwvJyLGAvzCawt33QWWbemKgjXx2iFpK";
  const balance = await getBalance(new PublicKey(publicKey));
  console.log(`The balance is ${balance}`);
})()
