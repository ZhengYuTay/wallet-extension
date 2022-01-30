import { useQuery } from 'react-query'
import promiseRetry from 'promise-retry'
import { useConnection } from './useConnection'

export const useGetTransaction = (txid: string) => {
  const connection = useConnection()

  return useQuery(txid, async ({}) => {
    promiseRetry(
      async (retry) => {
        const res = await connection.getTransaction(txid, { commitment: 'confirmed' })

        if (!res) {
          return retry(new Error('Transaction not found'))
        }

        return res
      },
      {
        retries: 10,
        minTimeout: 500,
        maxTimeout: 1000
      }
    )
  })
}
