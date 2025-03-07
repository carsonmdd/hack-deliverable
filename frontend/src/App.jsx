import { useEffect, useState } from 'react';
import './App.css';
import axios from 'axios';

function App() {
	const [quotes, setQuotes] = useState([]);
	useEffect(() => {
		async function fetchData() {
			const response = await axios.get('/api/quote');
			setQuotes(response.data);
		}

		fetchData();
	}, []);

	return (
		<div className='App'>
			{/* TODO: include an icon for the quote book */}
			<h1>Hack at UCI Tech Deliverable</h1>

			<h2>Submit a quote</h2>
			{/* TODO: implement custom form submission logic to not refresh the page */}
			<form action='/api/quote' method='post'>
				<label htmlFor='input-name'>Name</label>
				<input type='text' name='name' id='input-name' required />
				<label htmlFor='input-message'>Quote</label>
				<input type='text' name='message' id='input-message' required />
				<button type='submit'>Submit</button>
			</form>

			<h2>Previous Quotes</h2>
			{/* TODO: Display the actual quotes from the database */}
			<div className='messages'>
				{quotes.map((quote, index) => (
					<p key={index}>{quote.message}</p>
				))}
			</div>
		</div>
	);
}

export default App;
