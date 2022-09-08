const HDWalletProvider = require("@truffle/hdwallet-provider");
const Web3 = require("web3");
const { interface, bytecode } = require("./compile");

// deploy code will go here

const provider = new HDWalletProvider(
  "insert account mnuemonic",
  "https://rinkeby.infura.io/v3/110853e97f134cc6bfeb073472e746d5"
);
//give HDWallet seed phrase & link to Infura node from Infura.io

const web3 = new Web3(provider);

const deploy = async () => {
  const accounts = await web3.eth.getAccounts();

  console.log("Attempting to deploy from account", accounts[1]);

  const result = await new web3.eth.Contract(JSON.parse(interface))
    .deploy({ data: bytecode, arguments: ["Hi there!"] })
    .send({ gas: "1000000", from: accounts[1] });

  console.log("Contract deployed to", result.options.address);

  provider.engine.stop();
  //prevent hanging deployment
};
deploy();
