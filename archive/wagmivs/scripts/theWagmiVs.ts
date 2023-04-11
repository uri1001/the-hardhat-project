import hre from 'hardhat'

// Project Scripts
import { deploy } from '../utils/scripts'

// Script
const theWagmiVs = async (): Promise<void> => {
    console.log(`\n\n\n------------------------------------------------------------`)
    console.log(`---------- TheWagmiVS Contract Script Initialized ----------`)
    console.log(`------------------------------------------------------------\n\n`)

    // Script Transaction Signers
    const [deployer] = await hre.ethers.getSigners()

    await deploy(hre, 'TheWagmiVS', deployer)

    console.log(`\n\n----------------------------------------------------------`)
    console.log(`---------- TheWagmiVS Contract Script Finalized ----------`)
    console.log(`----------------------------------------------------------\n\n\n`)
}

theWagmiVs().catch(error => {
    console.error(error)
    process.exitCode = 1
})
