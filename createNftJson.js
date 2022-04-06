const { Metaplex, keypairIdentity, bundlrStorage } = require("@metaplex-foundation/js-next");
const { Connection, clusterApiUrl, Keypair } = require("@solana/web3.js");
const fs = require('fs')
const connection = new Connection(clusterApiUrl("devnet"));

let keypairFile = fs.readFileSync('/home/knox/jsnext/newkey.json')
const keypair = Keypair.fromSecretKey(Buffer.from(JSON.parse(keypairFile.toString())));

const metaplex = Metaplex.make(connection)
    .use(keypairIdentity(keypair))
    .use(bundlrStorage());


async function creator() {
    const { nft } = await metaplex.nfts().createNft({
        uri: "https://knoxnftswap.s3.us-east-2.amazonaws.com/enigma/2Bit.json",
    });
    console.log(nft)
}

creator();
