import { task } from 'hardhat/config'

// Logs
import { logAccountsInfo, logNetworkInfo } from '../logs/info'

// Task
task('accounts', 'Provides accounts information in selected network').setAction(
    async (_taskArgs, hre) => {
        const accounts = await hre.ethers.getSigners()

        console.log(`\n\n- Network Available Accounts & State Information Initialized -\n\n`)

        await logNetworkInfo(hre)

        await logAccountsInfo(
            accounts.map(account => account.address),
            undefined,
            hre,
        )

        console.log(`\n\n- Network Available Accounts & State Information Finalized -\n\n`)
    },
)
