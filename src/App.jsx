import { useEffect, useState } from 'react';
import axios from 'axios';
import Search from './components/Search';
import LocationButton from './components/LocationButton';
import WeatherInfo from './components/WeatherInfo';
import './App.css';
import { BASE_URL, API_KEY, options } from './lib/utils';

function App() {
	const [weather, setWeather] = useState({});
	const [error, setError] = useState(null);
	const [city, setCity] = useState('Pereira');
	const [coords, setCoords] = useState({ lat: 0, lon: 0 });
	const [unit, setUnit] = useState('metric');

	const handleLocation = () => {
		if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition(
				({ coords }) =>
					setCoords({ lat: coords.latitude, lon: coords.longitude }),
				() => setError('Debes permitir la geolocalización'),
			);
		} else {
			setError('Geolocalización no soportada en el navegador');
		}
	};

	useEffect(() => {
		getWeatherByCity();
	}, [city, coords, unit]);

	const getWeatherByCity = async () => {
		const { lat, lon } = coords;
		setError(null);
		try {
			const res = await axios.get(
				`${BASE_URL}${
					lat !== 0 && lon !== 0 ? `lat=${lat}&lon=${lon}` : `q=${city}`
				}&appid=${API_KEY}&units=${unit}${options}`,
			);

			const timeOptions = {
				hour: '2-digit',
				minute: '2-digit',
			};

			setWeather({
				name: res.data.name,
				country: res.data.sys.country,
				temp: Math.ceil(res.data.main.temp),
				description: res.data.weather[0].description,
				humidity: res.data.main.humidity,
				wind: res.data.wind.speed,
				pressure: res.data.main.pressure,
				visibility: res.data.visibility,
				feels_like: res.data.main.feels_like,
				clouds: res.data.clouds.all,
				sunrise: new Date(res.data.sys.sunrise * 1000).toLocaleTimeString(
					[],
					timeOptions,
				),
				sunset: new Date(res.data.sys.sunset * 1000).toLocaleTimeString(
					[],
					timeOptions,
				),
				icon: res.data.weather[0].icon,
			});
		} catch (err) {
			if (err.response?.status === 404) {
				setError('Ciudad no encontrada');
			}
			console.error(err.response?.data?.message || err.message);
		}
	};

	const getBackgroundGif = (description) => {
		if (!description) return '/gifs/Sunny.gif';

		const lower = description.toLowerCase();
		if (lower.includes('sol')) return '/gifs/Sunny.gif';
		if (lower.includes('nubes')) return '/gifs/Cloudy.gif';
		if (lower.includes('lluvia') || lower.includes('drizzle'))
			return '/gifs/Rainy.gif';
		if (lower.includes('nieve')) return '/gifs/Snowy.gif';

		return '/gifs/Sunny.gif';
	};

	return (
		<div
			className="app-container"
			style={{
				backgroundImage: `url(${getBackgroundGif(weather.description)})`,
				backgroundSize: '400px',
				backgroundRepeat: 'repeat',
				backgroundPosition: 'top left',
				minHeight: '100vh',
			}}
		>
			<div className="container">
				<div className="card">
					<div className="card-header">
						<Search setCity={setCity} setCoords={setCoords} />
						<LocationButton setCoords={setCoords} setError={setError} />
					</div>
					<div className="card-body">
						{error && <p>{error}</p>}
						{weather && (
							<WeatherInfo weather={weather} unit={unit} setUnit={setUnit} />
						)}
					</div>
				</div>
			</div>
		</div>
	);
}

export default App;
