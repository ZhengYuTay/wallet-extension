import { useConnectionContext } from '~/contexts/connection'

export const useConnection = () => {
  return useConnectionContext().connection
}
