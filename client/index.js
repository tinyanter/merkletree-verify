const axios = require('axios');
const niceList = require('../utils/niceList.json');
const MerkleTree = require('../utils/MerkleTree');

const serverUrl = 'http://localhost:1225';

async function main () {
  // TODO: how do we prove to the server we're on the nice list? 
  const mt = new MerkleTree(niceList || []);
  // const root = mt.getRoot();
  const index = Math.floor(Math.random() * (niceList.length - 1));
  const proof = mt.getProof(index);

  const { data: gift } = await axios.post(`${serverUrl}/gift`, {
    // TODO: add request body parameters here!
    name: niceList[index],
    proof
  });

  console.log({ gift });
}

main();