import React from 'react';
import { sendMessage } from 'webext-bridge';

export const Connect = () => {
	const connectWallet = React.useCallback (() => {
		sendMessage('wallet-connected', undefined);
	  }, [])

	return (
		<div className='flex justify-center items-center h-full'>
			<button className="btn btn-primary" onClick={connectWallet}>
				Connect
			</button>
		</div>
	);
};
