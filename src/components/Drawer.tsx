import React from 'react';
import Icon from './Icon';

const Drawer: React.FC = () => {
	return (
		<div className="shadow drawer absolute bg-[#282830]">
            <input id="my-drawer" type="checkbox" className="drawer-toggle" />

            <div className="flex flex-col drawer-content w-screen">
                <div className="w-full px-4 pt-5">
                    <label htmlFor="my-drawer" className="btn-primary drawer-button">
                        <Icon
                            className="cursor-pointer"
                            name='drawer'
                            colorFn={({ hover }: { hover: Boolean }) => hover ? 'white' : 'grey'}
                        />
                    </label>
                </div>
            </div>

            <div className="drawer-side h-screen">
                <label htmlFor="my-drawer" className="drawer-overlay z-10 cursor-default" />
                <ul className="menu p-4 overflow-y-auto w-3/6 bg-base-100 text-base-content z-20">
                    <li>
                        <a>Menu Item</a>
                    </li>
                    <li>
                        <a>Menu Item</a>
                    </li>
                    <li>
                        <a>Menu Item</a>
                    </li>
                    <li>
                        <a>Menu Item</a>
                    </li>
                    <li>
                        <a>Menu Item</a>
                    </li>
                </ul>
            </div>

        </div>
	);
};

export default Drawer;
