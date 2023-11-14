// DashboardCard.tsx
import React from 'react';
import { berlin } from '@/styles/fonts';
import Link from 'next/link';
interface DashboardCardProps {
	title: string;
	backgroundColor: string;
	textColor: string;
	link?: string;
	icon?: JSX.Element;
}

const DashboardCard: React.FC<DashboardCardProps> = ({
	title,
	backgroundColor,
	link,
	icon,
}) => {
	const cardClassName = ` ${backgroundColor} rounded-lg flex flex-row grow flex-1 items-end`;

	return (
		<Link href={link ? link : '/dashboard/#'}>
			<div className={cardClassName + ' min-h-[150px] relative'}>
				{icon ? (
					<span className='text-white/20 text-[150px] absolute'>{icon}</span>
				) : (
					''
				)}

				<p
					className={
						`text-2xl whitespace-normal text-white p-2 max-w-[80px] ` +
						berlin.className
					}
				>
					{title}
				</p>
			</div>
		</Link>
	);
};

export default DashboardCard;
