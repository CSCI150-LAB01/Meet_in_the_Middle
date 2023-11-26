'use client';
import { AppConfig } from '@/utils/AppConfig';
import Image from 'next/image';
import { berlin } from '@/styles/fonts';
import { Button } from '@nextui-org/react';
import Link from 'next/link';
import {
	MdOutlineChecklist,
	MdOutlineGroups,
	MdOutlineGroups2,
	MdSocialDistance,
} from 'react-icons/md';

export default function Home() {
	return (
		<div className='flex min-h-screen w-full flex-col items-center px-12 lg:px-24'>
			<main className='flex flex-col max-w-[1000px]'>
				{/* Hero */}
				<div className='hero bg-base-200 flex'>
					<div className='hero-content flex flex-col lg:flex-row-reverse justify-content items-center py-20'>
						<Image
							src='/assets/mitm_logo.svg'
							width={250}
							height={250}
							alt='Meet In The Middle Logo'
							className='w-full hidden lg:block'
						/>
						<div className='w-full flex gap-3 flex-col'>
							<h1
								className={`text-5xl font-bold text-primary ${berlin.className}`}
							>
								{AppConfig.title}
							</h1>
							<p className='py-6'>{AppConfig.description}</p>
							<Link href='/user/signup' className='w-fit self-end'>
								<Button color='secondary' variant='ghost' size='lg'>
									Get Started
								</Button>
							</Link>
						</div>
					</div>
				</div>
				{/* Features */}
				<section>
					<div className='container pb-16'>
						<h2
							className={`text-3xl font-semibold text-center mb-8 text-primary ${berlin.className}`}
						>
							Key Features
						</h2>
						<div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5'>
							<div className='bg-white p-6 rounded-lg shadow-md'>
								<MdSocialDistance className='w-12 h-12 mx-auto mb-4 text-primary' />
								<h3 className='text-xl font-semibold mb-2'>
									Streamlined Meetups
								</h3>
								<p className='text-gray-600'>
									Streamline the process of selecting a location.
								</p>
							</div>
							<div className='bg-white p-6 rounded-lg shadow-md'>
								<MdOutlineGroups className='w-12 h-12 mx-auto mb-4 text-primary' />
								<h3 className='text-xl font-semibold mb-2'>
									Social Connectivity
								</h3>
								<p className='text-gray-600'>
									Enhance social connectivity among family, friends, and groups.
								</p>
							</div>
							<div className='bg-white p-6 rounded-lg shadow-md'>
								<MdOutlineChecklist className='w-12 h-12 mx-auto mb-4 text-primary' />
								<h3 className='text-xl font-semibold mb-2'>Easy Planning</h3>
								<p className='text-gray-600'>
									Make event planning more efficient and enjoyable for everyone.
								</p>
							</div>
						</div>
					</div>
				</section>
				{/* About */}
				<section className='py-16'>
					<div className='container'>
						<div className='grid grid-cols-1 md:grid-cols-2 items-center gap-8'>
							<div>
								<h2
									className={`text-3xl font-semibold mb-8 text-primary ${berlin.className}`}
								>
									About Us
								</h2>
								<p className='text-gray-700'>
									This site is created for (CSCI 150) Software Engineering class
									at CSU Fresno. It is a full-stack project created with NextJS,
									AWS, and Google Cloud. The codebase is available for viewing
									on Github.
								</p>

								<Link
									href='https://github.com/CSCI150-LAB01/Meet_in_the_Middle'
									className='w-fit float-right mt-4'
								>
									<Button color='secondary' variant='ghost' size='lg'>
										View the project here
									</Button>
								</Link>
							</div>
							{/* About Image @TODO: Add later */}
						</div>
					</div>
				</section>
				<div className='spacer pb-16' />
			</main>
		</div>
	);
}
