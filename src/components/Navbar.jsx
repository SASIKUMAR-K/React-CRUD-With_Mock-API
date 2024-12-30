import { Link } from 'react-router-dom';

const Navbar = () => {
	return (
		<nav className='navbar navbar-expand-lg navbar-light bg-light'>
			<div className='container'>
				<Link className='navbar-brand' to='/'>
					Navbar
				</Link>
				<button
					className='navbar-toggler'
					type='button'
					data-toggle='collapse'
					data-target='#navbarNavDropdown'
					aria-controls='navbarNavDropdown'
					aria-expanded='false'
					aria-label='Toggle navigation'
				>
					<span className='navbar-toggler-icon'></span>
				</button>
				<div className='collapse navbar-collapse' id='navbarNavDropdown'>
					<ul className='navbar-nav'>
						<li className='nav-item'>
							<Link className='nav-link' to='/'>
								Home
							</Link>
						</li>
						<li className='nav-item'>
							<Link className='nav-link' to='/products'>
								Products
							</Link>
						</li>
						<li className='nav-item'>
							<Link className='nav-link' to='/admin'>
								Admin
							</Link>
						</li>
					</ul>
				</div>
			</div>
		</nav>
	);
};

export default Navbar;
