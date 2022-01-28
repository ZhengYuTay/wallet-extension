// Call window.wallet.connect(); to have the connect popup appear
window.wallet = {
  connect: () => {
    window.dispatchEvent(new CustomEvent('connect-wallet'))
  }
}
