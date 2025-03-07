import React from 'react';
import './quote-card.css';

const QuoteCard = ({ name, message, datetime }) => {
	const date = new Date(datetime);
	const formattedDate = date.toLocaleString('en-US', {
		month: 'long',
		day: 'numeric',
		year: 'numeric',
	});

	return (
		<div className='card'>
			<div className='quote-container'>
				<p className='quote-text'>"{message}"</p>
			</div>
			<div className='info-container'>
				<p className='name'>- {name}</p>
				<p className='date'>{formattedDate}</p>
			</div>
		</div>
	);
};

export default QuoteCard;
