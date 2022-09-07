const path = require("path");
const fs = require("fs");
const solc = require("solc");
// compile code will go here

const inboxPath = path.resolve(__dirname, "contracts", "Inbox.sol");
//__dirname = cwd
//find the file in the cwd

const source = fs.readFileSync(inboxPath, "utf8");
//read the file

module.exports = solc.compile(source, 1).contracts[":Inbox"];

//solc.compile always returns an object containing ABI & bytecode
