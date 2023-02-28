import { task } from 'hardhat/config'

const sleep = (ms: number) => new Promise(r => setTimeout(r, ms))

task('accounts', 'provides accounts information in selected network').setAction(
    async (taskArgs, hre) => {
        const accounts = await hre.ethers.getSigners()
        const provider = hre.ethers.provider

        console.log(`\n- Accounts Task Initialized -\n`)
        console.log(`Network: ${hre.network.name}`)
        console.log(`Block: ${await provider.getBlockNumber()}`)
        console.log(`Gas Price: ${await provider.getGasPrice()}`)

        sleep(1000)

        console.log(`\nNumber - Address  -  Balance  -  Transactions Count\n`)

        let i = 1
        for (const account of accounts) {
            const balance = hre.ethers.utils.formatEther(await provider.getBalance(account.address))
            const txCount = await provider.getTransactionCount(account.address)
            sleep(1000)

            console.log(`${i} - ${account.address} - ${balance} - ${txCount}`)
            i++
        }

        console.log(`\n- Accounts Task Finalized -\n`)
    },
)
