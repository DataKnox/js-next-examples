const { Metaplex, MetaplexFile, keypairIdentity, bundlrStorage } = require("@metaplex-foundation/js-next");
const { Connection, clusterApiUrl, Keypair } = require("@solana/web3.js");
const fs = require('fs')
const path = require('path')
const connection = new Connection(clusterApiUrl("devnet"));

let keypairFile = fs.readFileSync('/home/knox/jsnext/newkey.json')
const keypair = Keypair.fromSecretKey(Buffer.from(JSON.parse(keypairFile.toString())));

const metaplex = Metaplex.make(connection)
    .use(keypairIdentity(keypair))
    .use(bundlrStorage());

const artPath = '/home/knox/jsnext/art/'
async function batchCreator() {
    fs.readdir(artPath,
        function (err, files) {

            if (err) {
                return console.log(err)
            }

            files.forEach(
                async function (file) {

                    if (path.parse(file).ext == '.png') {
                        // console.log('entered')
                        // console.log(file)
                        // console.log(path.parse(file).name + '.png')
                        const { uri, metadata } = await metaplex.nfts().uploadMetadata({
                            name: "My NFT #" + path.parse(file).name,
                            image: new MetaplexFile(Buffer.from(...), artPath + file),
                            properties: {
                                files: [
                                    {
                                        type: "image/png",
                                        uri: new MetaplexFile(Buffer.from(...), artPath + file),
                                    },
                                ]
                            }
                        });

                        console.log(metadata.image) // https://arweave.net/123
                        console.log(metadata.properties.files[0].uri) // https://arweave.net/456
                        console.log(uri) // https://arweave.net/789
                    }
                    else {
                        console.log("exited")
                        console.log(file)
                    }

                });

        })
}

batchCreator();
