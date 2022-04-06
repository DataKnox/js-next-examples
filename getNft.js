const { Metaplex, keypairIdentity, bundlrStorage } = require("@metaplex-foundation/js-next");
const { Connection, clusterApiUrl, Keypair, PublicKey } = require("@solana/web3.js");

const connection = new Connection(clusterApiUrl("mainnet-beta"));
const wallet = Keypair.generate();

const metaplex = Metaplex.make(connection)
    .use(keypairIdentity(wallet))
    .use(bundlrStorage());

const mint = new PublicKey("8zqNJv5Wh3BJGUQHVty2UwZUJ7UiYqDgAcVjmrtrbdtM");

async function runner() {
    const nft = await metaplex.nfts().findNft({ mint });
    console.log(nft);
}

runner();