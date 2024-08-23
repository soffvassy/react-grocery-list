import React from 'react'import {useState} from 'react'import ReactDOM from 'react-dom/client'//import App from './App.jsx'import '/css/style.css'const Header = (props) => {	console.log(props);	return (		<header>		<h1>{props.title}</h1>		<span className="total-items">Items: {props.itemTotal}</span>		<button className="add-item" onClick={() => props.getName()}>ADD</button>		</header>	)}const Item = (props) => {	return (		<div className="item">			<button className="remove-item" onClick={() => props.removeItem(props.id)} />			<span className="item-name">{props.name}</span>			<Counter updateItemQuantity={props.updateItemQuantity} id={props.id} quantity={props.quantity}/>		</div>	)}const Counter = (props) => {	const [quantity, setQuantity] = useState(props.quantity);	const incrementQuantity = () => {		const newQuantity = quantity + 1;		setQuantity(newQuantity);		props.updateItemQuantity(props.id, newQuantity);	}	const decrementQuantity = () => {		if (quantity > 0) {			const newQuantity = quantity - 1;			setQuantity(newQuantity);			props.updateItemQuantity(props.id, newQuantity);		}	}	return (		<div className="quantity">			<span className="qty-label">QTY</span>			<button className="increment" onClick={incrementQuantity}>+</button>			<button className="decrement" onClick={decrementQuantity}>-</button>			<span className="quantity-amount">{quantity}</span>		</div>	)}const App = () => {	const [items, setItems] = useState([	{		name: "Apples",		id: 1,		quantity: 2	},	{		name: "Bananas",		id: 2,		quantity: 1	},	{		name: "Box of Pasta",		id: 3,		quantity: 1	},	{		name: "Cookies",		id: 4,		quantity: 1	}]);	const updateItemQuantity = (id, quantity) => {		setItems(prevItems =>			prevItems.map(item =>				item.id === id ? { ...item, quantity: quantity } : item			)		);	};    const removeItem = (id) => {    	setItems(prevItems => prevItems.filter(i => i.id !== id))	}	const getName = () => {		const name = prompt('Please enter new item:');		addItem(name);	}	const addItem = (name) => {		let id;		items.length ? id=items[items.length-1].id + 1 : id=1;		console.log(items.length);		console.log(id);		setItems(items.concat({name: name, id:id, quantity: 1}));	}	const totalItems = (items) => {		const r=items.map(item => item.quantity);		console.log(r);		const initialValue=0;		const allItems = r.reduce(		  (accumulator, currentValue) => accumulator + currentValue,		  initialValue,		);		console.log(allItems);		return(allItems);	}	const Footer = (props) => {	return (		<footer>		<h1>{props.title}</h1>		<span className="total-items">Items: {props.totalItems(items)}</span>		</footer>	)}	return (		<div className="grocery-list">			<Header 				title="Grocery List" 				itemTotal={items.length}				getName={getName} />			{/*Grocery List */}			{items.map(item => 				<Item name={item.name} id={item.id} removeItem={removeItem} key={item.id} quantity={item.quantity}					updateItemQuantity={updateItemQuantity}/>				)}			<Footer			title="All items"			totalItems={totalItems}			/>		</div>	)}ReactDOM.createRoot(document.getElementById('root')).render(  <React.StrictMode>    <App />  </React.StrictMode>,)