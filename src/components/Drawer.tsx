import React from 'react';
import Icon from './Icon';

const Drawer: React.FC = () => {
	return (
		<div className="shadow drawer bg-[#282830]">
            <input id="my-drawer" type="checkbox" className="drawer-toggle" />

            <div className="flex flex-col w-screen">
                <div className="w-full p-4 border-b border-slate-700">
                    <label htmlFor="my-drawer" className="btn-primary drawer-button">
                        <Icon
                            className="cursor-pointer"
                            name='drawer'
                            colorFn={({ hover }: { hover: Boolean }) => hover ? 'white' : 'grey'}
                        />
                    </label>
                </div>
            </div>

            <div className="drawer-side">
                <label htmlFor="my-drawer" className="drawer-overlay cursor-default h-screen z-10 absolute w-screen" />
                <ul className="menu p-4 overflow-y-auto w-3/6 bg-base-100 text-base-content z-20 h-screen absolute">
                    <li>
                        <a>Wallet 1</a>
                    </li>
                    <li>
                        <a>Wallet 2</a>
                    </li>
                    <li>
                        <a>Wallet 3</a>
                    </li>
                    <li>
                        <a>Wallet 4</a>
                    </li>
                    <li>
                        <a>Wallet 5</a>
                    </li>
                </ul>
            </div>
        </div>
	);
};

export default Drawer;
