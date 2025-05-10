import { useEffect, useState } from 'react';
import axios from 'axios';
import Search from './components/Search';
import LocationButton from './components/LocationButton';
import WeatherInfo from './components/WeatherInfo';
import './App.css';
import { AlertCircle } from 'lucide-react';
import { BASE_URL, API_KEY, options } from './lib/utils';

function App() {
	const [weather, setWeather] = useState({});
	const [error, setError] = useState(null);
	const [city, setCity] = useState('Pereira');
	const [coords, setCoords] = useState({ lat: 0, lon: 0 });
	const [unit, setUnit] = useState('metric');

	const handleLocation = () => {
		if (navigator.geolocation) {
			function success({ coords }) {
				setCoords({ lat: coords.latitude, lon: coords.longitude });
			}
			function error() {
				setError('Debes permitir la geolocalización');
			}

			navigator.geolocation.getCurrentPosition(success, error);
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
		axios
			.get(
				`${BASE_URL}${
					lat !== 0 && lon !== 0 ? `lat=${lat}&lon=${lon}` : `q=${city}`
				}&appid=${API_KEY}&units=${unit}${options}`,
			)

			.then((res) => {
				console.log(res.data);

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
			})

			.catch((err) => {
				if (err.response?.status === 404) {
					setError('Ciudad no encontrada');
				}
				console.error(err.response?.data?.message || err.message);
			});
	};

	const getWeatherClass = (description) => {
		if (!description) return '';

		const lower = description.toLowerCase();
		if (lower.includes('sun')) return 'sunny';
		if (lower.includes('cloud')) return 'cloudy';
		if (lower.includes('rain') || lower.includes('drizzle')) return 'rainy';
		if (lower.includes('snow')) return 'snowy';

		return '';
	};

	return (
		<div className={`app-container ${getWeatherClass(weather.description)}`}>
			<div className="overlay">
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
		</div>
	);
}

export default App;
