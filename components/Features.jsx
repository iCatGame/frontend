import Project from './Feature';
import SectionTitle from './SectionTitle';

const Features = () => {
	return (
		<div
			id='projects'
			className='relative w-full bg-neutral-100 px-[10vw] pb-36 2xl:px-[12.5vw]'>
			<SectionTitle title='项目特色' />
			<div className='flex flex-col gap-[70px] xl:gap-[90px]'>
				<Project
					name='开发文档'
					desc='View information about millions of movies, including cast, crew, plot overviews, trailers, and more. Create an account to leave reviews on movies, build movie list, and save movies to your watchlist and favorites.'
					stack={['Python', 'Flask', 'PostgreSQL']}
					links={[
						['github', 'https://github.com/lukeaelder/MovieR-L'],
						['external', 'https://movierandl.herokuapp.com/'],
					]}
                    images={['/images/doc.png','/images/doc.png','/images/doc.png']}
				/>
				<div className='my-3 h-[1px] w-full bg-neutral-300'></div>
                <Project
                    name='SVG Icon Library'
                    desc='A collection of SVG icons perfect for use on websites or apps. Search through all the icons online to find the one you need or install it as a package for easy use.'
                    stack={['Next.js', 'Tailwind CSS', 'Fuse.js', 'Rollup']}
                    links={[
                        ['github', 'https://github.com/lukeaelder/eldicons'],
                        ['external', 'https://eldicons.com'],
                    ]}
                    images={['/images/doc.png','/images/doc.png']}
                    />
                <div className='my-3 h-[1px] w-full bg-neutral-300'></div>
                <Project
                    name='Developer Toolbox'
                    desc='A collection of easy to use tools for developers, ranging from simple tools performing string manipulation to more advanced tools.'
                    stack={['Next.js', 'Tailwind CSS', 'GSAP']}
                    links={[
                        ['github', null],
                        ['external', 'https://wdtoolbox.com'],
                    ]}
                    images={['/images/doc.png','/images/doc.png','/images/doc.png']}
                />
                <div className='my-3 h-[1px] w-full bg-neutral-300'></div>
				<Project
					name='Group Task App'
					desc='Create groups and invite other users, to schedule and communicate on group projects. Inside groups users can make announcements, create task, update tasks progress, send realtime messages, and make video calls.'
					stack={[
						'React',
						'Node.js',
						'PostgreSQL',
						'Express',
						'socket.io',
						'WebRTC',
					]}
					links={[
						[
							'github',
							'https://github.com/lukeaelder/Capstone2-groupscheduler',
						],
						['external', 'https://c2-scheduler.surge.sh'],
					]}
                    images={['/images/doc.png','/images/doc.png']}
				/>
			</div>
		</div>
	);
};

export default Features;
