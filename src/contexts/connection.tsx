import { createContext, useContext, useMemo, useState } from 'react'
import { Cluster, clusterApiUrl, Connection } from '@solana/web3.js'

interface ConnectionContext {
  env: Cluster
  setEnv: (cluster: Cluster) => void
  connection: Connection
}

export const ConnectionContext = createContext<ConnectionContext | null>(null)

export const ConnectionProvider: React.FC = ({ children }) => {
  // TODO: - use localstorage
  const [env, setEnv] = useState<Cluster>('mainnet-beta')
  const connection = useMemo(() => {
    return new Connection(clusterApiUrl(env))
  }, [env])

  return (
    <ConnectionContext.Provider
      value={{
        env,
        setEnv,
        connection
      }}
    >
      {children}
    </ConnectionContext.Provider>
  )
}

export const useConnectionContext = () => {
  const context = useContext(ConnectionContext)
  if (!context) {
    throw new Error('useConnectionContext must be used within a ConnectionProvider')
  }

  return context
}
