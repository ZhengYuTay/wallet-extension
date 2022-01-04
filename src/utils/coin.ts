export const truncateAddress = (address: string): string => {
  return `${address.slice(0, 5)}...${address.slice(address.length - 6)}`
}
