import { Blockchain } from '@ton-community/sandbox'
import { Address } from 'ton-core'
import { TonForwarder } from './TonForwarder'
import '@ton-community/test-utils' // register matchers

describe('TonForwarder', () => {
  describe('Send single message', () => {
    test('Should return wrong amount', async () => {
      try {
        const createdAt = 1674577770
        const forwardAddress = new Address(0, Buffer.from([]))
        const forwarder = new TonForwarder({
          createdAt: createdAt,
          forwardAddress: forwardAddress,
          isComplete: false,
          queryId: 1000n,
          wantedAmount: 1000n,
        })

        const blockchain = await Blockchain.create()
        const buyer = await blockchain.treasury('buyer')

        const message = await buyer.send({
          to: forwarder.address,
          value: 1000000000n,
          init: forwarder.stateInit,
        })

        expect(message.transactions).toHaveTransaction({
          from: forwarder.address,
          to: buyer.address,
        })
      } catch (e) {
        console.log('er', e)
        throw e
      }
    })

    test('Should forward ', async () => {
      try {
        const blockchain = await Blockchain.create()
        const buyer = await blockchain.treasury('buyer')
        const target = await blockchain.treasury('target')

        const createdAt = 1674577770
        const forwardAddress = target.address //new Address(0, Buffer.from([22]))
        const forwarder = new TonForwarder({
          createdAt: createdAt,
          forwardAddress: forwardAddress,
          isComplete: false,
          queryId: 1000n,
          wantedAmount: 1023400000n,
        })

        const message = await buyer.send({
          to: forwarder.address,
          value: 1023400000n,
          init: forwarder.stateInit,
        })
        expect(message.transactions).toHaveTransaction({
          from: forwarder.address,
          // to: forwardAddress,
          to: target.address,
        })
      } catch (e) {
        console.log('er', e)
        throw e
      }
    })

    test('Subsequest sends should return', async () => {
      try {
        const blockchain = await Blockchain.create()
        const buyer = await blockchain.treasury('buyer')
        const target = await blockchain.treasury('target')

        const createdAt = 1674577770
        const forwardAddress = target.address //new Address(0, Buffer.from([22]))
        const forwarder = new TonForwarder({
          createdAt: createdAt,
          forwardAddress: forwardAddress,
          isComplete: false,
          queryId: 1000n,
          wantedAmount: 1023400000n,
        })

        const message = await buyer.send({
          to: forwarder.address,
          value: 1023400000n,
          init: forwarder.stateInit,
        })
        expect(message.transactions).toHaveTransaction({
          from: forwarder.address,
          to: target.address,
        })

        const message2 = await buyer.send({
          to: forwarder.address,
          value: 1023400000n,
          init: forwarder.stateInit,
        })
        expect(message2.transactions).toHaveTransaction({
          from: forwarder.address,
          // to: forwardAddress,
          to: buyer.address,
        })
      } catch (e) {
        console.log('er', e)
        throw e
      }
    })
  })
})
