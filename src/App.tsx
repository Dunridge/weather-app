import { useEffect, useState } from "react";
import Footer from "./components/Footer";
import Header from "./components/header/Header";
import LocationSearch from "components/body/LocationSearch";
import { IWeatherLocationResult } from "utils/interfaces/IWeatherLocationResult";
import { IWeatherGeometry } from "utils/interfaces/IWeatherGeometry";
import { IWeatherResult } from "utils/interfaces/IWeatherResult";

export default function App() {
	const [weatherData, setWeatherData] = useState<IWeatherResult[]>([]);

	useEffect(() => {
		fetchWeather();
	}, []);

	useEffect(() => {
		if (weatherData.length !== 0) {
			console.log("All Weather Data:", weatherData);
			debugger;
		}
	}, [weatherData]);

	const fetchWeather = async () => {
		const index = 94107; // TODO: test this with the city name
		const weatherData: IWeatherResult[] = await getWeatherByIndexOrCity(index);
		setWeatherData(weatherData);
	};

	// TODO: test it with a city name to see if it works without modifications
	const getWeatherByIndexOrCity = async (index: number): Promise<IWeatherResult[]> => {
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
		} catch (error) {
			console.error(error);
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

	const getCityOrZipCoordinates = async (index: number): Promise<IWeatherLocationResult[]> => {
		const apiKey = process.env.REACT_APP_GEOCODING_KEY;
		const requestUrl = `https://api.opencagedata.com/geocode/v1/json?q=${index}&key=${apiKey}`;

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
			results = data.results;
		} catch (error) {
			console.error(error);
		}

		return results;
	};

	return (
		<div className="h-screen flex flex-col">
			<Header />
			<div className="flex-grow bg-secondary px-[40px] py-[20px]">
				<LocationSearch getCurrentWeather={getCurrentWeather} />
				{/* <div>Weather App: {process.env.REACT_APP_OPENWEATHER_KEY}</div> */}
			</div>
			<Footer />
		</div>
	);
}
