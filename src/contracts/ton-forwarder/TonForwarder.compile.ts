import { compileFunc } from '@ton-community/func-js'
import fs from 'fs'

async function main() {
  const stdlibCode = fs.readFileSync('./func/stdlib.fc', { encoding: 'utf8' })
  const walletCode = fs.readFileSync('./func/ton-forwarder.fc', { encoding: 'utf8' })

  const result = await compileFunc({
    targets: ['stdlib.fc', 'ton-forwarder.fc'],
    sources: {
      'stdlib.fc': stdlibCode,
      'ton-forwarder.fc': walletCode,
    },
  })

  if (result.status === 'error') {
    console.error(result.message)
    return
  }

  if (result.status !== 'ok') {
    throw new Error('Result status not ok')
  }

  console.log('Code Base64:')
  console.log(result.codeBoc)
  const codeBuffer = Buffer.from(result.codeBoc, 'base64')

  console.log('Code HEX:')
  console.log(codeBuffer.toString('hex').toUpperCase())

  const srcFile = fs.readFileSync('./src/contracts/ton-forwarder/TonForwarder.source.ts', {
    encoding: 'utf8',
  })
  const replaced = srcFile.replace(
    /export const TonForwarderCodeBoc =\n {2}'(.+)'/,
    `export const TonForwarderCodeBoc =\n  '${result.codeBoc}'`
  )
  fs.writeFileSync('./src/contracts/ton-forwarder/TonForwarder.source.ts', replaced)
}
main()
