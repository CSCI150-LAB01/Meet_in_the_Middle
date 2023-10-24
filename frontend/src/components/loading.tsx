"use client";
import { Card, Skeleton, Button } from "@nextui-org/react";

export default function CardLoading() {
	const isLoaded = false;
	return (
		<>
			<div className="flex flex-col gap-3 w-full p-5">
				<Card className="w-full flex-1 space-y-5 p-4" radius="lg">
					<Skeleton isLoaded={isLoaded} className="rounded-lg">
						<div className="h-24 rounded-lg bg-secondary"></div>
					</Skeleton>
					<div className="space-y-3">
						<Skeleton isLoaded={isLoaded} className="w-3/5 rounded-lg">
							<div className="h-3 w-full rounded-lg bg-secondary"></div>
						</Skeleton>
						<Skeleton isLoaded={isLoaded} className="w-4/5 rounded-lg">
							<div className="h-3 w-full rounded-lg bg-secondary-300"></div>
						</Skeleton>
						<Skeleton isLoaded={isLoaded} className="w-2/5 rounded-lg">
							<div className="h-3 w-full rounded-lg bg-secondary-200"></div>
						</Skeleton>
					</div>
				</Card>
			</div>
		</>
	);
}
