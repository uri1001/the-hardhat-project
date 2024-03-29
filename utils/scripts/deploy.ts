// Types
import { type Contract, type ContractFactory } from 'ethers'
import { type HardhatRuntimeEnvironment } from 'hardhat/types'
import { type SignerWithAddress } from '@nomiclabs/hardhat-ethers/signers'
import { type TransactionReceipt } from '@ethersproject/abstract-provider'

// Tools
import { sleep } from '../tools/time'

// Logs
import { logAccountsInfo } from '../logs/info'
import { logProcessParameters, logProcessReceipt } from '../logs/process'
import { logTxError, logTxReceipt } from '../logs/tx'

// Constants
import { processTimeout, requestTimeout, verifyTimeout } from '../constants'

// Script
export const deploy = async (
    hre: HardhatRuntimeEnvironment,
    contractName: string,
    signer: SignerWithAddress,
    args?: any[],
    argsNames?: string[],
): Promise<Contract> => {
    console.log(`\n-----------------------------------------------`)
    console.log(`----- Contract Deploy Process Initialized -----`)
    console.log(`-----------------------------------------------\n`)

    if (args === undefined) args = []
    if (argsNames === undefined) argsNames = []

    await logAccountsInfo([signer.address], ['signer'], hre)

    console.log(`\n--- Contract Deploy Initialized ---\n`)

    await logProcessParameters(
        undefined,
        signer,
        'deploy',
        [contractName, ...args],
        ['name', ...argsNames],
    )

    const contractFactory: ContractFactory = await hre.ethers.getContractFactory(contractName)
    const contract: Contract = await contractFactory.connect(signer).deploy(...args)

    try {
        await contract.deployed()

        const txReceipt: TransactionReceipt = await contract.deployTransaction.wait()

        console.log(`\n----- DEPLOY - FUNCTION EXECUTED -----\n`)

        await sleep(requestTimeout)
        await logTxReceipt(hre, 'deploy', txReceipt, contract.interface)
    } catch (error) {
        console.log(`\n----- DEPLOY - FUNCTION ERROR -----\n`)

        await logTxError('deploy', error)
    }

    await logProcessReceipt(undefined, signer, 'deploy', [contract.address], [])

    console.log(`\n--- Contract Deploy Finalized ---\n`)

    if (hre.network.name !== 'hardhat') {
        console.log(`\n--- Contract Verification Initialized ---\n`)

        try {
            await sleep(verifyTimeout)
            await hre.run('verify:verify', {
                contract: `contracts/${contractName}.sol:${contractName}`,
                address: contract.address,
                constructorArguments: args,
            })
        } catch (error) {
            await logTxError('Verify', error)
        }

        console.log(`\n--- Contract Verification Finalized ---\n`)
    }

    console.log(`\n---------------------------------------------`)
    console.log(`----- Contract Deploy Process Finalized -----`)
    console.log(`---------------------------------------------\n`)

    await sleep(processTimeout)

    return contract
}
