// Types
import { type Interface } from '@ethersproject/abi'
import { type HardhatRuntimeEnvironment } from 'hardhat/types'
import { type TransactionReceipt } from '@ethersproject/abstract-provider'

// EVM Networks
import { type Network } from 'evm-networks'
import { getNetwork } from 'evm-networks/utils'

// Tools
import { capitalize, sleep } from '../../tools'

// Constants
import { logTimeout } from '../../constants'

// Transaction Receipt Information
export const logTxReceipt = async (
    hre: HardhatRuntimeEnvironment,
    txName: string,
    txReceipt: TransactionReceipt,
    contractInterface?: Interface,
): Promise<void> => {
    const txTotalCost = txReceipt.gasUsed.mul(txReceipt.effectiveGasPrice)

    if (hre.network.config.chainId === undefined) throw new Error('undefined chain id')
    const network: Network = getNetwork(hre.network.config.chainId)

    console.log(`\n- ${capitalize(txName)} Transaction Receipt -\n`)
    console.log(`Block Number: ${txReceipt.blockNumber}`)
    console.log(`Type: ${txReceipt.type}`)
    console.log(`Gas Used: ${txReceipt.gasUsed}`)
    console.log(`Cumulative Gas Used: ${txReceipt.cumulativeGasUsed}`)
    console.log(`Effective Gas Price: ${txReceipt.effectiveGasPrice}`)
    console.log(
        `Total Transaction Cost: ${hre.ethers.utils.formatUnits(
            txTotalCost,
            network.nativeCurrency.decimals,
        )} ${network.nativeCurrency.symbol}`,
    )
    console.log(
        `Total Transaction Cost in Wei: ${hre.ethers.utils.formatUnits(txTotalCost, 0)} ${
            network.nativeCurrency.uSymbol
        }`,
    )
    console.log(`Transaction Hash: ${txReceipt.transactionHash}`)
    console.log(`Transaction Sender: ${txReceipt.from}`)
    console.log(`Transaction Receiver: ${txReceipt.to}`)
    console.log(`Logs:`)

    const logs = txReceipt.logs

    if (contractInterface != null) {
        for (let i = 0; i < logs.length; i++) {
            for (const abiEvent of Object.values(contractInterface.events)) {
                const eventSignature = contractInterface.getEventTopic(abiEvent)
                if (eventSignature === logs[i].topics[0]) {
                    const eventDecoded = contractInterface.decodeEventLog(
                        abiEvent,
                        logs[i].data,
                        logs[i].topics,
                    )
                    console.log(`    ${i + 1} - ${abiEvent.name}`)
                    for (const [key, value] of Object.entries(eventDecoded)) {
                        if (isNaN(Number(key))) console.log(`        ${key}: ${value}`)
                    }
                    break
                }
            }
        }
    }

    console.log(`\n---------------`)
    await sleep(logTimeout)
}
