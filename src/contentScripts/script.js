// Call window.jupiter.connect(); to have the connect popup appear
window.jupiter = {
    connect: () => {
        window.dispatchEvent(
            new CustomEvent('jupiter-connect-wallet'),
        )
    }
};
