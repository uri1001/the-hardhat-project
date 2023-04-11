// Tools
import { capitalize } from '../../tools'

// Transaction Arguments Information
export const logTxArgs = (txName: string, args: any[], argsNames?: string[]) => {
    console.log(`${capitalize(txName)} Function Arguments\n`)
    for (let i = 0; i < args.length; i++)
        console.log(
            argsNames != null
                ? `    ${i + 1} - ${argsNames[i]}: ${args[i]}`
                : `    ${i + 1} - ${args[i]}`,
        )
}
