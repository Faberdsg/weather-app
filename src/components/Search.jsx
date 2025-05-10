import { SearchIcon } from 'lucide-react';
import React, { useState } from 'react';
import './Search.css';

function Search({ setCoords, setCity }) {
	const [value, setValue] = useState('');

	const handleSubmit = (e) => {
		e.preventDefault();
		setCoords({ lat: 0, lon: 0 });
		setCity(value);
		setValue('');
	};

	return (
		<form onSubmit={handleSubmit} className="search">
			<SearchIcon className="search_icon" />
			<input
				className="search__input"
				type="text"
				value={value}
				onChange={(e) => setValue(e.target.value)}
				placeholder="Buscar ciudad..."
			/>
		</form>
	);
}

export default Search;
