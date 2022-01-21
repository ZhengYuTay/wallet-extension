import * as React from 'react'
import Header from '~/components/Header'
import Input from '~/components/Input'
import Icon from '~/components/Icon'
import ListItem from '~/components/ListItem'
import useWeb3 from '~/hooks/useWeb3'
import { tokenAmountToUiTokenAmount } from '~/utils/coin'
import Coin from '~/components/Coin'
import { useNavigate } from 'react-router-dom'

const Send: React.FunctionComponent = () => {
  const { tokenInfoAccounts } = useWeb3()
  const navigate = useNavigate()

  const [search, setSearch] = React.useState<string>('')

  const filteredTokenInfoAccounts = React.useMemo(() => {
    return tokenInfoAccounts?.filter((tokenInfoAccount) => {
      if (!search) return true

      return tokenInfoAccount.token?.symbol?.toLowerCase().includes?.(search.toLowerCase())
    })
  }, [tokenInfoAccounts, search])

  const onSearch = React.useCallback((evt) => {
    setSearch(evt.target.value)
  }, [])

  const goToSendToken = React.useCallback((mint) => {
    navigate(`/send/${mint}`)
  }, [])

  return (
    <div className="flex flex-col h-full">
      <Header title="Send" style={{ flex: '0 0' }} back>
        <Input
          className="w-11/12 self-center"
          prefix={<Icon name="search" color="grey" />}
          onChange={onSearch}
          placeholder="Search"
        />
      </Header>
      <div className="flex flex-col mt-6 mx-2 overflow-y-auto" style={{ flex: '1 1' }}>
        <div className="text-[1rem] text-slate-300">Your Funds</div>
        <div className="flex flex-col mt-2">
          {filteredTokenInfoAccounts?.map((tokenInfo, index) => (
            <ListItem
              key={`fund${index}`}
              title={tokenInfo.token?.symbol ?? 'N/A'}
              icon={<Coin icon={tokenInfo?.token?.logoURI} />}
              rightSide={
                <div className="text-right text-md text-slate-400">{`${tokenAmountToUiTokenAmount(
                  tokenInfo.info.amount,
                  tokenInfo.token?.decimals ?? 0
                )}`}</div>
              }
              onClick={() => goToSendToken(tokenInfo.info.mint.toBase58())}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export default Send
