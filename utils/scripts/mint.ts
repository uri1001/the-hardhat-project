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
export const mint = async (
    hre: HardhatRuntimeEnvironment,
    contract: Contract,
    signer: SignerWithAddress,
    to: string,
    amount: number,
): Promise<void> => {
    console.log(`\n------------------------------------`)
    console.log(`----- Mint Process Initialized -----`)
    console.log(`------------------------------------\n`)

    let contractName: string = 'null'

    if (Object.hasOwn(contract, 'name')) {
        contractName = await contract.name()
        await sleep(requestTimeout)
    }

    await logAccountsInfo(
        [contract.address, signer.address, to],
        [contractName, 'signer', 'to'],
        hre,
    )

    const states = await logProcessParameters(
        contract,
        signer,
        'mint',
        [to, amount],
        ['to', 'amount'],
    )

    await handleContractFunction(hre, contract, 'mint', {
        signer: signer,
        args: [to, amount],
        argsNames: ['to', 'amount'],
    })

    await logProcessReceipt(contract, signer, 'mint', [to, amount], states)

    console.log(`\n-----------------------------------`)
    console.log(`----- Mint Process Finalized -----`)
    console.log(`-----------------------------------\n`)

    await sleep(processTimeout)
}
