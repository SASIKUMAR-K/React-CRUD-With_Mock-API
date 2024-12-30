const Carousel = () => {
	const images = [
		'https://www.michiganstateuniversityonline.com/wp-content/uploads/sites/3/2013/11/what-is-supply-chain-management.jpg?w=715&h=375&crop=1',
		'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTMncfC-4NvxPmLKu8lfE18m0QvEoTZQB9yNA&s',
		'https://supplychainmanagement.utk.edu/wp-content/uploads/sites/2/2020/03/blog-ut-haslam-end-to-end-supply-chain-management-2.f9169736-1024x512.jpg',
		'https://blog.tatanexarc.com/wp-content/uploads/2024/01/Components-of-supply-chain-management.png',
		'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQE0EYX-N0bkQ1Sf7qLIyG5uDUA9SxO8WvVZQ&s',
	];

	return (
		<>
			<div
				id='carouselExampleIndicators'
				className='carousel slide'
				data-ride='carousel'
			>
				<ol className='carousel-indicators'>
					{images.map((_, index) => (
						<li
							key={index}
							data-target='#carouselExampleIndicators'
							data-slide-to={index}
							className={index === 0 ? 'active' : ''}
						></li>
					))}
				</ol>
				<div className='carousel-inner'>
					{images.map((image, index) => (
						<div
							key={index}
							className={`carousel-item ${index === 0 ? 'active' : ''}`}
						>
							<img
								className='d-block w-100'
								src={image}
								alt={`Slide ${index + 1}`}
								style={{
									height: '400px',
									objectFit: 'cover',
									width: '100%',
								}}
							/>
						</div>
					))}
				</div>
				<a
					className='carousel-control-prev'
					href='#carouselExampleIndicators'
					role='button'
					data-slide='prev'
				>
					<span
						className='carousel-control-prev-icon'
						aria-hidden='true'
					></span>
					<span className='sr-only'>Previous</span>
				</a>
				<a
					className='carousel-control-next'
					href='#carouselExampleIndicators'
					role='button'
					data-slide='next'
				>
					<span
						className='carousel-control-next-icon'
						aria-hidden='true'
					></span>
					<span className='sr-only'>Next</span>
				</a>
			</div>
		</>
	);
};

export default Carousel;
