import bip32 from 'bip32'
import { mnemonicToSeed, validateMnemonic } from 'bip39'

export async function menomonicToSeed(mnemonic: string) {
  if (!validateMnemonic(mnemonic)) {
    throw new Error('Invalid mnemonic phrase')
  }
  const seed = await mnemonicToSeed(mnemonic)
  return Buffer.from(seed).toString('hex')
}

// TODO: Encryption and better data structure to allow storage of "loaded" wallets on the derivation path

export async function storeMnemonic(mnemonic: string) {
  return new Promise<void>((resolve) => {
    chrome.storage.local.set(
      {
        wallet_extension_mnemonic: mnemonic
      },
      resolve
    )
  })
}

// TODO: Purge extension storage
export async function clearWallet() {}
