import { LocateFixed } from 'lucide-react';
import './LocationButton.css';

function LocationButton({ setCoords, setError }) {
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

	return (
		<button type="button" onClick={handleLocation} className="location">
			<LocateFixed className="location_icon" />
		</button>
	);
}

export default LocationButton;
