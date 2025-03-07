import { useEffect, useState } from 'react';
import './App.css';
import axios from 'axios';
import QuoteCard from '../components/QuoteCard/quote-card';

function App() {
	const [quotes, setQuotes] = useState([]);
	const [quoteFilter, setQuoteFilter] = useState('week');

	useEffect(() => {
		async function fetchData() {
			try {
				const response = await axios.get('/api/quote', {
					params: {
						filter: quoteFilter,
					},
				});
				setQuotes(response.data);
			} catch (error) {
				console.log(error.message);
			}
		}

		fetchData();
	}, [quoteFilter]);

	const handleQuoteSubmit = async (e) => {
		e.preventDefault();
		const name = e.target.name.value;
		const message = e.target.message.value;

		const formData = new FormData();
		formData.append('name', name);
		formData.append('message', message);

		try {
			const response = await axios.post('/api/quote', formData);

			const newQuote = response.data.quote;

			setQuotes((prevQuotes) => [...prevQuotes, newQuote]);

			e.target.reset();
		} catch (error) {
			console.log(error.message);
		}
	};

	return (
		<div className='App'>
			{/* TODO: include an icon for the quote book */}
			<div className='title'>
				<img className='logo' src='/public/quotebook.png'></img>
				<h1>Hack at UCI Tech Deliverable</h1>
			</div>

			<div className='content-container'>
				<div className='form-container'>
					<h2>Submit a quote</h2>
					{/* TODO: implement custom form submission logic to not refresh the page */}
					<form onSubmit={handleQuoteSubmit}>
						<label htmlFor='input-name'>Name</label>
						<input
							type='text'
							name='name'
							id='input-name'
							required
						/>
						<label htmlFor='input-message'>Quote</label>
						<input
							type='text'
							name='message'
							id='input-message'
							required
						/>
						<button type='submit'>Submit</button>
					</form>
				</div>

				<div className='prev-quotes-container'>
					<h2 className='prev-quotes-title'>Previous Quotes</h2>
					<select
						onChange={(e) => {
							setQuoteFilter(e.target.value);
						}}
					>
						<option value='week'>Past week</option>
						<option value='month'>Past month</option>
						<option value='year'>Past year</option>
						<option value='all'>All time</option>
					</select>
					{/* TODO: Display the actual quotes from the database */}
					<div className='quote-grid'>
						{quotes.map((quote, index) => (
							<QuoteCard
								key={index}
								name={quote.name}
								message={quote.message}
								datetime={quote.time}
							/>
						))}
					</div>
				</div>
			</div>
		</div>
	);
}

export default App;
