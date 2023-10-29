// app/providers.tsx
'use client';
import { SessionProvider } from 'next-auth/react';
import { NextUIProvider } from '@nextui-org/react';

export function Providers(
	{ children }: { children: React.ReactNode },
	session,
) {
	return (
		<SessionProvider session={session}>
			<NextUIProvider>{children}</NextUIProvider>
		</SessionProvider>
	);
}
