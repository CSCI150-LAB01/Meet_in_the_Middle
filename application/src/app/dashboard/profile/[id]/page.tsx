'use client';
import { berlin } from '@/styles/fonts';
import { Avatar } from '@nextui-org/react';

export default function Profile({ params }: { params: { id: string } }) {
	return (
		<div className='flex w-full justify-center'>
			<div className='flex min-h-screen flex-col lg:px-24 w-full max-w-[1080px] w-full p-5 gap-5 sm:text-left text-center items-center sm:items-start'>
				<h1
					className={berlin.className + ' text-4xl sm:text-6xl text-zinc-700'}
				>
					Profile
				</h1>
				<Avatar
					name='Joe Momma'
					className='w-[180px] h-[180px] text-xl z-[0]'
				/>
				<div>
					<h3 className='text-2xl text-primary font-bold'>Joe Momma</h3>
					<p className='text-md text-zinc-700'>joe@gmail.com</p>
				</div>

				<div>
					<h3 className='text-2xl text-primary font-bold'>
						Default Home Location
					</h3>
				</div>

				<div>
					<h3 className='text-2xl text-primary font-bold'>Bio</h3>
					<p className='text-md text-zinc-700 text-left'>
						Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus
						quis sem non ex hendrerit pulvinar. Aliquam consequat augue ac nibh
						tempor, non porta erat posuere. Etiam sem erat, placerat non enim
						vel, faucibus laoreet tellus. Pellentesque dui arcu, egestas
						lobortis lectus ac, volutpat ultrices metus. In et imperdiet ligula.
						Curabitur venenatis bibendum feugiat. Ut tempus rhoncus libero, nec
						scelerisque urna dapibus quis. Nam vel elit porttitor, maximus metus
						id, dictum metus. In a quam ante. Aliquam gravida posuere maximus.
						Vivamus cursus vel turpis sed posuere. Sed cursus tempor ante at
						feugiat. Duis luctus dolor non sapien varius mollis at quis libero.
					</p>
				</div>
			</div>
		</div>
	);
}
