const Linnia = require('linnia')

const ipfsapi = require('ipfs-api')
const Web3 = require('web3')

const httpProvider = process.env.LINNIA_ETH_PROVIDER
const ipfsProvider = process.env.LINNIA_IPFS_HOST
const ipfsPort = process.env.LINNIA_IPFS_PORT
const protocol = process.env.LINNIA_IPFS_PROTOCOL

const provider = new Web3.providers.HttpProvider(httpProvider)
const web3 = new Web3(provider)
const ipfs = ipfsapi(ipfsProvider, ipfsPort, { protocol })

const deployLinnia = async () => {
  const linnia = await Linnia.deploy(web3, ipfs, {
    from: web3.eth.accounts[0],
    gas: 5000000,
  })
  const { hub } = await linnia.getContractInstances()
  console.log("Linnia instance deployed. Hub address is")
  console.log(hub.address)
}

deployLinnia()