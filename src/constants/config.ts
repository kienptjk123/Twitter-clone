import { config } from 'dotenv'
import argv from 'minimist'
config()
const options = argv(process.argv.slice(2))
console.log(options.development)
export const isProduction = Boolean(options.production)
