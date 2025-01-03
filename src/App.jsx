import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import Products from './components/Products';
import Admin from './components/Admin';
import ProductDetail from './components/ProductDetail';

const App = () => {
	return (
		<Router>
			<Routes>
				<Route path='/' element={<Home />} />
				<Route path='/products' element={<Products />} />
				<Route path='/products/:id' element={<ProductDetail />} />
				<Route path='/admin' element={<Admin />} />
			</Routes>
		</Router>
	);
};

export default App;
