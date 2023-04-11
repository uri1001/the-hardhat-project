// Tools
import { capitalize, sleep } from '../../tools'

// Constants
import { logTimeout } from '../../constants'

// Transaction Error Information
export const logTxError = async (txName: string, error: any): Promise<void> => {
    console.log(`\n- ${capitalize(txName)} Transaction Error -\n`)
    console.log(`Reason: ${error.reason}`)
    console.log(`Code: ${error.code}`)
    console.log(`Function: ${error.method}`)
    console.log(`Error Name: ${error.errorName}`)
    console.log(`Error Signature: ${error.errorSignature}`)
    console.log(`Error Arguments: ${error.errorArgs}`)
    if (error.transaction) {
        console.log(`Transaction:`)
        console.log(`    Data: ${error.transaction.data}`)
        console.log(`    To: ${error.transaction.to}`)
        console.log(`    From: ${error.transaction.from}`)
        console.log(`    Gas Limit: ${error.transaction.gasLimit} Wei`)
    }

    console.log(`\n---------------`)

    await sleep(logTimeout)
}
