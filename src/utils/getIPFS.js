import IPFS from 'ipfs-api'

let getIPFS = new Promise(function(resolve, reject) {
  // Wait for loading completion to avoid race conditions with web3 injection timing.
  window.addEventListener('load', function() {
    var results
    results = {
       ipfs: new IPFS()
    }
    console.log('IPFS Initialized.');

    resolve(results)
  })
})

export default getIPFS
