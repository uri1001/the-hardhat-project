// Tools
import { capitalize, sleep } from '../../tools'

// Constants
import { logTimeout } from '../../constants'

// Transaction Return Value Information
export const logTxReturnValue = async (txName: string, returnValue: any[]): Promise<void> => {
    console.log(`\n- ${capitalize(txName)} Transaction Return Value -\n`)
    console.log(`Return Value:`)

    for (let i = 0; i < returnValue.length; i++) {
        const value = returnValue[i]
        const type = typeof value
        let output = `    ${i + 1} - ${type} = `
        if (type === 'object' && value !== null) {
            const entries = Object.entries(value)
            const mappedEntries = entries.map(([key, value]) => `${key}: ${value}`)
            output += `{ ${mappedEntries.join(', ')} }`
        } else {
            output += value.toString()
        }
        console.log(output)
    }

    console.log(`\n---------------`)
    await sleep(logTimeout)
}
