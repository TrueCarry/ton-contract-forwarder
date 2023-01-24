import { Builder, Cell, contractAddress, StateInit, Address } from 'ton-core'
import { TonForwarderCodeCell } from './TonForwarder.source'

export interface TonForwarderInitData {
  isComplete: boolean
  createdAt: number // uint32
  queryId: bigint // uint64
  forwardAddress: Address
  wantedAmount: bigint
}

export class TonForwarder {
  data: TonForwarderInitData

  constructor(data: TonForwarderInitData) {
    this.data = data
  }

  get address() {
    const highloadAddress = contractAddress(0, this.stateInit)
    return highloadAddress
  }

  get stateInit() {
    const walletStateInit = TonForwarder.BuildStateInit(this.data)
    return walletStateInit
  }

  static BuildDataCell(data: TonForwarderInitData): Cell {
    const dataCell = new Builder()

    dataCell.storeBit(data.isComplete)
    dataCell.storeUint(data.createdAt, 32)
    dataCell.storeUint(data.queryId, 64)
    dataCell.storeAddress(data.forwardAddress)
    dataCell.storeCoins(data.wantedAmount)

    return dataCell.endCell()
  }

  static BuildStateInit(data: TonForwarderInitData): StateInit {
    const stateInit = {
      code: TonForwarderCodeCell,
      data: TonForwarder.BuildDataCell(data),
    }

    return stateInit
  }
}
