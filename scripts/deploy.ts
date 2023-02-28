import { ethers } from 'hardhat'
import hre from 'hardhat'

import * as dotenv from 'dotenv'
dotenv.config()

// ES VOL IMPLEMENTAR QUE AL EXECUTAR L'SCRIPT ES PRINTEJI PER PANTALLA LES ACCOUNTS DISPONIBLES
// EN LA NETWORK QUE S'HA SELECCIONAT, LLAVORS L'USUARI INTRODUEIX PER PANTALLA QUINA ACCOUNT
// VOL UTILITZAR PER FER EL DEPLOY DEL CONTRACTE
// QUAN ES MOSTREN LES ACCOUNTS DISPONIBLES, S'HAURIA D'EXECUTAR LA

// Script Arguments

const contractName = 'Ballot'
const proposals = [
    'Increase Taxes by 5%',
    'Invest 1 ETH in TGP Vault',
    'Raise ERC721 Royalties to 10%',
]

// Script Functions

const sleep = (ms: number) => new Promise(r => setTimeout(r, ms))

const convertStringArrayToBytes32 = (array: string[]) => {
    const bytes32Array = []
    for (let index = 0; index < array.length; index++) {
        bytes32Array.push(ethers.utils.formatBytes32String(array[index]))
    }
    return bytes32Array
}

// Script

const main = async () => {
    if (!process.env.masterPrivateKey || process.env.masterPrivateKey.length < 1)
        throw new Error('Missing Master Private Key')

    console.log(`\n- Network Available Accounts -\n`)
    await hre.run('accounts')

    // AQUI S'HAURIA DE PARAR I DEMANAR A L'USUARI QUINA CONTA VOL UTILITZAR
    // DONADA LA CONTA, CREAR L'OBJECTE WALLET

    console.log(`\n- Contract Deploy Initialized -\n`)

    const wallet = new ethers.Wallet(process.env.masterPrivateKey)
    const signer = wallet.connect(ethers.provider)

    const address = await signer.getAddress()
    await sleep(1000)
    const balance = await signer.getBalance()
    await sleep(1000)

    console.log(`Deploy Network: ${hre.network.name}`)
    console.log(`Account Address: ${address}`)
    console.log(`Account Balance: ${balance}\n`)

    const encodedProposals = convertStringArrayToBytes32(proposals)

    console.log(`Deploy Script Contract Name Argument: ${contractName}`)
    console.log(`Deploy Script Proposals Argument: ${proposals}`)
    console.log(`Deploy Script Proposals Argument Encoded: ${encodedProposals}\n`)

    const Contract = await ethers.getContractFactory(contractName)
    const contract = await Contract.deploy(encodedProposals)

    await contract.deployed()
    const txReceipt = await contract.deployTransaction.wait()

    console.log(`Contract Deployed\n`)

    console.log(`${contractName} Contract Deployed at ${contract.address}\n`)
    console.log(`Deploy Transaction Receipt`)
    console.log(`Block Number: ${txReceipt.blockNumber}`)
    console.log(`Gas Used: ${txReceipt.gasUsed}`)
    console.log(`Cumulative Gas Used: ${txReceipt.cumulativeGasUsed}`)
    console.log(`Effective Gas Price: ${txReceipt.effectiveGasPrice}`)
    console.log(`Transaction Hash: ${txReceipt.transactionHash}`)
    console.log(`Transaction Sender: ${txReceipt.from}`)
    console.log(`Transaction Receiver: ${txReceipt.to}`)
    console.log(`Logs: ${txReceipt.logs}\n`)
    console.log(`- Contract Deploy Finalized -\n`)

    console.log(`- Contract Verification Initialized -\n`)

    await sleep(100000)
    await hre.run('verify:verify', {
        contract: `contracts/${contractName}.sol:${contractName}`,
        address: contract.address,
        constructorArguments: [encodedProposals],
    })

    console.log(`\n- Contract Verification Finalized -\n`)
}

main().catch(error => {
    console.error(error)
    process.exitCode = 1
})
