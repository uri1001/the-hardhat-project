import { ethers } from 'ethers'

// Types
import { type SignerWithAddress } from '@nomiclabs/hardhat-ethers/signers'
import { type HardhatRuntimeEnvironment } from 'hardhat/types'
import { type TransactionReceipt, type TransactionResponse } from '@ethersproject/abstract-provider'

// Logs
import { logTxArgs, logTxError, logTxReceipt } from '../logs'

// Tools
import { sleep } from './time'

// Constants
import { requestTimeout } from '../constants'

export const transfer = async (
    hre: HardhatRuntimeEnvironment,
    signer: SignerWithAddress,
    to: string,
    value: number | string,
    decimals: number,
): Promise<any[]> => {
    console.log(`\n- Transfer Execution -\n`)

    logTxArgs(
        'ETH Transfer',
        [signer.address, to, value, decimals],
        ['signer', 'recipient', 'value', 'decimals'],
    )

    try {
        const tx: TransactionResponse = await signer.sendTransaction({
            to,
            value: ethers.utils.formatUnits(value, decimals),
        })

        console.log(tx)

        const txReceipt: TransactionReceipt = await tx.wait()

        console.log(txReceipt)
        console.log(`----- TRANSFER EXECUTED -----`)

        await sleep(requestTimeout)
        await logTxReceipt(hre, 'Transfer', txReceipt)
    } catch (error) {
        console.log(`----- TRANSFER ERROR -----`)

        await sleep(requestTimeout)
        await logTxError('Transfer', error)
    }

    return []
}
