import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';

const Products = () => {
	const [products, setProducts] = useState([]);
	const [searchTerm, setSearchTerm] = useState('');

	useEffect(() => {
		fetch(import.meta.env.VITE_API_BASE_URL)
			.then((response) => response.json())
			.then((data) => setProducts(data))
			.catch((error) => console.error('Error fetching data:', error));
	}, []);

	const filteredProducts = products.filter((product) =>
		product.product_name.toLowerCase().includes(searchTerm.toLowerCase())
	);

	return (
		<>
			<Navbar />
			<div className='container mt-4'>
				<h3>All Products</h3>
				<div className='mb-3'>
					<input
						type='text'
						className='form-control'
						placeholder='Search products...'
						value={searchTerm}
						onChange={(e) => setSearchTerm(e.target.value)}
					/>
				</div>
				<div className='row'>
					{filteredProducts.map((product) => (
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
				{filteredProducts.length === 0 && (
					<p className='text-center'>No products found.</p>
				)}
			</div>
			<Footer></Footer>
		</>
	);
};

export default Products;
