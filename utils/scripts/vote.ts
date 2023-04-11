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
export const vote = async (
    hre: HardhatRuntimeEnvironment,
    contract: Contract,
    signer: SignerWithAddress,
    proposal: number,
    amount: number,
): Promise<void> => {
    console.log(`\n------------------------------------`)
    console.log(`----- Vote Process Initialized -----`)
    console.log(`------------------------------------\n`)

    let contractName: string = 'null'

    if (Object.hasOwn(contract, 'name')) {
        contractName = await contract.name()
        await sleep(requestTimeout)
    }

    await logAccountsInfo([contract.address, signer.address], [contractName, 'signer'], hre)

    const states = await logProcessParameters(
        contract,
        signer,
        'vote',
        [proposal, amount],
        ['proposal', 'amount'],
    )

    await handleContractFunction(hre, contract, 'vote', {
        signer: signer,
        args: [proposal, amount],
        argsNames: ['proposal', 'amount'],
    })

    await logProcessReceipt(contract, signer, 'vote', [proposal, amount], states)

    console.log(`\n-----------------------------------`)
    console.log(`----- Vote Process Finalized -----`)
    console.log(`-----------------------------------\n`)

    await sleep(processTimeout)
}
