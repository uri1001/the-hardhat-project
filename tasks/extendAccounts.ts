import { task } from 'hardhat/config'

// OBJECTIU ES EXECUTAR LA ACCOUNTS TASK PER A CADA NETWORK DE HARDHAT.CONFIG.TS FILE
task('extendAccounts', 'provides accounts information in selected network').setAction(
    async (taskArgs, hre) => {
        console.log(`\n- Extended Accounts Task Initialized -\n`)

        await hre.run('accounts:goerli')

        console.log(`\n- Extended Accounts Task Finalized -\n`)
    },
)
