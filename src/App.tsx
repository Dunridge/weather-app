import { useEffect, useState } from "react";
import Footer from "./components/Footer";
import Header from "./components/header/Header";
import LocationSearch from "components/body/LocationSearch";
import { IWeatherLocationResult } from "utils/interfaces/IWeatherLocationResult";
import { IWeatherGeometry } from "utils/interfaces/IWeatherGeometry";
import { IWeatherResult } from "utils/interfaces/IWeatherResult";

export default function App() {
    const [location, setLocation] = useState('');
	const [weatherData, setWeatherData] = useState<IWeatherResult[]>([]);

	useEffect(() => {
		// const index = 94107; // TODO: test this with the city name
		// fetchWeather(index);
		// test(); // this works and it accepts text for the city too 
	}, []);

	// const test = async () => {
	// 	getCityOrZipCoordinates(94107);
	// };

	useEffect(() => {
		if (weatherData.length !== 0) {
			console.log("All Weather Data:", weatherData);
			debugger;
		}
	}, [weatherData]);

	const fetchWeather = async (index: string) => {
		const weatherData: IWeatherResult[] = await getWeatherByIndexOrCity(index);
		setWeatherData(weatherData);
	};

	// TODO: test it with a city name to see if it works without modifications
	const getWeatherByIndexOrCity = async (index: string): Promise<IWeatherResult[]> => {
		const results: IWeatherLocationResult[] = await getCityOrZipCoordinates(index);
		const locationGeometries: IWeatherGeometry[] = results.map((match: IWeatherLocationResult) => ({ lat: match.geometry.lat, lng: match.geometry.lng } as IWeatherGeometry));

		let allWeatherData: IWeatherResult[] = [];

		try {
			const weatherPromises = locationGeometries.map(async (geometry: IWeatherGeometry) => {
				const { lat, lng } = geometry;
				const weatherData = await getCurrentWeather(lat, lng);
				return weatherData;
			});
			// TODO: add an interface
			allWeatherData = await Promise.all(weatherPromises);
			debugger;
		} catch (error) {
			console.error(error);
			debugger;
		}

		return allWeatherData;
	};

	const getCurrentWeather = async (latitude: number, longitude: number) => {
		const apiKey = process.env.REACT_APP_OPENWEATHER_KEY;
		const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}`;
		const endpointUrl = "https://corsproxy.io/?" + encodeURIComponent(url);

		let currentWeather = {} as IWeatherResult;

		try {
			const response = await fetch(endpointUrl,
				{
					method: "GET",
					headers: {
						"Content-Type": "application/json",
					},
				}
			);

			const data: IWeatherResult = await response.json();
			currentWeather = data;
			console.log("data", data);
		} catch (error) {
			console.error(error);
		}

		return currentWeather;
	};

	// TODO: test to retreive the coordinates by the city name 
	const getCityOrZipCoordinates = async (indexOrCity: string): Promise<IWeatherLocationResult[]> => {
		const apiKey = process.env.REACT_APP_GEOCODING_KEY;
		const requestUrl = `https://api.opencagedata.com/geocode/v1/json?q=${indexOrCity}&key=${apiKey}`;
		let results: IWeatherLocationResult[] = [];

		try {
			const response = await fetch(requestUrl,
				{
					mode: "cors",
					method: "GET",
					headers: {
						"Content-Type": "application/json",
					},
				}
			);

			const data = await response.json();
			debugger;
			results = data.results;
		} catch (error) {
			console.error(error);
		}

		return results;
	};

	const fetchForecast = async () => {
		const lat = 33.44;
		const lon = -94.04;

		getForecastWeather(lat, lon);
		debugger;
	};

	// TODO: get the forecast weather 
	const getForecastWeather = async (latitude: number, longitude: number) => {
		const apiKey = process.env.REACT_APP_GEOCODING_KEY;
		const fetchUrl = `https://api.openweathermap.org/data/3.0/onecall?lat=${latitude}&lon=${longitude}&appid=${apiKey}`;
	
		try {
			const response = await fetch(fetchUrl,
				{
					mode: "cors",
					method: "GET",
					headers: {
						"Content-Type": "application/json",
					},
				}
			);

			const data = await response.json();
			debugger;
		} catch (error) {
			console.error(error);
			debugger;
		}
	};

	return (
		<div className="h-screen flex flex-col bg-secondary">
			<Header />
			<div className="flex-grow bg-secondary px-[40px] pt-[60px] pb-[120px]">
				<LocationSearch location={location} 
								setLocation={setLocation}
								fetchWeather={fetchWeather}
								fetchForecast={fetchForecast}
								weatherData={weatherData}
								/>
			</div>
			<Footer />
		</div>
	);
}
