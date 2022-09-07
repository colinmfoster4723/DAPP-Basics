const assert = require("assert");
const ganache = require("ganache-cli");
const Web3 = require("web3");
const { interface, bytecode } = require("../compile");

// contract test code will go her

const web3 = new Web3(ganache.provider());
//connect provider to instance

let accounts;
let inbox;
const INITIAL_STRING = "Hi there!";

beforeEach(async () => {
  // Get a list of all accounts
  accounts = await web3.eth.getAccounts();

  // Use an account to deploy contract
  inbox = await new web3.eth.Contract(JSON.parse(interface))
    .deploy({
      data: bytecode,
      arguments: [INITIAL_STRING],
    })
    .send({ from: accounts[0], gas: "1000000" });
  //1) create generic contract object
  //2) .deploy() => tell web3 to deploy a new copy of the contract ( does not actually deploy)
  //3) .send() => instructs web3 to send out a transaction that creates a contract at the specified address
});

describe("Inbox", () => {
  it("deploys a contract", () => {
    //check if contract has an address
    assert.ok(inbox.options.address);
    //assert.ok() = is value defined ?
  });

  it("has a default message", async () => {
    const message = await inbox.methods.message().call();
    assert.equal(message, INITIAL_STRING);
    //reference the contract, dive into methods(all  public functions), reference method, call method
    //when referencing method() pass in arguments
    //use call to run method
  });
});
