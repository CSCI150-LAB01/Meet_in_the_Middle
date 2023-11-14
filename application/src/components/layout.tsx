'use client';

import React, { PropsWithChildren } from 'react';
import NavbarDesktop from './navbar';

const Layout = ({ children }: PropsWithChildren) => {
	return (
		<>
			<div className='container'>{children}</div>
		</>
	);
};

export default Layout;
