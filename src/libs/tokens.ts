import { TOKEN_PROGRAM_ID, AccountInfo as TokenAccountInfo, AccountLayout, u64 } from '@solana/spl-token'
import { AccountInfo, Connection, PublicKey } from '@solana/web3.js'

export interface TokenAccount {
  pubkey: PublicKey
  account: AccountInfo<Buffer>
  info: TokenAccountInfo
}

const deserializeAccount = (data: Buffer): TokenAccountInfo => {
  const accountInfo = AccountLayout.decode(data)
  accountInfo.mint = new PublicKey(accountInfo.mint)
  accountInfo.owner = new PublicKey(accountInfo.owner)
  accountInfo.amount = u64.fromBuffer(accountInfo.amount)

  if (accountInfo.delegateOption === 0) {
    accountInfo.delegate = null
    accountInfo.delegatedAmount = new u64(0)
  } else {
    accountInfo.delegate = new PublicKey(accountInfo.delegate)
    accountInfo.delegatedAmount = u64.fromBuffer(accountInfo.delegatedAmount)
  }

  accountInfo.isInitialized = accountInfo.state !== 0
  accountInfo.isFrozen = accountInfo.state === 2

  if (accountInfo.isNativeOption === 1) {
    accountInfo.rentExemptReserve = u64.fromBuffer(accountInfo.isNative)
    accountInfo.isNative = true
  } else {
    accountInfo.rentExemptReserve = null
    accountInfo.isNative = false
  }

  if (accountInfo.closeAuthorityOption === 0) {
    accountInfo.closeAuthority = null
  } else {
    accountInfo.closeAuthority = new PublicKey(accountInfo.closeAuthority)
  }

  return accountInfo
}

export const tokenAccountParser = (pubKey: PublicKey, info: AccountInfo<Buffer>) => {
  const buffer = Buffer.from(info.data)
  const data = deserializeAccount(buffer)

  const details = {
    pubkey: pubKey,
    account: {
      ...info
    },
    info: data
  } as TokenAccount

  return details
}

export async function getWalletTokens(connection: Connection, wallet: PublicKey) {
  const pas = (
    await connection.getTokenAccountsByOwner(wallet, {
      programId: TOKEN_PROGRAM_ID
    })
  ).value

  // TODO: Figure out what to do with non ATA
  return pas.reduce((tokenAccounts, { pubkey, account }) => {
    const tokenAccount = tokenAccountParser(pubkey, account)
    tokenAccounts.push(tokenAccount)
    return tokenAccounts
  }, new Array<TokenAccount>())
}

export async function getRecentTransactions(connection: Connection, wallet: PublicKey) {
  // TODO: be smarter and identifty if a transaction is just a withdraw / deposit or other activty in solana
  const transactions = await connection.getSignaturesForAddress(wallet)

  return transactions
}
