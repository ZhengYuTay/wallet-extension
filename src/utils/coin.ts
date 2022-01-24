import { u64 } from '@solana/spl-token'
import * as math from 'mathjs'

export const truncateAddress = (address: string): string => {
  return `${address.slice(0, 5)}...${address.slice(address.length - 6)}`
}

export const tokenAmountToUiTokenAmount = (amount: u64, decimals: number): number => {
  return math.chain(amount.toString()).fix().divide(math.pow(10, decimals)).done()
}
