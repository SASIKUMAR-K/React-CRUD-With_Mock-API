import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from './Navbar';
import Carousel from './Carousel';
import Footer from './Footer';

const Home = () => {
	const [products, setProducts] = useState([]);

	useEffect(() => {
		fetch(import.meta.env.VITE_API_BASE_URL)
			.then((response) => response.json())
			.then((data) => setProducts(data.slice(0, 4))) // Fetch only first 4 products
			.catch((error) => console.error('Error fetching data:', error));
	}, []);

	return (
		<>
			<Navbar />
			<Carousel />
			<div className='container mt-4'>
				<div className='mb-4'>
					<span className='h2'>Recent Products</span>
					{'    -   '}
					<Link to='/products' className=''>
						View All Products
					</Link>
				</div>
				<div className='row'>
					{products.map((product) => (
						<div className='col-md-3 mb-3' key={product.id}>
							<div className='card'>
								<img
									src={product.product_image}
									className='card-img-top'
									alt={product.product_name}
									style={{ height: '200px', objectFit: 'cover' }}
								/>
								<div className='card-body'>
									<h5 className='card-title'>{product.product_name}</h5>
									<p className='card-text'>Price: ${product.price_per_unit}</p>
									<Link
										to={`/products/${product.id}`}
										className='btn btn-primary'
									>
										View More
									</Link>
								</div>
							</div>
						</div>
					))}
				</div>
			</div>
			<Footer></Footer>
		</>
	);
};

export default Home;
