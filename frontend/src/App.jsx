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
				const response = await axios.get('/api/quote');
				setQuotes(response.data);
				console.log(response.data);
			} catch (error) {
				console.log(error.message);
			}
		}

		fetchData();
	}, [quoteFilter]);

	return (
		<div className='App'>
			{/* TODO: include an icon for the quote book */}
			<div className='title'>
				<h1>Hack at UCI Tech Deliverable</h1>
			</div>

			<div className='content-container'>
				<div className='form-container'>
					<h2>Submit a quote</h2>
					{/* TODO: implement custom form submission logic to not refresh the page */}
					<form action='/api/quote' method='post'>
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
							console.log(e.target.value);
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
