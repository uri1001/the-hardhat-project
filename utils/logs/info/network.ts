// Types
import { type HardhatRuntimeEnvironment } from 'hardhat/types'

// EVM Networks
import { type Network } from 'evm-networks'
import { getNetwork } from 'evm-networks/utils'

// Tools
import { sleep } from '../../tools'

// Constants
import { logTimeout, requestTimeout } from '../../constants'

// Network Information
// EXTENDREU AMB LA TASCA DE NETWORK PER LOGGEJAR MÉS INFO
export const logNetworkInfo = async (hre: HardhatRuntimeEnvironment): Promise<void> => {
    const provider = hre.ethers.provider

    if (hre.network.config.chainId === undefined) throw new Error('undefined chain id')
    const network: Network = getNetwork(hre.network.config.chainId)

    const blockNumber = await provider.getBlockNumber()
    await sleep(requestTimeout)
    const feeData = await provider.getFeeData()
    await sleep(requestTimeout)

    console.log(`\n- Network State Information -\n`)
    console.log(`Name: ${network.name}`)
    console.log(`Symbol: ${network.nativeCurrency.symbol}`)
    console.log(`Block Number: ${blockNumber}`)
    console.log(`Gas Price: ${feeData.gasPrice}`)
    console.log(`Provider: ${provider}`)

    // IMPLEMENT PROVIDER CORRECTLY
    // SEE TO DO BELOW
    // -----------------------------------------------------------------------------------------------
    // console.log(provider)
    // const x = hre.ethers.getDefaultProvider(hre.network.name, [
    //     { alchemy: process.env.alchemyAPIKey },
    // ])
    // console.log(x)
    // -----------------------------------------------------------------------------------------------

    console.log(`\n---------------`)
    await sleep(logTimeout)
}
