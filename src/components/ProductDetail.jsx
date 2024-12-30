import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';

const ProductDetail = () => {
	const { id } = useParams();
	const [product, setProduct] = useState(null);
	const navigate = useNavigate();

	useEffect(() => {
		fetch(`${import.meta.env.VITE_API_BASE_URL}/${id}`)
			.then((response) => response.json())
			.then((data) => setProduct(data))
			.catch((error) =>
				console.error('Error fetching product details:', error)
			);
	}, [id]);

	if (!product) {
		return (
			<>
				<Navbar />
				<div className='container mt-4'>
					<p>Loading product details...</p>
				</div>
			</>
		);
	}
	function handleBack() {
		navigate(-1);
	}

	return (
		<>
			<Navbar />
			<div className='container mt-4'>
				<div className='row'>
					<div className='col-md-6'>
						<img
							src={product.product_image}
							alt={product.product_name}
							className='img-fluid'
						/>
					</div>
					<div className='col-md-6'>
						<h3>{product.product_name}</h3>
						<p>
							<strong>Supplier:</strong> {product.supplier_name}
						</p>
						<p>
							<strong>Price Per Unit:</strong> ${product.price_per_unit}
						</p>
						<p>
							<strong>Quantity Ordered:</strong> {product.quantity_ordered}
						</p>
						<p>
							<strong>Total Cost:</strong> ${product.total_cost}
						</p>
						<p>
							<strong>Delivery Date:</strong>{' '}
							{new Date(product.delivery_date * 1000).toLocaleDateString()}
						</p>
						<p>
							<strong>Order Status:</strong>{' '}
							{product.order_status ? 'Completed' : 'Pending'}
						</p>
					</div>
				</div>
				<button className='btn btn-primary' onClick={handleBack}>
					Back
				</button>
			</div>
			<Footer></Footer>
		</>
	);
};

export default ProductDetail;
