const HDWallletProvider = require('truffle-hdwallet-provider');
const Web3 = require('web3');
const {interface, bytecode} = require('./compile');
require('dotenv').config();


const provider = new HDWallletProvider(
    process.env.MNEMONIC,
    `https://rinkeby.infura.io/v3/${process.env.INFURA_API_KEY}`
);

const web3 = new Web3(provider);

const deploy = async ()=>{
    const accounts = await web3.eth.getAccounts();
    console.log('Attempting to deploy from account', accounts[0]);

    const result = await new web3.eth.Contract(interface)
        .deploy({data: bytecode})
        .send({from: accounts[0], gas: 1000000, gasPrice: '20000000000'});

    console.log("Contract deployed to", result.options.address);
};

deploy()
