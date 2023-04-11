import { ethers } from 'ethers'

// Types
import { type Contract } from 'ethers'
import { type HardhatRuntimeEnvironment } from 'hardhat/types'
import { type SignerWithAddress } from '@nomiclabs/hardhat-ethers/signers'
import { type TransactionReceipt, type TransactionResponse } from '@ethersproject/abstract-provider'

// Logs
import { logTxArgs, logTxError, logTxReceipt, logTxReturnValue } from '../logs'

// Tools
import { capitalize } from './format'
import { sleep } from './time'

// Constants
import { requestTimeout } from '../constants'

interface Transfer {
    value: number | string
    decimals: number
}

interface Request {
    signer?: SignerWithAddress
    transfer?: Transfer
    args?: any[]
    argsNames?: string[]
}

type ContractFunction = (...args: any[]) => Promise<any>

export const handleContractFunction = async (
    hre: HardhatRuntimeEnvironment,
    contract: Contract,
    functionName: string,
    request?: Request,
): Promise<any[]> => {
    const signer = request?.signer

    const value = request?.transfer?.value
    const decimals = request?.transfer?.decimals

    const args = request?.args ? request?.args : []
    const argsNames = request?.argsNames

    logTxArgs(functionName, args, argsNames)

    const fn: ContractFunction = signer
        ? contract.connect(signer)[functionName]
        : contract[functionName]

    if (!fn) throw new Error(`function ${functionName} not found on contract`)

    console.log(`\n- ${capitalize(functionName)} Function Execution -\n`)

    try {
        const tx: TransactionResponse = value
            ? await fn(...args, { value: ethers.utils.formatUnits(value, decimals) })
            : await fn(...args)

        if (Object.hasOwn(tx, 'wait')) {
            const txReceipt: TransactionReceipt = await tx.wait()

            console.log(`----- ${functionName.toUpperCase()} - FUNCTION EXECUTED -----`)

            await sleep(requestTimeout)
            await logTxReceipt(hre, functionName, txReceipt, contract.interface)
        } else {
            console.log(`----- ${functionName.toUpperCase()} - FUNCTION EXECUTED -----`)
        }

        const outputs = contract.interface.getFunction(functionName).outputs
        const hasReturnValue = outputs !== undefined && outputs.length > 0

        if (hasReturnValue) {
            const returnValue = await contract.functions[functionName](...args)

            await sleep(requestTimeout)
            await logTxReturnValue(functionName, returnValue)

            return returnValue
        }
    } catch (error) {
        console.log(`----- ${functionName.toUpperCase()} - FUNCTION ERROR -----`)

        await sleep(requestTimeout)
        await logTxError(functionName, error)
    }

    return []
}
