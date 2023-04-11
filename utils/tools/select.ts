import * as readline from 'node:readline/promises'
import { stdin as input, stdout as output } from 'node:process'

// Types
import { type Contract } from 'ethers'
import { type HardhatRuntimeEnvironment } from 'hardhat/types'
import { type SignerWithAddress } from '@nomiclabs/hardhat-ethers/signers'

// Tools
import { sleep } from './time'

// Constants
import { requestTimeout } from '../constants'

export const selectContract = async (
    hre: HardhatRuntimeEnvironment,
    contractName: string,
): Promise<Contract> => {
    if (contractName === undefined) throw new Error('Contract Name Undefined')

    const rl = readline.createInterface({ input, output })

    while (true) {
        const contractAddress = await rl.question('\n- Introduce Target Contract Address: ')
        const contract: Contract = await hre.ethers.getContractAt(contractName, contractAddress)
        await sleep(requestTimeout)

        const valid = await contract.resolvedAddress
            .then(() => {
                console.log(`\n- Contract Address Valid -\n`)
                return true
            })
            .catch(() => {
                console.log(`\n- Contract Address Not Valid -\n`)
                return false
            })

        if (valid) return contract
    }
}

// TO IMPLEMENT & AT THE SAME TIME FIX ACCOUNTS TASK
export const selectSigner = async (
    hre: HardhatRuntimeEnvironment,
    type: string,
    contractName?: string,
): Promise<Contract | SignerWithAddress> => {
    if (type === 'signer') {
        // THIS SECTION MUST BE SIMPLIFIED WITH LOGACCOUNTSINFO
        // -----------------------------------------------------
        const rl = readline.createInterface({ input, output })
        const accounts = await hre.ethers.getSigners()

        let valid = false
        let walletSelected
        while (!valid) {
            walletSelected = await rl.question(
                '\n- Select Account to Execute Deploy (Enter Account Number): ',
            )
            if (Number(walletSelected) > 0 && Number(walletSelected) <= accounts.length) valid = true
        }

        let k = 1
        let signer
        for (const account of accounts) {
            if (k === Number(walletSelected)) {
                const balance = hre.ethers.utils.formatEther(
                    await hre.ethers.provider.getBalance(account.address),
                )
                const txCount = await hre.ethers.provider.getTransactionCount(account.address)
                await sleep(requestTimeout)

                console.log(`\nSelected Account: ${account.address} - ${balance} - ${txCount}`)
                signer = account
                break
            }
            k++
        }

        if (signer === undefined) throw new Error('Undefined Signer')
        return signer
        // -----------------------------------------------------
    } else {
        throw new Error('Unsupported Type')
    }
}
