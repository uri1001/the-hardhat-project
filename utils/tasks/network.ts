import { task } from 'hardhat/config'

// EVM Networks
import { type Network } from 'evm-networks'
import { getNetwork } from 'evm-networks/utils'

// Tools
import { sleep } from '../tools'

// Constants
import { requestTimeout } from '../constants'

// Task
task('network', 'Provides selected network state information').setAction(async (_taskArgs, hre) => {
    const provider = hre.ethers.provider
    const providerNetwork = await provider.getNetwork()

    if (hre.network.config.chainId === undefined) throw new Error('undefined chain id')
    const network: Network = getNetwork(hre.network.config.chainId)

    console.log(`\n\n- Network Task Initialized -\n\n`)

    // ES PODRIA LOGGEJAR TOTS ELS PARAMETRES AMB L'STATUS
    // CREAR UN TYPE NETWORK QUE SIGUI EXTENENT EL DE EVM-NETWORKS
    // PERÒ AMB PARÀMETRES RESULTAT D'UN TEST
    console.log(`Name: ${network.name}`)
    console.log(`Hardhat Name: ${hre.network.name}`)
    console.log(`ID: ${network.id}\n`)

    console.log(`Native Currency`)
    console.log(`    Name: ${network.nativeCurrency.name}`)
    console.log(`    Symbol: ${network.nativeCurrency.symbol}`)
    console.log(`    uSymbol: ${network.nativeCurrency.uSymbol}`)
    console.log(`    Decimals: ${network.nativeCurrency.decimals}\n`)

    console.log(`Default RPC Node`)
    console.log(`    Name: ${network.rpcNodes.default.provider.name}`)
    console.log(`    HTTP Service URLs: ${network.rpcNodes.default.http}`)
    console.log(`    WSS Service URLs: ${network.rpcNodes.wss}`)
    console.log(`    Authenticated Endpoints: ${network.rpcNodes.default.authenticated}`)
    console.log(`    HTTP Service Authenticated URLs: ${network.rpcNodes.authenticatedHttp}`)
    console.log(`    WSS Service Authenticated URLs: ${network.rpcNodes.authenticatedWss}\n`)

    if (network.blockExplorers !== undefined) {
        console.log(`Default Blockchain Explorer`)
        console.log(`    Name: ${network.blockExplorers.default.name}`)
        console.log(`    Type: ${network.blockExplorers.default.type}`)
        console.log(`    Browser URL: ${network.blockExplorers.default.browserUrl}`)
        console.log(`    Standard: ${network.blockExplorers.default.standard}\n`)
    }

    console.log(`ENS Address: ${providerNetwork.ensAddress}`)
    console.log(`Provider: ${provider}\n\n`)

    // CALCULAR LATENCY I STATUS DELS RPC NODES
    // TESTS AMB GET CURRENT BLOCK NUMBER, GET BALANCE & READ CONTRACT

    const feeData = await provider.getFeeData()
    await sleep(requestTimeout)

    console.log(`Block Number: ${await provider.getBlockNumber()}`)
    console.log(`Gas Price: ${feeData.gasPrice}`)
    console.log(`Last Base Fee per Gas: ${feeData.lastBaseFeePerGas}`)
    console.log(`Max Fee per Gas: ${feeData.maxFeePerGas}`)
    console.log(`Max Priority Fee per Gas: ${feeData.maxPriorityFeePerGas}`)

    console.log(`\n\n- Network Task Finalized -\n\n`)
})
