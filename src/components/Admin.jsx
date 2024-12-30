import { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import Navbar from './Navbar';
import Footer from './Footer';

const Admin = () => {
	const [loggedIn, setLoggedIn] = useState(false);
	const [products, setProducts] = useState([]);
	const [userName, setUserName] = useState('');
	const [password, setPassword] = useState('');
	const [showPassword, setShowPassword] = useState(false);

	const ENV_USERNAME = import.meta.env.VITE_ADMIN_USERNAME;
	const ENV_PASSWORD = import.meta.env.VITE_ADMIN_PASSWORD;

	const fetchProducts = () => {
		fetch(import.meta.env.VITE_API_BASE_URL)
			.then((response) => response.json())
			.then((data) => setProducts(data))
			.catch((error) => console.error('Error fetching products:', error));
	};

	useEffect(() => {
		if (loggedIn) fetchProducts();
	}, [loggedIn]);

	const handleLogin = () => {
		if (userName !== ENV_USERNAME) {
			Swal.fire('Error', 'Username is incorrect', 'error');
		} else if (password !== ENV_PASSWORD) {
			Swal.fire('Error', 'Password is incorrect', 'error');
		} else {
			Swal.fire('Success', 'Successfully logged in', 'success');
			setLoggedIn(true);
		}
	};

	const handleLogout = () => {
		setLoggedIn(false);
		setUserName('');
		setPassword('');
	};

	const handleAddOrEditProduct = (product = null) => {
		const isEditing = product !== null;

		Swal.fire({
			title: isEditing ? 'Edit Product' : 'Add Product',
			html: `
				<input id="supplier_name" class="swal2-input" placeholder="Supplier Name" value="${
					product?.supplier_name || ''
				}">
				<input id="product_name" class="swal2-input" placeholder="Product Name" value="${
					product?.product_name || ''
				}">
				<input id="quantity_ordered" type="number" class="swal2-input" placeholder="Quantity Ordered" value="${
					product?.quantity_ordered || ''
				}">
				<input id="delivery_date" type="date" class="swal2-input" placeholder="Delivery Date">
				<input id="price_per_unit" type="number" class="swal2-input" placeholder="Price Per Unit" value="${
					product?.price_per_unit || ''
				}">
				<input id="total_cost" type="number" class="swal2-input" placeholder="Total Cost" value="${
					product?.total_cost || ''
				}">
				<input id="invoice_number" class="swal2-input" placeholder="Invoice Number" value="${
					product?.invoice_number || ''
				}">
				<input id="tracking_id" class="swal2-input" placeholder="Tracking ID" value="${
					product?.tracking_id || ''
				}">
				<input id="product_image" class="swal2-input" placeholder="Product Image URL" value="${
					product?.product_image || ''
				}">
			`,
			showCancelButton: true,
			confirmButtonText: isEditing ? 'Save' : 'Add',
			preConfirm: () => {
				const supplier_name = document.getElementById('supplier_name').value;
				const product_name = document.getElementById('product_name').value;
				const quantity_ordered =
					document.getElementById('quantity_ordered').value;
				const delivery_date =
					new Date(document.getElementById('delivery_date').value).getTime() /
					1000;
				const price_per_unit = document.getElementById('price_per_unit').value;
				const total_cost = document.getElementById('total_cost').value;
				const invoice_number = document.getElementById('invoice_number').value;
				const tracking_id = document.getElementById('tracking_id').value;
				const product_image = document.getElementById('product_image').value;

				return {
					supplier_name,
					product_name,
					quantity_ordered,
					delivery_date,
					price_per_unit,
					total_cost,
					invoice_number,
					tracking_id,
					product_image,
				};
			},
		}).then((result) => {
			if (result.isConfirmed) {
				if (isEditing) {
					fetch(`${import.meta.env.VITE_API_BASE_URL}/${product.id}`, {
						method: 'PUT',
						headers: { 'Content-Type': 'application/json' },
						body: JSON.stringify(result.value),
					}).then(() => fetchProducts());
				} else {
					fetch(import.meta.env.VITE_API_BASE_URL, {
						method: 'POST',
						headers: { 'Content-Type': 'application/json' },
						body: JSON.stringify(result.value),
					}).then(() => fetchProducts());
				}
				Swal.fire('Success', 'Added successfully', 'success');
			}
		});
	};

	const handleDeleteProduct = (id) => {
		Swal.fire({
			title: 'Are you sure?',
			text: 'This action cannot be undone.',
			icon: 'warning',
			showCancelButton: true,
			confirmButtonText: 'Yes, delete it!',
		}).then((result) => {
			if (result.isConfirmed) {
				fetch(`${import.meta.env.VITE_API_BASE_URL}/${id}`, {
					method: 'DELETE',
				}).then(() => fetchProducts());
				Swal.fire('Deleted', 'The product has been deleted.', 'success');
			}
		});
	};

	return (
		<>
			<Navbar />
			<div className='container mt-4'>
				{!loggedIn ? (
					<div className='login-form'>
						<h2 className='text-center mb-4'>LOGIN</h2>
						<div className='row justify-content-center'>
							<div className='col-md-6 col-lg-4'>
								<div className='p-4 border rounded shadow-sm'>
									<div className='mb-3'>
										<input
											type='text'
											placeholder='Username'
											value={userName}
											onChange={(e) => setUserName(e.target.value)}
											className='form-control mb-2'
										/>
									</div>
									<div className='mb-3'>
										<div className='input-group'>
											<input
												type={showPassword ? 'text' : 'password'}
												className='form-control'
												placeholder='Password'
												value={password}
												onChange={(e) => setPassword(e.target.value)}
											/>
											<button
												type='button'
												className='btn btn-outline-secondary'
												onClick={() => setShowPassword(!showPassword)}
											>
												{showPassword ? 'Hide' : 'Show'}
											</button>
										</div>
									</div>
									<button onClick={handleLogin} className='btn btn-primary'>
										Login
									</button>
								</div>
							</div>
						</div>
					</div>
				) : (
					<>
						<div className='d-flex justify-content-between align-items-center'>
							<h3>Admin Dashboard</h3>
							<button onClick={handleLogout} className='btn btn-danger'>
								Logout
							</button>
						</div>
						<button
							onClick={() => handleAddOrEditProduct()}
							className='btn btn-success my-3'
						>
							Add Product
						</button>
						<div className='row'>
							{products.map((product) => (
								<div className='col-md-4 mb-3' key={product.id}>
									<div className='card'>
										<img
											src={product.product_image}
											className='card-img-top'
											alt={product.product_name}
											style={{ height: '200px', objectFit: 'cover' }}
										/>
										<div className='card-body'>
											<h5 className='card-title'>{product.product_name}</h5>
											<p>Supplier: {product.supplier_name}</p>
											<p>Price: ${product.price_per_unit}</p>
											<div className='d-flex justify-content-between'>
												<button
													onClick={() => handleAddOrEditProduct(product)}
													className='btn btn-warning'
												>
													Edit
												</button>
												<button
													onClick={() => handleDeleteProduct(product.id)}
													className='btn btn-danger'
												>
													Delete
												</button>
											</div>
										</div>
									</div>
								</div>
							))}
						</div>
					</>
				)}
			</div>
			<Footer></Footer>
		</>
	);
};

export default Admin;
