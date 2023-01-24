import { Cell } from 'ton-core'

export const TonForwarderCodeBoc =
  'te6ccgEBBAEAigABFP8A9KQT9LzyyAsBAgEgAgMA5NIwbBLQ0wMBcbCRW+DtRNDTANMf0z/6QPoAMATAAVFkvRaxjhoQNF8E+kAwcIAQyMsFWM8WIfoCy2rJgED7AOAzcCCAEMjLBSbPFiH6Astqyx9SMMs/yYBA+wBxUERDEwTIywATyx/LPwHPFgH6AsntVAAE8jA='

export const TonForwarderCodeCell = Cell.fromBoc(Buffer.from(TonForwarderCodeBoc, 'base64'))[0]
