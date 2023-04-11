// Types
import { type Contract } from 'ethers'
import { type HardhatRuntimeEnvironment } from 'hardhat/types'
import { type SignerWithAddress } from '@nomiclabs/hardhat-ethers/signers'

// Tools
import { handleContractFunction } from '../tools/contract'
import { sleep } from '../tools/time'

// Logs
import { logAccountsInfo } from '../logs/info'
import { logProcessParameters, logProcessReceipt } from '../logs/process'

// Constants
import { processTimeout, requestTimeout } from '../constants'

// Script
export const burn = async (
    hre: HardhatRuntimeEnvironment,
    contract: Contract,
    signer: SignerWithAddress,
    account: string,
    amount: number,
): Promise<void> => {
    console.log(`\n------------------------------------`)
    console.log(`----- Burn Process Initialized -----`)
    console.log(`------------------------------------\n`)

    let contractName: string = 'null'

    if (Object.hasOwn(contract, 'name')) {
        contractName = await contract.name()
        await sleep(requestTimeout)
    }

    await logAccountsInfo(
        [contract.address, signer.address, account],
        [contractName, 'signer', 'account'],
        hre,
    )

    const states = await logProcessParameters(
        contract,
        signer,
        'burn',
        [account, amount],
        ['to', 'amount'],
    )

    await handleContractFunction(hre, contract, 'burn', {
        signer: signer,
        args: [account, amount],
        argsNames: ['account', 'amount'],
    })

    await logProcessReceipt(contract, signer, 'burn', [account, amount], states)

    console.log(`\n-----------------------------------`)
    console.log(`----- Burn Process Finalized -----`)
    console.log(`-----------------------------------\n`)

    await sleep(processTimeout)
}
