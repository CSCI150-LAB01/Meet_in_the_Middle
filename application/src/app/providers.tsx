// app/providers.tsx
'use client';
import { SessionProvider } from 'next-auth/react';
import { NextUIProvider } from '@nextui-org/react';
import LocationContextProvider from '@/contexts/LocationContext';

export function Providers({ children }: { children: React.ReactNode }) {
	return (
		<SessionProvider>
			<LocationContextProvider>
				<NextUIProvider>{children}</NextUIProvider>
			</LocationContextProvider>
		</SessionProvider>
	);
}
