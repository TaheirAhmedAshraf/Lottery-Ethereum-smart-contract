const path = require('path');
const fs = require('fs');
const solc = require('solc');

const lotteryPath = path.resolve(__dirname, 'contracts', 'Lottery.sol');
const source = fs.readFileSync(lotteryPath, 'utf8');

var input = {
    language: 'Solidity',
    sources: {
        'Lottery.sol': {
            content: source
        }
    },
    settings: {
        outputSelection: {
            '*': {
                '*': ['*']
            }
        }
    }
};

var output = JSON.parse(solc.compile(JSON.stringify(input)));

const interface = output.contracts['Lottery.sol']["Lottery"].abi;
const bytecode = output.contracts['Lottery.sol']["Lottery"].evm.bytecode.object;

console.log(interface)
fs.writeFileSync('Lottery.json', JSON.stringify({
    interface: interface,
    bytecode: bytecode
}));


module.exports = {
    interface: interface,
    bytecode: bytecode
};