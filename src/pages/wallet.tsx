import * as React from 'react'
import { useNavigate } from 'react-router-dom'
import Coin from '~/components/Coin'
import ListItem from '~/components/ListItem'
import { ENV, TokenInfo, TokenListProvider } from '@solana/spl-token-registry'

const DUMMY_TOKENS: {mint: string, uiAmount: number}[] = [
  {mint: 'So11111111111111111111111111111111111111112', uiAmount: 1.23}, // SOL
  {mint: '7vfCXTUXx5WJV5JADk17DUJ4ksgau7utNKj4b963voxs', uiAmount: 4.001}, // ETH
  {mint: 'EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v', uiAmount: 2543.3}, // USDC
  {mint: 'SRMuApVNdxXokk5GT7XD5cUUgXMBCoAz2LHeuAoKWRt', uiAmount: 0.123}, // SRM
  {mint: 'MERt85fc5boKw3BW1eYdxonEuJNvXbiMbs6hvheau5K', uiAmount: 12.2}, // MER
  {mint: '7xKXtg2CW87d97TXJSDpbD5jBkheTqA83TZRuJosgAsU', uiAmount: 23453234}, // SAMO
  {mint: 'H7Qc9APCWWGDVxGD5fJHmLTmdEgT9GFatAKFNg6sHh8A', uiAmount: 100}, // OOGI
  {mint: '4k3Dyjzvzp8eMZWUXbBCjEvwSkkk59S5iCNLY3QrkX6R', uiAmount: 12}, // RAY
  {mint: 'ATLASXmbPQxBUYbxPsV97usA3fPQYEqzQBUHgiFCUsXx', uiAmount: 322599.09832}, // ATLAS
  {mint: 'DFL1zNkaGPWm1BqAVqRjCZvHmwTFrEaJtbzJWgseoNJh', uiAmount: 0.02}, // DFL
];

const Wallet: React.FunctionComponent = () => {
  const navigate = useNavigate()
  const [tokenMap, setTokenMap] = React.useState<Map<string, TokenInfo>>()

  React.useEffect(() => {
    new TokenListProvider().resolve().then(tokens => {
      const tokenList = tokens.filterByChainId(ENV.MainnetBeta).getList();

      setTokenMap(tokenList.reduce((map, item) => {
        map.set(item.address, item)
        return map;
      },new Map()))
    });
  }, [setTokenMap])

  const goToSend = React.useCallback(() => {
    navigate('/send')
  }, [])

  const goToToken = React.useCallback((coin) => {
    navigate(`/wallet/${coin.id}`)
  }, [])

  return (
    <div className="flex flex-col text-center align-center h-full">
      <div className="px-10 flex flex-col space-y-2 mb-4">
        <span className="text-md">Account 1</span>
        <span className="text-4xl">$3,575.24</span>
        <span className="text-red-700 text-base">-229.23</span>
        <div className="flex flex-row justify-center">
          <button className="btn px-6 mx-2">Receive</button>
          <button className="btn px-6 mx-2" onClick={goToSend}>
            Send
          </button>
        </div>
      </div>
      <div className="flex flex-col mx-2 overflow-y-auto flex-1">
        {tokenMap &&
          DUMMY_TOKENS.map(({mint, uiAmount}, index) => {
            const tokenInfo = tokenMap.get(mint)!

            return <ListItem
              key={`token_${index}`}
              title={tokenInfo.name}
              caption={`${uiAmount} ${tokenInfo.symbol}`}
              icon={<Coin icon={tokenInfo.logoURI} />}
              onClick={() => goToToken(mint)}
            />
          })
        }
      </div>
    </div>
  )
}

export default Wallet
