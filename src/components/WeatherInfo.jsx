import React from 'react';
import {
	MapPin,
	Droplets,
	CircleGauge,
	Eye,
	Wind,
	Cloudy,
	Thermometer,
	Sunrise,
	Sunset,
} from 'lucide-react';
import './WeatherInfo.css';

function WeatherInfo({ weather, unit, setUnit }) {
	const now = new Date();
	const formattedDate = now.toLocaleDateString();
	const formattedTime = now.toLocaleTimeString([], {
		hour: '2-digit',
		minute: '2-digit',
	});

	const toFahrenheit = (celsius) => (celsius * 9) / 5 + 32;
	const toCelsius = (fahrenheit) => ((fahrenheit - 32) * 5) / 9;

	const temp = unit === 'metric' ? weather.temp : toFahrenheit(weather.temp);
	const feelsLike =
		unit === 'metric' ? weather.feels_like : toFahrenheit(weather.feels_like);

	const toggleUnit = () => {
		setUnit(unit === 'metric' ? 'imperial' : 'metric');
	};

	return (
		<div className="card_info">
			<h1 className="card_title">
				<MapPin className="card_icon" />
				{weather.name}, <span className="card_span">{weather.country}</span>
			</h1>

			<p className="card_datetime">
				Fecha: {formattedDate} | Hora actual: {formattedTime}
			</p>

			<img
				className="card_image"
				src={`https://openweathermap.org/img/wn/${weather.icon}@4x.png`}
				alt={weather.description}
			/>

			<h1 className="card_temp">
				{Math.ceil(temp)}°{unit === 'metric' ? 'C' : 'F'}
			</h1>

			<button className="unit-toggle" onClick={toggleUnit}>
				Cambiar a °{unit === 'metric' ? 'F' : 'C'}
			</button>

			<p className="card_description">
				<q>{weather.description}</q>
			</p>

			<div className="card_details">
				<p className="card_details-item">
					<Droplets className="card_details-icon" />
					<span className="card_details-item-text">
						Humedad
						<span className="card_details-item-value">{weather.humidity}%</span>
					</span>
				</p>

				<p className="card_details-item">
					<CircleGauge className="card_details-icon" />
					<span className="card_details-item-text">
						Presión
						<span className="card_details-item-value">
							{weather.pressure} hpa
						</span>
					</span>
				</p>

				<p className="card_details-item">
					<Eye className="card_details-icon" />
					<span className="card_details-item-text">
						Visibilidad
						<span className="card_details-item-value">
							{weather.visibility} km
						</span>
					</span>
				</p>

				<p className="card_details-item">
					<Wind className="card_details-icon" />
					<span className="card_details-item-text">
						Viento
						<span className="card_details-item-value">{weather.wind} km/h</span>
					</span>
				</p>

				<p className="card_details-item">
					<Cloudy className="card_details-icon" />
					<span className="card_details-item-text">
						Nubes
						<span className="card_details-item-value">{weather.clouds}%</span>
					</span>
				</p>

				<p className="card_details-item">
					<Thermometer className="card_details-icon" />
					<span className="card_details-item-text">
						Sensación
						<span className="card_details-item-value">
							{Math.ceil(feelsLike)}°{unit === 'metric' ? 'C' : 'F'}
						</span>
					</span>
				</p>

				<p className="card_details-item">
					<Sunrise className="card_details-icon" />
					<span className="card_details-item-text">
						Amanecer
						<span className="card_details-item-value">{weather.sunrise}</span>
					</span>
				</p>

				<p className="card_details-item">
					<Sunset className="card_details-icon" />
					<span className="card_details-item-text">
						Atardecer
						<span className="card_details-item-value">{weather.sunset}</span>
					</span>
				</p>
			</div>
		</div>
	);
}

export default WeatherInfo;
