import React, { useState } from 'react'
import useWallet from '~/hooks/useWallet'
import { shortenAddress } from '~/utils/web3-utils'
import Icon from './Icon'

const Drawer: React.FC = () => {
  const { wallets, selectedWallet, setSelectedWalletByIndex } = useWallet()
  const [open, setOpen] = useState(false)
  return (
    <div className="shadow drawer bg-[#282830]">
      <input
        checked={open}
        onClick={() => {
          setOpen(!open)
        }}
        id="my-drawer"
        type="checkbox"
        className="drawer-toggle"
      />

      <div className="px-4 pt-4 pb-8 border-b border-slate-700">
        <label htmlFor="my-drawer" className="btn-primary drawer-button">
          <Icon
            className="cursor-pointer absolute"
            name="drawer"
            colorFn={({ hover }: { hover: Boolean }) => (hover ? 'white' : 'grey')}
          />
        </label>
        {selectedWallet && (
          <div className="text-slate-400">
            {selectedWallet.name} ({shortenAddress(selectedWallet.publicKey.toBase58())})
          </div>
        )}
      </div>

      <div className="drawer-side">
        <label htmlFor="my-drawer" className="drawer-overlay cursor-default h-screen z-10 absolute w-screen" />
        <ul className="menu p-4 overflow-y-auto w-4/6 bg-base-100 text-base-content z-20 h-screen absolute">
          {wallets.map((wallet, index) => (
            <li key={index}>
              <a
                onClick={() => {
                  setSelectedWalletByIndex(index)
                  setOpen(false)
                }}
              >
                {wallet.name} ({shortenAddress(wallet.publicKey.toBase58())})
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default Drawer
