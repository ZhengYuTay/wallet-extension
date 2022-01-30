/**
 * /!\ This is a rough draft of what the mnemonic storage and abstraction will look like,
 * there is no encryption or any security consideration yet.
 */
import { Keypair } from '@solana/web3.js'
import { mnemonicToSeed, validateMnemonic } from 'bip39'
import { derivePath } from 'ed25519-hd-key'
import nacl from 'tweetnacl'
import browser from 'webextension-polyfill'

export async function menomonicToSeed(mnemonic: string) {
  if (!validateMnemonic(mnemonic)) {
    throw new Error('Invalid mnemonic phrase')
  }
  const seed = await mnemonicToSeed(mnemonic)
  return Buffer.from(seed).toString('hex')
}

// https://github.com/bitcoin/bips/blob/master/bip-0044.mediawiki m/44'/501'/account'/change/address_index
export function getKeypairFromSeed(seed: string, walletIndex: number): Keypair {
  const path44Change = `m/44'/501'/${walletIndex}'/0'`
  const derivedSeed = derivePath(path44Change, seed).key
  return Keypair.fromSecretKey(nacl.sign.keyPair.fromSeed(derivedSeed).secretKey)
}

// TODO: Encryption and better data structure to allow storage of "loaded" wallets on the derivation path
export async function storeMnemonic(mnemonic: string) {
  return browser.storage.local.set({
    mnemonic
  })
}

export async function loadMnemonic(): Promise<string | undefined> {
  const { mnemonic } = await browser.storage.local.get('mnemonic')
  console.log('==>', mnemonic)
  return mnemonic
}

// TODO: Purge extension storage
export async function clearWallet() {}
