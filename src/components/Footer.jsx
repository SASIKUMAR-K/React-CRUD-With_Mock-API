import { Link } from 'react-router-dom';

const Footer = () => {
	return (
		<footer className='bg-light text-dark py-4 mt-5'>
			<div className='container'>
				<div className='row'>
					<div className='col-md-4 mb-3'>
						<h5>About Us</h5>
						<p>
							We are dedicated to providing the best products and services to
							our customers. Our goal is to ensure customer satisfaction with
							quality and excellence.
						</p>
					</div>

					<div className='col-md-4 mb-3'>
						<h5>Quick Links</h5>
						<ul className='list-unstyled'>
							<li>
								<Link to='/' className='text-dark text-decoration-none'>
									Home
								</Link>
							</li>
							<li>
								<Link to='/products' className='text-dark text-decoration-none'>
									Products
								</Link>
							</li>
							<li>
								<Link to='/admin' className='text-dark text-decoration-none'>
									Admin
								</Link>
							</li>
						</ul>
					</div>
					<div className='col-md-4 mb-3'>
						<h5>Contact Us</h5>
						<p className='text-dark text-decoration-none'>
							Sasikumar K <br />
							+918122104263 <br />
							sasikumar05112004@gmail.com
						</p>
					</div>
				</div>

				<div className='text-center border-top pt-3'>
					<p className='mb-0'>
						&copy; {new Date().getFullYear()}{' '}
						<a href='https://sasikumar-k.web.app' target='_blank'>
							Sasikumar K
						</a>
						. All rights reserved.
					</p>
				</div>
			</div>
		</footer>
	);
};

export default Footer;
