// Types
import { type HardhatRuntimeEnvironment } from 'hardhat/types'

// EVM Networks
import { type Network } from 'evm-networks'
import { getNetwork } from 'evm-networks/utils'

// Tools
import { sleep } from '../../tools'

// Constants
import { logTimeout, requestTimeout } from '../../constants'

// Accounts Information
export const logAccountsInfo = async (
    accounts: string[],
    names: string[] | undefined,
    hre: HardhatRuntimeEnvironment,
): Promise<void> => {
    const provider = hre.ethers.provider

    if (hre.network.config.chainId === undefined) throw new Error('undefined chain id')
    const network: Network = getNetwork(hre.network.config.chainId)
    console.log(`\n- Accounts State Information -\n`)

    if (names !== undefined)
        console.log(
            `#  -  Name  -  Type  -  Address  -  ENS  -  Balance [${network.nativeCurrency.symbol}]  -  Transactions Count\n`,
        )
    if (names === undefined)
        console.log(
            `#  -  Type  -  Address  -  ENS  -  Balance [${network.nativeCurrency.symbol}]  -  Transactions Count\n`,
        )

    for (let i = 0; i < accounts.length; i++) {
        const balance = hre.ethers.utils.formatUnits(
            await provider.getBalance(accounts[i]),
            network.nativeCurrency.decimals,
        )
        await sleep(requestTimeout)
        const txCount = await provider.getTransactionCount(accounts[i])
        await sleep(requestTimeout)
        const code = await provider.getCode(accounts[i])
        const type = code === '0x' ? 'EOA' : 'CA'
        await sleep(requestTimeout)
        const ens =
            hre.network.name === 'mainnet' || hre.network.name === 'goerli'
                ? await provider.lookupAddress(accounts[i])
                : 'null'
        await sleep(requestTimeout)

        if (names !== undefined)
            console.log(
                `${i + 1} - ${names[i]} - ${type} - ${accounts[i]} - ${ens} - ${balance} ${
                    network.nativeCurrency.symbol
                } - ${txCount}`,
            )

        if (names === undefined)
            console.log(
                `${i + 1} - ${type} - ${accounts[i]} - ${ens} - ${balance} ${
                    network.nativeCurrency.symbol
                } - ${txCount}`,
            )
    }

    console.log(`\n---------------`)
    await sleep(logTimeout)
}
